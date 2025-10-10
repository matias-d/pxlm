import { PinataSDK } from "pinata";

const JWT = import.meta.env.VITE_JWT;
const GATEWAY = import.meta.env.VITE_GATEWAY;
export const pinata = new PinataSDK({
  pinataJwt: JWT,
  pinataGateway: GATEWAY,
});

export async function uploadImageToPinata(imageFile: File, tokenId: number) {
  const formData = new FormData();
  formData.append("type", "image");
  formData.append("file", imageFile);
  formData.append(
    "metadata",
    JSON.stringify({
      name: `PXL ART #${tokenId} Image`,
      keyvalues: { tokenId: tokenId.toString(), type: "image" },
    })
  );

  const imageRes = await fetch("/api/pinata-upload", {
    method: "POST",
    body: formData,
  });

  if (!imageRes.ok) throw new Error("Image upload failed");

  const imageUpload = await imageRes.json();

  return imageUpload;
}

export async function uploadMetadataToPinata(
  metadata: object,
  tokenId: number,
  keyValues?: Record<string, string>
) {
  const metadataRes = await fetch("/api/pinata-upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "json",
      metadata: {
        ...metadata,
        name: `PXL ART #${tokenId} Metadata`,
        keyvalues: {
          tokenId: tokenId.toString(),
          type: "metadata",
          ...(keyValues ?? {}),
        },
      },
    }),
  });
  if (!metadataRes.ok) throw new Error("Metadata upload failed");

  const metadataUpload = await metadataRes.json();

  return metadataUpload;
}
