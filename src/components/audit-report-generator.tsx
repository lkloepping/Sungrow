import { useState } from 'react'
import { FileCheck, Download, Calendar, Share2, Package, FlaskConical, KeyRound, Rocket, CheckCircle, ArrowRight, MapPin, Users, Shield, AlertTriangle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { chainOfCustodyPhases, mockDeployments, mockComplianceRecords, mockCustomers, mockSites, mockReleases } from '@/data/mockData'
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
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-50 mb-1">Audit Report Generator</h2>
        <p className="text-slate-400 text-sm">Compliance Officer tool for tamper-proof Chain of Custody and PDF report generation</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Content - 2/3 width */}
        <div className="flex-1 lg:w-2/3 space-y-4">
          {/* 4-Phase Summary Cards at Top */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {chainOfCustodyPhases.map((phase) => {
              const Icon = phaseIcons[phase.icon as keyof typeof phaseIcons] || Package
              const colors = phaseColors[phase.color]
              
              return (
                <Card key={phase.phase} className={`${colors.border} border`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className={`${colors.bg} ${colors.border} border rounded p-1.5`}>
                        <Icon className={`h-3 w-3 ${colors.text}`} />
                      </div>
                      {phase.status === 'verified' && (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                    <CardTitle className="text-xs">{phase.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-1">
                    <div>
                      <p className="text-slate-400 text-[9px]">Identity</p>
                      <p className="text-slate-200 text-[10px] truncate">{phase.identity}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[9px]">Hash</p>
                      <p className="text-slate-300 text-[9px] font-mono truncate">{phase.packageHash.substring(0, 12)}...</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Detailed Flow Diagram */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Chain of Custody Flow</CardTitle>
              <CardDescription className="text-xs">Complete cryptographic verification trail</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
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

          {/* Deployment History */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Rocket className="h-4 w-4" />
                  Deployment History
                </CardTitle>
                <Badge variant="secondary" className="text-xs">{mockDeployments.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deployment ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Release</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Authorized By</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDeployments
                .sort((a, b) => new Date(b.deploymentTimestamp).getTime() - new Date(a.deploymentTimestamp).getTime())
                .slice(0, 10)
                .map((deployment) => {
                  const customer = mockCustomers.find(c => c.customerId === deployment.customerId)
                  const site = mockSites.find(s => s.siteId === deployment.siteId)
                  const release = mockReleases.find(r => r.releaseId === deployment.releaseId)
                  
                  return (
                    <TableRow key={deployment.deploymentId}>
                      <TableCell className="font-medium text-xs">{deployment.deploymentId}</TableCell>
                      <TableCell>{customer?.name}</TableCell>
                      <TableCell>{site?.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{release?.version}</Badge>
                      </TableCell>
                      <TableCell>{deployment.unitsDeployed}</TableCell>
                      <TableCell className="text-xs text-slate-400">
                        {new Date(deployment.deploymentTimestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">{deployment.authorizedBy.name}</TableCell>
                      <TableCell>
                        {deployment.pendingUpgrade ? (
                          <Badge variant="warning">Pending Upgrade</Badge>
                        ) : deployment.deploymentAnomalies.length > 0 ? (
                          <Badge variant="destructive">Has Anomalies</Badge>
                        ) : (
                          <Badge variant="success">Complete</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

          {/* Compliance Records */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="h-4 w-4" />
                  Compliance Evidence
                </CardTitle>
                <Badge variant="success" className="text-xs">{mockComplianceRecords.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {mockComplianceRecords.map((record) => (
                  <div key={record.recordId} className="bg-slate-900/50 border border-slate-800 rounded p-2">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-1.5 flex-1">
                        <Badge variant="outline" className="text-[10px]">{record.type}</Badge>
                        <Badge variant="success" className="text-[10px]">Compliant</Badge>
                      </div>
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    </div>
                    <p className="text-slate-300 text-xs">{record.evidence}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deployment Anomalies */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Deployment Anomalies
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {mockDeployments
                  .filter(d => d.deploymentAnomalies.length > 0)
                  .map((deployment) => {
                    const customer = mockCustomers.find(c => c.customerId === deployment.customerId)
                    const site = mockSites.find(s => s.siteId === deployment.siteId)
                    
                    return (
                      <div key={deployment.deploymentId} className="bg-yellow-950/30 border border-yellow-500/30 rounded p-2">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-slate-200 font-medium text-xs">{customer?.name} - {site?.name}</p>
                          <Badge variant="warning" className="text-[10px]">{deployment.deploymentAnomalies.length}</Badge>
                        </div>
                        <div className="space-y-1">
                          {deployment.deploymentAnomalies.map((anomaly) => (
                            <div key={anomaly.anomalyId} className="bg-slate-950 p-1.5 rounded flex items-start gap-1">
                              <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <p className="text-slate-200 text-[10px]">{anomaly.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                {mockDeployments.filter(d => d.deploymentAnomalies.length > 0).length === 0 && (
                  <div className="bg-green-950/30 border border-green-500/30 rounded p-3 text-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-1" />
                    <p className="text-green-400 text-xs font-medium">No Anomalies Detected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - 1/3 width */}
        <div className="lg:w-1/3 space-y-4">
          {/* Report Configuration */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Report Configuration</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div>
                <label className="text-slate-300 text-xs mb-1.5 block">Date Range</label>
                <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="text-xs">
                  <option value="last-7-days">Last 7 Days</option>
                  <option value="last-30-days">Last 30 Days</option>
                  <option value="last-90-days">Last 90 Days</option>
                  <option value="custom">Custom Range</option>
                </Select>
              </div>
              <div>
                <label className="text-slate-300 text-xs mb-1.5 block">Customer</label>
                <Select value={customer} onChange={(e) => setCustomer(e.target.value)} className="text-xs">
                  <option value="all">All Customers</option>
                  <option value="acme">Acme Corp</option>
                  <option value="tech">Tech Industries</option>
                  <option value="global">Global Systems</option>
                </Select>
              </div>
              <div>
                <label className="text-slate-300 text-xs mb-1.5 block">Report Type</label>
                <Select value={reportType} onChange={(e) => setReportType(e.target.value)} className="text-xs">
                  <option value="compliance">Compliance</option>
                  <option value="security">Security</option>
                  <option value="inventory">Inventory</option>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Report Summary Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Report Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 bg-slate-900/50 rounded border border-slate-800">
                  <p className="text-slate-400 text-[10px] mb-0.5">Deployments</p>
                  <p className="text-lg font-semibold text-slate-50">{mockDeployments.length}</p>
                </div>
                <div className="p-2 bg-slate-900/50 rounded border border-slate-800">
                  <p className="text-slate-400 text-[10px] mb-0.5">Records</p>
                  <p className="text-lg font-semibold text-green-500">{mockComplianceRecords.length}</p>
                </div>
                <div className="p-2 bg-slate-900/50 rounded border border-slate-800">
                  <p className="text-slate-400 text-[10px] mb-0.5">Verified</p>
                  <p className="text-lg font-semibold text-blue-500">4/4</p>
                </div>
                <div className="p-2 bg-slate-900/50 rounded border border-slate-800">
                  <p className="text-slate-400 text-[10px] mb-0.5">Anomalies</p>
                  <p className="text-lg font-semibold text-yellow-500">
                    {mockDeployments.filter(d => d.deploymentAnomalies.length > 0).length}
                  </p>
                </div>
              </div>
              <div className="p-2 bg-green-950/30 border border-green-500/30 rounded">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-50 font-semibold text-xs mb-0.5">PASSED</p>
                    <p className="text-slate-300 text-[10px]">
                      All deployments tracked with complete audit trails. {mockComplianceRecords.length} records across {mockDeployments.length} deployments.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Report Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-8 text-xs">
                  <Download className="h-3 w-3 mr-1.5" />
                  Generate PDF
                </Button>
                <Button variant="outline" className="w-full h-8 text-xs">
                  <Download className="h-3 w-3 mr-1.5" />
                  Export CSV
                </Button>
                <Button variant="outline" className="w-full h-8 text-xs">
                  <Calendar className="h-3 w-3 mr-1.5" />
                  Schedule Report
                </Button>
                <Button variant="outline" className="w-full h-8 text-xs">
                  <Share2 className="h-3 w-3 mr-1.5" />
                  Share Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

