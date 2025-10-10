import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PinataSDK } from "pinata";
import formidable from "formidable";
import fs from "fs";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const tokenId = fields.tokenId?.[0];
    const uploadedFile = files.file?.[0];

    if (!uploadedFile || !tokenId) {
      return res.status(400).json({ error: "Missing file or tokenId" });
    }

    const fileBuffer = fs.readFileSync(uploadedFile.filepath);
    const file = new File(
      [fileBuffer],
      uploadedFile.originalFilename || "image",
      {
        type: uploadedFile.mimetype || "image/svg",
      }
    );

    const imageUpload = await pinata.upload.public.file(file, {
      metadata: {
        name: `PXL ART #${tokenId} Image`,
        keyvalues: {
          tokenId: tokenId.toString(),
          type: "image",
        },
      },
    });

    fs.unlinkSync(uploadedFile.filepath);

    return res.status(200).json(imageUpload);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Upload failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
