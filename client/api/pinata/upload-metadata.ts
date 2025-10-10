import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { metadata, values } = req.body;

    const imageUpload = await pinata.upload.public.json(metadata, {
      metadata: {
        ...values,
      },
    });

    return res.status(200).json(imageUpload);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Upload metadata failed" });
  }
}
