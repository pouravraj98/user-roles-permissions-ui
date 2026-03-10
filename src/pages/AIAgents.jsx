import { useState } from 'react';

const agents = [
  {
    id: 1,
    name: 'sfsf',
    enabled: true,
    iconBg: 'from-purple-500 to-purple-600',
    iconText: '✦',
    previewBg: 'bg-gradient-to-br from-green-50 to-emerald-50',
    bubbleColors: { left: 'bg-white', right: 'bg-green-100' },
  },
  {
    id: 2,
    name: 'Ketan',
    enabled: true,
    iconBg: 'from-gray-700 to-gray-800',
    iconText: '👤',
    previewBg: 'bg-gradient-to-br from-green-50 to-lime-50',
    bubbleColors: { left: 'bg-white', right: 'bg-green-100' },
  },
  {
    id: 3,
    name: 'Weather Agent',
    enabled: false,
    iconBg: 'from-amber-400 to-orange-400',
    iconText: '🌤',
    previewBg: 'bg-gradient-to-br from-purple-50 to-violet-50',
    bubbleColors: { left: 'bg-white', right: 'bg-purple-100' },
  },
  {
    id: 4,
    name: 'CometChat Docs Agent',
    enabled: false,
    iconBg: 'from-gray-900 to-black',
    iconText: '●',
    previewBg: 'bg-gradient-to-br from-amber-50 to-orange-50',
    bubbleColors: { left: 'bg-white', right: 'bg-amber-100' },
  },
];

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onChange(!enabled); }}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? 'bg-purple-500' : 'bg-gray-300'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const ChatPreview = ({ previewBg, bubbleColors }) => (
  <div className={`${previewBg} rounded-lg p-4 h-36 flex flex-col justify-center gap-2.5`}>
    {/* Left bubble */}
    <div className="flex items-end gap-2">
      <div className={`${bubbleColors.left} rounded-xl rounded-bl-sm px-4 py-2.5 shadow-sm max-w-[60%]`}>
        <div className="h-2 w-20 bg-gray-900/15 rounded-full" />
        <div className="h-2 w-14 bg-gray-900/10 rounded-full mt-1.5" />
      </div>
    </div>
    {/* Right bubble */}
    <div className="flex items-end justify-end gap-2">
      <div className={`${bubbleColors.right} rounded-xl rounded-br-sm px-4 py-2.5 shadow-sm max-w-[65%]`}>
        <div className="h-2 w-24 bg-gray-900/15 rounded-full" />
        <div className="h-2 w-16 bg-gray-900/10 rounded-full mt-1.5" />
      </div>
    </div>
    {/* Left bubble */}
    <div className="flex items-end gap-2">
      <div className={`${bubbleColors.left} rounded-xl rounded-bl-sm px-4 py-2.5 shadow-sm max-w-[55%]`}>
        <div className="h-2 w-16 bg-gray-900/15 rounded-full" />
      </div>
    </div>
  </div>
);

export default function AIAgents() {
  const [agentList, setAgentList] = useState(agents);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAgent = (id) => {
    setAgentList(prev =>
      prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a)
    );
  };

  const filteredAgents = agentList.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">AI Agents</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search Agent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 w-52"
            />
          </div>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            Documentation
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add AI Agent
          </button>
        </div>
      </div>

      {/* Agent Cards Grid */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Card Header */}
              <div className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${agent.iconBg} flex items-center justify-center text-white text-sm`}>
                    {agent.iconText}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{agent.name}</span>
                </div>
                <Toggle enabled={agent.enabled} onChange={() => toggleAgent(agent.id)} />
              </div>

              {/* Chat Preview */}
              <div className="px-5 pb-2">
                <ChatPreview previewBg={agent.previewBg} bubbleColors={agent.bubbleColors} />
              </div>

              {/* Card Footer */}
              <div className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-4.5 h-4.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-4.5 h-4.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                  Manage Agent
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No agents found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or create a new AI agent.</p>
          </div>
        )}
      </div>
    </div>
  );
}
