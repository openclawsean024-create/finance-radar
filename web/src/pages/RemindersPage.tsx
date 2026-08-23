import { listReminders, markReminderDone } from '../lib/db'
export default function RemindersPage() {
  const reminders = listReminders()
  const total = reminders.reduce((s, r) => s + r.amount, 0)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">🔔 收款提醒</h1>
      <div className="text-3xl font-bold text-orange-600 mb-4" data-testid="reminders-total">NT$ {total.toLocaleString()}</div>
      {reminders.length === 0 && <div className="text-center text-slate-400 py-12">沒有待收款項</div>}
      <div className="space-y-2" data-testid="reminders-list">
        {reminders.map(r => (
          <div key={r.id} className="border border-slate-200 rounded p-3 flex items-center justify-between" data-testid={`reminder-${r.id}`}>
            <div>
              <div className="font-medium">{r.customer}</div>
              <div className="text-xs text-slate-500">到期 {r.due}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-orange-600">NT$ {r.amount.toLocaleString()}</span>
              <button onClick={() => markReminderDone(r.id)} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded" data-testid={`done-${r.id}`}>✓ 完成</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
