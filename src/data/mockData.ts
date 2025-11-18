// Mock data for the Aegis application aligned with schema.md

// ============================================================================
// TYPE DEFINITIONS (Aligned with schema.md)
// ============================================================================

// Basic Types
export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  region: string;
}

export interface Team {
  teamId: string;
  name: string;
  members: User[];
}

export interface Contractor {
  contractorId: string;
  companyName: string;
  contractValidity: boolean;
  regions: string[];
  capabilities: string[];
  contactEmail: string;
}

export interface ScheduledUpdate {
  updateId: string;
  siteId: string;
  currentFirmware: string;
  targetFirmware: string;
  scheduledDate: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  region: string;
  route?: string;
  assignedTo: 'Internal' | 'Vendor1' | 'Vendor2' | 'Unassigned';
  assignedTeam?: Team;
  assignedContractor?: Contractor;
  estimatedDuration: number; // hours
  requiresDowntime: boolean;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Delayed';
  dependencies?: string[]; // other updateIds
}

export interface Location {
  locationId: string;
  gpsCoordinates: string;
  address: string;
  substation?: string;
}

export interface Component {
  componentId: string;
  name: string;
  version: string;
}

export interface SBOM {
  bomId: string;
  type: 'SBOM' | 'HBOM';
  components: Component[];
}

export interface Signature {
  signatureId: string;
  signedBy: User;
  timestamp: string;
  hash: string;
}

export interface Attestation {
  attestationId: string;
  chain: Signature[];
  metadata: string;
}

export interface TestResult {
  testId: string;
  releaseId: string;
  testedBy: User;
  type: 'Internal' | 'ThirdParty';
  result: string;
  timestamp: string;
}

export interface Artifact {
  artifactId: string;
  type: 'FirmwareReleaseModel' | 'SBOM' | 'HBOM' | 'PatchNotes' | 'BuildProof' | 'AttestationChain' | 'SignatureMetadata' | 'TestingSummary' | 'ComplianceMetadata' | 'ReleaseManifest';
  content: string;
}

export interface ComplianceRecord {
  recordId: string;
  type: 'NERC CIP-010' | 'NERC CIP-013' | 'NIST SSDF' | 'EO 14028';
  evidence: string;
}

export interface Anomaly {
  anomalyId: string;
  description: string;
  detectedBy: User;
  timestamp: string;
}

export interface Vulnerability {
  vulnerabilityId: string;
  cveId: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvssScore: number;
  description: string;
  affectedReleases: string[]; // releaseIds
  affectedCustomers: string[]; // customerIds
  affectedSites: string[]; // siteIds
  affectedDevices: string[]; // deviceIds
  sbomReference?: string; // bomId
  zeroDay: boolean;
  requiresRetesting: boolean;
  publishedDate: string;
}

export interface Release {
  releaseId: string;
  version: string;
  productType: string;
  deviceType: string;
  region: string;
  buildProvenance: string;
  hashes: string[];
  signatures: Signature[];
  sbom: SBOM;
  hbom: SBOM;
  attestationMetadata: Attestation;
  reproducibleBuildProof: string;
  testingResults: TestResult[];
  recallStatus: boolean;
  vulnerabilityStatus: Vulnerability[];
  releaseArtifacts: Artifact[];
  releaseManifest: Artifact;
  createdAt: string;
}

export interface Device {
  deviceId: string;
  serialNumber: string;
  type: string;
  firmwareVersion: string;
  status: 'Supported' | 'Unsupported' | 'Aging';
  complianceStatus: boolean;
  customerId: string;
  siteId: string;
}

export interface Site {
  siteId: string;
  name: string;
  location: Location;
  devices: string[]; // deviceIds
  status: 'Up-to-date' | 'Outdated' | 'Pending Upgrade';
  customerId: string;
}

export interface Project {
  projectId: string;
  name: string;
  customerId: string;
  sites: string[]; // siteIds
}

export interface ComplianceGap {
  gapId: string;
  description: string;
  status: 'Open' | 'Closed';
}

export interface Customer {
  customerId: string;
  name: string;
  projects: string[]; // projectIds
  sites: string[]; // siteIds
  devices: string[]; // deviceIds
  currentConfigurationState: string;
  complianceGaps: ComplianceGap[];
}

export interface Deployment {
  deploymentId: string;
  releaseId: string;
  customerId: string;
  siteId: string;
  deviceIds: string[];
  unitsDeployed: number;
  pendingUpgrade: boolean;
  fieldTeam: Team;
  usSigned: boolean;
  deploymentTimestamp: string;
  authorizedBy: User;
  executedBy: User;
  deploymentLocation: Location;
  deploymentAnomalies: Anomaly[];
}

export interface DownloadRequest {
  requestId: string;
  requestor: User;
  role: string;
  team: Team;
  region: string;
  timestamp: string;
  customerId: string;
  projectId?: string;
  siteId?: string;
  deviceSerialNumbers: string[];
  quantity: number;
  purpose: 'Install' | 'Upgrade' | 'Rollback' | 'Replacement';
  customerApproval: boolean;
  complianceValidation: boolean;
  attestation: Attestation;
  contractor?: Contractor;
  contractValidity?: boolean;
  previousDeployments: string[]; // deploymentIds
}

export interface ChainOfCustody {
  chainId: string;
  releaseId: string;
  createdBy: User;
  signedBy: User;
  uploadedBy: User;
  touchedBy: User[];
  testedBy: User[];
  testResults: TestResult[];
  deploymentLocation: Location;
  deploymentAnomalies: Anomaly[];
  complianceEvidence: ComplianceRecord[];
}

// Legacy interfaces for backward compatibility
export interface Alert {
  id: string;
  type: string;
  severity: 'critical' | 'warning';
  source: string;
  timestamp: string;
  timeAgo: string;
}

export interface CVE {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvssScore: number;
  description: string;
  affectedVersions: string[];
  publishedDate: string;
}

export interface ChainOfCustodyPhase {
  phase: number;
  title: string;
  icon: string;
  identity: string;
  role: string;
  organization: string;
  timestamp: string;
  status: 'verified' | 'pending';
  packageHash: string;
  digitalSignature: string;
  hashAlgorithm: string;
  signatureAlgorithm: string;
  context: string;
  color: 'blue' | 'purple' | 'green' | 'emerald';
}

export interface FirmwareDistribution {
  version: string;
  percentage: number;
  deviceCount: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

// Users
export const mockUsers: User[] = [
  { userId: 'U001', name: 'Alice Johnson', email: 'alice.johnson@aegis.com', role: 'Release Engineer', region: 'HQ' },
  { userId: 'U002', name: 'Bob Smith', email: 'bob.smith@aegis.com', role: 'QA Lead', region: 'HQ' },
  { userId: 'U003', name: 'Carol White', email: 'carol.white@aegis-us.com', role: 'Signing Authority', region: 'US' },
  { userId: 'U004', name: 'David Brown', email: 'david.brown@customer.com', role: 'Deployment Engineer', region: 'US' },
  { userId: 'U005', name: 'Emma Davis', email: 'emma.davis@aegis.com', role: 'Security Analyst', region: 'HQ' },
];

// Teams
export const mockTeams: Team[] = [
  { teamId: 'T001', name: 'Release Engineering', members: [mockUsers[0]] },
  { teamId: 'T002', name: 'Quality Assurance', members: [mockUsers[1]] },
  { teamId: 'T003', name: 'US Deployment', members: [mockUsers[3]] },
];

// Locations
export const mockLocations: Location[] = [
  { locationId: 'L001', gpsCoordinates: '40.7128,-74.0060', address: '123 Power St, New York, NY 10001', substation: 'Manhattan Sub' },
  { locationId: 'L002', gpsCoordinates: '37.7749,-122.4194', address: '456 Energy Ave, San Francisco, CA 94102', substation: 'Bay Area Sub' },
  { locationId: 'L003', gpsCoordinates: '41.8781,-87.6298', address: '789 Electric Rd, Chicago, IL 60601', substation: 'Chicago Central' },
  { locationId: 'L004', gpsCoordinates: '42.3601,-71.0589', address: '321 Grid Blvd, Boston, MA 02101' },
];

// Components (for SBOM)
export const mockComponents: Component[] = [
  { componentId: 'C001', name: 'openssl', version: '1.1.1k' },
  { componentId: 'C002', name: 'busybox', version: '1.33.1' },
  { componentId: 'C003', name: 'linux-kernel', version: '5.10.45' },
  { componentId: 'C004', name: 'u-boot', version: '2021.04' },
  { componentId: 'C005', name: 'dropbear', version: '2020.81' },
];

// SBOMs
export const mockSBOMs: SBOM[] = [
  { bomId: 'SBOM001', type: 'SBOM', components: [mockComponents[0], mockComponents[1], mockComponents[2]] },
  { bomId: 'SBOM002', type: 'SBOM', components: [mockComponents[0], mockComponents[1], mockComponents[2], mockComponents[4]] },
  { bomId: 'HBOM001', type: 'HBOM', components: [mockComponents[3], mockComponents[4]] },
];

// Signatures
export const mockSignatures: Signature[] = [
  {
    signatureId: 'SIG001',
    signedBy: mockUsers[0],
    timestamp: '2024-11-15T09:23:41Z',
    hash: 'a3f8b2c9d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0'
  },
  {
    signatureId: 'SIG002',
    signedBy: mockUsers[1],
    timestamp: '2024-11-15T14:45:22Z',
    hash: 'b4g9c3d0e2f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1'
  },
  {
    signatureId: 'SIG003',
    signedBy: mockUsers[2],
    timestamp: '2024-11-16T08:12:15Z',
    hash: 'c5h0d4e1f3a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a2'
  },
];

// Attestations
export const mockAttestations: Attestation[] = [
  {
    attestationId: 'ATT001',
    chain: [mockSignatures[0], mockSignatures[1], mockSignatures[2]],
    metadata: 'Full attestation chain with HQ creation, QA approval, and US signing'
  },
];

// Test Results
export const mockTestResults: TestResult[] = [
  {
    testId: 'TEST001',
    releaseId: 'REL001',
    testedBy: mockUsers[1],
    type: 'Internal',
    result: 'PASS - All 247 integration tests passed',
    timestamp: '2024-11-15T14:30:00Z'
  },
  {
    testId: 'TEST002',
    releaseId: 'REL001',
    testedBy: mockUsers[1],
    type: 'ThirdParty',
    result: 'PASS - Security audit completed',
    timestamp: '2024-11-15T16:00:00Z'
  },
];

// Artifacts
export const mockArtifacts: Artifact[] = [
  { artifactId: 'ART001', type: 'FirmwareReleaseModel', content: 'firmware-v2.8.1.bin' },
  { artifactId: 'ART002', type: 'SBOM', content: 'sbom-v2.8.1.json' },
  { artifactId: 'ART003', type: 'PatchNotes', content: 'Release notes for v2.8.1' },
  { artifactId: 'ART004', type: 'ReleaseManifest', content: 'manifest-v2.8.1.json' },
];

// Compliance Records
export const mockComplianceRecords: ComplianceRecord[] = [
  { recordId: 'COMP001', type: 'NERC CIP-010', evidence: 'Configuration change management documented' },
  { recordId: 'COMP002', type: 'NERC CIP-013', evidence: 'Supply chain risk assessment completed' },
  { recordId: 'COMP003', type: 'NIST SSDF', evidence: 'Secure software development practices verified' },
  { recordId: 'COMP004', type: 'EO 14028', evidence: 'SBOM provided, attestation chain complete' },
];

// Releases
export const mockReleases: Release[] = [
  {
    releaseId: 'REL001',
    version: 'v2.8.1',
    productType: 'Inverter Firmware',
    deviceType: 'SG110CX',
    region: 'US',
    buildProvenance: 'HQ → QA Testing → US Signing → Customer Deployment',
    hashes: ['a3f8b2c9d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0'],
    signatures: [mockSignatures[0], mockSignatures[1], mockSignatures[2]],
    sbom: mockSBOMs[0],
    hbom: mockSBOMs[2],
    attestationMetadata: mockAttestations[0],
    reproducibleBuildProof: 'Build reproducible with commit hash abc123def456',
    testingResults: mockTestResults,
    recallStatus: false,
    vulnerabilityStatus: [],
    releaseArtifacts: mockArtifacts,
    releaseManifest: mockArtifacts[3],
    createdAt: '2024-11-15T09:00:00Z'
  },
  {
    releaseId: 'REL002',
    version: 'v2.7.5',
    productType: 'Inverter Firmware',
    deviceType: 'SG110CX',
    region: 'US',
    buildProvenance: 'HQ → QA Testing → US Signing → Customer Deployment',
    hashes: ['b4c9d2e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2'],
    signatures: [mockSignatures[0], mockSignatures[1]],
    sbom: mockSBOMs[1],
    hbom: mockSBOMs[2],
    attestationMetadata: mockAttestations[0],
    reproducibleBuildProof: 'Build reproducible with commit hash def789ghi012',
    testingResults: [],
    recallStatus: false,
    vulnerabilityStatus: [],
    releaseArtifacts: [],
    releaseManifest: mockArtifacts[3],
    createdAt: '2024-10-20T09:00:00Z'
  },
  {
    releaseId: 'REL003',
    version: 'v2.6.2',
    productType: 'Inverter Firmware',
    deviceType: 'SG110CX',
    region: 'US',
    buildProvenance: 'HQ → QA Testing → US Signing → Customer Deployment',
    hashes: ['c5d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8'],
    signatures: [mockSignatures[0]],
    sbom: mockSBOMs[0],
    hbom: mockSBOMs[2],
    attestationMetadata: mockAttestations[0],
    reproducibleBuildProof: 'Build reproducible with commit hash ghi345jkl678',
    testingResults: [],
    recallStatus: true,
    vulnerabilityStatus: [],
    releaseArtifacts: [],
    releaseManifest: mockArtifacts[3],
    createdAt: '2024-09-10T09:00:00Z'
  },
];

// Customers
export const mockCustomers: Customer[] = [
  {
    customerId: 'CUST001',
    name: 'Acme Corp',
    projects: ['PROJ001'],
    sites: ['SITE001', 'SITE004'],
    devices: ['DEV001', 'DEV004', 'DEV007'],
    currentConfigurationState: 'Mixed versions deployed',
    complianceGaps: []
  },
  {
    customerId: 'CUST002',
    name: 'Tech Industries',
    projects: ['PROJ002'],
    sites: ['SITE002', 'SITE005'],
    devices: ['DEV002', 'DEV005', 'DEV008'],
    currentConfigurationState: 'Upgrade in progress',
    complianceGaps: [{ gapId: 'GAP001', description: 'NERC CIP-010 documentation pending', status: 'Open' }]
  },
  {
    customerId: 'CUST003',
    name: 'Global Systems',
    projects: ['PROJ003'],
    sites: ['SITE003', 'SITE006'],
    devices: ['DEV003', 'DEV006'],
    currentConfigurationState: 'All up-to-date',
    complianceGaps: []
  },
];

// Sites
export const mockSites: Site[] = [
  { siteId: 'SITE001', name: 'Manhattan Power Plant', location: mockLocations[0], devices: ['DEV001'], status: 'Outdated', customerId: 'CUST001' },
  { siteId: 'SITE002', name: 'Bay Area Solar Farm', location: mockLocations[1], devices: ['DEV002'], status: 'Pending Upgrade', customerId: 'CUST002' },
  { siteId: 'SITE003', name: 'Chicago Grid Station', location: mockLocations[2], devices: ['DEV003'], status: 'Up-to-date', customerId: 'CUST003' },
  { siteId: 'SITE004', name: 'Boston Energy Hub', location: mockLocations[3], devices: ['DEV004'], status: 'Pending Upgrade', customerId: 'CUST001' },
  { siteId: 'SITE005', name: 'Seattle Wind Farm', location: mockLocations[1], devices: ['DEV005'], status: 'Outdated', customerId: 'CUST002' },
  { siteId: 'SITE006', name: 'Austin Solar Array', location: mockLocations[2], devices: ['DEV006'], status: 'Up-to-date', customerId: 'CUST003' },
];

// Projects
export const mockProjects: Project[] = [
  { projectId: 'PROJ001', name: 'Northeast Grid Modernization', customerId: 'CUST001', sites: ['SITE001', 'SITE004'] },
  { projectId: 'PROJ002', name: 'West Coast Renewable Initiative', customerId: 'CUST002', sites: ['SITE002', 'SITE005'] },
  { projectId: 'PROJ003', name: 'Midwest Infrastructure Upgrade', customerId: 'CUST003', sites: ['SITE003', 'SITE006'] },
];

// Devices
export const mockDevices: Device[] = [
  { deviceId: 'DEV001', serialNumber: 'SG110-2024-001', type: 'SG110CX', firmwareVersion: 'v2.6.2', status: 'Aging', complianceStatus: false, customerId: 'CUST001', siteId: 'SITE001' },
  { deviceId: 'DEV002', serialNumber: 'SG110-2024-002', type: 'SG110CX', firmwareVersion: 'v2.7.4', status: 'Supported', complianceStatus: true, customerId: 'CUST002', siteId: 'SITE002' },
  { deviceId: 'DEV003', serialNumber: 'SG110-2024-003', type: 'SG110CX', firmwareVersion: 'v2.8.1', status: 'Supported', complianceStatus: true, customerId: 'CUST003', siteId: 'SITE003' },
  { deviceId: 'DEV004', serialNumber: 'SG110-2024-004', type: 'SG110CX', firmwareVersion: 'v2.7.5', status: 'Supported', complianceStatus: true, customerId: 'CUST001', siteId: 'SITE004' },
  { deviceId: 'DEV005', serialNumber: 'SG110-2024-005', type: 'SG110CX', firmwareVersion: 'v2.6.2', status: 'Aging', complianceStatus: false, customerId: 'CUST002', siteId: 'SITE005' },
  { deviceId: 'DEV006', serialNumber: 'SG110-2024-006', type: 'SG110CX', firmwareVersion: 'v2.8.1', status: 'Supported', complianceStatus: true, customerId: 'CUST003', siteId: 'SITE006' },
  { deviceId: 'DEV007', serialNumber: 'SG110-2024-007', type: 'SG110CX', firmwareVersion: 'v2.7.4', status: 'Supported', complianceStatus: true, customerId: 'CUST001', siteId: 'SITE001' },
  { deviceId: 'DEV008', serialNumber: 'SG110-2024-008', type: 'SG110CX', firmwareVersion: 'v2.8.1', status: 'Supported', complianceStatus: true, customerId: 'CUST002', siteId: 'SITE002' },
];

// Anomalies
export const mockAnomalies: Anomaly[] = [
  { anomalyId: 'ANOM001', description: 'Unsigned firmware download attempt detected', detectedBy: mockUsers[4], timestamp: '2024-11-20T10:28:00Z' },
  { anomalyId: 'ANOM002', description: 'Deployment version mismatch', detectedBy: mockUsers[4], timestamp: '2024-11-20T10:13:00Z' },
];

// Deployments
export const mockDeployments: Deployment[] = [
  {
    deploymentId: 'DEP001',
    releaseId: 'REL001',
    customerId: 'CUST003',
    siteId: 'SITE003',
    deviceIds: ['DEV003', 'DEV006'],
    unitsDeployed: 2,
    pendingUpgrade: false,
    fieldTeam: mockTeams[2],
    usSigned: true,
    deploymentTimestamp: '2024-11-17T11:34:08Z',
    authorizedBy: mockUsers[2],
    executedBy: mockUsers[3],
    deploymentLocation: mockLocations[2],
    deploymentAnomalies: []
  },
  {
    deploymentId: 'DEP002',
    releaseId: 'REL002',
    customerId: 'CUST001',
    siteId: 'SITE004',
    deviceIds: ['DEV004'],
    unitsDeployed: 1,
    pendingUpgrade: false,
    fieldTeam: mockTeams[2],
    usSigned: true,
    deploymentTimestamp: '2024-11-10T14:20:00Z',
    authorizedBy: mockUsers[2],
    executedBy: mockUsers[3],
    deploymentLocation: mockLocations[3],
    deploymentAnomalies: []
  },
  {
    deploymentId: 'DEP003',
    releaseId: 'REL003',
    customerId: 'CUST001',
    siteId: 'SITE001',
    deviceIds: ['DEV001'],
    unitsDeployed: 1,
    pendingUpgrade: true,
    fieldTeam: mockTeams[2],
    usSigned: true,
    deploymentTimestamp: '2024-09-15T09:00:00Z',
    authorizedBy: mockUsers[2],
    executedBy: mockUsers[3],
    deploymentLocation: mockLocations[0],
    deploymentAnomalies: [mockAnomalies[1]]
  },
];

// Vulnerabilities
export const mockVulnerabilities: Vulnerability[] = [
  {
    vulnerabilityId: 'VULN001',
    cveId: 'CVE-2024-1234',
    title: 'Remote Code Execution in Firmware Update Mechanism',
    severity: 'critical',
    cvssScore: 9.8,
    description: 'A critical vulnerability allows remote attackers to execute arbitrary code during the firmware update process.',
    affectedReleases: ['REL002', 'REL003'],
    affectedCustomers: ['CUST001', 'CUST002'],
    affectedSites: ['SITE001', 'SITE002', 'SITE004', 'SITE005'],
    affectedDevices: ['DEV001', 'DEV002', 'DEV004', 'DEV005', 'DEV007'],
    sbomReference: 'SBOM001',
    zeroDay: false,
    requiresRetesting: true,
    publishedDate: '2024-11-15'
  },
  {
    vulnerabilityId: 'VULN002',
    cveId: 'CVE-2024-5678',
    title: 'Authentication Bypass in Device Management API',
    severity: 'high',
    cvssScore: 8.2,
    description: 'An authentication bypass vulnerability exists in the device management API.',
    affectedReleases: ['REL002'],
    affectedCustomers: ['CUST001', 'CUST002'],
    affectedSites: ['SITE002', 'SITE004'],
    affectedDevices: ['DEV002', 'DEV004', 'DEV007'],
    sbomReference: 'SBOM002',
    zeroDay: false,
    requiresRetesting: false,
    publishedDate: '2024-11-18'
  },
  {
    vulnerabilityId: 'VULN003',
    cveId: 'CVE-2024-9012',
    title: 'Information Disclosure in Log Files',
    severity: 'medium',
    cvssScore: 5.3,
    description: 'Sensitive information may be exposed in log files.',
    affectedReleases: ['REL003'],
    affectedCustomers: ['CUST001', 'CUST002'],
    affectedSites: ['SITE001', 'SITE005'],
    affectedDevices: ['DEV001', 'DEV005'],
    zeroDay: false,
    requiresRetesting: false,
    publishedDate: '2024-11-19'
  },
];

// Download Requests
export const mockDownloadRequests: DownloadRequest[] = [
  {
    requestId: 'DLR001',
    requestor: mockUsers[3],
    role: 'Deployment Engineer',
    team: mockTeams[2],
    region: 'US',
    timestamp: '2024-11-16T10:00:00Z',
    customerId: 'CUST003',
    siteId: 'SITE003',
    deviceSerialNumbers: ['SG110-2024-003', 'SG110-2024-006'],
    quantity: 2,
    purpose: 'Upgrade',
    customerApproval: true,
    complianceValidation: true,
    attestation: mockAttestations[0],
    previousDeployments: ['DEP001']
  },
];

// Chain of Custody
export const mockChainOfCustody: ChainOfCustody[] = [
  {
    chainId: 'COC001',
    releaseId: 'REL001',
    createdBy: mockUsers[0],
    signedBy: mockUsers[2],
    uploadedBy: mockUsers[0],
    touchedBy: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3]],
    testedBy: [mockUsers[1]],
    testResults: mockTestResults,
    deploymentLocation: mockLocations[2],
    deploymentAnomalies: [],
    complianceEvidence: mockComplianceRecords
  },
];

// Legacy data for backward compatibility
export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'Unsigned Firmware Download Attempt',
    severity: 'critical',
    source: 'Behavioral Monitoring',
    timestamp: '2024-11-20T10:28:00Z',
    timeAgo: '2 minutes ago'
  },
  {
    id: '2',
    type: 'Deployment Mismatch Detected',
    severity: 'warning',
    source: 'Behavioral Monitoring',
    timestamp: '2024-11-20T10:13:00Z',
    timeAgo: '15 minutes ago'
  },
  {
    id: '3',
    type: 'Contractor Validity Expired',
    severity: 'warning',
    source: 'Authorization Check',
    timestamp: '2024-11-20T09:28:00Z',
    timeAgo: '1 hour ago'
  }
];

export const mockCVEs: CVE[] = [
  {
    id: 'CVE-2024-1234',
    title: 'Remote Code Execution in Firmware Update Mechanism',
    severity: 'critical',
    cvssScore: 9.8,
    description: 'A critical vulnerability allows remote attackers to execute arbitrary code during the firmware update process. This affects devices running firmware versions 2.6.0 through 2.7.4.',
    affectedVersions: ['v2.6.0', 'v2.6.1', 'v2.6.2', 'v2.7.0', 'v2.7.1', 'v2.7.2', 'v2.7.3', 'v2.7.4'],
    publishedDate: '2024-11-15'
  },
  {
    id: 'CVE-2024-5678',
    title: 'Authentication Bypass in Device Management API',
    severity: 'high',
    cvssScore: 8.2,
    description: 'An authentication bypass vulnerability exists in the device management API that could allow unauthorized access to device configuration.',
    affectedVersions: ['v2.7.0', 'v2.7.1', 'v2.7.2', 'v2.7.3', 'v2.7.4', 'v2.7.5'],
    publishedDate: '2024-11-18'
  },
  {
    id: 'CVE-2024-9012',
    title: 'Information Disclosure in Log Files',
    severity: 'medium',
    cvssScore: 5.3,
    description: 'Sensitive information may be exposed in log files that could be accessed by unauthorized users.',
    affectedVersions: ['v2.6.2', 'v2.7.0', 'v2.7.1'],
    publishedDate: '2024-11-19'
  }
];

export const chainOfCustodyPhases: ChainOfCustodyPhase[] = [
  {
    phase: 1,
    title: 'HQ Creation',
    icon: 'Package',
    identity: 'alice.johnson@aegis.com',
    role: 'Release Engineer',
    organization: 'Aegis HQ',
    timestamp: '2024-11-15 09:23:41 UTC',
    status: 'verified',
    packageHash: 'a3f8b2c9d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',
    digitalSignature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...',
    hashAlgorithm: 'SHA-256',
    signatureAlgorithm: 'RSA-2048',
    context: 'All integration tests passed',
    color: 'blue'
  },
  {
    phase: 2,
    title: 'Testing & Approval',
    icon: 'FlaskConical',
    identity: 'bob.smith@aegis.com',
    role: 'QA Lead',
    organization: 'Aegis HQ',
    timestamp: '2024-11-15 14:45:22 UTC',
    status: 'verified',
    packageHash: 'b4g9c3d0e2f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1',
    digitalSignature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEB...',
    hashAlgorithm: 'SHA-256',
    signatureAlgorithm: 'RSA-2048',
    context: 'Cryptographic signature validated',
    color: 'purple'
  },
  {
    phase: 3,
    title: 'U.S. Signing',
    icon: 'KeyRound',
    identity: 'carol.white@aegis-us.com',
    role: 'Signing Authority',
    organization: 'Aegis US',
    timestamp: '2024-11-16 08:12:15 UTC',
    status: 'verified',
    packageHash: 'c5h0d4e1f3a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a2',
    digitalSignature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEC...',
    hashAlgorithm: 'SHA-256',
    signatureAlgorithm: 'RSA-2048',
    context: 'All regulatory requirements met',
    color: 'green'
  },
  {
    phase: 4,
    title: 'Deployment',
    icon: 'Rocket',
    identity: 'david.brown@customer.com',
    role: 'Deployment Engineer',
    organization: 'Customer',
    timestamp: '2024-11-17 11:34:08 UTC',
    status: 'verified',
    packageHash: 'd6i1e5f2a4b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a3',
    digitalSignature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQED...',
    hashAlgorithm: 'SHA-256',
    signatureAlgorithm: 'RSA-2048',
    context: 'Deployment successful, all devices verified',
    color: 'emerald'
  }
];

export const firmwareDistribution: FirmwareDistribution[] = [
  { version: 'v2.8.1', percentage: 48.3, deviceCount: 892 },
  { version: 'v2.7.5', percentage: 35.4, deviceCount: 654 },
  { version: 'v2.6.2', percentage: 16.3, deviceCount: 301 }
];

export const summaryStats = {
  signedFirmware: 1654,
  pendingApproval: 23,
  activeCustomers: 42,
  securityAlerts: 1,
  totalDevices: 1847,
  complianceScore: 87.5,
  activeCVEs: 3,
  impactedDevices: 127
};

// Contractors/Vendors
export const mockContractors: Contractor[] = [
  {
    contractorId: 'VENDOR001',
    companyName: 'TechField Services Inc.',
    contractValidity: true,
    regions: ['Northeast', 'Midwest'],
    capabilities: ['Firmware Updates', 'Hardware Installation', 'Site Commissioning'],
    contactEmail: 'dispatch@techfield.com'
  },
  {
    contractorId: 'VENDOR002',
    companyName: 'PowerGrid Solutions LLC',
    contractValidity: true,
    regions: ['West Coast', 'Southwest'],
    capabilities: ['Firmware Updates', 'Emergency Response', 'Compliance Testing'],
    contactEmail: 'ops@powergrid-solutions.com'
  }
];

// Scheduled Updates (sites needing updates in next 30 days)
export const mockScheduledUpdates: ScheduledUpdate[] = [
  {
    updateId: 'UPD001',
    siteId: 'SITE001',
    currentFirmware: 'v2.6.2',
    targetFirmware: 'v2.8.1',
    scheduledDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    priority: 'Critical',
    region: 'Northeast',
    route: 'Route A - NYC Metro',
    assignedTo: 'Vendor1',
    assignedContractor: mockContractors[0],
    estimatedDuration: 4,
    requiresDowntime: true,
    status: 'Scheduled',
    dependencies: []
  },
  {
    updateId: 'UPD002',
    siteId: 'SITE002',
    currentFirmware: 'v2.7.4',
    targetFirmware: 'v2.8.1',
    scheduledDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days from now
    priority: 'High',
    region: 'West Coast',
    route: 'Route B - Bay Area',
    assignedTo: 'Vendor2',
    assignedContractor: mockContractors[1],
    estimatedDuration: 3,
    requiresDowntime: false,
    status: 'Scheduled',
    dependencies: []
  },
  {
    updateId: 'UPD003',
    siteId: 'SITE004',
    currentFirmware: 'v2.7.5',
    targetFirmware: 'v2.8.1',
    scheduledDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days from now
    priority: 'Medium',
    region: 'Northeast',
    route: 'Route A - NYC Metro',
    assignedTo: 'Internal',
    assignedTeam: mockTeams[2],
    estimatedDuration: 2,
    requiresDowntime: false,
    status: 'Scheduled',
    dependencies: ['UPD001']
  },
  {
    updateId: 'UPD004',
    siteId: 'SITE005',
    currentFirmware: 'v2.6.2',
    targetFirmware: 'v2.8.1',
    scheduledDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
    priority: 'Critical',
    region: 'West Coast',
    route: 'Route C - Seattle',
    assignedTo: 'Vendor2',
    assignedContractor: mockContractors[1],
    estimatedDuration: 5,
    requiresDowntime: true,
    status: 'Scheduled',
    dependencies: []
  },
  {
    updateId: 'UPD005',
    siteId: 'SITE006',
    currentFirmware: 'v2.8.1',
    targetFirmware: 'v2.8.1',
    scheduledDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days from now
    priority: 'Low',
    region: 'Southwest',
    route: 'Route D - Texas',
    assignedTo: 'Unassigned',
    estimatedDuration: 2,
    requiresDowntime: false,
    status: 'Scheduled',
    dependencies: []
  }
];
