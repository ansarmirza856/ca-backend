import multer from "multer";
import AWS from "aws-sdk";
import UserTaxApplication from "@/models/UserTaxApplication";
import { v4 as uuidv4 } from "uuid";

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
  if (req.method === "POST") {
    upload.single("files")(req, res, async (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(400).json({ error: "Failed to upload file" });
      }

      const uploadedFiles = [];
      const formId = req.body.formId;

      const fileName =
        uuidv4().slice(0, 10).split("-").join("") + "-" + req.files.fileName;

      const s3 = new AWS.S3({
        region: process.env.CLOUD_REGION,
        accessKeyId: process.env.CLOUD_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUD_ACCESS_KEY_SECRET,
      });

      const params = {
        Bucket: process.env.CLOUD_BUCKET_NAME,
        Key: fileName,
        Body: Buffer(req.files.uri),
        ContentType: req.files.type,
      };

      s3.putObject(params).promise();

      uploadedFiles.push({
        name: req.files.fileName,
        key: fileName,
      });

      const userTaxApplication = await UserTaxApplication.findOneAndUpdate(
        { formId: formId },
        { userAttachedFiles: uploadedFiles, applicationStatus: "in review" },
        { new: true }
      );

      if (!userTaxApplication) {
        return res.status(404).json({ success: false, error: "No form found" });
      }

      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        fileName: files.req.fileName,
        fileUrl: files.req.uri,
      });
    }); // <- added closing bracket here
  } else {
    res.status(400).json({ success: false });
  }
}
