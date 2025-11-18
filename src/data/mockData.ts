// Mock data for the Aegis application

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

export interface Device {
  id: string;
  customer: string;
  location: string;
  firmwareVersion: string;
  status: 'vulnerable' | 'patched' | 'pending';
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

// Mock Alerts
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

// Mock CVEs
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

// Mock Devices
export const mockDevices: Device[] = [
  { id: 'DEV-001', customer: 'Acme Corp', location: 'New York, NY', firmwareVersion: 'v2.6.2', status: 'vulnerable' },
  { id: 'DEV-002', customer: 'Tech Industries', location: 'San Francisco, CA', firmwareVersion: 'v2.7.4', status: 'vulnerable' },
  { id: 'DEV-003', customer: 'Global Systems', location: 'Chicago, IL', firmwareVersion: 'v2.8.1', status: 'patched' },
  { id: 'DEV-004', customer: 'Acme Corp', location: 'Boston, MA', firmwareVersion: 'v2.7.5', status: 'pending' },
  { id: 'DEV-005', customer: 'Tech Industries', location: 'Seattle, WA', firmwareVersion: 'v2.6.2', status: 'vulnerable' },
  { id: 'DEV-006', customer: 'Global Systems', location: 'Austin, TX', firmwareVersion: 'v2.8.1', status: 'patched' },
  { id: 'DEV-007', customer: 'Acme Corp', location: 'Miami, FL', firmwareVersion: 'v2.7.4', status: 'vulnerable' },
  { id: 'DEV-008', customer: 'Tech Industries', location: 'Denver, CO', firmwareVersion: 'v2.8.1', status: 'patched' },
];

// Chain of Custody Data
export const chainOfCustodyPhases: ChainOfCustodyPhase[] = [
  {
    phase: 1,
    title: 'HQ Creation',
    icon: 'Package',
    identity: 'pkg.creator@hq.aegis.com',
    role: 'Package Creator',
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
    identity: 'qa.lead@hq.aegis.com',
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
    identity: 'signing.authority@us.aegis.com',
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
    identity: 'deploy.eng@customer.com',
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

// Firmware Distribution
export const firmwareDistribution: FirmwareDistribution[] = [
  { version: 'v2.8.1', percentage: 48.3, deviceCount: 892 },
  { version: 'v2.7.5', percentage: 35.4, deviceCount: 654 },
  { version: 'v2.6.2', percentage: 16.3, deviceCount: 301 }
];

// Summary Stats
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

