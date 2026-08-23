import { listReceipts } from '../lib/db'
export default function ReceiptsPage() {
  const receipts = listReceipts()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🔍 憑證掃描({receipts.length})</h1>
      <div className="border border-slate-200 rounded p-4 mb-4 bg-slate-50 text-center text-sm">
        📷 對準發票拍照 / 上傳 PDF(OCR mock)
      </div>
      <div className="space-y-2" data-testid="receipts-list">
        {receipts.map(r => (
          <div key={r.id} className="border border-slate-200 rounded p-3 flex items-center justify-between" data-testid={`receipt-${r.id}`}>
            <div>
              <div className="font-medium text-sm">{r.filename}</div>
              <div className="text-xs text-slate-500">{r.type} · {r.date}</div>
            </div>
            <div className="font-bold text-orange-600">NT$ {r.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
