/* eslint-disable @typescript-eslint/no-explicit-any */
// /api/pinata-upload.ts
import { PinataSDK } from "pinata";

interface PinataUploadRequestBody {
  type: "image" | "json";
  file?: File;
  metadata: Record<string, any>;
}

export const handler = async (req: any, res: any) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const pinataJwt = process.env.PINATA_JWT!;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const pinataGateway = process.env.PINATA_GATEWAY!;

  if (!pinataJwt || !pinataGateway) {
    return res
      .status(500)
      .json({ error: "Pinata environment variables missing" });
  }

  const pinata = new PinataSDK({
    pinataJwt,
    pinataGateway,
  });

  try {
    const body: PinataUploadRequestBody = await req.json();

    let result;
    if (body.type === "image") {
      if (!body.file) throw new Error("No file provided");
      result = await pinata.upload.public.file(body.file, {
        metadata: body.metadata,
      });
    } else if (body.type === "json") {
      result = await pinata.upload.public.json(body.metadata, {
        metadata: body.metadata,
      });
    } else {
      throw new Error("Invalid type, must be 'image' or 'json'");
    }

    return res.status(200).json(result);
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json({ error: err.message ?? "Error uploading to Pinata" });
  }
};
