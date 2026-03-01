'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  priority: string
  notes?: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

interface LoanLead {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  priority: string
  loanAmount?: string
  loanType?: string
  notes?: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'contact' | 'loan'>('contact')
  const [contactLeads, setContactLeads] = useState<Lead[]>([])
  const [loanLeads, setLoanLeads] = useState<LoanLead[]>([])
  const [stats, setStats] = useState({ 
    totalContact: 0, totalLoan: 0, todayContact: 0, todayLoan: 0,
    pendingContact: 0, pendingLoan: 0, approvedLoan: 0, rejectedLoan: 0, underReviewLoan: 0
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [filterPriority, setFilterPriority] = useState('ALL')
  const [selectedLead, setSelectedLead] = useState<Lead | LoanLead | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Don't auto-login from session - always require login
  useEffect(() => {
    // Clear any existing session on page load
    sessionStorage.removeItem('adminAuth')
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (email === 'admin123@gmail.com' && password === 'admin123') {
      setIsAuthenticated(true)
      fetchLeads()
    } else {
      setError('Invalid email or password')
    }
    setLoading(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    sessionStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
  }

  const fetchLeads = async () => {
    try {
      const contactRes = await fetch('/api/leads')
      if (contactRes.ok) {
        const contactData = await contactRes.json()
        setContactLeads(contactData.leads || [])
        
        const today = new Date().toDateString()
        const todayContactCount = contactData.leads?.filter((lead: Lead) => 
          new Date(lead.createdAt).toDateString() === today
        ).length || 0

        // Count contact lead statuses
        const pendingContactCount = contactData.leads?.filter((l: Lead) => l.status === 'PENDING').length || 0
        
        setStats(prev => ({ 
          ...prev, 
          totalContact: contactData.leads?.length || 0,
          todayContact: todayContactCount,
          pendingContact: pendingContactCount
        }))
      }

      const loanRes = await fetch('/api/loan-leads')
      if (loanRes.ok) {
        const loanData = await loanRes.json()
        setLoanLeads(loanData.leads || [])
        
        const today = new Date().toDateString()
        const todayLoanCount = loanData.leads?.filter((lead: LoanLead) => 
          new Date(lead.createdAt).toDateString() === today
        ).length || 0

        const pendingCount = loanData.leads?.filter((l: LoanLead) => l.status === 'PENDING').length || 0
        const approvedCount = loanData.leads?.filter((l: LoanLead) => l.status === 'APPROVED').length || 0
        const rejectedCount = loanData.leads?.filter((l: LoanLead) => l.status === 'REJECTED').length || 0
        const underReviewCount = loanData.leads?.filter((l: LoanLead) => l.status === 'UNDER_REVIEW').length || 0
        
        setStats(prev => ({ 
          ...prev, 
          totalLoan: loanData.leads?.length || 0,
          todayLoan: todayLoanCount,
          pendingLoan: pendingCount,
          approvedLoan: approvedCount,
          rejectedLoan: rejectedCount,
          underReviewLoan: underReviewCount
        }))
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    }
  }

  const updateLeadStatus = async (id: string, status: string, type: 'contact' | 'loan') => {
    try {
      const endpoint = type === 'contact' ? '/api/leads' : '/api/loan-leads'
      const res = await fetch(`${endpoint}?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (res.ok) {
        fetchLeads()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const updateLeadPriority = async (id: string, priority: string, type: 'contact' | 'loan') => {
    try {
      const endpoint = type === 'contact' ? '/api/leads' : '/api/loan-leads'
      const res = await fetch(`${endpoint}?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority })
      })
      
      if (res.ok) {
        fetchLeads()
      }
    } catch (error) {
      console.error('Error updating priority:', error)
    }
  }

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0] || {})
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
  }

  const getFilteredLeads = (leads: any[]) => {
    return leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.phone.includes(searchTerm)
      const matchesStatus = filterStatus === 'ALL' || lead.status === filterStatus
      const matchesPriority = filterPriority === 'ALL' || lead.priority === filterPriority
      return matchesSearch && matchesStatus && matchesPriority
    })
  }

  const getStatusColor = (status: string) => {
    const colors: any = {
      PENDING: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
      CONTACTED: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
      QUALIFIED: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300',
      CONVERTED: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
      REJECTED: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300',
      UNDER_REVIEW: 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300',
      APPROVED: 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-300',
      DISBURSED: 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800 border border-teal-300'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors: any = {
      LOW: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300',
      MEDIUM: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300',
      HIGH: 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border border-orange-300',
      URGENT: 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border border-red-300'
    }
    return colors[priority] || 'bg-gray-100 text-gray-800'
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 relative overflow-hidden flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Admin Portal
              </h1>
              <p className="text-gray-600 text-lg">Secure access to your dashboard</p>
            </motion.div>

            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="admin@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="••••••••"
                />
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-50 border-2 border-red-200 rounded-xl"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-700 font-semibold text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-500">
                Secured by <span className="font-bold text-gray-900">Medi Estate</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  const filteredContactLeads = getFilteredLeads(contactLeads)
  const filteredLoanLeads = getFilteredLeads(loanLeads)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Premium Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 font-medium">Medi Estate CRM System</p>
              </div>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-bold shadow-md"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Contact Leads', value: stats.totalContact, icon: '👥', color: 'emerald', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', textColor: 'text-emerald-600', border: 'border-emerald-100' },
            { label: 'Pending Inquiries', value: stats.pendingContact, icon: '⏳', color: 'yellow', iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600', textColor: 'text-yellow-600', border: 'border-yellow-100' },
            { label: 'Total Loan Leads', value: stats.totalLoan, icon: '💰', color: 'blue', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', textColor: 'text-blue-600', border: 'border-blue-100' },
            { label: 'Approved Loans', value: stats.approvedLoan, icon: '✅', color: 'green', iconBg: 'bg-green-50', iconColor: 'text-green-600', textColor: 'text-green-600', border: 'border-green-100' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
              className={`relative bg-white rounded-2xl p-6 border-2 ${stat.border} shadow-md overflow-hidden group cursor-pointer transition-all duration-300`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${stat.iconBg} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                    {stat.icon}
                  </div>
                  <div className={`px-3 py-1 bg-gray-50 rounded-full text-xs font-bold ${stat.textColor} border border-gray-200`}>
                    Live
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-semibold mb-2">{stat.label}</p>
                <p className={`text-4xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loan Status Overview Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10"
        >
          {[
            { label: 'Pending Review', value: stats.pendingLoan, bg: 'bg-white', border: 'border-yellow-200', text: 'text-yellow-600', iconBg: 'bg-yellow-50', icon: '⏰' },
            { label: 'Under Review', value: stats.underReviewLoan, bg: 'bg-white', border: 'border-orange-200', text: 'text-orange-600', iconBg: 'bg-orange-50', icon: '🔍' },
            { label: 'Approved', value: stats.approvedLoan, bg: 'bg-white', border: 'border-green-200', text: 'text-green-600', iconBg: 'bg-green-50', icon: '✓' },
            { label: 'Rejected', value: stats.rejectedLoan, bg: 'bg-white', border: 'border-red-200', text: 'text-red-600', iconBg: 'bg-red-50', icon: '✗' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              className={`${item.bg} rounded-2xl p-6 border-2 ${item.border} shadow-md relative overflow-hidden transition-all duration-300`}
            >
              <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {item.icon}
              </div>
              <p className="text-sm text-gray-600 font-semibold mb-2">{item.label}</p>
              <p className={`text-4xl font-bold ${item.text}`}>{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
        {/* Premium Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search & Filters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Search Leads</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-gray-900"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 text-gray-900 font-semibold"
              >
                <option value="ALL">All Status</option>
                {activeTab === 'contact' ? (
                  <>
                    <option value="PENDING">Pending</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="QUALIFIED">Qualified</option>
                    <option value="CONVERTED">Converted</option>
                    <option value="REJECTED">Rejected</option>
                  </>
                ) : (
                  <>
                    <option value="PENDING">Pending</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="DISBURSED">Disbursed</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Filter by Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 text-gray-900 font-semibold"
              >
                <option value="ALL">All Priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => exportToCSV(activeTab === 'contact' ? filteredContactLeads : filteredLoanLeads, `${activeTab}-leads-${new Date().toISOString().split('T')[0]}.csv`)}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-bold shadow-md flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSearchTerm(''); setFilterStatus('ALL'); setFilterPriority('ALL'); }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-bold shadow-md flex items-center border border-gray-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </motion.button>
          </div>
        </motion.div>
        {/* Premium Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('contact')}
                className={`flex-1 px-8 py-5 font-bold text-lg transition-all duration-300 relative ${
                  activeTab === 'contact'
                    ? 'text-white bg-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Contact Leads ({filteredContactLeads.length})
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('loan')}
                className={`flex-1 px-8 py-5 font-bold text-lg transition-all duration-300 relative ${
                  activeTab === 'loan'
                    ? 'text-white bg-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Loan Leads ({filteredLoanLeads.length})
                </span>
              </motion.button>
            </div>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                >
                  {filteredContactLeads.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p className="text-gray-600 text-xl font-semibold">No contact leads found</p>
                      <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Name</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Contact</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Subject</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Priority</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Date</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredContactLeads.map((lead, index) => (
                            <motion.tr
                              key={lead.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 transition-all duration-300"
                            >
                              <td className="py-4 px-6">
                                <div className="font-bold text-gray-900">{lead.name}</div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="text-sm text-gray-900 font-semibold">{lead.email}</div>
                                <div className="text-sm text-gray-600">{lead.phone}</div>
                              </td>
                              <td className="py-4 px-6 text-gray-900 max-w-xs truncate font-medium">{lead.subject}</td>
                              <td className="py-4 px-6">
                                <select
                                  value={lead.status}
                                  onChange={(e) => updateLeadStatus(lead.id, e.target.value, 'contact')}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-300 ${getStatusColor(lead.status)}`}
                                >
                                  <option value="PENDING">Pending</option>
                                  <option value="CONTACTED">Contacted</option>
                                  <option value="QUALIFIED">Qualified</option>
                                  <option value="CONVERTED">Converted</option>
                                  <option value="REJECTED">Rejected</option>
                                </select>
                              </td>
                              <td className="py-4 px-6">
                                <select
                                  value={lead.priority}
                                  onChange={(e) => updateLeadPriority(lead.id, e.target.value, 'contact')}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-300 ${getPriorityColor(lead.priority)}`}
                                >
                                  <option value="LOW">Low</option>
                                  <option value="MEDIUM">Medium</option>
                                  <option value="HIGH">High</option>
                                  <option value="URGENT">Urgent</option>
                                </select>
                              </td>
                              <td className="py-4 px-6 text-gray-600 text-sm font-medium">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-6">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => { setSelectedLead(lead); setShowModal(true); }}
                                  className="px-4 py-2 bg-gray-900 text-white rounded-lg font-bold text-sm shadow-md hover:bg-gray-800 transition-all duration-300"
                                >
                                  View
                                </motion.button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'loan' && (
                <motion.div
                  key="loan"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                >
                  {filteredLoanLeads.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 text-xl font-semibold">No loan leads found</p>
                      <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Name</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Contact</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Subject</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Priority</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Date</th>
                            <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLoanLeads.map((lead, index) => (
                            <motion.tr
                              key={lead.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 transition-all duration-300"
                            >
                              <td className="py-4 px-6">
                                <div className="font-bold text-gray-900">{lead.name}</div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="text-sm text-gray-900 font-semibold">{lead.email}</div>
                                <div className="text-sm text-gray-600">{lead.phone}</div>
                              </td>
                              <td className="py-4 px-6 text-gray-900 max-w-xs truncate font-medium">{lead.subject}</td>
                              <td className="py-4 px-6">
                                <select
                                  value={lead.status}
                                  onChange={(e) => updateLeadStatus(lead.id, e.target.value, 'loan')}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-300 ${getStatusColor(lead.status)}`}
                                >
                                  <option value="PENDING">Pending</option>
                                  <option value="UNDER_REVIEW">Under Review</option>
                                  <option value="APPROVED">Approved</option>
                                  <option value="REJECTED">Rejected</option>
                                  <option value="DISBURSED">Disbursed</option>
                                </select>
                              </td>
                              <td className="py-4 px-6">
                                <select
                                  value={lead.priority}
                                  onChange={(e) => updateLeadPriority(lead.id, e.target.value, 'loan')}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-300 ${getPriorityColor(lead.priority)}`}
                                >
                                  <option value="LOW">Low</option>
                                  <option value="MEDIUM">Medium</option>
                                  <option value="HIGH">High</option>
                                  <option value="URGENT">Urgent</option>
                                </select>
                              </td>
                              <td className="py-4 px-6 text-gray-600 text-sm font-medium">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-6">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => { setSelectedLead(lead); setShowModal(true); }}
                                  className="px-4 py-2 bg-gray-900 text-white rounded-lg font-bold text-sm shadow-md hover:bg-gray-800 transition-all duration-300"
                                >
                                  View
                                </motion.button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Premium Detail Modal */}
      <AnimatePresence>
        {showModal && selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-gray-900 p-8 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Lead Details</h2>
                    <p className="text-white/80">Complete information about this lead</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowModal(false)}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2 block">Full Name</label>
                    <p className="text-xl font-bold text-gray-900">{selectedLead.name}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2 block">Email Address</label>
                    <p className="text-xl font-bold text-gray-900 break-all">{selectedLead.email}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2 block">Phone Number</label>
                    <p className="text-xl font-bold text-gray-900">{selectedLead.phone}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2 block">Subject</label>
                    <p className="text-xl font-bold text-gray-900">{selectedLead.subject}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                  <label className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 block">Message</label>
                  <p className="text-gray-900 leading-relaxed">{selectedLead.message}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 block">Status</label>
                    <span className={`inline-block px-4 py-2 rounded-xl text-sm font-bold ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 block">Priority</label>
                    <span className={`inline-block px-4 py-2 rounded-xl text-sm font-bold ${getPriorityColor(selectedLead.priority)}`}>
                      {selectedLead.priority}
                    </span>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 block">Created Date</label>
                    <p className="text-gray-900 font-bold">{new Date(selectedLead.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-b-3xl flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${selectedLead.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 text-center font-bold shadow-lg flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 text-center font-bold shadow-lg flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
