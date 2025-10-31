import React, { useState } from 'react'
import UploadZone from './components/UploadZone'
import type { ExtractedData } from './types'

export default function App() {
    const [data, setData] = useState<ExtractedData | null>(null)

    return (
        <div className="container">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold">FinDocAI — Financial Document Analyzer</h1>
                <p className="text-sm text-gray-600">Upload a PDF bank statement or invoice to extract structured data.</p>
            </header>

            <UploadZone onResult={(d) => setData(d)} />

            <section>
                {data ? (
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="font-medium mb-2">Account</h2>
                        <p><strong>Holder:</strong> {data.accountHolder ?? '—'}</p>
                        <p><strong>Account:</strong> {data.accountNumber ?? '—'}</p>
                        <p><strong>Currency:</strong> {data.currency ?? '—'}</p>

                        <h3 className="mt-4 font-medium">Records</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm mt-2">
                                <thead>
                                    <tr className="text-left text-gray-600">
                                        <th className="pr-4">Date</th>
                                        <th className="pr-4">Description</th>
                                        <th className="pr-4">Amount</th>
                                        <th className="pr-4">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.records.map((r, i) => (
                                        <tr key={i} className="border-t">
                                            <td className="py-2">{r.date ?? '—'}</td>
                                            <td className="py-2">{r.description ?? '—'}</td>
                                            <td className="py-2">{typeof r.amount === 'number' ? r.amount.toFixed(2) : '—'}</td>
                                            <td className="py-2">{r.category ?? '—'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-gray-600">No results yet. Upload a PDF to begin.</div>
                )}
            </section>
        </div>
    )
}
