import { useState } from 'react';

// Sample audit log data
const sampleLogs = [
  {
    id: 'log-001',
    timestamp: '2026-04-09T14:32:18Z',
    actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' },
    action: 'Updated',
    resource: { section: 'Products', path: 'Chat & Messaging → Message Translation', type: 'setting' },
    outcome: 'success',
    ip: '192.168.1.42',
    changes: { field: 'Message Translation', before: 'Disabled', after: 'Enabled' }
  },
  {
    id: 'log-002',
    timestamp: '2026-04-09T14:28:05Z',
    actor: { name: 'James Wilson', email: 'james@acmecorp.com', role: 'Admin' },
    action: 'Created',
    resource: { section: 'General', path: 'Users → michael@acmecorp.com', type: 'user' },
    outcome: 'success',
    ip: '10.0.0.15',
    changes: null
  },
  {
    id: 'log-003',
    timestamp: '2026-04-09T13:55:41Z',
    actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' },
    action: 'Updated',
    resource: { section: 'Account', path: 'Application → API Key', type: 'credential' },
    outcome: 'success',
    ip: '192.168.1.42',
    changes: { field: 'API Key', before: '••••••3f2a', after: '••••••9b1c (rotated)' }
  },
  {
    id: 'log-004',
    timestamp: '2026-04-09T13:45:22Z',
    actor: { name: 'Priya Sharma', email: 'priya@acmecorp.com', role: 'Admin' },
    action: 'Enabled',
    resource: { section: 'Platform Features', path: 'Moderation → Profanity Filter', type: 'setting' },
    outcome: 'success',
    ip: '172.16.0.8',
    changes: { field: 'Profanity Filter', before: 'Disabled', after: 'Enabled' }
  },
  {
    id: 'log-005',
    timestamp: '2026-04-09T12:30:10Z',
    actor: { name: 'James Wilson', email: 'james@acmecorp.com', role: 'Admin' },
    action: 'Deleted',
    resource: { section: 'General', path: 'Users → temp-user@test.com', type: 'user' },
    outcome: 'success',
    ip: '10.0.0.15',
    changes: null
  },
  {
    id: 'log-006',
    timestamp: '2026-04-09T11:18:33Z',
    actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' },
    action: 'Updated',
    resource: { section: 'Products', path: 'Chat & Messaging → Message Retention', type: 'setting' },
    outcome: 'success',
    ip: '192.168.1.42',
    changes: { field: 'Message Retention', before: '30 days', after: '90 days' }
  },
  {
    id: 'log-007',
    timestamp: '2026-04-09T10:05:47Z',
    actor: { name: 'Priya Sharma', email: 'priya@acmecorp.com', role: 'Admin' },
    action: 'Updated',
    resource: { section: 'Platform Features', path: 'Notification Engine → Push Provider', type: 'setting' },
    outcome: 'success',
    ip: '172.16.0.8',
    changes: { field: 'Push Provider', before: 'FCM', after: 'APNs' }
  },
  {
    id: 'log-008',
    timestamp: '2026-04-09T09:42:15Z',
    actor: { name: 'James Wilson', email: 'james@acmecorp.com', role: 'Admin' },
    action: 'Logged in',
    resource: { section: 'Account', path: 'Dashboard Login', type: 'auth' },
    outcome: 'success',
    ip: '10.0.0.15',
    changes: null
  },
  {
    id: 'log-009',
    timestamp: '2026-04-08T18:20:00Z',
    actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' },
    action: 'Updated',
    resource: { section: 'Account', path: 'Application → Team Members → james@acmecorp.com', type: 'team' },
    outcome: 'success',
    ip: '192.168.1.42',
    changes: { field: 'Role', before: 'Developer', after: 'Admin' }
  },
  {
    id: 'log-010',
    timestamp: '2026-04-08T16:55:30Z',
    actor: { name: 'Priya Sharma', email: 'priya@acmecorp.com', role: 'Admin' },
    action: 'Disabled',
    resource: { section: 'Products', path: 'AI Agents → Support Agent', type: 'agent' },
    outcome: 'success',
    ip: '172.16.0.8',
    changes: { field: 'Support Agent', before: 'Enabled', after: 'Disabled' }
  },
  {
    id: 'log-011',
    timestamp: '2026-04-08T15:10:22Z',
    actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' },
    action: 'Created',
    resource: { section: 'Products', path: 'BYO Agents → Custom Bot: OrderTracker', type: 'bot' },
    outcome: 'success',
    ip: '192.168.1.42',
    changes: null
  },
  {
    id: 'log-012',
    timestamp: '2026-04-08T14:00:11Z',
    actor: { name: 'James Wilson', email: 'james@acmecorp.com', role: 'Admin' },
    action: 'Updated',
    resource: { section: 'Products', path: 'Voice & Video Calls → Recording', type: 'setting' },
    outcome: 'success',
    ip: '10.0.0.15',
    changes: { field: 'Call Recording', before: 'Disabled', after: 'Enabled' }
  },
];

const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    filter: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
      </svg>
    ),
    download: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
      </svg>
    ),
    x: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    ),
    chevronDown: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    ),
    chevronLeft: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    ),
    chevronRight: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    ),
    arrowRight: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
    clock: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    user: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    shield: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    globe: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    fileText: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
    lock: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    sparkles: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (diffMins < 60) return { primary: `${diffMins}m ago`, secondary: timeStr };
  if (diffHours < 24) return { primary: `${diffHours}h ago`, secondary: timeStr };
  return { primary: dateStr, secondary: timeStr };
};

const actionColors = {
  'Created': 'bg-green-50 text-green-700',
  'Updated': 'bg-blue-50 text-blue-700',
  'Deleted': 'bg-red-50 text-red-700',
  'Enabled': 'bg-green-50 text-green-700',
  'Disabled': 'bg-amber-50 text-amber-700',
  'Logged in': 'bg-gray-100 text-gray-600',
  'Logged out': 'bg-gray-100 text-gray-600',
};

const outcomeColors = {
  'success': 'bg-green-50 text-green-700',
  'failure': 'bg-red-50 text-red-700',
};

// Dropdown filter component
function FilterDropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
          value ? 'border-purple-300 bg-purple-50 text-purple-700' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span>{value || label}</span>
        <Icon name="chevronDown" className="w-3.5 h-3.5" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 max-h-64 overflow-auto">
            <button
              onClick={() => { onChange(''); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${!value ? 'text-purple-600 font-medium' : 'text-gray-700'}`}
            >
              All
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${value === opt ? 'text-purple-600 font-medium' : 'text-gray-700'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Side panel detail view
function DetailPanel({ log, onClose }) {
  if (!log) return null;

  const time = formatTimestamp(log.timestamp);

  return (
    <>
      <div className="fixed inset-0 z-20" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[400px] bg-white border-l border-gray-200 shadow-xl z-30 flex flex-col overflow-hidden"
           style={{ animation: 'slideInRight 0.2s ease-out' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Log Entry Detail</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <Icon name="x" className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Action + Outcome */}
          <div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${actionColors[log.action] || 'bg-gray-100 text-gray-600'}`}>
                {log.action}
              </span>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${outcomeColors[log.outcome]}`}>
                {log.outcome === 'success' ? 'Success' : 'Failed'}
              </span>
            </div>
          </div>

          {/* Resource */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</label>
            <p className="mt-1.5 text-sm text-gray-900">{log.resource.path}</p>
            <p className="mt-0.5 text-xs text-gray-500">{log.resource.section}</p>
          </div>

          {/* Timestamp */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</label>
            <p className="mt-1.5 text-sm text-gray-900">
              {new Date(log.timestamp).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="mt-0.5 text-xs text-gray-500">
              {new Date(log.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZoneName: 'short' })}
            </p>
          </div>

          {/* Actor */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actor</label>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-xs font-semibold text-purple-700">
                  {log.actor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{log.actor.name}</p>
                <p className="text-xs text-gray-500">{log.actor.email}</p>
              </div>
            </div>
            <span className="mt-2 inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
              {log.actor.role}
            </span>
          </div>

          {/* Source IP */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Source IP</label>
            <p className="mt-1.5 text-sm text-gray-900 font-mono">{log.ip}</p>
          </div>

          {/* Before / After */}
          {log.changes && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Changes</label>
              <div className="mt-2 border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                  <span className="text-xs font-medium text-gray-700">{log.changes.field}</span>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-red-400" />
                    <div>
                      <span className="text-xs text-gray-500">Before</span>
                      <p className="text-sm text-gray-900 bg-red-50 px-2 py-1 rounded mt-0.5">{log.changes.before}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-green-400" />
                    <div>
                      <span className="text-xs text-gray-500">After</span>
                      <p className="text-sm text-gray-900 bg-green-50 px-2 py-1 rounded mt-0.5">{log.changes.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No changes for non-mutation actions */}
          {!log.changes && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Changes</label>
              <p className="mt-1.5 text-sm text-gray-500 italic">No value changes — {log.action.toLowerCase()} action</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Empty state for enterprise customers with no logs
function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center p-12">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-5">
          <Icon name="fileText" className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No activity recorded yet</h3>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Audit logs will appear here as actions are performed on this app. All settings changes, user management, feature toggles, and login/logout events are automatically logged.
        </p>
      </div>
    </div>
  );
}

// Plan-gated state for non-enterprise customers
function PlanGatedState() {
  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Blurred sample content */}
      <div className="pointer-events-none select-none" style={{ filter: 'blur(4px)' }}>
        {/* Fake filter bar */}
        <div className="px-6 py-3 border-b border-gray-200 flex gap-3">
          <div className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-400 w-36">Last 7 days</div>
          <div className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-400 w-32">All actors</div>
          <div className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-400 w-32">All actions</div>
          <div className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-400 w-32">All sections</div>
        </div>
        {/* Fake table */}
        <div className="px-6">
          <div className="grid grid-cols-12 gap-4 py-3 border-b border-gray-100">
            <div className="col-span-2 text-xs font-medium text-gray-400 uppercase">Timestamp</div>
            <div className="col-span-3 text-xs font-medium text-gray-400 uppercase">Actor</div>
            <div className="col-span-2 text-xs font-medium text-gray-400 uppercase">Action</div>
            <div className="col-span-4 text-xs font-medium text-gray-400 uppercase">Resource</div>
            <div className="col-span-1 text-xs font-medium text-gray-400 uppercase">Outcome</div>
          </div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 py-3.5 border-b border-gray-100">
              <div className="col-span-2"><div className="h-4 bg-gray-200 rounded w-20" /></div>
              <div className="col-span-3"><div className="h-4 bg-gray-200 rounded w-32" /></div>
              <div className="col-span-2"><div className="h-4 bg-gray-200 rounded w-16" /></div>
              <div className="col-span-4"><div className="h-4 bg-gray-200 rounded w-48" /></div>
              <div className="col-span-1"><div className="h-4 bg-gray-200 rounded w-14" /></div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay CTA */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
        <div className="text-center bg-white border border-gray-200 rounded-2xl shadow-lg px-10 py-8 max-w-md">
          <div className="mx-auto w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
            <Icon name="shield" className="w-7 h-7 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Audit Logs</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Track every action performed on your Dashboard — who changed what, when, and why. Includes before/after diffs, export, and webhook delivery.
          </p>
          <button className="mt-5 px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
            Upgrade to Enterprise
          </button>
          <p className="mt-3 text-xs text-gray-400">Available on the Enterprise plan</p>
        </div>
      </div>
    </div>
  );
}

// Main Audit Logs component
export default function AuditLogs() {
  // View state: 'enterprise' | 'empty' | 'gated'
  const [viewState, setViewState] = useState('enterprise');
  const [selectedLog, setSelectedLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [dateFilter, setDateFilter] = useState('');
  const [actorFilter, setActorFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');

  // Export dropdown
  const [showExport, setShowExport] = useState(false);

  // Active filters for investigation pivot
  const [pivotActor, setPivotActor] = useState(null);

  const actors = [...new Set(sampleLogs.map(l => l.actor.name))];
  const actions = [...new Set(sampleLogs.map(l => l.action))];
  const sections = ['General', 'Products', 'Platform Features', 'Account'];

  const dateOptions = ['Last 24 hours', 'Last 7 days', 'Last 30 days', 'Last 90 days'];

  // Filter logs
  const filteredLogs = sampleLogs.filter(log => {
    if (pivotActor && log.actor.name !== pivotActor) return false;
    if (actorFilter && log.actor.name !== actorFilter) return false;
    if (actionFilter && log.action !== actionFilter) return false;
    if (sectionFilter && log.resource.section !== sectionFilter) return false;
    return true;
  });

  const hasActiveFilters = dateFilter || actorFilter || actionFilter || sectionFilter || pivotActor;

  const clearAllFilters = () => {
    setDateFilter('');
    setActorFilter('');
    setActionFilter('');
    setSectionFilter('');
    setPivotActor(null);
  };

  const handleActorClick = (actorName, e) => {
    e.stopPropagation();
    setPivotActor(actorName);
    setActorFilter('');
  };

  const totalPages = Math.ceil(filteredLogs.length / 10);

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Audit Logs</h1>
          <p className="mt-0.5 text-sm text-gray-500">Track all actions performed on this app</p>
        </div>
        <div className="flex items-center gap-3">
          {/* State switcher (prototype only) */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden text-xs">
            <button
              onClick={() => setViewState('enterprise')}
              className={`px-3 py-1.5 transition-colors ${viewState === 'enterprise' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Enterprise
            </button>
            <button
              onClick={() => setViewState('empty')}
              className={`px-3 py-1.5 transition-colors ${viewState === 'empty' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Empty
            </button>
            <button
              onClick={() => setViewState('gated')}
              className={`px-3 py-1.5 transition-colors ${viewState === 'gated' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Gated
            </button>
          </div>

          {viewState === 'enterprise' && (
            <div className="relative">
              <button
                onClick={() => setShowExport(!showExport)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Icon name="download" className="w-4 h-4" />
                Export
              </button>
              {showExport && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowExport(false)} />
                  <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1">
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                      <Icon name="fileText" className="w-4 h-4 text-gray-400" />
                      Export as CSV
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                      <span className="w-4 h-4 text-gray-400 text-xs font-mono font-bold flex items-center justify-center">{'{}'}</span>
                      Export as JSON
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Conditional content */}
      {viewState === 'empty' && <EmptyState />}
      {viewState === 'gated' && <PlanGatedState />}
      {viewState === 'enterprise' && (
        <>
          {/* Filter bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 flex-wrap">
            <FilterDropdown
              label="Date range"
              options={dateOptions}
              value={dateFilter}
              onChange={setDateFilter}
            />
            <FilterDropdown
              label="Actor"
              options={actors}
              value={actorFilter}
              onChange={(val) => { setActorFilter(val); if (val) setPivotActor(null); }}
            />
            <FilterDropdown
              label="Action"
              options={actions}
              value={actionFilter}
              onChange={setActionFilter}
            />
            <FilterDropdown
              label="Section"
              options={sections}
              value={sectionFilter}
              onChange={setSectionFilter}
            />

            {/* Active filter chips */}
            {pivotActor && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-xs font-medium text-purple-700">
                <Icon name="user" className="w-3 h-3" />
                {pivotActor}
                <button onClick={() => setPivotActor(null)} className="ml-1 hover:text-purple-900">
                  <Icon name="x" className="w-3 h-3" />
                </button>
              </div>
            )}

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors ml-1"
              >
                Clear all
              </button>
            )}

            <div className="ml-auto text-xs text-gray-400">
              {filteredLogs.length} {filteredLogs.length === 1 ? 'entry' : 'entries'}
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50 sticky top-0">
              <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</div>
              <div className="col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actor</div>
              <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</div>
              <div className="col-span-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</div>
              <div className="col-span-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</div>
            </div>

            {/* Table rows */}
            {filteredLogs.map((log) => {
              const time = formatTimestamp(log.timestamp);
              return (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`grid grid-cols-12 gap-4 px-6 py-3.5 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedLog?.id === log.id ? 'bg-purple-50' : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Timestamp */}
                  <div className="col-span-2">
                    <p className="text-sm text-gray-900">{time.primary}</p>
                    <p className="text-xs text-gray-400">{time.secondary}</p>
                  </div>

                  {/* Actor */}
                  <div className="col-span-3 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-semibold text-purple-700">
                        {log.actor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <button
                        onClick={(e) => handleActorClick(log.actor.name, e)}
                        className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline truncate block"
                      >
                        {log.actor.name}
                      </button>
                      <p className="text-xs text-gray-400 truncate">{log.actor.role}</p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="col-span-2 flex items-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${actionColors[log.action] || 'bg-gray-100 text-gray-600'}`}>
                      {log.action}
                    </span>
                  </div>

                  {/* Resource */}
                  <div className="col-span-4 flex items-center">
                    <div className="min-w-0">
                      <p className="text-sm text-gray-900 truncate">{log.resource.path}</p>
                      {log.changes && (
                        <p className="text-xs text-gray-400 truncate">
                          {log.changes.before} → {log.changes.after}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="col-span-1 flex items-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${outcomeColors[log.outcome]}`}>
                      {log.outcome === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredLogs.length === 0 && (
              <div className="py-16 text-center">
                <Icon name="fileText" className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No logs match the current filters</p>
                <button onClick={clearAllFilters} className="mt-2 text-sm text-purple-600 hover:text-purple-700">
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredLogs.length > 0 && (
            <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Showing {Math.min((currentPage - 1) * 10 + 1, filteredLogs.length)}–{Math.min(currentPage * 10, filteredLogs.length)} of {filteredLogs.length} entries
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Icon name="chevronLeft" className="w-4 h-4 text-gray-600" />
                </button>
                {[...Array(Math.max(1, totalPages))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Icon name="chevronRight" className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          )}

          {/* Side panel */}
          {selectedLog && (
            <DetailPanel log={selectedLog} onClose={() => setSelectedLog(null)} />
          )}
        </>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
