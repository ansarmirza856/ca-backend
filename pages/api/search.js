import connectDB from "../../db";
import userTaxApplication from "../../models/UserTaxApplication";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const { q } = req.query;
      if (!q) {
        res.json([]);
        return;
      }

      if (q.length > 2) {
        const regex = new RegExp(q, "i");
        const results = await userTaxApplication
          .find({
            $or: [{ formId: regex }, { userEmail: regex }],
          })
          .sort({ dateSubmitted: "desc" });
        res.json(results);
      } else {
        res.json([]);
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
