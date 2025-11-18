sungrow-solar/requirement-analysis/schema.md
# Aegis High-Level Object Model

This schema defines the core entities and relationships for the Aegis Secure Distribution Platform, based on the requirements in `aegies.md`. It is intended as a conceptual starting point for system design and implementation.

---

## Entities and Relationships

### 1. Release

- **releaseId**: string
- **productType**: string
- **deviceType**: string
- **region**: string
- **buildProvenance**: string (e.g., HQ → US Signing)
- **hashes**: list of string
- **signatures**: list of Signature
- **sbom**: SBOM
- **hbom**: HBOM
- **attestationMetadata**: Attestation
- **reproducibleBuildProof**: string
- **testingResults**: list of TestResult
- **recallStatus**: boolean
- **vulnerabilityStatus**: list of Vulnerability
- **releaseArtifacts**: list of Artifact
- **releaseManifest**: Artifact

### 2. Deployment

- **deploymentId**: string
- **release**: Release
- **customer**: Customer
- **site**: Site
- **device**: Device
- **unitsDeployed**: integer
- **pendingUpgrade**: boolean
- **fieldTeam**: Team
- **usSigned**: boolean
- **deploymentTimestamp**: datetime
- **authorizedBy**: User
- **executedBy**: User
- **deploymentLocation**: Location
- **deploymentAnomalies**: list of Anomaly

### 3. DownloadRequest

- **requestId**: string
- **requestor**: User
- **role**: string
- **team**: Team
- **region**: string
- **timestamp**: datetime
- **customer**: Customer
- **project**: Project
- **site**: Site
- **deviceSerialNumbers**: list of string
- **quantity**: integer
- **purpose**: enum (Install, Upgrade, Rollback, Replacement)
- **customerApproval**: boolean
- **complianceValidation**: boolean
- **attestation**: Attestation
- **contractor**: Contractor (optional)
- **contractValidity**: boolean (optional)
- **previousDeployments**: list of Deployment

### 4. ChainOfCustody

- **chainId**: string
- **release**: Release
- **createdBy**: User (HQ)
- **signedBy**: User (US)
- **uploadedBy**: User
- **touchedBy**: list of User
- **testedBy**: list of User
- **testResults**: list of TestResult
- **deploymentLocation**: Location
- **deploymentAnomalies**: list of Anomaly
- **complianceEvidence**: list of ComplianceRecord

### 5. Vulnerability

- **vulnerabilityId**: string
- **cveId**: string
- **affectedReleases**: list of Release
- **affectedCustomers**: list of Customer
- **affectedSites**: list of Site
- **affectedDevices**: list of Device
- **sbomReference**: SBOM
- **zeroDay**: boolean
- **requiresRetesting**: boolean
- **updatedSbom**: SBOM (optional)

### 6. Customer

- **customerId**: string
- **name**: string
- **projects**: list of Project
- **sites**: list of Site
- **devices**: list of Device
- **currentConfigurationState**: string
- **complianceGaps**: list of ComplianceGap

### 7. Site

- **siteId**: string
- **name**: string
- **location**: Location
- **devices**: list of Device
- **status**: enum (Up-to-date, Outdated, Pending Upgrade)

### 8. Device

- **deviceId**: string
- **serialNumber**: string
- **type**: string
- **firmwareVersion**: string
- **status**: enum (Supported, Unsupported, Aging)
- **complianceStatus**: boolean

### 9. Artifact

- **artifactId**: string
- **type**: enum (FirmwareReleaseModel, SBOM, HBOM, PatchNotes, BuildProof, AttestationChain, SignatureMetadata, TestingSummary, ComplianceMetadata, ReleaseManifest)
- **content**: string or file reference

### 10. SBOM / HBOM

- **bomId**: string
- **type**: enum (SBOM, HBOM)
- **components**: list of Component

### 11. Attestation

- **attestationId**: string
- **chain**: list of Signature
- **metadata**: string

### 12. Signature

- **signatureId**: string
- **signedBy**: User
- **timestamp**: datetime
- **hash**: string

### 13. TestResult

- **testId**: string
- **release**: Release
- **testedBy**: User
- **type**: enum (Internal, ThirdParty)
- **result**: string
- **timestamp**: datetime

### 14. ComplianceRecord

- **recordId**: string
- **type**: enum (NERC CIP-010, NERC CIP-013, NIST SSDF, EO 14028)
- **evidence**: string

### 15. Anomaly

- **anomalyId**: string
- **description**: string
- **detectedBy**: User
- **timestamp**: datetime

### 16. Team / User / Contractor

- **teamId**: string
- **name**: string
- **members**: list of User

- **userId**: string
- **name**: string
- **role**: string
- **region**: string

- **contractorId**: string
- **companyName**: string
- **contractValidity**: boolean

### 17. Project

- **projectId**: string
- **name**: string
- **customer**: Customer
- **sites**: list of Site

### 18. Location

- **locationId**: string
- **gpsCoordinates**: string
- **address**: string
- **substation**: string (optional)

### 19. ComplianceGap

- **gapId**: string
- **description**: string
- **status**: enum (Open, Closed)

### 20. Component

- **componentId**: string
- **name**: string
- **version**: string

---

## Notes

- This object model is high-level and intended for conceptual design. Some attributes may be expanded or refined during detailed design.
- Relationships between entities (e.g., Release → Deployment, Customer → Site → Device) are implied by references.
- Compliance, audit, and analytics requirements are supported by linking records and metadata across entities.

---