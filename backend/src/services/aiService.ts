import fetch from "node-fetch";

export type FinancialRecord = {
  date?: string;
  description?: string;
  amount?: number;
  category?: string;
};

export type ExtractedData = {
  accountHolder?: string;
  accountNumber?: string;
  currency?: string;
  records: FinancialRecord[];
};

const OPENAI_KEY = process.env.OPENAI_API_KEY;

const PROMPT_INSTRUCTIONS = `You are a financial document parser. Given the full text of a bank statement or invoice, extract the following JSON object:

{ "accountHolder": string | null, "accountNumber": string | null, "currency": string | null, "records": [ { "date": string, "description": string, "amount": number, "category": string | null } ] }

Return only valid JSON. Dates should be ISO-ish (YYYY-MM-DD) if possible. Amounts should be numbers (negative for debits). If a field is missing, use null or empty array.
`;

export async function extractFinancialData(
  text: string
): Promise<ExtractedData> {
  if (!OPENAI_KEY) {
    // deterministic mock for testing
    return {
      accountHolder: "John Doe",
      accountNumber: "****1234",
      currency: "USD",
      records: [
        {
          date: "2025-10-01",
          description: "ACME CORP PAYMENT",
          amount: -1500.0,
          category: "Payment",
        },
        {
          date: "2025-10-05",
          description: "PAYROLL CREDIT",
          amount: 3000.0,
          category: "Salary",
        },
        {
          date: "2025-10-07",
          description: "COFFEE SHOP",
          amount: -4.5,
          category: "Dining",
        },
      ],
    };
  }

  // Call OpenAI Chat Completions (chat API)
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const body = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that extracts structured JSON from financial documents.",
      },
      { role: "user", content: PROMPT_INSTRUCTIONS + "\n\n" + text },
    ],
    temperature: 0.0,
    max_tokens: 1000,
  };

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${txt}`);
  }

  const data = await res.json();
  // Expect assistant reply in data.choices[0].message.content
  const content = data?.choices?.[0]?.message?.content;

  try {
    const parsed = JSON.parse(content);
    // Basic validation
    if (!parsed.records) parsed.records = [];
    return parsed as ExtractedData;
  } catch (err) {
    throw new Error("Failed to parse AI response as JSON");
  }
}
