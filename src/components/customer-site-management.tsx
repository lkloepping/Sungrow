import { useState, useMemo } from 'react'
import { Users, MapPin, Package, AlertTriangle, CheckCircle, XCircle, ArrowRight, Building2, Map, Calendar } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockCustomers, mockDevices, mockDeployments, Customer, Site, Device, mockSites, mockProjects } from '@/data/mockData'
import SiteMapWrapper from './site-map-wrapper'
import DeploymentPlanning from './deployment-planning'

export default function CustomerSiteManagement() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(mockCustomers[0])
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'planning'>('overview')

  const getCustomerDeviceCount = (customerId: string) => {
    return mockDevices.filter(d => d.customerId === customerId).length
  }

  const getCustomerSiteCount = (customerId: string) => {
    const customer = mockCustomers.find(c => c.customerId === customerId)
    return Array.isArray(customer?.sites) ? customer.sites.length : 0
  }

  const getCustomerProjects = (customerId: string) => {
    const customer = mockCustomers.find(c => c.customerId === customerId)
    if (!customer || !Array.isArray(customer.projects)) return []
    return customer.projects.map(projectId => mockProjects.find(p => p.projectId === projectId)).filter(Boolean)
  }

  const getCustomerSites = (customerId: string) => {
    const customer = mockCustomers.find(c => c.customerId === customerId)
    if (!customer || !Array.isArray(customer.sites)) return []
    return customer.sites.map(siteId => mockSites.find(s => s.siteId === siteId)).filter(Boolean)
  }

  const getProjectSites = (projectSiteIds: string[]) => {
    if (!Array.isArray(projectSiteIds)) return []
    return projectSiteIds.map(siteId => mockSites.find(s => s.siteId === siteId)).filter(Boolean)
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

  // Get all sites across all customers
  const allSites = useMemo(() => {
    return mockSites
  }, [])

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-50 mb-2">Customer & Site Management</h2>
        <p className="text-slate-400">Monitor customer installations, sites, and device configurations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Site Overview
          </div>
        </button>
        <button
          onClick={() => setActiveTab('planning')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'planning'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Deployment Planning
          </div>
        </button>
      </div>

      {activeTab === 'planning' && <DeploymentPlanning />}

      {activeTab === 'overview' && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Map (1/3) */}
          <div className="lg:w-1/3">
            <Card className="sticky top-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Map className="h-4 w-4 text-blue-500" />
                    Site Locations
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">{allSites.length}</Badge>
                </div>
                <CardDescription className="text-xs">Interactive map of all sites</CardDescription>
              </CardHeader>
              <CardContent>
                <SiteMapWrapper 
                  sites={allSites} 
                  customers={mockCustomers}
                  onSiteClick={(site) => {
                    setSelectedSite(site)
                    const customer = mockCustomers.find(c => c.sites.some(s => s.siteId === site.siteId))
                    if (customer) setSelectedCustomer(customer)
                    // Scroll to site details
                    setTimeout(() => {
                      document.getElementById('selected-site')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                    }, 100)
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Details (2/3) */}
          <div className="flex-1 lg:w-2/3 space-y-4">
            {/* Customer List */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4" />
                  Customers ({mockCustomers.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {mockCustomers.map((customer) => (
                    <button
                      key={customer.customerId}
                      onClick={() => {
                        setSelectedCustomer(customer)
                        setSelectedSite(null)
                      }}
                      className={`w-full text-left p-2 rounded border transition-colors ${
                        selectedCustomer.customerId === customer.customerId
                          ? 'bg-blue-950/50 border-blue-500'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <p className="text-slate-200 font-medium text-xs mb-1">{customer.name}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span>{getCustomerSiteCount(customer.customerId)} sites</span>
                        <span>•</span>
                        <span>{getCustomerDeviceCount(customer.customerId)} devices</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Details */}
            {/* Customer Overview */}
            <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 className="h-4 w-4" />
                  {selectedCustomer.name}
                </CardTitle>
                {selectedCustomer.complianceGaps.filter(gap => gap.status === 'Open').length > 0 && (
                  <Badge variant="warning" className="text-xs">
                    {selectedCustomer.complianceGaps.filter(gap => gap.status === 'Open').length} Gaps
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs">ID: {selectedCustomer.customerId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-950 p-2 rounded">
                  <p className="text-slate-400 text-[10px] mb-0.5">Sites</p>
                  <p className="text-lg font-semibold text-slate-50">{getCustomerSiteCount(selectedCustomer.customerId)}</p>
                </div>
                <div className="bg-slate-950 p-2 rounded">
                  <p className="text-slate-400 text-[10px] mb-0.5">Devices</p>
                  <p className="text-lg font-semibold text-slate-50">{getCustomerDeviceCount(selectedCustomer.customerId)}</p>
                </div>
                <div className="bg-slate-950 p-2 rounded">
                  <p className="text-slate-400 text-[10px] mb-0.5">Projects</p>
                  <p className="text-lg font-semibold text-slate-50">{Array.isArray(selectedCustomer.projects) ? selectedCustomer.projects.length : 0}</p>
                </div>
              </div>

              {/* Compliance Gaps */}
              {selectedCustomer.complianceGaps.length > 0 && (
                <div>
                  <p className="text-slate-400 text-xs mb-1.5">Compliance Gaps</p>
                  <div className="space-y-1.5">
                    {selectedCustomer.complianceGaps.map((gap) => (
                      <div
                        key={gap.gapId}
                        className={`p-2 rounded border flex items-center justify-between ${
                          gap.status === 'Open'
                            ? 'bg-yellow-950/30 border-yellow-500/30'
                            : 'bg-green-950/30 border-green-500/30'
                        }`}
                      >
                        <p className="text-slate-200 text-xs flex-1">{gap.description}</p>
                        <Badge variant={gap.status === 'Open' ? 'warning' : 'success'} className="text-[10px] ml-2">
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
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Projects ({getCustomerProjects(selectedCustomer.customerId).length})</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {getCustomerProjects(selectedCustomer.customerId).map((project) => {
                  if (!project) return null
                  const projectSites = getProjectSites(project.sites)
                  return (
                    <div key={project.projectId} className="bg-slate-950 p-2 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-slate-200 font-medium text-sm">{project.name}</p>
                        <Badge variant="outline" className="text-[10px]">{projectSites.length} Sites</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {projectSites.map((site) => (
                          <Button
                            key={site.siteId}
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedSite(site)}
                            className="text-[10px] h-6 px-2"
                          >
                            <MapPin className="h-2.5 w-2.5 mr-0.5" />
                            {site.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

            {/* Sites */}
            <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4" />
                Sites ({getCustomerSites(selectedCustomer.customerId).length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1.5">
                {getCustomerSites(selectedCustomer.customerId).map((site) => {
                  const devices = getSiteDevices(site.siteId)
                  return (
                    <div
                      key={site.siteId}
                      className={`p-2 rounded border transition-colors cursor-pointer ${
                        selectedSite?.siteId === site.siteId 
                          ? 'bg-blue-950/30 border-blue-500' 
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                      onClick={() => setSelectedSite(site)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-slate-200 font-medium text-sm">{site.name}</p>
                          <p className="text-slate-400 text-[10px] mt-0.5">{site.location.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">{devices.length} dev</Badge>
                          {getStatusBadge(site.status)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

            {/* Selected Site Details */}
            {selectedSite && (
              <Card className="border-blue-500/50" id="selected-site">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    {selectedSite.name}
                  </CardTitle>
                  {getStatusBadge(selectedSite.status)}
                </div>
                <CardDescription className="text-xs">ID: {selectedSite.siteId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {/* Location Details */}
                <div className="bg-slate-950 p-2 rounded">
                  <p className="text-slate-400 text-xs mb-1">Location</p>
                  <p className="text-slate-200 text-xs">{selectedSite.location.address}</p>
                  {selectedSite.location.substation && (
                    <p className="text-slate-400 text-[10px] mt-0.5">Substation: {selectedSite.location.substation}</p>
                  )}
                </div>

                {/* Devices at Site */}
                <div>
                  <p className="text-slate-400 text-xs mb-2">Devices ({getSiteDevices(selectedSite.siteId).length})</p>
                  <div className="space-y-2">
                    {getSiteDevices(selectedSite.siteId).map((device) => {
                      const deployments = getDeviceDeployments(device.deviceId)
                      const latestDeployment = deployments.length > 0 
                        ? deployments.sort((a, b) => new Date(b.deploymentTimestamp).getTime() - new Date(a.deploymentTimestamp).getTime())[0]
                        : null

                      return (
                        <div key={device.deviceId} className="bg-slate-950 p-2 rounded border border-slate-800">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                              <Package className="h-3 w-3 text-blue-500" />
                              <div>
                                <p className="text-slate-200 font-medium text-xs">{device.model}</p>
                                <p className="text-slate-400 text-[10px]">S/N: {device.serialNumber}</p>
                              </div>
                            </div>
                            <Badge variant={device.status === 'Active' ? 'success' : 'outline'} className="text-[10px]">
                              {device.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-2">
                            <div>
                              <p className="text-slate-500">Firmware</p>
                              <p className="text-slate-300">{device.currentFirmware}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Installed</p>
                              <p className="text-slate-300">{new Date(device.installDate).toLocaleDateString()}</p>
                            </div>
                          </div>

                          {latestDeployment && (
                            <div className="bg-blue-950/30 border border-blue-500/30 rounded p-1.5">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-blue-400 text-[10px] font-medium">Latest Deploy</p>
                                <Badge variant={latestDeployment.pendingUpgrade ? 'warning' : 'success'} className="text-[9px] h-4">
                                  {latestDeployment.pendingUpgrade ? 'Pending' : 'Current'}
                                </Badge>
                              </div>
                              <p className="text-slate-300 text-[10px]">{new Date(latestDeployment.deploymentTimestamp).toLocaleDateString()} by {latestDeployment.executedBy.name}</p>
                              {latestDeployment.deploymentAnomalies.length > 0 && (
                                <div className="mt-1 flex items-center gap-0.5 text-[10px] text-red-400">
                                  <AlertTriangle className="h-2.5 w-2.5" />
                                  {latestDeployment.deploymentAnomalies.length} anomalies
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
      )}
    </div>
  )
}

