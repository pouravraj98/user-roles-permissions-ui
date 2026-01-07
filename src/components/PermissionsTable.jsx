import { useState } from 'react';

const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    chevronDown: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    ),
    check: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    edit: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    alertCircle: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    x: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

const Badge = ({ children }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
      {children}
    </span>
  );
};

const Tag = ({ children, onRemove, removable = true }) => {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
      {children}
      {removable && (
        <button onClick={onRemove} className="hover:bg-gray-200 rounded-full">
          <Icon name="x" className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

const ScopeSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentOption = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 min-w-[110px] justify-between text-sm shadow-sm"
      >
        <span className="text-gray-700">{currentOption.label}</span>
        <Icon name="chevronDown" className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 w-[120px] bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                <span className="text-gray-700">{option.label}</span>
                {value === option.value && (
                  <Icon name="check" className="w-4 h-4 text-gray-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const MultiSelect = ({ value = [], onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionValue) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 min-w-[200px] justify-between text-sm shadow-sm"
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {value.length > 0 ? (
            value.map(v => {
              const opt = options.find(o => o.value === v);
              return (
                <Tag key={v} onRemove={(e) => { e.stopPropagation(); toggleOption(v); }}>
                  {opt?.label || v}
                </Tag>
              );
            })
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <Icon name="chevronDown" className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 w-[220px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-[200px] overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                <div className={`w-4 h-4 border rounded flex items-center justify-center ${value.includes(option.value) ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}>
                  {value.includes(option.value) && (
                    <Icon name="check" className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-gray-700">{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const TagDisplay = ({ value = [], options, placeholder }) => {
  if (value.length === 0) {
    return <span className="text-sm text-gray-400">{placeholder}</span>;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {value.map((v) => {
        const opt = options?.find(o => o.value === v);
        return (
          <Tag key={v} removable={false}>
            {opt?.label || v}
          </Tag>
        );
      })}
    </div>
  );
};

// Predefined options from the sheet
const OPTIONS = {
  messageTypes: [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'audio', label: 'Audio' },
    { value: 'video', label: 'Video' },
    { value: 'file', label: 'File' },
  ],
  messageCategories: [
    { value: 'message', label: 'Message' },
    { value: 'custom', label: 'Custom' },
  ],
  groupTypes: [
    { value: 'public', label: 'Public' },
    { value: 'password', label: 'Password' },
    { value: 'private', label: 'Private' },
  ],
  receiverTypes: [
    { value: 'user', label: 'User' },
    { value: 'group', label: 'Group' },
  ],
  callTypes: [
    { value: 'audio', label: 'Audio' },
    { value: 'video', label: 'Video' },
  ],
  scopes: [
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'participant', label: 'Participant' },
  ],
  roles: [
    { value: 'default', label: 'Default' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
  ],
  customTypes: [
    { value: 'poll', label: 'Poll' },
    { value: 'sticker', label: 'Sticker' },
    { value: 'whiteboard', label: 'Whiteboard' },
    { value: 'document', label: 'Document' },
    { value: 'meeting', label: 'Meeting' },
  ],
  mimeTypes: [
    { value: 'image/*', label: 'Images' },
    { value: 'video/*', label: 'Videos' },
    { value: 'audio/*', label: 'Audio' },
    { value: 'application/pdf', label: 'PDF' },
    { value: 'application/*', label: 'Documents' },
  ],
};

const PermissionRow = ({ title, description, value, onChange, isEditing, valueType, arrayConfig }) => {
  const allowDenyOptions = [
    { value: 'allow', label: 'Allow' },
    { value: 'deny', label: 'Deny' },
  ];

  const modeOptions = [
    { value: 'all', label: 'All' },
    { value: 'friends', label: 'Friends' },
  ];

  const renderValue = () => {
    if (valueType === 'allow_deny') {
      if (isEditing) {
        return <ScopeSelect value={value} onChange={onChange} options={allowDenyOptions} />;
      }
      return <Badge>{value === 'allow' ? 'Allow' : 'Deny'}</Badge>;
    } else if (valueType === 'mode') {
      if (isEditing) {
        return <ScopeSelect value={value} onChange={onChange} options={modeOptions} />;
      }
      return <Badge>{value === 'all' ? 'All' : 'Friends'}</Badge>;
    } else if (valueType === 'array') {
      const options = arrayConfig?.options || [];
      const placeholder = arrayConfig?.placeholder || 'Select options';
      if (isEditing) {
        return <MultiSelect value={value || []} onChange={onChange} options={options} placeholder={placeholder} />;
      }
      return <TagDisplay value={value || []} options={options} placeholder={placeholder} />;
    }
    return null;
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-3">
        <span className="text-sm font-medium text-gray-900">{title}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-gray-500">{description}</span>
      </td>
      <td className="px-4 py-3">
        {renderValue()}
      </td>
    </tr>
  );
};

const CategoryHeader = ({ title }) => (
  <tr className="bg-gray-50">
    <td colSpan={3} className="px-4 py-2">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</span>
    </td>
  </tr>
);

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', confirmStyle = 'primary' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              confirmStyle === 'danger'
                ? 'text-white bg-red-600 hover:bg-red-700'
                : 'text-white bg-gray-900 hover:bg-gray-800'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PermissionsTable() {
  const [isEditing, setIsEditing] = useState(false);
  const [permissionValues, setPermissionValues] = useState({});
  const [savedValues, setSavedValues] = useState({});
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleValueChange = (permId, value) => {
    setPermissionValues(prev => ({ ...prev, [permId]: value }));
  };

  const handleEdit = () => {
    setPermissionValues({ ...savedValues });
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setShowSaveConfirm(true);
  };

  const handleSaveConfirm = () => {
    setSavedValues({ ...permissionValues });
    setIsEditing(false);
    setShowSaveConfirm(false);
  };

  const handleCancel = () => {
    setPermissionValues({ ...savedValues });
    setIsEditing(false);
  };

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const handleResetConfirm = () => {
    setPermissionValues({});
    setSavedValues({});
    setShowResetConfirm(false);
  };

  const getDefaultValue = (valueType) => {
    if (valueType === 'allow_deny') return 'allow';
    if (valueType === 'mode') return 'all';
    if (valueType === 'array') return [];
    return 'allow';
  };

  const getCurrentValue = (permId, valueType) => {
    if (isEditing) {
      return permissionValues[permId] ?? getDefaultValue(valueType);
    }
    return savedValues[permId] ?? getDefaultValue(valueType);
  };

  const permissionData = [
    {
      category: 'USERS',
      permissions: [
        { id: 'listUsers', title: 'List Users', description: 'Allows/Denies listing of users', valueType: 'allow_deny' },
        { id: 'listUsers.mode', title: 'List Users Mode', description: 'Allows customised listing for users', valueType: 'mode' },
        { id: 'listUsers.allowedRoles', title: 'List Users Allowed Roles', description: 'Allows listing roles', valueType: 'array', arrayConfig: { options: OPTIONS.roles, placeholder: 'Select roles' } },
        { id: 'getUserDetails.mode', title: 'Get User Details Mode', description: 'Allows customised listing for users for a role to get details', valueType: 'mode' },
        { id: 'getUserDetails.allowedRoles', title: 'Get User Details Allowed Roles', description: 'Allows listing roles', valueType: 'array', arrayConfig: { options: OPTIONS.roles, placeholder: 'Select roles' } },
      ],
    },
    {
      category: 'MESSAGES',
      permissions: [
        { id: 'listMessages.allowedMessageCategories', title: 'List Messages Allowed Categories', description: 'Allows listing messages of the specified categories', valueType: 'array', arrayConfig: { options: OPTIONS.messageCategories, placeholder: 'Select categories' } },
        { id: 'listMessages.allowedMessageTypes', title: 'List Messages Allowed Types', description: 'Allows listing messages of specified types', valueType: 'array', arrayConfig: { options: OPTIONS.messageTypes, placeholder: 'Select message types' } },
        { id: 'sendMessage', title: 'Send Message', description: 'Allows/Denies sending messages', valueType: 'allow_deny' },
        { id: 'sendMessage.mode', title: 'Send Message Mode', description: 'Allows customised message sending', valueType: 'mode' },
        { id: 'sendMessage.allowedReceiverTypes', title: 'Send Message Allowed Receiver Types', description: 'Allows sending messages to users', valueType: 'array', arrayConfig: { options: OPTIONS.receiverTypes, placeholder: 'Select receiver types' } },
        { id: 'sendMessage.allowedReceiverRoles', title: 'Send Message Allowed Receiver Roles', description: 'Allows sending to users with specified roles', valueType: 'array', arrayConfig: { options: OPTIONS.roles, placeholder: 'Select roles' } },
        { id: 'sendMessage.allowedMessageCategories', title: 'Send Message Allowed Categories', description: 'Allows sending messages of specified categories', valueType: 'array', arrayConfig: { options: OPTIONS.messageCategories, placeholder: 'Select categories' } },
        { id: 'sendMessage.allowedMessageTypes', title: 'Send Message Allowed Types', description: 'Allows sending messages of specified types', valueType: 'array', arrayConfig: { options: OPTIONS.messageTypes, placeholder: 'Select message types' } },
        { id: 'sendMessage.allowedCustomTypes', title: 'Send Message Allowed Custom Types', description: 'Allows sending custom category messages', valueType: 'array', arrayConfig: { options: OPTIONS.customTypes, placeholder: 'Select custom types' } },
        { id: 'sendMessage.allowedMimeTypes', title: 'Send Message Allowed MIME Types', description: 'Allows sending media of specified mime type', valueType: 'array', arrayConfig: { options: OPTIONS.mimeTypes, placeholder: 'Select MIME types' } },
        { id: 'editMessage', title: 'Edit Message', description: 'Allows/Denies editing a message', valueType: 'allow_deny' },
        { id: 'editMessage.denyForScopes', title: 'Edit Message Deny For Scopes', description: 'Denies moderators and admins to edit messages', valueType: 'array', arrayConfig: { options: OPTIONS.scopes, placeholder: 'Select scopes' } },
        { id: 'deleteMessage', title: 'Delete Message', description: 'Allows/Denies deleting a message', valueType: 'allow_deny' },
      ],
    },
    {
      category: 'THREADS',
      permissions: [
        { id: 'sendThreadedMessage', title: 'Send Threaded Message', description: 'Allows/Denies a member to reply to a message in message thread', valueType: 'allow_deny' },
      ],
    },
    {
      category: 'REACTIONS',
      permissions: [
        { id: 'listReactions', title: 'List Reactions', description: 'Allows/Denies listing reactions', valueType: 'allow_deny' },
        { id: 'listReactions.allowedScopes', title: 'List Reactions Allowed Scopes', description: 'Scope-based access for listing reactions', valueType: 'array', arrayConfig: { options: OPTIONS.scopes, placeholder: 'Select scopes' } },
        { id: 'addReaction', title: 'Add Reaction', description: 'Allows/Denies adding reaction', valueType: 'allow_deny' },
      ],
    },
    {
      category: 'GROUPS',
      permissions: [
        { id: 'listGroups', title: 'List Groups', description: 'Allows/Denies listing groups', valueType: 'allow_deny' },
        { id: 'listGroups.allowedGroupTypes', title: 'List Groups Allowed Types', description: 'Allows listing groups of specified types', valueType: 'array', arrayConfig: { options: OPTIONS.groupTypes, placeholder: 'Select group types' } },
        { id: 'createGroup', title: 'Create Group', description: 'Allows/Denies creating groups', valueType: 'allow_deny' },
        { id: 'createGroup.allowedGroupTypes', title: 'Create Group Allowed Types', description: 'Allows creating groups of specified types', valueType: 'array', arrayConfig: { options: OPTIONS.groupTypes, placeholder: 'Select group types' } },
        { id: 'joinGroup.allowedGroupTypes', title: 'Join Group Allowed Types', description: 'Allows joining groups of specified types', valueType: 'array', arrayConfig: { options: OPTIONS.groupTypes, placeholder: 'Select group types' } },
        { id: 'listMembers', title: 'List Members', description: 'Allows/Denies listing group members', valueType: 'allow_deny' },
        { id: 'listMembers.allowedScopes', title: 'List Members Allowed Scopes', description: 'Scope-based membership viewing', valueType: 'array', arrayConfig: { options: OPTIONS.scopes, placeholder: 'Select scopes' } },
      ],
    },
    {
      category: 'CALLS',
      permissions: [
        { id: 'initiateCall', title: 'Initiate Call', description: 'Allows/Denies initiating a call', valueType: 'allow_deny' },
        { id: 'initiateCall.mode', title: 'Initiate Call Mode', description: 'Allows customised initiate calls with users', valueType: 'mode' },
        { id: 'initiateCall.allowedReceiverRoles', title: 'Initiate Call Allowed Receiver Roles', description: 'Allows initiating calls to users with specified roles', valueType: 'array', arrayConfig: { options: OPTIONS.roles, placeholder: 'Select roles' } },
      ],
    },
  ];

  return (
    <div className="p-6">
      <div>
        {/* Warning Alert */}
        <div className="mb-4">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl shadow-sm">
            <div className="flex-shrink-0 p-2 bg-amber-100 rounded-full">
              <Icon name="alertCircle" className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Warning</p>
              <p className="mt-1 text-sm text-gray-600">
                These permissions are only enforced at the API level. Please make relevant changes to your front-end to hide feature from the user.
              </p>
            </div>
          </div>
        </div>

        {/* Permissions Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">Permissions</h3>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveClick}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 shadow-sm"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleResetClick}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm"
                  >
                    Reset to Default
                  </button>
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm"
                  >
                    <Icon name="edit" className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">
                    Name
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-64">
                    Scope
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {permissionData.map((section) => (
                  <>
                    <CategoryHeader key={`cat-${section.category}`} title={section.category} />
                    {section.permissions.map((perm) => (
                      <PermissionRow
                        key={perm.id}
                        title={perm.title}
                        description={perm.description}
                        value={getCurrentValue(perm.id, perm.valueType)}
                        onChange={(val) => handleValueChange(perm.id, val)}
                        isEditing={isEditing}
                        valueType={perm.valueType}
                        arrayConfig={perm.arrayConfig}
                      />
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Save Confirmation Modal */}
      <ConfirmationModal
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        onConfirm={handleSaveConfirm}
        title="Save Permissions"
        message="Are you sure you want to save these permission changes? This will update the permissions for all users with this role."
        confirmText="Save Changes"
      />

      {/* Reset Confirmation Modal */}
      <ConfirmationModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleResetConfirm}
        title="Reset to Default"
        message="Are you sure you want to reset all permissions to their default values? This action cannot be undone."
        confirmText="Reset"
        confirmStyle="danger"
      />
    </div>
  );
}
