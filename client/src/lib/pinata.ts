export async function uploadImageToPinata(imageFile: File, tokenId: number) {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("tokenId", tokenId.toString());

  const imageRes = await fetch("/api/pinata/upload-image", {
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
  const values = {
    metadata,
    values: {
      name: `PXL ART #${tokenId} Metadata`,
      keyvalues: {
        tokenId: tokenId.toString(),
        type: "metadata",
        ...(keyValues ?? {}),
      },
    },
  };

  const metadataRes = await fetch("/api/pinata/upload-metadata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!metadataRes.ok) throw new Error("Metadata upload failed");

  const metadataUpload = await metadataRes.json();

  return metadataUpload;
}
