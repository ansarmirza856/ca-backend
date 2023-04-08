import AWS from "aws-sdk";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { key } = req.query;

    // Create a new S3 client with your AWS credentials and the region where your bucket is located
    const s3 = new AWS.S3({
      accessKeyId: process.env.CLOUD_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUD_ACCESS_KEY_SECRET,
      region: process.env.CLOUD_REGION,
    });

    // Use the getObject method of the S3 client to retrieve the file from the bucket
    const file = await s3
      .getObject({
        Bucket: process.env.CLOUD_BUCKET_NAME,
        Key: key,
      })
      .promise();

    // Set the response headers to indicate that a file is being downloaded
    res.setHeader("Content-disposition", `attachment; filename=${key}`);
    res.setHeader("Content-type", file.ContentType);

    // Use the fs module to write the file to the response
    res.end(file.Body);
  } else {
    res.status(200).json({ message: "Invalid request method" });
  }
}
