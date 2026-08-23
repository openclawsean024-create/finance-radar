import type { Transaction, Account, Reminder, Receipt } from './types'
const KEY = 'finance-radar:db'
interface DBSchema { transactions: Transaction[]; accounts: Account[]; reminders: Reminder[]; receipts: Receipt[] }
function read(): DBSchema {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) { const p = JSON.parse(raw); if (Array.isArray(p.transactions)) return p }
  } catch {}
  return { transactions: [], accounts: [], reminders: [], receipts: [] }
}
function write(db: DBSchema) { try { localStorage.setItem(KEY, JSON.stringify(db)) } catch {} }

export function seedDemoData() {
  const db = read()
  if (db.transactions.length > 0) return
  // 6 個月現金流走勢
  const months = ['2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08']
  months.forEach((m, i) => {
    const income = 100000 + Math.floor(Math.random() * 80000) + i * 10000
    const expense = 60000 + Math.floor(Math.random() * 40000) + i * 5000
    db.transactions.push({ id: `t${m}-inc`, date: `${m}-15`, type: 'income', amount: income, category: '營業收入', party: '客戶群' })
    db.transactions.push({ id: `t${m}-exp`, date: `${m}-20`, type: 'expense', amount: expense, category: '營業支出', party: '供應商群' })
  })
  db.accounts = [
    { id: 'a1', bank: '渣打銀行', balance: 256820, type: 'checking' },
    { id: 'a2', bank: '王品通帳戶', balance: 196500, type: 'checking' },
    { id: 'a3', bank: '店內零用金', balance: 189500, type: 'cash' },
  ]
  db.reminders = [
    { id: 'r1', customer: '桌下午茶', amount: 25800, due: '2026-08-25' },
    { id: 'r2', customer: '大戶出貨', amount: 9450, due: '2026-08-28' },
    { id: 'r3', customer: '大戶茶會', amount: 8800, due: '2026-09-02' },
  ]
  db.receipts = [
    { id: 'rc1', filename: '2024-01-16-發票.pdf', type: 'pdf', amount: 1280, date: '2024-01-16' },
    { id: 'rc2', filename: '2024-01-16-憑證.jpg', type: 'image', amount: 25800, date: '2024-01-16' },
    { id: 'rc3', filename: '2024-01-17-發票.pdf', type: 'pdf', amount: 480, date: '2024-01-17' },
  ]
  write(db)
}

export function getDB(): DBSchema { return read() }
export function listTransactions(): Transaction[] { return read().transactions }
export function listAccounts(): Account[] { return read().accounts }
export function listReminders(): Reminder[] { return read().reminders }
export function listReceipts(): Receipt[] { return read().receipts }
export function markReminderDone(id: string) {
  const db = read()
  db.reminders = db.reminders.filter(r => r.id !== id)
  write(db)
}
export function totalIncome(): number { return read().transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0) }
export function totalExpense(): number { return read().transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0) }
export function totalBalance(): number { return read().accounts.reduce((s, a) => s + a.balance, 0) }
export function monthlyTrend(): { month: string; income: number; expense: number }[] {
  const map = new Map<string, { income: number; expense: number }>()
  for (const t of read().transactions) {
    const m = t.date.slice(0, 7)
    const e = map.get(m) ?? { income: 0, expense: 0 }
    if (t.type === 'income') e.income += t.amount; else e.expense += t.amount
    map.set(m, e)
  }
  return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0])).map(([m, v]) => ({ month: m, ...v }))
}
