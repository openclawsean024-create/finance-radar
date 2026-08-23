import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import AccountsPage from './pages/AccountsPage'
import ReceiptsPage from './pages/ReceiptsPage'
import RemindersPage from './pages/RemindersPage'
import './lib/bootstrap'
export default function App() {
  return <Layout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/accounts" element={<AccountsPage />} />
      <Route path="/receipts" element={<ReceiptsPage />} />
      <Route path="/reminders" element={<RemindersPage />} />
    </Routes>
  </Layout>
}
