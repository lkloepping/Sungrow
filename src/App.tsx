import { useState } from 'react'
import * as React from 'react'
import { Shield, AlertTriangle, FileCheck, Moon, Sun } from 'lucide-react'
import AegisDashboard from './components/aegis-dashboard'
import VulnerabilityAnalysis from './components/vulnerability-analysis'
import AuditReportGenerator from './components/audit-report-generator'

type Screen = 'dashboard' | 'vulnerability' | 'audit'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard')
  const [darkMode, setDarkMode] = useState(true)

  // Listen for navigation events from child components
  React.useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      const screen = event.detail as Screen
      if (['dashboard', 'vulnerability', 'audit'].includes(screen)) {
        setCurrentScreen(screen)
      }
    }

    window.addEventListener('navigate', handleNavigate as EventListener)
    return () => {
      window.removeEventListener('navigate', handleNavigate as EventListener)
    }
  }, [])

  const navigation = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: Shield },
    { id: 'vulnerability' as Screen, label: 'Vulnerability Analysis', icon: AlertTriangle },
    { id: 'audit' as Screen, label: 'Audit Reports', icon: FileCheck },
  ]

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-slate-950 min-h-screen">
        {/* Navigation Bar */}
        <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Title */}
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-blue-500" />
                <div className="flex flex-col">
                  <h1 className="text-slate-50 font-semibold leading-tight">
                    Aegis Firmware & Device Inventory Management System
                  </h1>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="hidden md:flex items-center gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = currentScreen === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentScreen(item.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-slate-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-slate-50 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden pb-4">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = currentScreen === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentScreen(item.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-slate-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-[1920px] mx-auto">
          {currentScreen === 'dashboard' && <AegisDashboard />}
          {currentScreen === 'vulnerability' && <VulnerabilityAnalysis />}
          {currentScreen === 'audit' && <AuditReportGenerator />}
        </main>
      </div>
    </div>
  )
}

export default App
