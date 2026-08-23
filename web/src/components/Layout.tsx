import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold">💰 老闆財務雷達</Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/" className="hover:underline">首頁</Link>
            <Link to="/accounts" className="hover:underline">帳戶</Link>
            <Link to="/receipts" className="hover:underline">憑證</Link>
            <Link to="/reminders" className="hover:underline">提醒</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">{children}</main>
      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">老闆財務雷達 · Sprint 1 · 打工手機就知道錢在哪</footer>
    </div>
  )
}
