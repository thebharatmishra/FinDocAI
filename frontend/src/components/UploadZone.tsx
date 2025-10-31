import React, { useCallback, useState } from 'react';
import type { ExtractedData } from '../types';

type Props = { onResult: (data: ExtractedData) => void };

export default function UploadZone({ onResult }: Props) {
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = useCallback(async (file: File) => {
        setError(null);
        setLoading(true);
        try {
            const form = new FormData();
            form.append('file', file);

            const res = await fetch('http://localhost:4000/api/upload', {
                method: 'POST',
                body: form
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Upload failed');

            onResult(json.data);
        } catch (err: any) {
            setError(err.message || 'Upload error');
        } finally {
            setLoading(false);
        }
    }, [onResult]);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f) uploadFile(f);
    }, [uploadFile]);

    return (
        <div className="mb-4">
            <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={`rounded border-2 p-6 text-center ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-300'}`}>
                <p className="mb-2">Drag & drop a PDF here or</p>
                <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                    <input type="file" accept="application/pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); }} />
                    Select PDF
                </label>
                {loading && <p className="mt-2 text-sm text-gray-600">Processing...</p>}
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
        </div>
    );
}
