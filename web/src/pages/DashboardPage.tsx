import { totalIncome, totalExpense, totalBalance, monthlyTrend } from '../lib/db'

export default function DashboardPage() {
  const inc = totalIncome()
  const exp = totalExpense()
  const bal = totalBalance()
  const trend = monthlyTrend()
  const max = Math.max(...trend.flatMap(t => [t.income, t.expense]), 1)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">💰 今日總覽</h1>
      <div className="text-xs text-slate-500 mb-4">打工手機就知道錢在哪</div>

      <div className="border border-slate-200 rounded p-4 mb-6" data-testid="today-total">
        <div className="text-sm text-slate-500">總額</div>
        <div className="text-3xl font-bold">NT$ {bal.toLocaleString()}</div>
        <div className="grid grid-cols-2 mt-2 gap-2 text-xs">
          <div className="text-green-600">收款 NT$ {inc.toLocaleString()}</div>
          <div className="text-red-600">支出 NT$ {exp.toLocaleString()}</div>
        </div>
      </div>

      <h2 className="text-lg font-medium mb-3">📈 現金流走勢(近 6 個月)</h2>
      <div className="border border-slate-200 rounded p-4 mb-6" data-testid="trend-chart">
        {trend.map(t => (
          <div key={t.month} className="flex items-center gap-2 text-xs mb-2" data-testid={`trend-${t.month}`}>
            <span className="w-12 text-slate-500">{t.month}</span>
            <div className="flex-1 h-3 bg-slate-100 rounded relative">
              <div className="absolute h-full bg-green-500 rounded" style={{ width: `${(t.income / max) * 100}%` }} />
            </div>
            <span className="w-16 text-right text-green-600">+{t.income.toLocaleString()}</span>
            <div className="flex-1 h-3 bg-slate-100 rounded relative">
              <div className="absolute h-full bg-red-500 rounded" style={{ width: `${(t.expense / max) * 100}%` }} />
            </div>
            <span className="w-16 text-right text-red-600">-{t.expense.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-medium mb-3">🔔 收款提醒</h2>
      <div className="space-y-2" data-testid="reminders-preview">
        {/* 由 RemindersPage 共享,但也預載到 dashboard 預覽 */}
      </div>
    </div>
  )
}
