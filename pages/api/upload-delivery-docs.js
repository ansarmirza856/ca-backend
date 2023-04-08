import AWS from "aws-sdk";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
});

export default async function handler(req, res) {
  try {
    let s3 = new AWS.S3({
      region: process.env.CLOUD_REGION,
      accessKeyId: process.env.CLOUD_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUD_ACCESS_KEY_SECRET,
    });

    await upload.single("file")(req, res, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(400).json({ error: "Failed to upload file" });
      }

      const params = {
        Bucket: process.env.CLOUD_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      const result = s3
        .putObject(params)
        .promise()
        .then((data) => {});

      if (result) {
        const url = s3
          .getObject({
            Bucket: process.env.CLOUD_BUCKET_NAME,
            Key: "1e43819a7331391d1e70df0ec45f2037",
          })
          .promise()
          .then((data) => {
            console.log("data from getObj:", data);
          });

        res.status(200).json({ message: "File uploaded successfully", url });
      }
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
