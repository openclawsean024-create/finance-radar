export interface Transaction {
  id: string
  date: string             // ISO date
  type: 'income' | 'expense'
  amount: number
  category: string
  party: string
  note?: string
}

export interface Account {
  id: string
  bank: string
  balance: number
  type: 'checking' | 'cash' | 'credit'
}

export interface Reminder {
  id: string
  customer: string
  amount: number
  due: string
}

export interface Receipt {
  id: string
  filename: string
  type: 'pdf' | 'image'
  amount: number
  date: string
}
