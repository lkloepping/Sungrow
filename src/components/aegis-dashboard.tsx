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
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <CardTitle className="text-base">Critical Alerts</CardTitle>
                </div>
                <Badge variant="destructive" className="text-xs">{mockAlerts.filter(a => a.severity === 'critical').length} Critical</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1.5">
                {mockAlerts.map((alert) => {
                  const Icon = getSeverityIcon(alert.severity)
                  return (
                    <div
                      key={alert.id}
                      className="bg-slate-900/50 border border-slate-800 rounded p-2 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Icon className={`h-3 w-3 ${getSeverityColor(alert.severity)}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-100 text-xs truncate">{alert.type}</p>
                          <p className="text-slate-400 text-[10px] truncate">{alert.source}</p>
                        </div>
                      </div>
                      <p className="text-slate-400 text-[10px] ml-2 flex-shrink-0">{alert.timeAgo}</p>
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

          {/* Recent Activity - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent Releases */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-500" />
                    <CardTitle className="text-base">Recent Releases</CardTitle>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('navigate', { detail: 'releases' }))
                    }}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {mockReleases.slice(0, 4).map((release) => (
                    <div
                      key={release.releaseId}
                      className="bg-slate-900/50 border border-slate-800 rounded p-2"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <Badge variant="outline" className="text-[10px]">{release.version}</Badge>
                          {release.recallStatus ? (
                            <Badge variant="destructive" className="text-[10px]">Recalled</Badge>
                          ) : (
                            <Badge variant="success" className="text-[10px]">Active</Badge>
                          )}
                        </div>
                        <Clock className="h-3 w-3 text-slate-500" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{release.deviceType}</span>
                        <span>•</span>
                        <span>{release.region}</span>
                        <span>•</span>
                        <span className="text-green-400 flex items-center gap-0.5">
                          <CheckCircle className="h-2.5 w-2.5" />
                          {release.signatures.length}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Deployments */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-purple-500" />
                    <CardTitle className="text-base">Recent Deployments</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{mockDeployments.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {mockDeployments
                    .sort((a, b) => new Date(b.deploymentTimestamp).getTime() - new Date(a.deploymentTimestamp).getTime())
                    .slice(0, 4)
                    .map((deployment) => {
                      const customer = mockCustomers.find(c => c.customerId === deployment.customerId)
                      const site = mockSites.find(s => s.siteId === deployment.siteId)
                      const release = mockReleases.find(r => r.releaseId === deployment.releaseId)
                      
                      return (
                        <div
                          key={deployment.deploymentId}
                          className="bg-slate-900/50 border border-slate-800 rounded p-2"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-slate-200 font-medium text-xs truncate flex-1">{customer?.name}</p>
                            {deployment.pendingUpgrade ? (
                              <Badge variant="warning" className="text-[10px] ml-2">Pending</Badge>
                            ) : deployment.deploymentAnomalies.length > 0 ? (
                              <Badge variant="destructive" className="text-[10px] ml-2">Issues</Badge>
                            ) : (
                              <Badge variant="success" className="text-[10px] ml-2">Active</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <MapPin className="h-2.5 w-2.5" />
                            <span className="truncate flex-1">{site?.name}</span>
                            <span>•</span>
                            <span>{release?.version}</span>
                            <span>•</span>
                            <span>{deployment.unitsDeployed}u</span>
                          </div>
                          {deployment.deploymentAnomalies.length > 0 && (
                            <div className="bg-red-950/30 border border-red-500/30 rounded p-1 mt-1">
                              <p className="text-red-400 text-[10px] flex items-center gap-0.5">
                                <AlertTriangle className="h-2.5 w-2.5" />
                                {deployment.deploymentAnomalies.length} anomalies
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
        </div>

        {/* Right Sidebar - 1/4 width on desktop */}
        <div className="lg:w-1/4 space-y-4">
          {/* Quick Stats - 2x2 Grid */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2">
                {/* Signed Firmware */}
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-slate-400 text-[10px] mb-0.5">Signed FW</p>
                  <p className="text-green-500 text-lg font-semibold">{summaryStats.signedFirmware.toLocaleString()}</p>
                </div>

                {/* Pending Approval */}
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <Activity className="h-4 w-4 text-yellow-500" />
                  </div>
                  <p className="text-slate-400 text-[10px] mb-0.5">Pending</p>
                  <p className="text-yellow-500 text-lg font-semibold">{summaryStats.pendingApproval}</p>
                </div>

                {/* Active Customers */}
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <Users className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-slate-400 text-[10px] mb-0.5">Customers</p>
                  <p className="text-blue-500 text-lg font-semibold">{summaryStats.activeCustomers}</p>
                </div>

                {/* Security Alerts */}
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-slate-400 text-[10px] mb-0.5">Alerts</p>
                  <p className="text-red-500 text-lg font-semibold">{summaryStats.securityAlerts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <ChainOfCustodySidebar />
        </div>
      </div>
    </div>
  )
}

