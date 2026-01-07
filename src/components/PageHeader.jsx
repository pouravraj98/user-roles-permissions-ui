const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    arrowLeft: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

export default function PageHeader({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'features', label: 'Features' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'api-credentials', label: 'API Credentials' },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <Icon name="arrowLeft" className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Admin</h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
