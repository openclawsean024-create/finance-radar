import { listAccounts, totalBalance } from '../lib/db'
export default function AccountsPage() {
  const accounts = listAccounts()
  const total = totalBalance()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">帳戶總餘</h1>
      <div className="text-3xl font-bold text-orange-600 mb-4" data-testid="total-balance">NT$ {total.toLocaleString()}</div>
      <div className="space-y-2" data-testid="accounts-list">
        {accounts.map(a => (
          <div key={a.id} className="border border-slate-200 rounded p-3 flex items-center justify-between" data-testid={`account-${a.id}`}>
            <div>
              <div className="font-medium">{a.bank}</div>
              <div className="text-xs text-slate-500">{a.type === 'checking' ? '支票帳戶' : a.type === 'cash' ? '現金' : '信用卡'}</div>
            </div>
            <div className="font-bold">NT$ {a.balance.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
