import { useState } from 'react'
import { Calendar, Users, MapPin, Truck, AlertTriangle, Clock, CheckCircle, Package, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select } from '@/components/ui/select'
import { mockScheduledUpdates, mockSites, mockCustomers, mockContractors, ScheduledUpdate } from '@/data/mockData'

export default function DeploymentPlanning() {
  const [groupBy, setGroupBy] = useState<'region' | 'route' | 'assignee'>('region')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  // Filter updates
  const filteredUpdates = mockScheduledUpdates.filter(update => {
    if (filterPriority === 'all') return true
    return update.priority === filterPriority
  })

  // Group updates
  const groupedUpdates = filteredUpdates.reduce((acc, update) => {
    let key = ''
    if (groupBy === 'region') key = update.region
    else if (groupBy === 'route') key = update.route || 'Unassigned Route'
    else key = update.assignedTo
    
    if (!acc[key]) acc[key] = []
    acc[key].push(update)
    return acc
  }, {} as Record<string, ScheduledUpdate[]>)

  const getPriorityBadge = (priority: string) => {
    const variants = {
      Critical: 'destructive',
      High: 'warning',
      Medium: 'secondary',
      Low: 'outline'
    }
    return <Badge variant={variants[priority as keyof typeof variants] as any}>{priority}</Badge>
  }

  const getAssignmentBadge = (assignedTo: string) => {
    if (assignedTo === 'Internal') return <Badge variant="success">Internal Team</Badge>
    if (assignedTo === 'Vendor1') return <Badge variant="outline" className="bg-purple-950/30 border-purple-500/50">Vendor 1</Badge>
    if (assignedTo === 'Vendor2') return <Badge variant="outline" className="bg-blue-950/30 border-blue-500/50">Vendor 2</Badge>
    return <Badge variant="destructive">Unassigned</Badge>
  }

  const getDaysUntil = (dateString: string) => {
    const days = Math.ceil((new Date(dateString).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-50 mb-2">Deployment Planning</h2>
        <p className="text-slate-400">Schedule and manage firmware updates for sites over the next 30 days</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content - 2/3 width */}
        <div className="flex-1 lg:w-2/3 space-y-6">

          {/* Filters */}
          <Card>
        <CardHeader>
          <CardTitle>Filters & Grouping</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Group By</label>
              <Select value={groupBy} onChange={(e) => setGroupBy(e.target.value as any)}>
                <option value="region">Region</option>
                <option value="route">Route</option>
                <option value="assignee">Assigned To</option>
              </Select>
            </div>
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Filter by Priority</label>
              <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                <option value="all">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Package className="h-4 w-4 mr-2" />
                Export Schedule
              </Button>
            </div>
          </div>
        </CardContent>
          </Card>

              {/* Grouped Update Schedule */}
          {Object.entries(groupedUpdates).map(([group, updates]) => (
            <Card key={group}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {groupBy === 'region' && <MapPin className="h-5 w-5" />}
                  {groupBy === 'route' && <Truck className="h-5 w-5" />}
                  {groupBy === 'assignee' && <Users className="h-5 w-5" />}
                  {group}
                </CardTitle>
                <CardDescription>
                  {updates.length} scheduled update{updates.length !== 1 ? 's' : ''} • 
                  {updates.reduce((sum, u) => sum + u.estimatedDuration, 0)}h total
                </CardDescription>
              </div>
              <Badge variant="secondary">{updates.length} sites</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Site</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Current → Target</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {updates
                  .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
                  .map((update) => {
                    const site = mockSites.find(s => s.siteId === update.siteId)
                    const customer = mockCustomers.find(c => c.sites.includes(update.siteId))
                    const daysUntil = getDaysUntil(update.scheduledDate)
                    
                    return (
                      <TableRow key={update.updateId}>
                        <TableCell className="font-medium">
                          <div>
                            <p className="text-slate-200">{site?.name}</p>
                            {update.requiresDowntime && (
                              <Badge variant="warning" className="text-xs mt-1">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Downtime Required
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{customer?.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{update.currentFirmware}</Badge>
                            <ArrowRight className="h-3 w-3 text-slate-500" />
                            <Badge variant="success" className="text-xs">{update.targetFirmware}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-slate-200 text-sm">
                              {new Date(update.scheduledDate).toLocaleDateString()}
                            </p>
                            <p className={`text-xs ${daysUntil <= 7 ? 'text-red-400' : 'text-slate-400'}`}>
                              in {daysUntil} days
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getPriorityBadge(update.priority)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {getAssignmentBadge(update.assignedTo)}
                            {update.assignedContractor && (
                              <p className="text-xs text-slate-400">{update.assignedContractor.companyName}</p>
                            )}
                            {update.assignedTeam && (
                              <p className="text-xs text-slate-400">{update.assignedTeam.name}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span className="text-sm">{update.estimatedDuration}h</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            update.status === 'Scheduled' ? 'secondary' :
                            update.status === 'In Progress' ? 'warning' :
                            update.status === 'Completed' ? 'success' : 'destructive'
                          }>
                            {update.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Sidebar - 1/3 width */}
        <div className="lg:w-1/3 space-y-6">
          {/* Combined Stats Widget */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Deployment metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-slate-400 text-xs">Scheduled Updates</p>
                    <p className="text-slate-50 text-xl font-semibold">{filteredUpdates.length}</p>
                  </div>
                </div>
                <Badge variant="secondary">{filteredUpdates.length}</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-950/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-slate-400 text-xs">Critical Priority</p>
                    <p className="text-red-500 text-xl font-semibold">
                      {filteredUpdates.filter(u => u.priority === 'Critical').length}
                    </p>
                  </div>
                </div>
                <Badge variant="destructive">{filteredUpdates.filter(u => u.priority === 'Critical').length}</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-slate-400 text-xs">Vendor Assignments</p>
                    <p className="text-slate-50 text-xl font-semibold">
                      {filteredUpdates.filter(u => u.assignedTo.startsWith('Vendor')).length}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">Vendors</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-slate-400 text-xs">Total Est. Time</p>
                    <p className="text-slate-50 text-xl font-semibold">
                      {filteredUpdates.reduce((sum, u) => sum + u.estimatedDuration, 0)}h
                    </p>
                  </div>
                </div>
                <Badge variant="warning">Hours</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Available Vendors
              </CardTitle>
              <CardDescription>Approved contractors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockContractors.map((contractor, index) => (
                  <div key={contractor.contractorId} className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-slate-200 font-semibold text-sm mb-1">{contractor.companyName}</h3>
                        <p className="text-slate-400 text-xs">{contractor.contactEmail}</p>
                      </div>
                      <Badge variant="outline" className={index === 0 ? 'bg-purple-950/30 border-purple-500/50' : 'bg-blue-950/30 border-blue-500/50'}>
                        V{index + 1}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Regions</p>
                        <div className="flex flex-wrap gap-1">
                          {contractor.regions.map(region => (
                            <Badge key={region} variant="secondary" className="text-xs">{region}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Capabilities</p>
                        <div className="flex flex-wrap gap-1">
                          {contractor.capabilities.slice(0, 2).map(cap => (
                            <Badge key={cap} variant="outline" className="text-xs">{cap}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-green-400 text-xs">Contract Valid</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

