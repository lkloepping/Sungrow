import { useState } from 'react'
import { Users, MapPin, Package, AlertTriangle, CheckCircle, XCircle, ArrowRight, Building2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockCustomers, mockDevices, mockDeployments, Customer, Site, Device } from '@/data/mockData'

export default function CustomerSiteManagement() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(mockCustomers[0])
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)

  const getCustomerDeviceCount = (customerId: string) => {
    return mockDevices.filter(d => d.customerId === customerId).length
  }

  const getCustomerSiteCount = (customerId: string) => {
    const customer = mockCustomers.find(c => c.customerId === customerId)
    return customer?.sites.length || 0
  }

  const getSiteDevices = (siteId: string) => {
    return mockDevices.filter(d => d.siteId === siteId)
  }

  const getDeviceDeployments = (deviceId: string) => {
    return mockDeployments.filter(d => d.deviceId === deviceId)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Up-to-date':
        return <Badge variant="success">Up-to-date</Badge>
      case 'Outdated':
        return <Badge variant="destructive">Outdated</Badge>
      case 'Pending Upgrade':
        return <Badge variant="warning">Pending Upgrade</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-50 mb-2">Customer & Site Management</h2>
        <p className="text-slate-400">Monitor customer installations, sites, and device configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customers ({mockCustomers.length})
            </CardTitle>
            <CardDescription>Select a customer to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockCustomers.map((customer) => (
                <button
                  key={customer.customerId}
                  onClick={() => {
                    setSelectedCustomer(customer)
                    setSelectedSite(null)
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedCustomer.customerId === customer.customerId
                      ? 'bg-blue-950/50 border-blue-500'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-slate-200 font-medium">{customer.name}</p>
                    {customer.complianceGaps.length > 0 && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-slate-500">Sites</p>
                      <p className="text-slate-300">{getCustomerSiteCount(customer.customerId)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Devices</p>
                      <p className="text-slate-300">{getCustomerDeviceCount(customer.customerId)}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-slate-500 text-xs">Projects: {customer.projects.length}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {selectedCustomer.name}
                </CardTitle>
                {selectedCustomer.complianceGaps.filter(gap => gap.status === 'Open').length > 0 && (
                  <Badge variant="warning">
                    {selectedCustomer.complianceGaps.filter(gap => gap.status === 'Open').length} Compliance Gaps
                  </Badge>
                )}
              </div>
              <CardDescription>Customer ID: {selectedCustomer.customerId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Total Sites</p>
                  <p className="text-2xl font-semibold text-slate-50">{getCustomerSiteCount(selectedCustomer.customerId)}</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Total Devices</p>
                  <p className="text-2xl font-semibold text-slate-50">{getCustomerDeviceCount(selectedCustomer.customerId)}</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Projects</p>
                  <p className="text-2xl font-semibold text-slate-50">{selectedCustomer.projects.length}</p>
                </div>
              </div>

              {/* Configuration State */}
              <div>
                <p className="text-slate-400 text-sm mb-2">Current Configuration State</p>
                <div className="bg-slate-950 p-3 rounded">
                  <p className="text-slate-200 text-sm">{selectedCustomer.currentConfigurationState}</p>
                </div>
              </div>

              {/* Compliance Gaps */}
              {selectedCustomer.complianceGaps.length > 0 && (
                <div>
                  <p className="text-slate-400 text-sm mb-2">Compliance Gaps</p>
                  <div className="space-y-2">
                    {selectedCustomer.complianceGaps.map((gap) => (
                      <div
                        key={gap.gapId}
                        className={`p-3 rounded border ${
                          gap.status === 'Open'
                            ? 'bg-yellow-950/30 border-yellow-500/30'
                            : 'bg-green-950/30 border-green-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-slate-200 text-sm">{gap.description}</p>
                          </div>
                          {gap.status === 'Open' ? (
                            <XCircle className="h-4 w-4 text-yellow-500 ml-2" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                          )}
                        </div>
                        <Badge variant={gap.status === 'Open' ? 'warning' : 'success'} className="mt-2 text-xs">
                          {gap.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Projects ({selectedCustomer.projects.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedCustomer.projects.map((project) => (
                  <div key={project.projectId} className="bg-slate-950 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate-200 font-medium">{project.name}</p>
                      <Badge variant="outline">{project.sites.length} Sites</Badge>
                    </div>
                    <p className="text-slate-400 text-xs">Project ID: {project.projectId}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.sites.map((site) => (
                        <Button
                          key={site.siteId}
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedSite(site)}
                          className="text-xs"
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          {site.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sites */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Sites ({selectedCustomer.sites.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Site Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Devices</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCustomer.sites.map((site) => {
                    const devices = getSiteDevices(site.siteId)
                    return (
                      <TableRow
                        key={site.siteId}
                        className={selectedSite?.siteId === site.siteId ? 'bg-slate-800' : ''}
                      >
                        <TableCell className="font-medium">{site.name}</TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <p className="text-slate-300">{site.location.address}</p>
                            {site.location.substation && (
                              <p className="text-slate-500">{site.location.substation}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{devices.length} devices</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(site.status)}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedSite(site)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Selected Site Details */}
          {selectedSite && (
            <Card className="border-blue-500/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    {selectedSite.name}
                  </CardTitle>
                  {getStatusBadge(selectedSite.status)}
                </div>
                <CardDescription>Site ID: {selectedSite.siteId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Location Details */}
                <div className="bg-slate-950 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-2">Location Details</p>
                  <div className="space-y-1">
                    <p className="text-slate-200 text-sm">{selectedSite.location.address}</p>
                    <p className="text-slate-400 text-xs">GPS: {selectedSite.location.gpsCoordinates}</p>
                    {selectedSite.location.substation && (
                      <p className="text-slate-400 text-xs">Substation: {selectedSite.location.substation}</p>
                    )}
                  </div>
                </div>

                {/* Devices at Site */}
                <div>
                  <p className="text-slate-400 text-sm mb-3">Devices ({getSiteDevices(selectedSite.siteId).length})</p>
                  <div className="space-y-3">
                    {getSiteDevices(selectedSite.siteId).map((device) => {
                      const deployments = getDeviceDeployments(device.deviceId)
                      const latestDeployment = deployments.length > 0 
                        ? deployments.sort((a, b) => new Date(b.deploymentTimestamp).getTime() - new Date(a.deploymentTimestamp).getTime())[0]
                        : null

                      return (
                        <div key={device.deviceId} className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Package className="h-4 w-4 text-blue-500" />
                                <p className="text-slate-200 font-medium">{device.model}</p>
                              </div>
                              <p className="text-slate-400 text-xs">S/N: {device.serialNumber}</p>
                            </div>
                            <Badge variant={device.status === 'Active' ? 'success' : 'outline'}>
                              {device.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                            <div>
                              <p className="text-slate-500">Firmware Version</p>
                              <p className="text-slate-300">{device.currentFirmware}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Hardware Revision</p>
                              <p className="text-slate-300">{device.hardwareRevision}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Installed</p>
                              <p className="text-slate-300">{new Date(device.installDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Last Check-in</p>
                              <p className="text-slate-300">{new Date(device.lastCheckIn).toLocaleDateString()}</p>
                            </div>
                          </div>

                          {latestDeployment && (
                            <div className="bg-blue-950/30 border border-blue-500/30 rounded p-3">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-blue-400 text-xs font-medium">Latest Deployment</p>
                                <Badge variant={latestDeployment.pendingUpgrade ? 'warning' : 'success'} className="text-xs">
                                  {latestDeployment.pendingUpgrade ? 'Upgrade Pending' : 'Current'}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <p className="text-slate-400">Release</p>
                                  <p className="text-slate-200">{latestDeployment.releaseId}</p>
                                </div>
                                <div>
                                  <p className="text-slate-400">Deployed</p>
                                  <p className="text-slate-200">{new Date(latestDeployment.deploymentTimestamp).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-slate-400">Authorized By</p>
                                  <p className="text-slate-200">{latestDeployment.authorizedBy.name}</p>
                                </div>
                                <div>
                                  <p className="text-slate-400">Executed By</p>
                                  <p className="text-slate-200">{latestDeployment.executedBy.name}</p>
                                </div>
                              </div>
                              {latestDeployment.deploymentAnomalies.length > 0 && (
                                <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
                                  <AlertTriangle className="h-3 w-3" />
                                  {latestDeployment.deploymentAnomalies.length} anomalies detected
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

