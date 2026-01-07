import { useState } from 'react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'chat', label: 'Chat', icon: 'message', hasSubmenu: true },
  { id: 'voice-video', label: 'Voice & Video Calling', icon: 'phone' },
  { id: 'ai-features', label: 'AI Features', icon: 'stars' },
  { id: 'ai-agents', label: 'AI Agents', icon: 'dataflow' },
  {
    id: 'users-groups',
    label: 'Users & Groups',
    icon: 'users',
    hasSubmenu: true,
    isOpen: true,
    submenu: [
      { id: 'users', label: 'Users' },
      { id: 'groups', label: 'Groups' },
      { id: 'user-roles', label: 'User Roles', isActive: true },
    ]
  },
  { id: 'credentials', label: 'Credentials', icon: 'shield' },
  { id: 'extensions', label: 'Extensions', icon: 'grid-ext' },
  { id: 'webhooks', label: 'Webhooks & Bots', icon: 'dataflow' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
  { id: 'insights', label: 'Insights', icon: 'chart' },
];

const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    grid: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    message: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    phone: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    stars: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    dataflow: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="5" r="3"/>
        <circle cx="5" cy="19" r="3"/>
        <circle cx="19" cy="19" r="3"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <path d="M12 12L5 16M12 12l7 4"/>
      </svg>
    ),
    users: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    shield: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    bell: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    ),
    chart: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="8" y1="15" x2="8" y2="9"/>
        <line x1="12" y1="15" x2="12" y2="6"/>
        <line x1="16" y1="15" x2="16" y2="12"/>
      </svg>
    ),
    'grid-ext': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    chevronDown: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    ),
    chevronRight: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    ),
    chevronSelector: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 15l5 5 5-5M7 9l5-5 5 5"/>
      </svg>
    ),
    docs: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
    account: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M7 20.662V19a2 2 0 012-2h6a2 2 0 012 2v1.662"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState(['users-groups']);

  const toggleMenu = (id) => {
    setOpenMenus(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-semibold text-gray-900">CometChat</span>
        </div>
      </div>

      {/* App Selector */}
      <div className="p-3 border-b border-gray-200">
        <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="message" className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Support Chat</p>
              <p className="text-xs text-gray-500">v3 - Production</p>
            </div>
          </div>
          <Icon name="chevronSelector" className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => item.hasSubmenu && toggleMenu(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  item.submenu?.some(s => s.isActive)
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon name={item.icon} className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  <Icon
                    name={openMenus.includes(item.id) ? 'chevronDown' : 'chevronRight'}
                    className="w-4 h-4 text-gray-400"
                  />
                )}
              </button>

              {item.submenu && openMenus.includes(item.id) && (
                <ul className="mt-1 ml-8 space-y-1">
                  {item.submenu.map((subItem) => (
                    <li key={subItem.id}>
                      <a
                        href="#"
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          subItem.isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {subItem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Trial Banner */}
      <div className="p-3 border-t border-gray-200">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-900">Free Trial</p>
          <p className="text-xs text-gray-600 mt-1">18 days remaining</p>
          <div className="mt-2 bg-gray-200 rounded-full h-1.5">
            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
          </div>
          <button className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-700">
            Upgrade now
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <a href="#" className="flex items-center gap-2 hover:text-gray-900">
            <Icon name="docs" className="w-4 h-4" />
            <span>Documentation</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-900">
            <Icon name="account" className="w-4 h-4" />
            <span>Account</span>
          </a>
        </div>
      </div>

      {/* User Card */}
      <div className="p-3 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">BG</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-gray-900">Bhumika Gupta</p>
            <p className="text-xs text-gray-500">bhumika@cometchat.com</p>
          </div>
          <Icon name="chevronSelector" className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </aside>
  );
}
