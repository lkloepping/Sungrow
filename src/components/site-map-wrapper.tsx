import React, { Suspense, lazy } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Site, Customer } from '@/data/mockData'

// Lazy load the map component
const SiteMap = lazy(() => import('./site-map'))

interface SiteMapWrapperProps {
  sites: Site[]
  customers: Customer[]
  onSiteClick?: (site: Site) => void
}

export default function SiteMapWrapper(props: SiteMapWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[500px] rounded-lg border border-slate-800 bg-slate-900/50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-slate-400">Loading map...</p>
          </div>
        </div>
      }
    >
      <ErrorBoundary>
        <SiteMap {...props} />
      </ErrorBoundary>
    </Suspense>
  )
}

// Simple error boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[500px] rounded-lg border border-red-500/30 bg-red-950/20 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-slate-200 font-semibold mb-2">Map Loading Error</h3>
            <p className="text-slate-400 text-sm mb-4">
              There was an error loading the map component. This may be due to missing dependencies or configuration issues.
            </p>
            {this.state.error && (
              <pre className="text-xs text-red-400 bg-slate-950 p-3 rounded text-left overflow-auto">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

