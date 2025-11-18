# Aegis Firmware & Device Inventory Management System

An enterprise-grade security and compliance platform for hardware inventory management built with React, TypeScript, and Tailwind CSS.

## Features

### 🛡️ Dashboard
- **Critical Alerts**: Real-time security event monitoring with severity indicators
- **CVE Status**: Vulnerability impact analysis with device counts
- **Inventory Snapshot**: Auto-updating metrics with firmware distribution charts
- **Compliance Score**: Circular progress indicator showing regulatory compliance
- **Summary Statistics**: Quick view of signed firmware, pending approvals, customers, and alerts
- **Chain of Custody Sidebar**: Tamper-proof firmware lineage tracking with 4-phase verification

### 🔍 Vulnerability Analysis
- **CVE Selection**: Dropdown to filter and select CVEs
- **CVE Details**: Comprehensive vulnerability information including CVSS scores
- **Impact Summary**: Affected devices, customer impact, geographic regions, and risk levels
- **Geographic Deployment Map**: Visual representation of device distribution and vulnerability impact
- **Affected Devices Table**: Sortable and filterable device inventory
- **Mitigation Recommendations**: Priority-based action items with timelines

### 📋 Audit Report Generator
- **Report Configuration**: Date range, customer, and report type selection
- **Enhanced Chain of Custody**: 4-phase summary cards with cryptographic verification
- **Detailed Flow Diagram**: Complete verification trail with:
  - Authorization identities (email, role, organization)
  - Cryptographic hashes (SHA-256) and digital signatures (RSA-2048)
  - Verification metadata and status
- **Report Preview**: Summary statistics and compliance status
- **Export Options**: PDF generation, CSV export, recurring reports, and sharing

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Recharts** for data visualization (ready for future enhancements)
- **shadcn/ui** style components (custom implementations)
- **Vite** for build tooling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  ├── components/
  │   ├── ui/              # Reusable UI components (button, card, badge, etc.)
  │   ├── aegis-dashboard.tsx
  │   ├── vulnerability-analysis.tsx
  │   ├── audit-report-generator.tsx
  │   └── chain-of-custody-sidebar.tsx
  ├── data/
  │   └── mockData.ts      # Mock data for CVEs, devices, alerts, etc.
  ├── lib/
  │   └── utils.ts         # Utility functions (cn helper)
  ├── App.tsx              # Main app with navigation
  ├── main.tsx             # Entry point
  └── index.css            # Global styles
```

## Design System

- **Color Scheme**: Dark mode by default (slate-950 background)
- **Typography**: Inter font family
- **Components**: Custom shadcn/ui style components
- **Responsive**: Mobile-first design with breakpoints for tablet and desktop
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## Navigation

The application features three main screens accessible via the top navigation:

1. **Dashboard** (Shield icon) - Default view with overview metrics
2. **Vulnerability Analysis** (AlertTriangle icon) - Security analyst tools
3. **Audit Reports** (FileCheck icon) - Compliance officer tools

Navigation can also be triggered from:
- Clickable cards on the Dashboard
- Quick Access sidebar buttons
- Custom navigation events

## Mock Data

The application includes comprehensive mock data for:
- Security alerts (critical and warning severity)
- CVEs with varying severities and affected versions
- Device inventory with status indicators
- Chain of Custody phases with cryptographic verification
- Firmware distribution statistics
- Summary statistics

## Key Features

- ✅ Three complete screens with full functionality
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode by default
- ✅ Interactive navigation between screens
- ✅ Comprehensive Chain of Custody visualization
- ✅ Geographic deployment visualization
- ✅ Sortable and filterable data tables
- ✅ Real-time status indicators
- ✅ Cryptographic verification display
- ✅ Export and sharing capabilities

## Future Enhancements

- Real-time data updates via API integration
- Advanced charting with Recharts
- PDF generation functionality
- User authentication and role-based access
- Real-time notifications
- Advanced filtering and search
- Data export in multiple formats

## License

Private - Internal use only
