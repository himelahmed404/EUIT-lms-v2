import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
const allowed =
  /^(auth\/student\/signup|me(?:\/(?:profile|photo(?:\/upload)?|preferences|permissions))?|permissions|catalog\/courses(?:\/[0-9a-f-]+)?|admin\/(?:courses|batches)(?:\/[0-9a-f-]+)?|admin\/(?:rooms|mentors)|admin\/roles|admin\/profiles\/[0-9a-f-]+\/access)$/i;
async function forward(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const path = (await context.params).path.join("/");
  if (!allowed.test(path))
    return NextResponse.json(
      { success: false, message: "Route not found." },
      { status: 404 },
    );
  try {
    const isPhotoUpload = path === "me/photo/upload";
    let uploadBody: Uint8Array | undefined;
    if (isPhotoUpload) {
      const reader = request.body?.getReader();
      const chunks: Uint8Array[] = [];
      let size = 0;
      if (reader)
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.length;
          if (size > 2 * 1024 * 1024) {
            await reader.cancel();
            return NextResponse.json(
              {
                success: false,
                code: "INVALID_PHOTO",
                message: "Photo must be at most 2 MB.",
              },
              { status: 413 },
            );
          }
          chunks.push(value);
        }
      uploadBody = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) {
        uploadBody.set(chunk, offset);
        offset += chunk.length;
      }
    }
    const base = (
      process.env.API_SERVER_URL || "http://127.0.0.1:5000"
    ).replace(/\/$/, "");
    const response = await fetch(
      `${base}/api/${path}${request.nextUrl.search}`,
      {
        method: request.method,
        cache: "no-store",
        signal: AbortSignal.timeout(isPhotoUpload ? 40000 : 15000),
        redirect: "error",
        headers: {
          "Content-Type": isPhotoUpload
            ? (request.headers.get("content-type") ??
              "application/octet-stream")
            : "application/json",
          ...(request.headers.get("authorization")
            ? { Authorization: request.headers.get("authorization")! }
            : {}),
        },
        body: ["GET", "HEAD"].includes(request.method)
          ? undefined
          : isPhotoUpload
            ? new Blob([uploadBody as Uint8Array<ArrayBuffer>])
            : await request.text(),
      },
    );
    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        code: "API_UNAVAILABLE",
        message: "Service unavailable. Please retry.",
      },
      { status: 503 },
    );
  }
}
export { forward as GET, forward as POST, forward as PATCH, forward as PUT };
