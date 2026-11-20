import { getPrisma } from "../../lib/prisma.js";
import { readConfig } from "../../config/index.js";
import { ApiError } from "../../utils/ApiError.js";
import { assertOwner } from "../../middleware/authorize.js";
import { cloudinaryConfig, destroyPhoto, uploadPhoto as cloudinaryUploadPhoto } from "../../lib/cloudinary-photo.js";
import { preferenceDefaults } from "./me.validation.js";
import type { Profile } from "../../../generated/prisma/client.js";
import type { ProfileContext } from "../../middleware/requireProfile.js";
import type { PhotoResponse, PreferencesResponseData, ProfileResponseData } from "./me.interface.js";

const db = () => getPrisma(readConfig().databaseUrl);

export function profileData(profile: Profile): ProfileResponseData {
  const {
    id,
    fullName,
    role,
    phone,
    emergencyContact,
    address,
    education,
    occupation,
    jobTitle,
    bio,
    skills,
    yearsOfExperience,
    portfolioUrl,
    showOnWebsite,
    createdAt,
    updatedAt,
    photoAssetId,
  } = profile;
  return {
    id,
    fullName,
    role,
    phone,
    emergencyContact,
    address,
    education,
    occupation,
    jobTitle,
    bio,
    skills,
    yearsOfExperience,
    portfolioUrl,
    showOnWebsite,
    createdAt,
    updatedAt,
    photoAssetId,
  };
}

export function preferencesData(record: Record<string, unknown> | null): PreferencesResponseData {
  return Object.fromEntries(
    Object.entries(preferenceDefaults).map(([key, value]) => [key, record?.[key] ?? value])
  ) as PreferencesResponseData;
}

export async function getProfile(context: ProfileContext, email?: string) {
  const photo =
    context.profile.photoAssetId &&
    (await db().uploadedAsset.findFirst({
      where: {
        id: context.profile.photoAssetId,
        ownerId: context.profile.id,
        ready: true,
      },
      select: { id: true, url: true },
    }));

  return {
    ...profileData(context.profile),
    email: email ?? null,
    emailVerified: true,
    roleName: context.roleDefinition.name,
    permissions: context.permissions,
    batchScope: context.batchScope,
    photo: photo || null,
  };
}

export function getPermissions(context: ProfileContext) {
  const { profile, permissions, batchScope, roleDefinition } = context;
  return {
    role: profile.role,
    roleName: roleDefinition.name,
    permissions,
    batchScope,
  };
}

export async function updateProfile(profileId: string, data: Record<string, unknown>) {
  const updated = await db().profile.update({
    where: { id: profileId },
    data,
  });
  return profileData(updated);
}

export async function updatePhoto(context: ProfileContext, assetId: string | null): Promise<PhotoResponse | null> {
  const result = await db().$transaction(
    async (tx) => {
      const current = await tx.profile.findUniqueOrThrow({
        where: { id: context.profile.id },
      });
      const old = current.photoAssetId
        ? await tx.uploadedAsset.findUnique({ where: { id: current.photoAssetId } })
        : null;
      let asset = null;
      if (assetId !== null) {
        asset = await tx.uploadedAsset.findUnique({ where: { id: assetId } });
        // Do not disclose whether someone else's asset exists.
        if (!asset || asset.ownerId !== context.profile.id) {
          throw new ApiError(404, "ASSET_NOT_FOUND", "Owned photo asset not found.");
        }
        assertOwner(context, asset.ownerId);
        if (!asset.ready || !["image/jpeg", "image/png", "image/webp"].includes(asset.mimeType)) {
          throw new ApiError(409, "ASSET_NOT_READY", "Photo must be a completed JPEG, PNG or WebP upload.");
        }
      }
      await tx.profile.update({
        where: { id: context.profile.id },
        data: { photoAssetId: asset?.id ?? null },
      });
      const retired =
        old?.id !== asset?.id &&
        old?.ownerId === context.profile.id &&
        old.storageKey.startsWith("cloudinary:")
          ? old
          : null;
      if (retired) {
        await tx.uploadedAsset.update({ where: { id: retired.id }, data: { ready: false } });
      }
      return { photo: asset ? { id: asset.id, url: asset.url } : null, retired };
    },
    { isolationLevel: "Serializable" }
  );

  if (result.retired) {
    await destroyPhoto(result.retired.storageKey.slice(11)).catch(() =>
      console.warn("Detached profile photo requires cleanup", { assetId: result.retired!.id })
    );
  }

  return result.photo;
}

export async function getPreferences(profileId: string) {
  const preferences = await db().profilePreferences.findUnique({
    where: { profileId },
  });
  return preferencesData(preferences as Record<string, unknown> | null);
}

export async function updatePreferences(profileId: string, data: Record<string, boolean>) {
  const preferences = await db().profilePreferences.upsert({
    where: { profileId },
    create: { profileId, ...data },
    update: data,
  });
  return preferencesData(preferences as Record<string, unknown> | null);
}

const pendingUploads = new Set<string>();

export async function uploadProfilePhoto(ownerId: string, fileBytes: Buffer): Promise<PhotoResponse> {
  cloudinaryConfig();
  if (pendingUploads.has(ownerId)) {
    throw new ApiError(429, "PHOTO_UPLOAD_BUSY", "A photo upload is already in progress.");
  }
  pendingUploads.add(ownerId);
  const prismaDb = getPrisma(readConfig().databaseUrl);
  let uploaded: Awaited<ReturnType<typeof cloudinaryUploadPhoto>> | undefined;
  let committed = false;
  try {
    uploaded = await cloudinaryUploadPhoto(fileBytes, ownerId);
    const result = await prismaDb.$transaction(
      async (tx) => {
        const current = await tx.profile.findUniqueOrThrow({ where: { id: ownerId } });
        if (!current.active) {
          throw new ApiError(403, "ACCOUNT_DISABLED", "This LMS account is disabled.");
        }
        const old = current.photoAssetId
          ? await tx.uploadedAsset.findUnique({ where: { id: current.photoAssetId } })
          : null;
        const asset = await tx.uploadedAsset.create({ data: { ...uploaded!, ownerId } });
        await tx.profile.update({ where: { id: ownerId }, data: { photoAssetId: asset.id } });
        if (old?.ownerId === ownerId && old.storageKey.startsWith("cloudinary:")) {
          await tx.uploadedAsset.update({ where: { id: old.id }, data: { ready: false } });
        }
        return { asset, old };
      },
      { isolationLevel: "Serializable" }
    );
    committed = true;
    if (result.old?.ownerId === ownerId && result.old.storageKey.startsWith("cloudinary:")) {
      await destroyPhoto(result.old.storageKey.slice(11)).catch(() =>
        console.warn("Detached profile photo requires cleanup", { assetId: result.old!.id })
      );
    }
    return { id: result.asset.id, url: result.asset.url };
  } finally {
    pendingUploads.delete(ownerId);
    if (uploaded && !committed) {
      await destroyPhoto(uploaded.storageKey.slice(11)).catch(() =>
        console.warn("Unbound profile photo requires cleanup")
      );
    }
  }
}
