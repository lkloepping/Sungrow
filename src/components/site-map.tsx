import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Site, Customer } from '@/data/mockData'
import { Badge } from '@/components/ui/badge'
import { MapPin, Package, AlertTriangle } from 'lucide-react'

interface SiteMapProps {
  sites: Site[]
  customers: Customer[]
  onSiteClick?: (site: Site) => void
}

// Component to fit bounds to markers
function FitBounds({ sites }: { sites: Site[] }) {
  const map = useMap()

  useEffect(() => {
    if (sites.length > 0) {
      const bounds = sites.map(site => {
        const [lat, lng] = site.location.gpsCoordinates.split(',').map(coord => parseFloat(coord.trim()))
        return [lat, lng] as [number, number]
      })
      
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 })
      }
    }
  }, [sites, map])

  return null
}

export default function SiteMap({ sites, customers, onSiteClick }: SiteMapProps) {
  // Create custom icons based on site status
  const createCustomIcon = useMemo(() => {
    return (status: string) => {
      const color = 
        status === 'Up-to-date' ? '#10B981' : 
        status === 'Outdated' ? '#EF4444' : 
        '#F59E0B'
      
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
          "></div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
      })
    }
  }, [])

  // Default center of US
  const defaultCenter: [number, number] = [39.8283, -98.5795]

  // Calculate center from sites or use default
  const mapCenter = useMemo(() => {
    if (sites.length === 0) return defaultCenter
    
    const latSum = sites.reduce((sum, site) => {
      const [lat] = site.location.gpsCoordinates.split(',').map(coord => parseFloat(coord.trim()))
      return sum + lat
    }, 0)
    
    const lngSum = sites.reduce((sum, site) => {
      const [, lng] = site.location.gpsCoordinates.split(',').map(coord => parseFloat(coord.trim()))
      return sum + lng
    }, 0)
    
    return [latSum / sites.length, lngSum / sites.length] as [number, number]
  }, [sites])

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-slate-800">
      <MapContainer
        center={mapCenter}
        zoom={4}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <FitBounds sites={sites} />

        {sites.map((site) => {
          const [lat, lng] = site.location.gpsCoordinates.split(',').map(coord => parseFloat(coord.trim()))
          const customer = customers.find(c => c.sites.some(s => s.siteId === site.siteId))
          
          if (isNaN(lat) || isNaN(lng)) return null

          return (
            <Marker
              key={site.siteId}
              position={[lat, lng]}
              icon={createCustomIcon(site.status)}
              eventHandlers={{
                click: () => {
                  if (onSiteClick) onSiteClick(site)
                },
              }}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-900">{site.name}</h3>
                      {customer && (
                        <p className="text-xs text-slate-600">{customer.name}</p>
                      )}
                    </div>
                    <Badge 
                      variant={
                        site.status === 'Up-to-date' ? 'success' : 
                        site.status === 'Outdated' ? 'destructive' : 
                        'warning'
                      }
                      className="text-xs"
                    >
                      {site.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-xs text-slate-700">
                    <div className="flex items-start gap-1">
                      <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{site.location.address}</span>
                    </div>
                    {site.location.substation && (
                      <div className="flex items-start gap-1">
                        <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span>Substation: {site.location.substation}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 pt-1">
                      <Package className="h-3 w-3" />
                      <span className="font-medium">{Array.isArray(site.devices) ? site.devices.length : 0} devices</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-lg z-[1000]">
        <h4 className="text-slate-200 font-semibold text-sm mb-2">Site Status</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
            <span className="text-slate-300 text-xs">Up-to-date</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white"></div>
            <span className="text-slate-300 text-xs">Pending Upgrade</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
            <span className="text-slate-300 text-xs">Outdated</span>
          </div>
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-lg z-[1000]">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-slate-400 text-xs">Total Sites</p>
            <p className="text-slate-50 text-lg font-semibold">{sites.length}</p>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
            <div>
              <p className="text-slate-400 text-xs">Total Devices</p>
              <p className="text-slate-50 text-lg font-semibold">
                {sites.reduce((sum, site) => sum + (Array.isArray(site.devices) ? site.devices.length : 0), 0)}
              </p>
            </div>
        </div>
      </div>
    </div>
  )
}

