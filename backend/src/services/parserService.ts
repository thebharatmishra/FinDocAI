import pdf from "pdf-parse";

export async function parsePdfBuffer(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    // data.text contains the extracted text
    return data.text || "";
  } catch (err) {
    console.error("PDF parse error", err);
    throw new Error("Failed to parse PDF");
  }
}
