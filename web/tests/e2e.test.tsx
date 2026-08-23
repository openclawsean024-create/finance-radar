import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'
import { listTransactions, listAccounts, listReminders, listReceipts, totalBalance, monthlyTrend, markReminderDone, seedDemoData } from '../src/lib/db'

function renderAt(p: string) { return render(<MemoryRouter initialEntries={[p]}><App /></MemoryRouter>) }

beforeEach(async () => {
  localStorage.clear()
  seedDemoData()
})

describe('Sprint 1 E2E - 老闆財務雷達', () => {
  it('總覽顯示今日總額', () => {
    renderAt('/')
    expect(screen.getByTestId('today-total')).toBeInTheDocument()
  })

  it('現金流走勢圖顯示 6 個月', () => {
    renderAt('/')
    const trend = monthlyTrend()
    expect(trend.length).toBe(6)
  })

  it('交易預載 12 筆(6 月 × 收入/支出)', () => {
    expect(listTransactions().length).toBe(12)
  })

  it('帳戶預載 3 個', () => {
    expect(listAccounts().length).toBe(3)
  })

  it('帳戶總餘是 3 帳戶加總', () => {
    const accs = listAccounts()
    const expected = accs.reduce((s, a) => s + a.balance, 0)
    expect(totalBalance()).toBe(expected)
  })

  it('收款提醒預載 3 個', () => {
    expect(listReminders().length).toBe(3)
  })

  it('收款提醒合計正確', () => {
    const total = listReminders().reduce((s, r) => s + r.amount, 0)
    renderAt('/reminders')
    const display = screen.getByTestId('reminders-total').textContent
    expect(display).toContain(total.toLocaleString())
  })

  it('完成提醒會從清單移除', () => {
    const firstId = listReminders()[0].id
    markReminderDone(firstId)
    expect(listReminders().find(r => r.id === firstId)).toBeUndefined()
  })

  it('憑證預載 3 個', () => {
    expect(listReceipts().length).toBe(3)
  })

  it('趨勢每月都有收入和支出', () => {
    const trend = monthlyTrend()
    trend.forEach(t => {
      expect(t.income).toBeGreaterThan(0)
      expect(t.expense).toBeGreaterThan(0)
    })
  })

  it('憑證頁面顯示 OCR 上傳區', () => {
    renderAt('/receipts')
    const list = screen.getByTestId('receipts-list')
    expect(list.children.length).toBe(3)
  })
})
