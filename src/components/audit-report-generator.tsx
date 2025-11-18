import { useState } from 'react'
import { FileCheck, Download, Calendar, Share2, Package, FlaskConical, KeyRound, Rocket, CheckCircle, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { chainOfCustodyPhases } from '@/data/mockData'
import { ChainOfCustodyPhase } from '@/data/mockData'

const phaseIcons = {
  Package,
  FlaskConical,
  KeyRound,
  Rocket,
}

const phaseColors = {
  blue: {
    bg: 'bg-blue-500/10 dark:bg-blue-950/30',
    border: 'border-blue-500/30 dark:border-blue-500/40',
    text: 'text-blue-500 dark:text-blue-400',
    hex: '#3B82F6',
  },
  purple: {
    bg: 'bg-purple-500/10 dark:bg-purple-950/30',
    border: 'border-purple-500/30 dark:border-purple-500/40',
    text: 'text-purple-500 dark:text-purple-400',
    hex: '#A855F7',
  },
  green: {
    bg: 'bg-green-500/10 dark:bg-green-950/30',
    border: 'border-green-500/30 dark:border-green-500/40',
    text: 'text-green-500 dark:text-green-400',
    hex: '#10B981',
  },
  emerald: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-950/30',
    border: 'border-emerald-500/30 dark:border-emerald-500/40',
    text: 'text-emerald-500 dark:text-emerald-400',
    hex: '#059669',
  },
}

export default function AuditReportGenerator() {
  const [dateRange, setDateRange] = useState('last-30-days')
  const [customer, setCustomer] = useState('all')
  const [reportType, setReportType] = useState('compliance')

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-50 mb-2">Audit Report Generator</h2>
        <p className="text-slate-400">Compliance Officer tool for tamper-proof Chain of Custody and PDF report generation</p>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Configure your audit report parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Date Range</label>
              <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </Select>
            </div>
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Customer</label>
              <Select value={customer} onChange={(e) => setCustomer(e.target.value)}>
                <option value="all">All Customers</option>
                <option value="acme">Acme Corp</option>
                <option value="tech">Tech Industries</option>
                <option value="global">Global Systems</option>
              </Select>
            </div>
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Report Type</label>
              <Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="compliance">Compliance</option>
                <option value="security">Security</option>
                <option value="inventory">Inventory</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Chain of Custody Visualization */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-50 mb-2">Chain of Custody</h3>
          <p className="text-slate-400">Tamper-proof firmware lineage with cryptographic verification</p>
        </div>

        {/* 4-Phase Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {chainOfCustodyPhases.map((phase) => {
            const Icon = phaseIcons[phase.icon as keyof typeof phaseIcons] || Package
            const colors = phaseColors[phase.color]
            
            return (
              <Card key={phase.phase} className={`${colors.border} border-2`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`${colors.bg} ${colors.border} border rounded p-2`}>
                      <Icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    {phase.status === 'verified' && (
                      <Badge variant="success" className="h-5">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        VERIFIED
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base">{phase.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Identity</p>
                    <p className="text-slate-200 text-sm">{phase.identity}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Timestamp</p>
                    <p className="text-slate-300 text-xs">{phase.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Hash Preview</p>
                    <p className="text-slate-300 text-xs font-mono">{phase.packageHash.substring(0, 16)}...</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Detailed Flow Diagram */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Chain of Custody Flow</CardTitle>
            <CardDescription>Complete cryptographic verification trail</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {chainOfCustodyPhases.map((phase, index) => {
                const Icon = phaseIcons[phase.icon as keyof typeof phaseIcons] || Package
                const colors = phaseColors[phase.color]
                const isLast = index === chainOfCustodyPhases.length - 1

                return (
                  <div key={phase.phase} className="relative">
                    {/* Phase Card */}
                    <div className={`${colors.bg} ${colors.border} border-2 rounded-lg p-6 space-y-4`}>
                      {/* Phase Header */}
                      <div className="flex items-start gap-4">
                        <div className={`${colors.bg} ${colors.border} border rounded-lg p-3`}>
                          <Icon className={`h-6 w-6 ${colors.text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`${colors.text} text-lg font-semibold`}>{phase.title}</h4>
                            {phase.status === 'verified' && (
                              <Badge variant="success" className="h-6">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                VALID
                              </Badge>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm">{phase.timestamp}</p>
                        </div>
                      </div>

                      {/* Authorization Identity Section */}
                      <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                        <h5 className="text-slate-50 font-semibold text-sm">Authorization Identity</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <p className="text-slate-400 text-xs mb-1">Email Address</p>
                            <p className="text-slate-200 text-sm">{phase.identity}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs mb-1">Role</p>
                            <p className="text-slate-200 text-sm">{phase.role}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs mb-1">Organization</p>
                            <p className="text-slate-200 text-sm">{phase.organization}</p>
                          </div>
                        </div>
                      </div>

                      {/* Cryptographic Hash & Signature Section */}
                      <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                        <h5 className="text-slate-50 font-semibold text-sm">Cryptographic Verification</h5>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-slate-400 text-xs">Package Hash (SHA-256)</p>
                              <Badge variant="outline" className="text-xs">{phase.hashAlgorithm}</Badge>
                            </div>
                            <p className="text-slate-200 text-xs font-mono bg-slate-950 p-2 rounded break-all">
                              {phase.packageHash}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-slate-400 text-xs">Digital Signature (RSA-2048)</p>
                              <Badge variant="outline" className="text-xs">{phase.signatureAlgorithm}</Badge>
                            </div>
                            <p className="text-slate-200 text-xs font-mono bg-slate-950 p-2 rounded break-all">
                              {phase.digitalSignature.substring(0, 128)}...
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Verification Metadata */}
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h5 className="text-slate-50 font-semibold text-sm mb-2">Verification Metadata</h5>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <p className="text-slate-300 text-sm">{phase.context}</p>
                        </div>
                      </div>
                    </div>

                    {/* Connector Arrow */}
                    {!isLast && (
                      <div className="flex justify-center my-4">
                        <ArrowRight className="h-6 w-6 text-slate-600" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
          <CardDescription>Summary statistics and key findings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Total Devices</p>
              <p className="text-2xl font-semibold text-slate-50">1,847</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Compliance Score</p>
              <p className="text-2xl font-semibold text-green-500">87.5%</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Verified Phases</p>
              <p className="text-2xl font-semibold text-blue-500">4/4</p>
            </div>
          </div>
          <div className="p-4 bg-green-950/30 border border-green-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-slate-50 font-semibold mb-1">Compliance Status: PASSED</p>
                <p className="text-slate-300 text-sm">
                  All devices are 100% compliant with regulatory constraints. Chain of Custody verification is complete and valid.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Report Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Generate PDF Report
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Recurring Report
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

