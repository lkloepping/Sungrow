import { useState } from 'react'
import { Package, CheckCircle, XCircle, AlertTriangle, FileText, Shield, Users, MapPin, Clock, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockReleases, mockDeployments, mockVulnerabilities, mockCustomers, mockSites } from '@/data/mockData'
import { Release } from '@/data/mockData'

export default function ReleaseManagement() {
  const [selectedRelease, setSelectedRelease] = useState<Release>(mockReleases[0])

  const getStatusBadge = (recallStatus: boolean) => {
    if (recallStatus) {
      return <Badge variant="destructive">Recalled</Badge>
    }
    return <Badge variant="success">Active</Badge>
  }

  const getReleasDeployments = (releaseId: string) => {
    return mockDeployments.filter(d => d.releaseId === releaseId)
  }

  const getReleaseVulnerabilities = (releaseId: string) => {
    return mockVulnerabilities.filter(v => v.affectedReleases.includes(releaseId))
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-50 mb-2">Release Management</h2>
        <p className="text-slate-400">Firmware release tracking, SBOM/HBOM management, and deployment history</p>
      </div>

      {/* Release List */}
      <Card>
        <CardHeader>
          <CardTitle>Firmware Releases</CardTitle>
          <CardDescription>All firmware releases with status and metadata</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Release ID</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Device Type</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deployments</TableHead>
                <TableHead>Vulnerabilities</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReleases.map((release) => {
                const deployments = getReleasDeployments(release.releaseId)
                const vulnerabilities = getReleaseVulnerabilities(release.releaseId)
                
                return (
                  <TableRow 
                    key={release.releaseId}
                    className={selectedRelease.releaseId === release.releaseId ? 'bg-slate-800' : ''}
                  >
                    <TableCell className="font-medium">{release.releaseId}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{release.version}</Badge>
                    </TableCell>
                    <TableCell>{release.deviceType}</TableCell>
                    <TableCell>{release.region}</TableCell>
                    <TableCell>{getStatusBadge(release.recallStatus)}</TableCell>
                    <TableCell>
                      <span className="text-blue-400">{deployments.length}</span>
                    </TableCell>
                    <TableCell>
                      {vulnerabilities.length > 0 ? (
                        <Badge variant="destructive">{vulnerabilities.length} CVEs</Badge>
                      ) : (
                        <span className="text-green-500">None</span>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {new Date(release.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedRelease(release)}
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

      {/* Release Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Release {selectedRelease.version}
                </CardTitle>
                {getStatusBadge(selectedRelease.recallStatus)}
              </div>
              <CardDescription>{selectedRelease.releaseId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Product Type</p>
                  <p className="text-slate-50">{selectedRelease.productType}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Device Type</p>
                  <p className="text-slate-50">{selectedRelease.deviceType}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Region</p>
                  <p className="text-slate-50">{selectedRelease.region}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Created At</p>
                  <p className="text-slate-50">{new Date(selectedRelease.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Reproducible Build Proof</p>
                <p className="text-slate-300 text-sm font-mono bg-slate-950 p-2 rounded">
                  {selectedRelease.reproducibleBuildProof}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Build Provenance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Build Provenance
              </CardTitle>
              <CardDescription>Complete chain from creation to deployment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-slate-300">
                {selectedRelease.buildProvenance.split(' → ').map((step, index, array) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="bg-blue-950 border border-blue-500/30 rounded px-3 py-1.5">
                      <p className="text-sm">{step}</p>
                    </div>
                    {index < array.length - 1 && <ArrowRight className="h-4 w-4 text-slate-600" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cryptographic Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Cryptographic Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-slate-400 text-sm">Package Hashes</p>
                  <Badge variant="outline">SHA-256</Badge>
                </div>
                {selectedRelease.hashes.map((hash, index) => (
                  <p key={index} className="text-slate-300 text-xs font-mono bg-slate-950 p-2 rounded mb-2">
                    {hash}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Signatures ({selectedRelease.signatures.length})</p>
                <div className="space-y-2">
                  {selectedRelease.signatures.map((sig) => (
                    <div key={sig.signatureId} className="bg-slate-950 p-3 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-slate-200 text-sm font-medium">{sig.signedBy.name}</p>
                        <Badge variant="success" className="text-xs">Verified</Badge>
                      </div>
                      <p className="text-slate-400 text-xs">{sig.signedBy.email}</p>
                      <p className="text-slate-500 text-xs mt-1">{new Date(sig.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRelease.testingResults.length > 0 ? (
                <div className="space-y-3">
                  {selectedRelease.testingResults.map((test) => (
                    <div key={test.testId} className="bg-green-950/30 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="success">{test.type}</Badge>
                            <p className="text-slate-200 text-sm font-medium">Tested by {test.testedBy.name}</p>
                          </div>
                          <p className="text-green-400 font-semibold">{test.result}</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-slate-400 text-xs">{new Date(test.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm">No test results available</p>
              )}
            </CardContent>
          </Card>

          {/* Deployments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Deployments ({getReleasDeployments(selectedRelease.releaseId).length})
              </CardTitle>
              <CardDescription>Sites where this release is deployed</CardDescription>
            </CardHeader>
            <CardContent>
              {getReleasDeployments(selectedRelease.releaseId).length > 0 ? (
                <div className="space-y-3">
                  {getReleasDeployments(selectedRelease.releaseId).map((deployment) => {
                    const customer = mockCustomers.find(c => c.customerId === deployment.customerId)
                    const site = mockSites.find(s => s.siteId === deployment.siteId)
                    
                    return (
                      <div key={deployment.deploymentId} className="bg-slate-950 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-slate-200 font-medium">{customer?.name}</p>
                            <p className="text-slate-400 text-sm">{site?.name}</p>
                          </div>
                          <Badge variant={deployment.pendingUpgrade ? 'warning' : 'success'}>
                            {deployment.pendingUpgrade ? 'Pending Upgrade' : 'Active'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-slate-500">Units Deployed</p>
                            <p className="text-slate-300">{deployment.unitsDeployed}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Deployed</p>
                            <p className="text-slate-300">{new Date(deployment.deploymentTimestamp).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Authorized By</p>
                            <p className="text-slate-300">{deployment.authorizedBy.name}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Executed By</p>
                            <p className="text-slate-300">{deployment.executedBy.name}</p>
                          </div>
                        </div>
                        {deployment.deploymentAnomalies.length > 0 && (
                          <div className="mt-3 p-2 bg-red-950/30 border border-red-500/30 rounded">
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
              ) : (
                <p className="text-slate-400 text-sm">No deployments yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* SBOM Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                SBOM
              </CardTitle>
              <CardDescription>Software Bill of Materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-slate-400 text-sm">BOM ID</p>
                  <Badge variant="outline">{selectedRelease.sbom.bomId}</Badge>
                </div>
                <p className="text-slate-400 text-sm mb-2">Components ({selectedRelease.sbom.components.length})</p>
                <div className="space-y-2">
                  {selectedRelease.sbom.components.map((component) => (
                    <div key={component.componentId} className="bg-slate-950 p-2 rounded">
                      <p className="text-slate-200 text-sm font-medium">{component.name}</p>
                      <p className="text-slate-400 text-xs">{component.version}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-3" size="sm">
                  Download Full SBOM
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* HBOM Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                HBOM
              </CardTitle>
              <CardDescription>Hardware Bill of Materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-slate-400 text-sm">BOM ID</p>
                  <Badge variant="outline">{selectedRelease.hbom.bomId}</Badge>
                </div>
                <p className="text-slate-400 text-sm mb-2">Components ({selectedRelease.hbom.components.length})</p>
                <div className="space-y-2">
                  {selectedRelease.hbom.components.map((component) => (
                    <div key={component.componentId} className="bg-slate-950 p-2 rounded">
                      <p className="text-slate-200 text-sm font-medium">{component.name}</p>
                      <p className="text-slate-400 text-xs">{component.version}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-3" size="sm">
                  Download Full HBOM
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Vulnerability Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Vulnerabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getReleaseVulnerabilities(selectedRelease.releaseId).length > 0 ? (
                <div className="space-y-2">
                  {getReleaseVulnerabilities(selectedRelease.releaseId).map((vuln) => (
                    <div key={vuln.vulnerabilityId} className="bg-red-950/30 border border-red-500/30 rounded p-3">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-slate-200 text-sm font-medium">{vuln.cveId}</p>
                        <Badge variant="destructive" className="text-xs">{vuln.severity}</Badge>
                      </div>
                      <p className="text-slate-400 text-xs mb-2">{vuln.title}</p>
                      <p className="text-red-400 text-xs font-semibold">CVSS: {vuln.cvssScore}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-green-950/30 border border-green-500/30 rounded p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-green-400 text-sm font-medium">No Known Vulnerabilities</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Artifacts */}
          <Card>
            <CardHeader>
              <CardTitle>Release Artifacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedRelease.releaseArtifacts.map((artifact) => (
                  <div key={artifact.artifactId} className="flex items-center justify-between bg-slate-950 p-2 rounded">
                    <div>
                      <p className="text-slate-200 text-sm">{artifact.type}</p>
                      <p className="text-slate-500 text-xs">{artifact.artifactId}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
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

