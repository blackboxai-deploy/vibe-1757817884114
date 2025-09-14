'use client'

import { useState, useEffect } from 'react'

export default function FlounderDashboard() {
  const [qrCode, setQrCode] = useState('')
  const [systemStatus, setSystemStatus] = useState('ONLINE')
  const [projects, setProjects] = useState([
    { id: 1, name: 'PROJECT_ALPHA', status: 'RUNNING', port: 3001 },
    { id: 2, name: 'PROJECT_BETA', status: 'STOPPED', port: 8000 },
    { id: 3, name: 'PROJECT_GAMMA', status: 'BUILDING', port: 4000 }
  ])

  const generateQR = async () => {
    try {
      const QRCode = (await import('qrcode')).default
      const accessUrl = `http://${window.location.hostname}:3000/mobile-access`
      const qr = await QRCode.toDataURL(accessUrl, { 
        width: 300,
        color: { dark: '#000000', light: '#ffffff' }
      })
      setQrCode(qr)
    } catch (error) {
      console.error('QR generation failed:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'RUNNING': return '#00ff00'
      case 'STOPPED': return '#ff0000'
      case 'BUILDING': return '#ffff00'
      default: return '#888888'
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <div className="container mx-auto p-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="text-4xl font-bold mb-2 hacker-text">FLOUNDER.SYSTEM</div>
          <div className="text-sm opacity-60">REMOTE.DEVELOPMENT.ENVIRONMENT</div>
          <div className="text-xs mt-1">
            STATUS: <span style={{color: getStatusColor(systemStatus)}}>{systemStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* QR Access Terminal */}
          <div className="terminal-window">
            <div className="text-green-400 mb-4">
              &gt; MOBILE_ACCESS_GENERATOR
            </div>
            
            <div className="text-center">
              {qrCode ? (
                <div>
                  <div className="qr-display mb-4">
                    <img src={qrCode} alt="Mobile Access QR" className="w-48 h-48 mx-auto" />
                  </div>
                  <div className="text-xs mb-4 opacity-80">
                    SCAN_WITH_PHONE_CAMERA_FOR_REMOTE_ACCESS
                  </div>
                  <div className="space-x-2">
                    <button 
                      onClick={generateQR}
                      className="bg-green-600 text-black px-4 py-2 text-sm hover:bg-green-500"
                    >
                      REGENERATE_QR
                    </button>
                    <button 
                      onClick={() => {
                        const link = document.createElement('a')
                        link.download = 'flounder-access.png'
                        link.href = qrCode
                        link.click()
                      }}
                      className="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-500"
                    >
                      DOWNLOAD_QR
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-48 h-48 bg-gray-900 border border-green-400 mx-auto mb-4 flex items-center justify-center">
                    <div className="text-4xl">[ ]</div>
                  </div>
                  <button 
                    onClick={generateQR}
                    className="bg-green-600 text-black px-6 py-3 hover:bg-green-500 font-bold"
                  >
                    GENERATE_MOBILE_ACCESS_CODE
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Project Status */}
          <div className="terminal-window">
            <div className="text-green-400 mb-4">
              &gt; PROJECT_STATUS_MONITOR
            </div>
            
            <div className="space-y-3">
              {projects.map(project => (
                <div key={project.id} className="flex justify-between items-center border-b border-green-800 pb-2">
                  <div>
                    <div className="text-sm">{project.name}</div>
                    <div className="text-xs opacity-60">PORT_{project.port}</div>
                  </div>
                  <div className="flex items-center">
                    <div 
                      className="w-2 h-2 rounded-full mr-2"
                      style={{backgroundColor: getStatusColor(project.status)}}
                    ></div>
                    <div className="text-xs" style={{color: getStatusColor(project.status)}}>
                      {project.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <button className="w-full bg-gray-800 text-green-400 p-2 text-sm hover:bg-gray-700 border border-green-600">
                LAUNCH_CODE_EDITOR
              </button>
              <button className="w-full bg-gray-800 text-green-400 p-2 text-sm hover:bg-gray-700 border border-green-600">
                ACCESS_TERMINAL
              </button>
              <button className="w-full bg-gray-800 text-green-400 p-2 text-sm hover:bg-gray-700 border border-green-600">
                CREATE_NEW_PROJECT
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="mt-8 terminal-window">
          <div className="text-green-400 mb-4">
            &gt; LICENSING_INFORMATION
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="border border-green-600 p-4">
              <div className="text-white font-bold mb-2">BASIC_ACCESS</div>
              <div>COST: $5_LIFETIME</div>
              <div>QR_MOBILE_ACCESS</div>
              <div>PROJECT_MONITORING</div>
            </div>
            <div className="border border-green-600 p-4">
              <div className="text-white font-bold mb-2">PRO_LICENSE</div>
              <div>COST: $15_PLUS_$1_MONTHLY</div>
              <div>FULL_CODE_EDITOR</div>
              <div>TERMINAL_ACCESS</div>
              <div>PROJECT_MANAGEMENT</div>
            </div>
            <div className="border border-green-600 p-4">
              <div className="text-white font-bold mb-2">ULTIMATE_SUITE</div>
              <div>COST: $35_PLUS_$1_MONTHLY</div>
              <div>AUTOMATION_SCRIPTS</div>
              <div>ENTERPRISE_FEATURES</div>
              <div>PRIORITY_SUPPORT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}