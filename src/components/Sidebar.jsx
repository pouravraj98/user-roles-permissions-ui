import { useState } from 'react';
import { Link } from 'react-router-dom';

const navStructure = {
  general: {
    label: 'GENERAL',
    items: [
      { id: 'overview', label: 'Overview', icon: 'overview' },
      {
        id: 'users-groups',
        label: 'User & Groups',
        icon: 'users',
        hasSubmenu: true,
        submenu: [
          { id: 'users', label: 'Users', path: '/users' },
          { id: 'groups', label: 'Groups', path: '/groups' },
          { id: 'user-roles', label: 'User Roles', path: '/user-roles' },
        ]
      },
    ]
  },
  products: {
    label: 'PRODUCTS',
    items: [
      { id: 'chats', label: 'Chats', icon: 'chat', hasSubmenu: true },
      { id: 'voice-video', label: 'Voice & Video', icon: 'phone', hasSubmenu: true },
      { id: 'ai-agents', label: 'AI Agents', icon: 'ai', hasSubmenu: true },
      { id: 'byo-agents', label: 'BYO Agents', icon: 'byo', hasSubmenu: true },
    ]
  },
  features: {
    label: 'FEATURES',
    items: [
      { id: 'moderation', label: 'Moderation', icon: 'moderation', hasSubmenu: true },
      { id: 'notifications', label: 'Notifications', icon: 'bell' },
      { id: 'insights', label: 'Insights', icon: 'chart' },
    ]
  },
  account: {
    label: 'ACCOUNT',
    items: [
      { id: 'application', label: 'Application', icon: 'grid', hasSubmenu: true },
      { id: 'profile', label: 'Profile', icon: 'profile', hasChevron: true },
      { id: 'resources', label: 'Resources', icon: 'resources', hasChevron: true },
    ]
  }
};

const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    overview: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
    users: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    chat: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
    ),
    phone: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.05 5A5 5 0 0119 8.95M15.05 1A9 9 0 0123 8.94m-1 7.98v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    ai: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    byo: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    ),
    moderation: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    bell: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    ),
    chart: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    grid: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    profile: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M7 20.662V19a2 2 0 012-2h6a2 2 0 012 2v1.662"/>
      </svg>
    ),
    resources: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
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
  };
  return icons[name] || null;
};

export default function Sidebar({ activePage = 'user-roles' }) {
  const [openMenus, setOpenMenus] = useState(['users-groups']);

  const toggleMenu = (id) => {
    setOpenMenus(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const renderNavItem = (item) => {
    const isOpen = openMenus.includes(item.id);
    const hasActiveSubmenu = item.submenu?.some(s => s.id === activePage);

    return (
      <li key={item.id}>
        <button
          onClick={() => item.hasSubmenu && toggleMenu(item.id)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
            hasActiveSubmenu
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon name={item.icon} className="w-5 h-5" />
            <span>{item.label}</span>
          </div>
          {(item.hasSubmenu || item.hasChevron) && (
            <Icon
              name={item.hasSubmenu ? (isOpen ? 'chevronDown' : 'chevronDown') : 'chevronRight'}
              className="w-4 h-4 text-gray-400"
            />
          )}
        </button>

        {item.submenu && isOpen && (
          <ul className="mt-1 ml-8 space-y-1">
            {item.submenu.map((subItem) => (
              <li key={subItem.id}>
                <Link
                  to={subItem.path}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    activePage === subItem.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-semibold text-gray-900 text-lg">cometchat</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        {Object.entries(navStructure).map(([key, section]) => (
          <div key={key} className="mb-6">
            <div className="px-3 mb-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {section.label}
              </span>
            </div>
            <ul className="space-y-1">
              {section.items.map(renderNavItem)}
            </ul>
          </div>
        ))}
      </nav>

      {/* App Selector */}
      <div className="p-3 border-t border-gray-200">
        <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-red-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">No Broker</p>
              <p className="text-xs text-gray-500">240998KMSF2025</p>
            </div>
          </div>
          <Icon name="chevronSelector" className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </aside>
  );
}
