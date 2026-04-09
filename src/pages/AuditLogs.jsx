import { useState } from 'react';

// Generate timestamps relative to now so they always display correctly
const now = Date.now();
const mins = (m) => new Date(now - m * 60000).toISOString();
const hrs = (h) => new Date(now - h * 3600000).toISOString();

// --- Sample Audit Log Data (realistic actions from the auditable actions catalog) ---
const sampleLogs = [
  { id: 'log-001', timestamp: mins(5), actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' }, action: 'Delete API key', resource: { section: 'API Keys & Credentials', path: 'API Key → ••••••3f2a' }, outcome: 'success', source: 'Dashboard', ip: '192.168.1.42', changes: { type: 'delete', details: [{ key: 'Key ID', value: '••••••3f2a' }, { key: 'Type', value: 'REST API Key' }, { key: 'Created', value: 'Mar 1, 2026' }] } },
  { id: 'log-002', timestamp: mins(12), actor: { name: 'James Wilson', email: 'james@acmecorp.com', role: 'Admin' }, action: 'Create user', resource: { section: 'Users', path: 'Users → michael@acmecorp.com' }, outcome: 'success', source: 'API', ip: '10.0.0.15', changes: { type: 'create', details: [{ key: 'UID', value: 'michael-001' }, { key: 'Name', value: 'Michael Scott' }, { key: 'Role', value: 'default' }] } },
  { id: 'log-003', timestamp: mins(38), actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' }, action: 'Create API key', resource: { section: 'API Keys & Credentials', path: 'API Key → ••••••9b1c' }, outcome: 'success', source: 'Dashboard', ip: '192.168.1.42', changes: { type: 'create', details: [{ key: 'Key ID', value: '••••••9b1c' }, { key: 'Type', value: 'REST API Key' }, { key: 'Scope', value: 'Full Access' }] } },
  { id: 'log-004', timestamp: mins(55), actor: { name: 'Priya Sharma', email: 'priya@acmecorp.com', role: 'Admin' }, action: 'Update moderation rule', resource: { section: 'Messages & Moderation', path: 'Moderation → Profanity Filter' }, outcome: 'success', source: 'Dashboard', ip: '172.16.0.8', changes: { type: 'update', field: 'Profanity Filter', before: 'Disabled', after: 'Enabled' } },
  { id: 'log-005', timestamp: hrs(1.5), actor: { name: 'James Wilson', email: 'james@acmecorp.com', role: 'Admin' }, action: 'Delete user', resource: { section: 'Users', path: 'Users → temp-user@test.com' }, outcome: 'success', source: 'Dashboard', ip: '10.0.0.15', changes: { type: 'delete', details: [{ key: 'UID', value: 'temp-user-01' }, { key: 'Name', value: 'temp-user@test.com' }, { key: 'Type', value: 'Permanent delete' }] } },
  { id: 'log-006', timestamp: hrs(3), actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' }, action: 'Update app settings', resource: { section: 'App Management', path: 'App Settings → Message Retention' }, outcome: 'success', source: 'Dashboard', ip: '192.168.1.42', changes: { type: 'update', field: 'Message Retention', before: '30 days', after: '90 days' } },
  { id: 'log-007', timestamp: hrs(4.5), actor: { name: 'Priya Sharma', email: 'priya@acmecorp.com', role: 'Admin' }, action: 'Configure APNs', resource: { section: 'Push Notifications', path: 'Push Provider → APNs' }, outcome: 'success', source: 'Dashboard', ip: '172.16.0.8', changes: { type: 'update', field: 'Push Provider', before: 'FCM', after: 'APNs' } },
  { id: 'log-008', timestamp: hrs(6), actor: { name: 'James Wilson', email: 'james@acmecorp.com', role: 'Admin' }, action: 'Login', resource: { section: 'Authentication & Account', path: 'Dashboard Login' }, outcome: 'success', source: 'Dashboard', ip: '10.0.0.15', changes: { type: 'event', details: [{ key: 'Method', value: 'Email + Password' }, { key: 'Browser', value: 'Chrome 124' }] } },
  { id: 'log-009', timestamp: hrs(22), actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' }, action: 'Update role permissions', resource: { section: 'Roles & Permissions', path: 'Role → Admin → Permissions' }, outcome: 'success', source: 'Dashboard', ip: '192.168.1.42', changes: { type: 'update', field: 'Messages → Send', before: 'Deny', after: 'Allow' } },
  { id: 'log-010', timestamp: hrs(26), actor: { name: 'Priya Sharma', email: 'priya@acmecorp.com', role: 'Admin' }, action: 'Update AI agent', resource: { section: 'AI Agents & Bots', path: 'AI Agents → Support Agent' }, outcome: 'success', source: 'API', ip: '172.16.0.8', changes: { type: 'update', field: 'Status', before: 'Enabled', after: 'Disabled' } },
  { id: 'log-011', timestamp: hrs(30), actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' }, action: 'Create bot', resource: { section: 'AI Agents & Bots', path: 'BYO Agents → OrderTracker' }, outcome: 'success', source: 'Dashboard', ip: '192.168.1.42', changes: { type: 'create', details: [{ key: 'Bot Name', value: 'OrderTracker' }, { key: 'Type', value: 'BYO Agent' }, { key: 'Status', value: 'Enabled' }] } },
  { id: 'log-012', timestamp: hrs(34), actor: { name: 'James Wilson', email: 'james@acmecorp.com', role: 'Admin' }, action: 'Create webhook', resource: { section: 'Webhooks', path: 'Webhooks → https://api.acmecorp.com/hooks' }, outcome: 'success', source: 'API', ip: '10.0.0.15', changes: { type: 'create', details: [{ key: 'URL', value: 'https://api.acmecorp.com/hooks' }, { key: 'Events', value: 'All events' }] } },
  { id: 'log-013', timestamp: hrs(40), actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' }, action: 'Subscribe to plan', resource: { section: 'Billing & Subscriptions', path: 'Plans → Enterprise' }, outcome: 'success', source: 'Dashboard', ip: '192.168.1.42', changes: { type: 'update', field: 'Plan', before: 'Growth', after: 'Enterprise' } },
  { id: 'log-014', timestamp: hrs(44), actor: { name: 'Priya Sharma', email: 'priya@acmecorp.com', role: 'Admin' }, action: 'Ban user from group', resource: { section: 'Users', path: 'Groups → Hiking Group → spammer42' }, outcome: 'success', source: 'Dashboard', ip: '172.16.0.8', changes: { type: 'event', details: [{ key: 'User', value: 'spammer42' }, { key: 'Group', value: 'Hiking Group' }, { key: 'Reason', value: 'Spam' }] } },
  { id: 'log-015', timestamp: hrs(48), actor: { name: 'James Wilson', email: 'james@acmecorp.com', role: 'Admin' }, action: 'Block flagged message', resource: { section: 'Messages & Moderation', path: 'Flagged Messages → msg-889271' }, outcome: 'success', source: 'Dashboard', ip: '10.0.0.15', changes: { type: 'update', field: 'Status', before: 'Flagged', after: 'Blocked' } },
  { id: 'log-016', timestamp: hrs(56), actor: { name: 'Sarah Chen', email: 'sarah@acmecorp.com', role: 'Owner' }, action: 'Add collaborator', resource: { section: 'Team Management', path: 'Team Members → david@acmecorp.com' }, outcome: 'success', source: 'Dashboard', ip: '192.168.1.42', changes: { type: 'create', details: [{ key: 'Email', value: 'david@acmecorp.com' }, { key: 'Role', value: 'Developer' }] } },
  { id: 'log-017', timestamp: hrs(60), actor: { name: 'James Wilson', email: 'james@acmecorp.com', role: 'Admin' }, action: 'Enable extension', resource: { section: 'Extensions & Widgets', path: 'Extensions → Message Translation' }, outcome: 'success', source: 'API', ip: '10.0.0.15', changes: { type: 'update', field: 'Message Translation', before: 'Disabled', after: 'Enabled' } },
  { id: 'log-018', timestamp: hrs(72), actor: { name: 'Priya Sharma', email: 'priya@acmecorp.com', role: 'Admin' }, action: 'Create group', resource: { section: 'Groups', path: 'Groups → Engineering Team' }, outcome: 'success', source: 'Dashboard', ip: '172.16.0.8', changes: { type: 'create', details: [{ key: 'Name', value: 'Engineering Team' }, { key: 'Type', value: 'Private' }, { key: 'GUID', value: 'eng-team-001' }] } },
];

const actionStyles = {
  'Create': 'bg-green-100 text-green-800',
  'Update': 'bg-blue-100 text-blue-800',
  'Delete': 'bg-red-100 text-red-800',
  'Enable': 'bg-green-100 text-green-800',
  'Disable': 'bg-yellow-100 text-yellow-800',
  'Login': 'bg-gray-100 text-gray-600',
  'Logout': 'bg-gray-100 text-gray-600',
  'Ban': 'bg-red-100 text-red-800',
  'Block': 'bg-red-100 text-red-800',
  'Config': 'bg-blue-100 text-blue-800',
  'Subscribe': 'bg-green-100 text-green-800',
};

// Map full action names to style keys
const getActionStyle = (action) => {
  const lower = action.toLowerCase();
  if (lower.startsWith('create') || lower.startsWith('accept')) return actionStyles['Create'];
  if (lower.startsWith('update') || lower.startsWith('configure')) return actionStyles['Update'];
  if (lower.startsWith('delete') || lower.startsWith('remove') || lower.startsWith('kick')) return actionStyles['Delete'];
  if (lower.startsWith('enable')) return actionStyles['Enable'];
  if (lower.startsWith('disable') || lower.startsWith('deactivate') || lower.startsWith('unsubscribe')) return actionStyles['Disable'];
  if (lower === 'login' || lower === 'login with otp' || lower === 'logout' || lower === 'signup') return actionStyles['Login'];
  if (lower.startsWith('ban') || lower.startsWith('block') || lower.startsWith('reject')) return actionStyles['Ban'];
  if (lower.startsWith('subscribe')) return actionStyles['Subscribe'];
  return 'bg-gray-100 text-gray-600';
};

const formatTime = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  const diffMin = Math.floor((now - d) / 60000);
  const diffHr = Math.floor((now - d) / 3600000);
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  if (diffMin < 60) return { primary: `${diffMin}m ago`, secondary: time };
  if (diffHr < 24) return { primary: `${diffHr}h ago`, secondary: time };
  return { primary: date, secondary: time };
};

const AuditLogs = () => {
  const [viewState, setViewState] = useState('enterprise');
  const [selectedLog, setSelectedLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pivotActor, setPivotActor] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [actorFilter, setActorFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showExport, setShowExport] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const actors = [...new Set(sampleLogs.map(l => l.actor.name))];
  const actionsForSection = sectionFilter
    ? [...new Set(sampleLogs.filter(l => l.resource.section === sectionFilter).map(l => l.action))]
    : [...new Set(sampleLogs.map(l => l.action))];
  const sections = ['Authentication & Account', 'Team Management', 'App Management', 'Users', 'Groups', 'Roles & Permissions', 'Messages & Moderation', 'Webhooks', 'API Keys & Credentials', 'AI Agents & Bots', 'Push Notifications', 'Billing & Subscriptions', 'Extensions & Widgets'];
  const sources = ['Dashboard', 'API'];
  const dateOptions = ['Last 24 hours', 'Last 7 days', 'Last 30 days', 'Last 90 days'];

  const filteredLogs = sampleLogs.filter(log => {
    if (pivotActor && log.actor.name !== pivotActor) return false;
    if (actorFilter && log.actor.name !== actorFilter) return false;
    if (actionFilter && log.action !== actionFilter) return false;
    if (sectionFilter && log.resource.section !== sectionFilter) return false;
    if (sourceFilter && log.source !== sourceFilter) return false;
    return true;
  });

  const hasActiveFilters = dateFilter || actorFilter || actionFilter || sectionFilter || sourceFilter || pivotActor;
  const clearAllFilters = () => { setDateFilter(''); setActorFilter(''); setActionFilter(''); setSectionFilter(''); setSourceFilter(''); setPivotActor(null); };
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / 10));

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Audit Logs</h1>
          <p className="mt-0.5 text-sm text-gray-500">Track all actions performed on this app</p>
        </div>
        <div className="flex items-center gap-3">
          {/* State switcher — prototype only */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden text-xs">
            {['enterprise', 'empty', 'gated'].map(s => (
              <button key={s} onClick={() => setViewState(s)} className={`px-3 py-1.5 transition-colors capitalize ${viewState === s ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                {s}
              </button>
            ))}
          </div>
          {(viewState === 'enterprise' || viewState === 'empty' || viewState === 'gated') && (
            <>
              <div className="relative">
                <button onClick={() => viewState === 'enterprise' && setShowExport(!showExport)} className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg flex items-center gap-2 ${viewState !== 'enterprise' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Export
                </button>
                {showExport && viewState === 'enterprise' && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowExport(false)} />
                    <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1">
                      <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">Export as CSV</button>
                      <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">Export as JSON</button>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => viewState === 'enterprise' && setShowFilters(!showFilters)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border flex items-center gap-2 transition-colors ${viewState !== 'enterprise' ? 'border-gray-200 bg-white text-gray-700 opacity-50 cursor-not-allowed' : showFilters || hasActiveFilters ? 'border-purple-300 bg-purple-50 text-purple-700' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
                Filter
                {hasActiveFilters && (
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {[dateFilter, actorFilter, actionFilter, sectionFilter, sourceFilter, pivotActor].filter(Boolean).length}
                  </span>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* === ENTERPRISE POPULATED STATE === */}
      {viewState === 'enterprise' && (
        <>
          {/* Filter Chips + Pivot (shown when filters toggled on) */}
          {(showFilters || pivotActor) && (
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-2.5 flex-wrap">
              {showFilters && [
                { key: 'date', label: 'Date range', options: dateOptions, value: dateFilter, set: setDateFilter },
                { key: 'actor', label: 'Actor', options: actors, value: actorFilter, set: (v) => { setActorFilter(v); if (v) setPivotActor(null); } },
                { key: 'section', label: 'Section', options: sections, value: sectionFilter, set: (v) => { setSectionFilter(v); setActionFilter(''); } },
                { key: 'action', label: 'Action', options: actionsForSection, value: actionFilter, set: setActionFilter },
                { key: 'source', label: 'Source', options: sources, value: sourceFilter, set: setSourceFilter },
              ].map(f => (
                <div key={f.key} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === f.key ? null : f.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition-colors ${f.value ? 'border-purple-300 bg-purple-50 text-purple-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 5v14M5 12h14"/></svg>
                    <span>{f.value || f.label}</span>
                  </button>
                  {openDropdown === f.key && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
                      <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                        {/* Search */}
                        <div className="p-2 border-b border-gray-100">
                          <div className="relative">
                            <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            <input type="text" placeholder="Search" className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200" />
                          </div>
                        </div>
                        {/* Options */}
                        <div className="max-h-48 overflow-auto py-1">
                          {f.options.map(opt => (
                            <button key={opt} onClick={() => { f.set(f.value === opt ? '' : opt); setOpenDropdown(null); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2.5">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${f.value === opt ? 'bg-purple-600 border-purple-600' : 'border-gray-300'}`}>
                                {f.value === opt && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7"/></svg>}
                              </div>
                              <span className="text-gray-700">{opt}</span>
                            </button>
                          ))}
                        </div>
                        {/* Footer */}
                        <div className="px-3 py-2 border-t border-gray-100 flex items-center justify-between">
                          <button onClick={() => { f.set(''); setOpenDropdown(null); }} className="text-sm text-gray-500 hover:text-gray-700">Clear</button>
                          <button onClick={() => setOpenDropdown(null)} className="px-3 py-1 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">Apply</button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Investigation pivot chip */}
              {pivotActor && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-xs font-medium text-purple-700">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  {pivotActor}
                  <button onClick={() => setPivotActor(null)} className="hover:text-purple-900">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </span>
              )}

              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Clear all</button>
              )}
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto p-6">
            <div className="bg-white rounded-xl border border-gray-200">
              {/* Table Header */}
              <div className="px-6 py-3 border-b border-gray-100 grid grid-cols-12 gap-4 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-2">Timestamp <span className="normal-case tracking-normal font-normal text-gray-400">({Intl.DateTimeFormat().resolvedOptions().timeZone})</span></div>
                <div className="col-span-3">Actor</div>
                <div className="col-span-2">Action</div>
                <div className="col-span-3">Resource</div>
                <div className="col-span-1">Source</div>
                <div className="col-span-1">Outcome</div>
              </div>
              {/* Table Rows */}
              <div className="divide-y divide-gray-100">
                {filteredLogs.map((log) => {
                  const t = formatTime(log.timestamp);
                  return (
                    <div
                      key={log.id}
                      onClick={() => setSelectedLog(log)}
                      className={`px-6 py-4 grid grid-cols-12 gap-4 items-center cursor-pointer transition-colors ${selectedLog?.id === log.id ? 'bg-purple-50' : 'hover:bg-gray-50/50'}`}
                    >
                      <div className="col-span-2">
                        <span className="text-sm text-gray-900 block">{t.primary}</span>
                        <span className="text-xs text-gray-500">{t.secondary}</span>
                      </div>
                      <div className="col-span-3 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-bold text-white">{log.actor.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="min-w-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); setPivotActor(log.actor.name); setActorFilter(''); }}
                            className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline truncate block text-left"
                          >
                            {log.actor.name}
                          </button>
                          <span className="text-xs text-gray-500">{log.actor.role}</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionStyle(log.action)}`}>
                          {log.action}
                        </span>
                      </div>
                      <div className="col-span-3 min-w-0">
                        <span className="text-sm text-gray-900 block truncate">{log.resource.path}</span>
                        {log.changes?.type === 'update' && <span className="text-xs text-gray-500 truncate block">{log.changes.before} → {log.changes.after}</span>}
                      </div>
                      <div className="col-span-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${log.source === 'API' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                          {log.source}
                        </span>
                      </div>
                      <div className="col-span-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${log.outcome === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {log.outcome === 'success' ? 'Success' : 'Failed'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* No results */}
            {filteredLogs.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No logs match the current filters</h3>
                <p className="text-sm text-gray-500">Try adjusting your filters or <button onClick={clearAllFilters} className="text-purple-600 hover:text-purple-700">clear all filters</button></p>
              </div>
            )}

            {/* Pagination */}
            {filteredLogs.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-500">Showing {Math.min((currentPage - 1) * 10 + 1, filteredLogs.length)}–{Math.min(currentPage * 10, filteredLogs.length)} of {filteredLogs.length} entries</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${currentPage === i + 1 ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{i + 1}</button>
                  ))}
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Side Panel Detail */}
          {selectedLog && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setSelectedLog(null)} />
              <div className="absolute right-0 top-0 bottom-0 w-[400px] bg-white border-l border-gray-200 shadow-xl z-30 flex flex-col" style={{ animation: 'slideInRight 0.2s ease-out' }}>
                {/* Panel Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Log Entry Detail</h3>
                  <button onClick={() => setSelectedLog(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
                {/* Panel Content */}
                <div className="flex-1 overflow-auto">
                  {/* Hero: Resource + Action badges */}
                  <div className="px-6 py-5 border-b border-gray-100">
                    <p className="text-base font-semibold text-gray-900">{selectedLog.resource.path}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{selectedLog.resource.section}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionStyle(selectedLog.action)}`}>{selectedLog.action}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedLog.outcome === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{selectedLog.outcome === 'success' ? 'Success' : 'Failed'}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${selectedLog.source === 'API' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>{selectedLog.source}</span>
                    </div>
                  </div>

                  {/* Actor */}
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-bold text-white">{selectedLog.actor.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{selectedLog.actor.name}</p>
                      <p className="text-xs text-gray-500">{selectedLog.actor.email}</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 flex-shrink-0">{selectedLog.actor.role}</span>
                  </div>

                  {/* Metadata grid */}
                  <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Date</label>
                      <p className="mt-1 text-sm text-gray-900">{new Date(selectedLog.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Time</label>
                      <p className="mt-1 text-sm text-gray-900">{new Date(selectedLog.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Source IP</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono">{selectedLog.ip}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Source</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedLog.source === 'API' ? 'Management API' : 'Dashboard UI'}</p>
                    </div>
                  </div>

                  {/* Changes / Details */}
                  <div className="px-6 py-4">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      {selectedLog.changes?.type === 'update' ? 'Changes' : selectedLog.changes?.type === 'create' ? 'Created' : selectedLog.changes?.type === 'delete' ? 'Removed' : 'Context'}
                    </label>

                    {selectedLog.changes?.type === 'update' && (
                      <div className="mt-3 bg-gray-50 rounded-xl p-4 space-y-3">
                        <p className="text-xs font-medium text-gray-700">{selectedLog.changes.field}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Old value</span>
                            <div className="mt-1 px-3 py-2 bg-white border border-red-200 rounded-lg text-sm text-gray-900">{selectedLog.changes.before}</div>
                          </div>
                          <div>
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">New value</span>
                            <div className="mt-1 px-3 py-2 bg-white border border-green-200 rounded-lg text-sm text-gray-900">{selectedLog.changes.after}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedLog.changes?.details && (
                      <div className="mt-3 bg-gray-50 rounded-xl overflow-hidden">
                        {selectedLog.changes.details.map((d, i) => (
                          <div key={i} className={`px-4 py-3 flex items-center justify-between ${i > 0 ? 'border-t border-gray-200/60' : ''}`}>
                            <span className="text-xs text-gray-500">{d.key}</span>
                            <span className="text-sm text-gray-900">{d.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* === EMPTY STATE === */}
      {viewState === 'empty' && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No activity recorded yet</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Audit logs will appear here as actions are performed on this app. All settings changes, user management, feature toggles, and login/logout events are automatically logged.</p>
          </div>
        </div>
      )}

      {/* === PLAN-GATED STATE === */}
      {viewState === 'gated' && (
        <div className="flex-1 relative overflow-hidden">
          {/* Blurred sample content */}
          <div className="pointer-events-none select-none" style={{ filter: 'blur(4px)' }}>
            <div className="px-6 py-3 border-b border-gray-200 flex gap-3">
              {['Last 7 days', 'All actors', 'All actions', 'All sections'].map(l => (
                <div key={l} className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-400">{l}</div>
              ))}
            </div>
            <div className="px-6">
              <div className="py-3 border-b border-gray-100 grid grid-cols-12 gap-4 bg-gray-50/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <div className="col-span-2">Timestamp <span className="normal-case tracking-normal font-normal text-gray-400">({Intl.DateTimeFormat().resolvedOptions().timeZone})</span></div>
                <div className="col-span-3">Actor</div>
                <div className="col-span-2">Action</div>
                <div className="col-span-3">Resource</div>
                <div className="col-span-1">Source</div>
                <div className="col-span-1">Outcome</div>
              </div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="py-4 grid grid-cols-12 gap-4 border-b border-gray-100">
                  <div className="col-span-2"><div className="h-4 bg-gray-200 rounded w-20" /></div>
                  <div className="col-span-3"><div className="h-4 bg-gray-200 rounded w-32" /></div>
                  <div className="col-span-2"><div className="h-4 bg-gray-200 rounded w-16" /></div>
                  <div className="col-span-3"><div className="h-4 bg-gray-200 rounded w-36" /></div>
                  <div className="col-span-1"><div className="h-4 bg-gray-200 rounded w-10" /></div>
                  <div className="col-span-1"><div className="h-4 bg-gray-200 rounded w-14" /></div>
                </div>
              ))}
            </div>
          </div>
          {/* Upgrade CTA overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <div className="text-center bg-white border border-gray-200 rounded-2xl shadow-lg px-10 py-8 max-w-md">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Audit Logs</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">Track every action performed on your Dashboard — who changed what, when, and why. Includes before/after diffs, export, and webhook delivery.</p>
              <button className="mt-5 px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">Upgrade to Enterprise</button>
              <p className="mt-3 text-xs text-gray-400">Available on the Enterprise plan</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default AuditLogs;
