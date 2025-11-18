import { Shield, ArrowRight, Package, FlaskConical, KeyRound, Rocket, CheckCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { chainOfCustodyPhases } from '@/data/mockData'

const phaseIcons = {
  Package,
  FlaskConical,
  KeyRound,
  Rocket,
}

const phaseColors = {
  blue: {
    bg: 'bg-blue-500/10 dark:bg-blue-950/30',
    border: 'border-blue-500/30 dark:border-blue-500/40',
    text: 'text-blue-500 dark:text-blue-400',
  },
  purple: {
    bg: 'bg-purple-500/10 dark:bg-purple-950/30',
    border: 'border-purple-500/30 dark:border-purple-500/40',
    text: 'text-purple-500 dark:text-purple-400',
  },
  green: {
    bg: 'bg-green-500/10 dark:bg-green-950/30',
    border: 'border-green-500/30 dark:border-green-500/40',
    text: 'text-green-500 dark:text-green-400',
  },
  emerald: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-950/30',
    border: 'border-emerald-500/30 dark:border-emerald-500/40',
    text: 'text-emerald-500 dark:text-emerald-400',
  },
}

export default function ChainOfCustodySidebar() {
  return (
    <>
      {/* Chain of Custody Card */}
      <Card className="border-2 border-purple-500/40">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-500" />
            <CardTitle>Chain of Custody</CardTitle>
          </div>
          <CardDescription>Tamper-proof firmware lineage</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {chainOfCustodyPhases.map((phase, index) => {
                const Icon = phaseIcons[phase.icon as keyof typeof phaseIcons] || Package
                const colors = phaseColors[phase.color]
                const isLast = index === chainOfCustodyPhases.length - 1

                return (
                  <div key={phase.phase} className="relative">
                    <div className={`${colors.bg} ${colors.border} border rounded-lg p-3 space-y-2`}>
                      <div className="flex items-start gap-2">
                        <div className={`${colors.border} border rounded p-1.5 ${colors.bg}`}>
                          <Icon className={`h-4 w-4 ${colors.text}`} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className={`${colors.text} text-sm font-medium`}>{phase.title}</p>
                            {phase.status === 'verified' && (
                              <Badge variant="success" className="h-5 px-1.5">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                VERIFIED
                              </Badge>
                            )}
                          </div>
                          <p className="text-slate-400 text-xs">{phase.timestamp}</p>
                        </div>
                      </div>
                      <div className="bg-slate-800/50 rounded p-2 space-y-1">
                        <p className="text-slate-400 text-xs">Identity</p>
                        <p className="text-slate-200 text-xs">{phase.identity}</p>
                      </div>
                    </div>
                    {!isLast && (
                      <div className="absolute left-6 top-full w-px h-4 bg-gradient-to-b from-slate-600 to-slate-800" />
                    )}
                  </div>
                )
              })}
            </div>
          </ScrollArea>
          <Button 
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'audit' }))
            }}
          >
            View Full Details
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Quick Access Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="secondary" 
            className="w-full justify-start"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }))
            }}
          >
            <Shield className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Package className="h-4 w-4 mr-2" />
            Legacy Inventory
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'vulnerability' }))
            }}
          >
            <Shield className="h-4 w-4 mr-2" />
            CVE Analysis
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start bg-purple-600/20 border-purple-500/50 hover:bg-purple-600/30"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'audit' }))
            }}
          >
            <Shield className="h-4 w-4 mr-2" />
            Audit Reports
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

