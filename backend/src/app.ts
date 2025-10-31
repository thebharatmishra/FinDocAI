import express from "express";
import cors from "cors";
import uploadRouter from "./controllers/uploadController";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRouter);

app.get("/", (req, res) => res.json({ ok: true, service: "FinDocAI backend" }));

export default app;
