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
    pendingLoan: 0, approvedLoan: 0, rejectedLoan: 0, underReviewLoan: 0
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [filterPriority, setFilterPriority] = useState('ALL')
  const [selectedLead, setSelectedLead] = useState<Lead | LoanLead | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchLeads()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (email === 'admin123@gmail.com' && password === 'admin123') {
      sessionStorage.setItem('adminAuth', 'true')
      setIsAuthenticated(true)
      fetchLeads()
    } else {
      setError('Invalid email or password')
    }
    setLoading(false)
  }

  const handleLogout = () => {
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
        
        setStats(prev => ({ 
          ...prev, 
          totalContact: contactData.leads?.length || 0,
          todayContact: todayContactCount
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
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONTACTED: 'bg-blue-100 text-blue-800',
      QUALIFIED: 'bg-purple-100 text-purple-800',
      CONVERTED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      UNDER_REVIEW: 'bg-orange-100 text-orange-800',
      APPROVED: 'bg-green-100 text-green-800',
      DISBURSED: 'bg-emerald-100 text-emerald-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors: any = {
      LOW: 'bg-gray-100 text-gray-800',
      MEDIUM: 'bg-blue-100 text-blue-800',
      HIGH: 'bg-orange-100 text-orange-800',
      URGENT: 'bg-red-100 text-red-800'
    }
    return colors[priority] || 'bg-gray-100 text-gray-800'
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Access your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    )
  }

  const filteredContactLeads = getFilteredLeads(contactLeads)
  const filteredLoanLeads = getFilteredLeads(loanLeads)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Medi Estate CRM</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Total Contact Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalContact}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Total Loan Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalLoan}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Pending Loans</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingLoan}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Approved Loans</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.approvedLoan}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Loan Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-4 text-white shadow-lg">
            <p className="text-sm opacity-90">Pending Review</p>
            <p className="text-2xl font-bold mt-1">{stats.pendingLoan}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg">
            <p className="text-sm opacity-90">Under Review</p>
            <p className="text-2xl font-bold mt-1">{stats.underReviewLoan}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg">
            <p className="text-sm opacity-90">Approved</p>
            <p className="text-2xl font-bold mt-1">{stats.approvedLoan}</p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg">
            <p className="text-sm opacity-90">Rejected</p>
            <p className="text-2xl font-bold mt-1">{stats.rejectedLoan}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
              >
                <option value="ALL">All Priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => exportToCSV(activeTab === 'contact' ? filteredContactLeads : filteredLoanLeads, `${activeTab}-leads-${new Date().toISOString().split('T')[0]}.csv`)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold"
            >
              Export to CSV
            </button>
            <button
              onClick={() => { setSearchTerm(''); setFilterStatus('ALL'); setFilterPriority('ALL'); }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
            >
              Clear Filters
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'contact'
                    ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Contact Form Leads ({filteredContactLeads.length})
              </button>
              <button
                onClick={() => setActiveTab('loan')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'loan'
                    ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Loan Eligibility Leads ({filteredLoanLeads.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredContactLeads.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-gray-600 text-lg">No contact leads found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Priority</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredContactLeads.map((lead, index) => (
                            <motion.tr
                              key={lead.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-3 px-4">
                                <div className="font-semibold text-gray-900">{lead.name}</div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="text-sm text-gray-900">{lead.email}</div>
                                <div className="text-sm text-gray-600">{lead.phone}</div>
                              </td>
                              <td className="py-3 px-4 text-gray-900 max-w-xs truncate">{lead.subject}</td>
                              <td className="py-3 px-4">
                                <select
                                  value={lead.status}
                                  onChange={(e) => updateLeadStatus(lead.id, e.target.value, 'contact')}
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}
                                >
                                  <option value="PENDING">Pending</option>
                                  <option value="CONTACTED">Contacted</option>
                                  <option value="QUALIFIED">Qualified</option>
                                  <option value="CONVERTED">Converted</option>
                                  <option value="REJECTED">Rejected</option>
                                </select>
                              </td>
                              <td className="py-3 px-4">
                                <select
                                  value={lead.priority}
                                  onChange={(e) => updateLeadPriority(lead.id, e.target.value, 'contact')}
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(lead.priority)}`}
                                >
                                  <option value="LOW">Low</option>
                                  <option value="MEDIUM">Medium</option>
                                  <option value="HIGH">High</option>
                                  <option value="URGENT">Urgent</option>
                                </select>
                              </td>
                              <td className="py-3 px-4 text-gray-600 text-sm">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                <button
                                  onClick={() => { setSelectedLead(lead); setShowModal(true); }}
                                  className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
                                >
                                  View Details
                                </button>
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredLoanLeads.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600 text-lg">No loan leads found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Priority</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLoanLeads.map((lead, index) => (
                            <motion.tr
                              key={lead.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-3 px-4">
                                <div className="font-semibold text-gray-900">{lead.name}</div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="text-sm text-gray-900">{lead.email}</div>
                                <div className="text-sm text-gray-600">{lead.phone}</div>
                              </td>
                              <td className="py-3 px-4 text-gray-900 max-w-xs truncate">{lead.subject}</td>
                              <td className="py-3 px-4">
                                <select
                                  value={lead.status}
                                  onChange={(e) => updateLeadStatus(lead.id, e.target.value, 'loan')}
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}
                                >
                                  <option value="PENDING">Pending</option>
                                  <option value="UNDER_REVIEW">Under Review</option>
                                  <option value="APPROVED">Approved</option>
                                  <option value="REJECTED">Rejected</option>
                                  <option value="DISBURSED">Disbursed</option>
                                </select>
                              </td>
                              <td className="py-3 px-4">
                                <select
                                  value={lead.priority}
                                  onChange={(e) => updateLeadPriority(lead.id, e.target.value, 'loan')}
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(lead.priority)}`}
                                >
                                  <option value="LOW">Low</option>
                                  <option value="MEDIUM">Medium</option>
                                  <option value="HIGH">High</option>
                                  <option value="URGENT">Urgent</option>
                                </select>
                              </td>
                              <td className="py-3 px-4 text-gray-600 text-sm">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                <button
                                  onClick={() => { setSelectedLead(lead); setShowModal(true); }}
                                  className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
                                >
                                  View Details
                                </button>
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
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Name</label>
                <p className="text-lg text-gray-900">{selectedLead.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Email</label>
                <p className="text-lg text-gray-900">{selectedLead.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Phone</label>
                <p className="text-lg text-gray-900">{selectedLead.phone}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Subject</label>
                <p className="text-lg text-gray-900">{selectedLead.subject}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Message</label>
                <p className="text-gray-900">{selectedLead.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Status</label>
                  <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${getStatusColor(selectedLead.status)}`}>
                    {selectedLead.status.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Priority</label>
                  <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${getPriorityColor(selectedLead.priority)}`}>
                    {selectedLead.priority}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Created At</label>
                <p className="text-gray-900">{new Date(selectedLead.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-4">
              <a
                href={`mailto:${selectedLead.email}`}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-center font-semibold"
              >
                Send Email
              </a>
              <a
                href={`tel:${selectedLead.phone}`}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-semibold"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
