import { useState } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import PageHeader from './components/PageHeader'
import PermissionsTable from './components/PermissionsTable'
import Groups from './pages/Groups'
import GroupDetails from './pages/GroupDetails'

function Layout({ children, activePage }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}

function UserRolesPage() {
  const [activeTab, setActiveTab] = useState('permissions')

  return (
    <Layout activePage="user-roles">
      <PageHeader activeTab={activeTab} onTabChange={setActiveTab} />
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
    </Layout>
  )
}

function UsersPage() {
  return (
    <Layout activePage="users">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">Users</h1>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <p className="text-gray-500">Users management will be displayed here.</p>
      </div>
    </Layout>
  )
}

function GroupsPage() {
  return (
    <Layout activePage="groups">
      <Groups />
    </Layout>
  )
}

function GroupDetailsPage() {
  return (
    <Layout activePage="groups">
      <GroupDetails />
    </Layout>
  )
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user-roles" replace />} />
        <Route path="/user-roles" element={<UserRolesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
