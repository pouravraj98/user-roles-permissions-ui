import { useState } from 'react';

const GroupDetails = ({ group, onBack }) => {
  const [activeTab, setActiveTab] = useState('members');
  const [activeLayout, setActiveLayout] = useState('tabs');
  const [selectedScope, setSelectedScope] = useState('admin');
  const [expandedScope, setExpandedScope] = useState('admin');
  const [editingScope, setEditingScope] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Sample members data
  const members = [
    { name: 'Andrew Joseph', uid: 'cometchat-uid-1', role: 'Participant', added: 'Dec 04, 2025', avatar: '👨' },
    { name: 'George Alan', uid: 'cometchat-uid-2', role: 'Participant', added: 'Dec 04, 2025', avatar: '👨‍🦰' },
    { name: 'Nancy Grace', uid: 'cometchat-uid-3', role: 'Moderator', added: 'Dec 04, 2025', avatar: '👩' },
    { name: 'Susan Marie', uid: 'cometchat-uid-4', role: 'Participant', added: 'Dec 04, 2025', avatar: '👩‍🦱' },
    { name: 'John Smith', uid: 'cometchat-uid-5', role: 'Admin', added: 'Dec 04, 2025', avatar: '👨‍💼' },
  ];

  const [scopePermissions, setScopePermissions] = useState({
    admin: {
      sendMessages: 'allow', sendMedia: 'allow', sendStickers: 'allow', sendReactions: 'allow',
      createPolls: 'allow', pinMessages: 'allow', deleteOwnMessages: 'allow', deleteAnyMessage: 'allow',
      addMembers: 'allow', kickMembers: 'allow', banMembers: 'allow', changeUserScope: 'allow',
      editGroupInfo: 'allow', changeGroupType: 'allow',
    },
    moderator: {
      sendMessages: 'allow', sendMedia: 'allow', sendStickers: 'allow', sendReactions: 'allow',
      createPolls: 'allow', pinMessages: 'allow', deleteOwnMessages: 'allow', deleteAnyMessage: 'allow',
      addMembers: 'allow', kickMembers: 'allow', banMembers: 'deny', changeUserScope: 'deny',
      editGroupInfo: 'deny', changeGroupType: 'deny',
    },
    participant: {
      sendMessages: 'allow', sendMedia: 'allow', sendStickers: 'allow', sendReactions: 'allow',
      createPolls: 'deny', pinMessages: 'deny', deleteOwnMessages: 'allow', deleteAnyMessage: 'deny',
      addMembers: 'deny', kickMembers: 'deny', banMembers: 'deny', changeUserScope: 'deny',
      editGroupInfo: 'deny', changeGroupType: 'deny',
    }
  });

  const permissionConfig = {
    messaging: {
      label: 'MESSAGING',
      items: {
        sendMessages: { name: 'Send Messages', description: 'Allows/Denies sending text messages in the group' },
        sendMedia: { name: 'Send Media', description: 'Allows sending images, videos, and files' },
        sendStickers: { name: 'Send Stickers & GIFs', description: 'Allows sending stickers and animated GIFs' },
        sendReactions: { name: 'Send Reactions', description: 'Allows reacting to messages with emojis' },
      }
    },
    content: {
      label: 'CONTENT',
      items: {
        createPolls: { name: 'Create Polls', description: 'Allows creating polls for group voting' },
        pinMessages: { name: 'Pin Messages', description: 'Allows pinning important messages to the group' },
        deleteOwnMessages: { name: 'Delete Own Messages', description: 'Allows deleting own messages' },
        deleteAnyMessage: { name: 'Delete Any Message', description: 'Allows deleting any message in the group' },
      }
    },
    members: {
      label: 'MEMBERS',
      items: {
        addMembers: { name: 'Add Members', description: 'Allows inviting new members to the group' },
        kickMembers: { name: 'Kick Members', description: 'Allows removing members from the group' },
        banMembers: { name: 'Ban Members', description: 'Allows permanently banning members from the group' },
        changeUserScope: { name: 'Change Member Scope', description: 'Allows changing member roles (promote/demote)' },
      }
    },
    settings: {
      label: 'GROUP SETTINGS',
      items: {
        editGroupInfo: { name: 'Edit Group Info', description: 'Allows changing group name, icon, and description' },
        changeGroupType: { name: 'Change Group Type', description: 'Allows changing group between public/private/password' },
      }
    }
  };

  const scopeConfig = {
    admin: { label: 'Admin' },
    moderator: { label: 'Moderator' },
    participant: { label: 'Participant' }
  };

  const getPermissionCount = (scope) => {
    const perms = scopePermissions[scope];
    const allowed = Object.values(perms).filter(p => p === 'allow').length;
    return { allowed, total: Object.keys(perms).length };
  };

  const updatePermission = (scope, permKey, value) => {
    setScopePermissions(prev => ({
      ...prev,
      [scope]: { ...prev[scope], [permKey]: value }
    }));
  };

  // Dropdown Component
  const ValueDropdown = ({ scope, permKey, value }) => {
    const dropdownId = `${scope}-${permKey}`;
    const isOpen = openDropdown === dropdownId;

    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : dropdownId)}
          className={`
            w-28 px-3 py-1.5 text-left text-sm rounded-lg border transition-all
            flex items-center justify-between bg-white
            ${isOpen ? 'border-gray-400' : 'border-gray-200 hover:border-gray-300'}
          `}
        >
          <span className="text-gray-700">{value === 'allow' ? 'Allow' : 'Deny'}</span>
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
            <div className="absolute right-0 mt-1 w-28 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
              <button onClick={() => { updatePermission(scope, permKey, 'allow'); setOpenDropdown(null); }} className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${value === 'allow' ? 'bg-gray-50' : ''}`}>Allow</button>
              <button onClick={() => { updatePermission(scope, permKey, 'deny'); setOpenDropdown(null); }} className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${value === 'deny' ? 'bg-gray-50' : ''}`}>Deny</button>
            </div>
          </>
        )}
      </div>
    );
  };

  const ValueBadge = ({ value }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${value === 'allow' ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-500'}`}>
      {value === 'allow' ? 'Allow' : 'Deny'}
    </span>
  );

  // Permission Table Component
  const PermissionTable = ({ scope, isEditable, onEdit, onCancel, onSave, showHeader = true }) => (
    <div className={`bg-white ${showHeader ? 'rounded-xl border border-gray-200' : ''}`}>
      {showHeader && (
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Permissions</h3>
          <div className="flex gap-2">
            {isEditable ? (
              <>
                <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={onSave} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">Save</button>
              </>
            ) : (
              <>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Reset to Default</button>
                <button onClick={onEdit} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="px-6 py-3 border-b border-gray-100 grid grid-cols-12 gap-4 bg-gray-50/50">
        <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</div>
        <div className="col-span-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</div>
        <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Scope</div>
      </div>

      <div>
        {Object.entries(permissionConfig).map(([catKey, category]) => (
          <div key={catKey}>
            <div className="px-6 py-2.5 bg-gray-50/80 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{category.label}</span>
            </div>
            {Object.entries(category.items).map(([permKey, perm]) => (
              <div key={permKey} className="px-6 py-4 grid grid-cols-12 gap-4 items-center border-b border-gray-100 last:border-b-0">
                <div className="col-span-3"><span className="text-sm font-medium text-gray-900">{perm.name}</span></div>
                <div className="col-span-6"><span className="text-sm text-gray-500">{perm.description}</span></div>
                <div className="col-span-3 flex justify-end">
                  {isEditable ? <ValueDropdown scope={scope} permKey={permKey} value={scopePermissions[scope][permKey]} /> : <ValueBadge value={scopePermissions[scope][permKey]} />}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  // Layout Variations
  const TabsLayout = () => (
    <div>
      <div className="bg-white rounded-t-xl border border-b-0 border-gray-200">
        <div className="flex">
          {Object.entries(scopeConfig).map(([scope, config]) => {
            const isSelected = selectedScope === scope;
            const count = getPermissionCount(scope);
            return (
              <button key={scope} onClick={() => { setSelectedScope(scope); setEditingScope(null); }}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-all border-b-2 -mb-px ${isSelected ? 'text-gray-900 border-gray-900 bg-white' : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'}`}>
                <span>{config.label}</span>
                <span className="ml-2 text-xs text-gray-400">({count.allowed}/{count.total})</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="bg-amber-50 border-x border-gray-200 px-6 py-4 flex gap-3">
        <div className="w-5 h-5 rounded-full border-2 border-amber-400 flex items-center justify-center flex-shrink-0">
          <span className="text-amber-500 text-xs font-bold">!</span>
        </div>
        <div className="text-sm text-gray-600">Configure permissions for <strong>{scopeConfig[selectedScope].label}</strong> scope. These settings control what members with this scope can do in the group.</div>
      </div>
      <div className="rounded-t-none overflow-hidden">
        <PermissionTable scope={selectedScope} isEditable={editingScope === selectedScope} onEdit={() => setEditingScope(selectedScope)} onCancel={() => setEditingScope(null)} onSave={() => setEditingScope(null)} />
      </div>
    </div>
  );

  const AccordionLayout = () => (
    <div className="space-y-3">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 flex gap-3">
        <div className="w-5 h-5 rounded-full border-2 border-amber-400 flex items-center justify-center flex-shrink-0">
          <span className="text-amber-500 text-xs font-bold">!</span>
        </div>
        <div className="text-sm text-gray-600">Expand each scope to view and configure its permissions. Click <strong>Edit</strong> to make changes.</div>
      </div>
      {Object.entries(scopeConfig).map(([scope, config]) => {
        const isExpanded = expandedScope === scope;
        const count = getPermissionCount(scope);
        return (
          <div key={scope} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button onClick={() => setExpandedScope(isExpanded ? null : scope)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                  {scope === 'admin' && '👑'}{scope === 'moderator' && '⭐'}{scope === 'participant' && '👤'}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{config.label}</div>
                  <div className="text-sm text-gray-500">{count.allowed} of {count.total} permissions allowed</div>
                </div>
              </div>
              <svg className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isExpanded && (
              <div className="border-t border-gray-200">
                <PermissionTable scope={scope} isEditable={editingScope === scope} onEdit={() => setEditingScope(scope)} onCancel={() => setEditingScope(null)} onSave={() => setEditingScope(null)} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const SidebarLayout = () => (
    <div className="flex gap-6">
      <div className="w-56 flex-shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Member Scopes</h3>
          </div>
          <div className="p-2">
            {Object.entries(scopeConfig).map(([scope, config]) => {
              const isSelected = selectedScope === scope;
              const count = getPermissionCount(scope);
              return (
                <button key={scope} onClick={() => { setSelectedScope(scope); setEditingScope(null); }}
                  className={`w-full px-3 py-3 rounded-lg text-left transition-all mb-1 last:mb-0 ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{scope === 'admin' && '👑'}{scope === 'moderator' && '⭐'}{scope === 'participant' && '👤'}</span>
                      <div>
                        <div className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{config.label}</div>
                        <div className="text-xs text-gray-500">{count.allowed}/{count.total} allowed</div>
                      </div>
                    </div>
                    {isSelected && <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 flex gap-3 mb-4">
          <div className="w-5 h-5 rounded-full border-2 border-amber-400 flex items-center justify-center flex-shrink-0">
            <span className="text-amber-500 text-xs font-bold">!</span>
          </div>
          <div className="text-sm text-gray-600">Configuring permissions for <strong>{scopeConfig[selectedScope].label}</strong>. Changes will apply to all members with this scope.</div>
        </div>
        <PermissionTable scope={selectedScope} isEditable={editingScope === selectedScope} onEdit={() => setEditingScope(selectedScope)} onCancel={() => setEditingScope(null)} onSave={() => setEditingScope(null)} />
      </div>
    </div>
  );

  const SegmentedLayout = () => (
    <div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 flex gap-3 mb-4">
        <div className="w-5 h-5 rounded-full border-2 border-amber-400 flex items-center justify-center flex-shrink-0">
          <span className="text-amber-500 text-xs font-bold">!</span>
        </div>
        <div className="text-sm text-gray-600">Select a member scope below to configure its permissions. Changes apply immediately after saving.</div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="inline-flex p-1 bg-gray-100 rounded-lg">
            {Object.entries(scopeConfig).map(([scope, config]) => {
              const isSelected = selectedScope === scope;
              const count = getPermissionCount(scope);
              return (
                <button key={scope} onClick={() => { setSelectedScope(scope); setEditingScope(null); }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${isSelected ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  <span>{scope === 'admin' && '👑'}{scope === 'moderator' && '⭐'}{scope === 'participant' && '👤'}</span>
                  <span>{config.label}</span>
                  <span className="text-xs text-gray-400">({count.allowed})</span>
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            {editingScope === selectedScope ? (
              <>
                <button onClick={() => setEditingScope(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={() => setEditingScope(null)} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">Save</button>
              </>
            ) : (
              <>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Reset to Default</button>
                <button onClick={() => setEditingScope(selectedScope)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
        <PermissionTable scope={selectedScope} isEditable={editingScope === selectedScope} onEdit={() => setEditingScope(selectedScope)} onCancel={() => setEditingScope(null)} onSave={() => setEditingScope(null)} showHeader={false} />
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
            {group?.icon || '👥'}
          </div>
          <h1 className="text-lg font-semibold text-gray-900">{group?.name || 'Group Details'}</h1>
        </div>
      </div>

      <div className="p-6">
        {/* Details Card */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Details</h2>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Edit</button>
          </div>
          <div className="p-6 grid grid-cols-2 gap-x-12 gap-y-4">
            <div className="space-y-4">
              <div className="flex"><span className="w-28 text-sm text-gray-500">Name</span><span className="text-sm text-gray-900">{group?.name || 'Hiking Group'}</span></div>
              <div className="flex"><span className="w-28 text-sm text-gray-500">Group ID</span><span className="text-sm text-gray-900">{group?.id || 'cometchat-guid-1'}</span></div>
              <div className="flex"><span className="w-28 text-sm text-gray-500">Type</span><span className="text-sm text-gray-900">{group?.type || 'Private'}</span></div>
              <div className="flex"><span className="w-28 text-sm text-gray-500">Members</span><span className="text-sm text-gray-900">{group?.memberCount || 5}</span></div>
              <div className="flex"><span className="w-28 text-sm text-gray-500">Tags</span><span className="text-sm text-gray-400">—</span></div>
            </div>
            <div className="space-y-4">
              <div className="flex"><span className="w-28 text-sm text-gray-500">Description</span><span className="text-sm text-gray-900">{group?.description || 'Explore, connect, and chat with fellow outdoor en...'}</span></div>
              <div className="flex"><span className="w-28 text-sm text-gray-500">Avatar</span><a href="#" className="text-sm text-blue-600 hover:text-blue-700 truncate">https://assets.cometchat.io/sampleapp/v2/groups/...</a></div>
              <div className="flex"><span className="w-28 text-sm text-gray-500">Metadata</span><span className="text-sm text-gray-400">None</span></div>
              <div className="flex"><span className="w-28 text-sm text-gray-500">Created</span><span className="text-sm text-gray-900">{group?.created || 'Dec 04, 2025'}</span></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-6">
            {[
              { id: 'members', label: 'Members' },
              { id: 'banned', label: 'Banned members' },
              { id: 'permissions', label: 'Permissions' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === tab.id ? 'text-gray-900 border-gray-900' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Members
              </button>
              <div className="relative">
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 w-64" />
              </div>
            </div>
            <div className="px-6 py-3 border-b border-gray-100 grid grid-cols-12 gap-4 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-4">Name</div>
              <div className="col-span-3">UID</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-3 text-right">Added</div>
            </div>
            <div className="divide-y divide-gray-100">
              {members.map((member, i) => (
                <div key={i} className="px-6 py-3 grid grid-cols-12 gap-4 items-center hover:bg-gray-50/50">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg">{member.avatar}</div>
                    <span className="text-sm font-medium text-gray-900">{member.name}</span>
                  </div>
                  <div className="col-span-3 text-sm text-gray-500">{member.uid}</div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-700">{member.role}</span>
                  </div>
                  <div className="col-span-3 flex items-center justify-end gap-3">
                    <span className="text-sm text-gray-500">{member.added}</span>
                    <button className="p-1 hover:bg-gray-100 rounded"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'banned' && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No banned members</h3>
            <p className="text-sm text-gray-500">Members who are banned from this group will appear here.</p>
          </div>
        )}

        {activeTab === 'permissions' && (
          <>
            {/* Layout Selector */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-500">Layout:</span>
              {[
                { id: 'tabs', label: 'Tabs' },
                { id: 'accordion', label: 'Accordion' },
                { id: 'sidebar', label: 'Sidebar' },
                { id: 'segmented', label: 'Segmented' },
              ].map(layout => (
                <button
                  key={layout.id}
                  onClick={() => setActiveLayout(layout.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeLayout === layout.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}
                >
                  {layout.label}
                </button>
              ))}
            </div>

            {activeLayout === 'tabs' && <TabsLayout />}
            {activeLayout === 'accordion' && <AccordionLayout />}
            {activeLayout === 'sidebar' && <SidebarLayout />}
            {activeLayout === 'segmented' && <SegmentedLayout />}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
