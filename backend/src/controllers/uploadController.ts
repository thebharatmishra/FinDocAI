import { Router } from "express";
import multer from "multer";
import { parsePdfBuffer } from "../services/parserService";
import { extractFinancialData } from "../services/aiService";

const router = Router();

// In-memory storage (for scaffold). In production, use S3 or disk storage.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("pdf")) {
      cb(new Error("Only PDF files are allowed"));
    } else {
      cb(null, true);
    }
  },
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const buffer = req.file.buffer;
    const text = await parsePdfBuffer(buffer);

    const structured = await extractFinancialData(text);

    return res.json({ ok: true, data: structured });
  } catch (err: any) {
    console.error("Upload error", err);
    return res
      .status(500)
      .json({ error: err.message || "Failed to process file" });
  }
});

export default router;
