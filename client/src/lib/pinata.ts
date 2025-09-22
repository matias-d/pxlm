import { PinataSDK } from "pinata";

const JWT = import.meta.env.VITE_JWT;
const GATEWAY = import.meta.env.VITE_GATEWAY;
export const pinata = new PinataSDK({
  pinataJwt: JWT,
  pinataGateway: GATEWAY,
});

export async function uploadImageToPinata(imageFile: File, tokenId: number) {
  const imageUpload = await pinata.upload.public.file(imageFile, {
    metadata: {
      name: `PXL ART #${tokenId} Image`,
      keyvalues: {
        tokenId: tokenId.toString(),
        type: "image",
      },
    },
  });

  return imageUpload;
}

export async function uploadMetadataToPinata(
  metadata: object,
  tokenId: number,
  keyValues?: Record<string, string>
) {
  const metadataUpload = await pinata.upload.public.json(metadata, {
    metadata: {
      name: `PXL ART #${tokenId} Metadata`,
      keyvalues: {
        tokenId: tokenId.toString(),
        type: "metadata",
        ...(keyValues ?? {}),
      },
    },
  });

  return metadataUpload;
}
