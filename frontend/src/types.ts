export type FinancialRecord = {
  date?: string;
  description?: string;
  amount?: number;
  category?: string | null;
};

export type ExtractedData = {
  accountHolder?: string | null;
  accountNumber?: string | null;
  currency?: string | null;
  records: FinancialRecord[];
};
