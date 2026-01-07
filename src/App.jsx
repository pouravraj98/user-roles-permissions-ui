import { useState } from 'react'
import Sidebar from './components/Sidebar'
import PageHeader from './components/PageHeader'
import PermissionsTable from './components/PermissionsTable'

function App() {
  const [activeTab, setActiveTab] = useState('permissions')

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Page Header */}
        <PageHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'permissions' && <PermissionsTable />}
          {activeTab === 'features' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Features</h2>
              <p className="mt-2 text-gray-500">Feature settings will be displayed here.</p>
            </div>
          )}
          {activeTab === 'api-credentials' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">API Credentials</h2>
              <p className="mt-2 text-gray-500">API credentials will be displayed here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
