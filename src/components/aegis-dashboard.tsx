import { AlertTriangle, XCircle, Shield, Database, CheckCircle2, Activity, Users, ArrowRight, Package, FlaskConical, KeyRound, Rocket, CheckCircle, MapPin, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { mockAlerts, summaryStats, firmwareDistribution, mockReleases, mockDeployments, mockCustomers, mockSites } from '@/data/mockData'
import ChainOfCustodySidebar from './chain-of-custody-sidebar'

export default function AegisDashboard() {

  const getSeverityIcon = (severity: 'critical' | 'warning') => {
    return severity === 'critical' ? XCircle : AlertTriangle
  }

  const getSeverityColor = (severity: 'critical' | 'warning') => {
    return severity === 'critical' ? 'text-red-500' : 'text-yellow-500'
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Area - 3/4 width on desktop */}
        <div className="flex-1 lg:w-3/4 space-y-6">
          {/* Critical Alerts Widget */}
          <Card className="border-red-500/30 bg-red-950/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <CardTitle>Critical Alerts</CardTitle>
                </div>
                <Badge variant="destructive">{mockAlerts.filter(a => a.severity === 'critical').length} Critical</Badge>
              </div>
              <CardDescription>Behavioral Monitoring & Security Events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAlerts.map((alert) => {
                  const Icon = getSeverityIcon(alert.severity)
                  return (
                    <div
                      key={alert.id}
                      className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex items-start justify-between"
                    >
                      <div className="flex-1 flex items-start gap-3">
                        <Icon className={`h-4 w-4 mt-0.5 ${getSeverityColor(alert.severity)}`} />
                        <div className="flex-1">
                          <p className="text-slate-100">{alert.type}</p>
                          <p className="text-slate-400 text-sm mt-1">{alert.source}</p>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm">{alert.timeAgo}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Three Main Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CVE Status Card */}
            <Card 
              className="hover:border-blue-500/50 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => {
                // Navigate to vulnerability analysis - handled by parent
                window.dispatchEvent(new CustomEvent('navigate', { detail: 'vulnerability' }))
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Shield className="h-8 w-8 text-orange-500" />
                  <Badge variant="destructive">3 Active</Badge>
                </div>
                <CardTitle>CVE Status</CardTitle>
                <CardDescription>Vulnerability Impact Analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-300">Active Critical CVEs</p>
                    <p className="text-red-500 font-semibold">3</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-300">Impacted Devices</p>
                    <p className="text-orange-500 font-semibold">127</p>
                  </div>
                  <p className="text-blue-400 mt-4 flex items-center gap-1 cursor-pointer hover:underline">
                    View Full Analysis <ArrowRight className="h-4 w-4" />
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Snapshot Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Database className="h-8 w-8 text-blue-500" />
                  <Badge variant="secondary">Live</Badge>
                </div>
                <CardTitle>Inventory Snapshot</CardTitle>
                <CardDescription>Auto-updating metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-300">Total Devices</p>
                      <p className="text-blue-500 font-semibold">{summaryStats.totalDevices.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-slate-300">Customers</p>
                      <p className="text-slate-100 font-semibold">{summaryStats.activeCustomers}</p>
                    </div>
                  </div>
                  <div className="space-y-3 pt-2">
                    {firmwareDistribution.map((dist) => (
                      <div key={dist.version} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-slate-300 text-sm">{dist.version}</p>
                          <p className="text-slate-100 text-sm font-semibold">{dist.percentage}%</p>
                        </div>
                        <Progress value={dist.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Score Card */}
            <Card 
              className="hover:border-blue-500/50 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('navigate', { detail: 'audit' }))
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <Badge variant="warning">{summaryStats.complianceScore}%</Badge>
                </div>
                <CardTitle>Compliance Score</CardTitle>
                <CardDescription>Regulatory compliance status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-800"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(summaryStats.complianceScore / 100) * 351.86} 351.86`}
                        className="text-green-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-green-500 text-xl font-semibold">{summaryStats.complianceScore}%</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-center text-sm">
                    Devices 100% compliant with all regulatory constraints
                  </p>
                  <p className="text-blue-400 flex items-center gap-1 cursor-pointer hover:underline">
                    Generate Audit Report <ArrowRight className="h-4 w-4" />
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Four Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Signed Firmware</p>
                  <p className="text-green-500 text-2xl font-semibold">{summaryStats.signedFirmware.toLocaleString()}</p>
                </div>
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Pending Approval</p>
                  <p className="text-yellow-500 text-2xl font-semibold">{summaryStats.pendingApproval}</p>
                </div>
                <Activity className="h-6 w-6 text-yellow-500" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Active Customers</p>
                  <p className="text-blue-500 text-2xl font-semibold">{summaryStats.activeCustomers}</p>
                </div>
                <Users className="h-6 w-6 text-blue-500" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Security Alerts</p>
                  <p className="text-red-500 text-2xl font-semibold">{summaryStats.securityAlerts}</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </CardContent>
            </Card>
          </div>

          {/* Recent Releases */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-500" />
                  <CardTitle>Recent Releases</CardTitle>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('navigate', { detail: 'releases' }))
                  }}
                >
                  View All
                </Button>
              </div>
              <CardDescription>Latest firmware releases and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockReleases.slice(0, 5).map((release) => (
                  <div
                    key={release.releaseId}
                    className="bg-slate-900/50 border border-slate-800 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{release.version}</Badge>
                          {release.recallStatus ? (
                            <Badge variant="destructive">Recalled</Badge>
                          ) : (
                            <Badge variant="success">Active</Badge>
                          )}
                        </div>
                        <p className="text-slate-400 text-xs">{release.releaseId}</p>
                      </div>
                      <Clock className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-slate-500">Device Type</p>
                        <p className="text-slate-300">{release.deviceType}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Region</p>
                        <p className="text-slate-300">{release.region}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Created</p>
                        <p className="text-slate-300">{new Date(release.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Signatures</p>
                        <p className="text-green-400 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {release.signatures.length}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Deployments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-purple-500" />
                  <CardTitle>Recent Deployments</CardTitle>
                </div>
                <Badge variant="secondary">{mockDeployments.length} Total</Badge>
              </div>
              <CardDescription>Latest firmware deployments to sites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDeployments
                  .sort((a, b) => new Date(b.deploymentTimestamp).getTime() - new Date(a.deploymentTimestamp).getTime())
                  .slice(0, 5)
                  .map((deployment) => {
                    const customer = mockCustomers.find(c => c.customerId === deployment.customerId)
                    const site = mockSites.find(s => s.siteId === deployment.siteId)
                    const release = mockReleases.find(r => r.releaseId === deployment.releaseId)
                    
                    return (
                      <div
                        key={deployment.deploymentId}
                        className="bg-slate-900/50 border border-slate-800 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-slate-200 font-medium">{customer?.name}</p>
                              {deployment.pendingUpgrade ? (
                                <Badge variant="warning">Pending Upgrade</Badge>
                              ) : (
                                <Badge variant="success">Active</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <MapPin className="h-3 w-3" />
                              {site?.name}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                          <div>
                            <p className="text-slate-500">Release</p>
                            <p className="text-slate-300">{release?.version}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Units</p>
                            <p className="text-slate-300">{deployment.unitsDeployed}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Deployed</p>
                            <p className="text-slate-300">{new Date(deployment.deploymentTimestamp).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">By</p>
                            <p className="text-slate-300">{deployment.executedBy.name}</p>
                          </div>
                        </div>
                        {deployment.deploymentAnomalies.length > 0 && (
                          <div className="bg-red-950/30 border border-red-500/30 rounded p-2">
                            <p className="text-red-400 text-xs flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              {deployment.deploymentAnomalies.length} anomalies detected
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - 1/4 width on desktop */}
        <div className="lg:w-1/4 space-y-4">
          <ChainOfCustodySidebar />
        </div>
      </div>
    </div>
  )
}

