import { createHash, randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { ApiError } from '../utils/ApiError.js';
export const PHOTO_LIMIT = 2 * 1024 * 1024;
export function cloudinaryConfig() {
  let cloud = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  let key = process.env.CLOUDINARY_API_KEY?.trim();
  let secret = process.env.CLOUDINARY_API_SECRET?.trim();
  if ((!cloud || !key || !secret) && process.env.CLOUDINARY_URL?.trim() && !process.env.CLOUDINARY_API_SECRET && !process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      const parsed = new URL(process.env.CLOUDINARY_URL.trim());
      if (parsed.protocol === 'cloudinary:') {
        key = decodeURIComponent(parsed.username);
        secret = decodeURIComponent(parsed.password);
        cloud = parsed.hostname;
      }
    } catch {}
  }
  if (!cloud || !/^[a-zA-Z0-9_-]+$/.test(cloud) || !key || !secret)
    throw new ApiError(503, 'PHOTO_STORAGE_UNAVAILABLE', 'Photo uploads are not configured yet.');
  const testBase = process.env.CLOUDINARY_TEST_BASE_URL;
  if (testBase && (process.env.NODE_ENV !== 'test' || !/^http:\/\/127\.0\.0\.1:\d+(\/[^?#]*)?$/.test(testBase)))
    throw new Error('Cloudinary test URL is permitted only on localhost in test mode.');
  return { cloud, key, secret, base: testBase ?? `https://api.cloudinary.com/v1_1/${cloud}/image` };
}
export async function normalizePhoto(input: Buffer) {
  if (!input || !Buffer.isBuffer(input) || !input.length || input.length > PHOTO_LIMIT) throw new ApiError(400, 'INVALID_PHOTO', 'Choose a JPEG, PNG or WebP image up to 2 MB.');
  try {
    const image = sharp(input, {limitInputPixels: 25000000, animated: false, failOn: 'warning'});
    const meta = await image.metadata();
    if (!['jpeg','png','webp'].includes(meta.format ?? '') || (meta.pages ?? 1) > 1) throw new Error('Unsupported image');
    return await image.rotate().resize(512,512,{fit:'cover',position:'centre',withoutEnlargement:true}).flatten({background:'#ffffff'}).jpeg({quality:80,mozjpeg:true}).toBuffer();
  } catch { throw new ApiError(400, 'INVALID_PHOTO', 'Choose a valid, non-animated JPEG, PNG or WebP image (maximum 25 megapixels).'); }
}
async function providerCall(operation: string, params: Record<string,string>, photo?: Buffer) {
  const cfg = cloudinaryConfig();
  params.timestamp = String(Math.floor(Date.now()/1000));
  const signature = createHash('sha256').update(Object.keys(params).sort().map(k=>`${k}=${params[k]}`).join('&')+cfg.secret).digest('hex');
  const form = new FormData();
  for(const [k,v] of Object.entries(params)) form.append(k,v);
  form.append('api_key',cfg.key); form.append('signature',signature);
  if(photo) form.append('file',new Blob([new Uint8Array(photo)],{type:'image/jpeg'}),'avatar.jpg');
  try {
    const response = await fetch(`${cfg.base}/${operation}`,{method:'POST',body:form,signal:AbortSignal.timeout(12000),redirect:'error'});
    if(!response.ok) {
      const errBody = await response.text().catch(() => '');
      console.error(`Cloudinary ${operation} error: ${response.status}`, errBody);
      throw new Error('Provider rejected request');
    }
    return await response.json() as Record<string,unknown>;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(503,'PHOTO_STORAGE_UNAVAILABLE','Photo storage is temporarily unavailable. Please try again.');
  }
}
export async function uploadPhoto(input: Buffer, ownerId: string) {
  const cfg = cloudinaryConfig();
  const bytes = await normalizePhoto(input);
  const publicId = `euit/profile-photos/${ownerId}/${randomUUID()}`;
  const result = await providerCall('upload',{public_id:publicId,overwrite:'false'},bytes);
  if(result.public_id !== publicId || result.resource_type !== 'image' || result.format !== 'jpg' || typeof result.secure_url !== 'string' || !result.secure_url.startsWith(`https://res.cloudinary.com/${cfg.cloud}/image/upload/`)) {
    await destroyPhoto(publicId).catch(()=>{});
    throw new ApiError(503,'PHOTO_STORAGE_UNAVAILABLE','Photo storage returned an invalid result.');
  }
  return {storageKey:`cloudinary:${publicId}`,url:result.secure_url,mimeType:'image/jpeg',ready:true};
}
export async function destroyPhoto(publicId: string) {
  if(!/^euit\/profile-photos\/[0-9a-f-]+\/[0-9a-f-]+$/.test(publicId)) return;
  const result = await providerCall('destroy',{public_id:publicId,invalidate:'true'});
  if(!['ok','not found'].includes(String(result.result))) throw new Error('Photo cleanup failed');
}
