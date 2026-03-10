import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const agentsData = [
  { id: '1', slug: 'mastra-legacy', icon: 'C', iconBg: 'bg-gray-900', enabled: true, name: 'CometChat Docs agent', agentId: '3b8e5db4-85f3-4b1d-9...', deploymentUrl: 'https://cometchat-docs-agent-...' },
  { id: '2', slug: 'http-agent-beta', icon: '+', iconBg: 'bg-purple-600', enabled: true, name: 'http-agent', agentId: 'ece21d61-5dc6-49bd-a...', deploymentUrl: 'https://httpdump.app/dumps/e...' },
  { id: '3', slug: 'http', icon: '+', iconBg: 'bg-purple-600', enabled: true, name: 'Http', agentId: '8820a03b-a1bc-46cd-...', deploymentUrl: 'https://2b35e2ded6f3.ngrok-fr...' },
  { id: '4', slug: 'vercelV5', icon: '+', iconBg: 'bg-purple-600', enabled: true, name: 'Vercel Agent', agentId: 'b9c18d7a-d64d-411d-9f...', deploymentUrl: 'https://2b35e2ded6f3.ngrok-fr...' },
  { id: '5', slug: 'mastra-legacy', icon: '+', iconBg: 'bg-purple-600', enabled: true, name: 'Hello', agentId: '6120cbcb-9df0-4c0f-9...', deploymentUrl: 'https://cometchat-docs-agent-...' },
  { id: '6', slug: 'ag-ui', icon: 'C', iconBg: 'bg-gray-900', enabled: true, name: 'test-http-agen', agentId: 'da06c13d-67f8-4e84-b...', deploymentUrl: 'https://cc5c52154a8a.ngrok-fre...' },
  { id: '7', slug: 'mastra-legacy', icon: '+', iconBg: 'bg-purple-600', enabled: true, name: 'Scrying agent', agentId: '46128499-425b-4c89-...', deploymentUrl: 'https://cometchat-docs-agent-...' },
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

const CopyIcon = () => (
  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  </button>
);

export default function BYOAgents() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState(agentsData);
  const [activeTab, setActiveTab] = useState('agents');

  const toggleAgent = (id) => {
    setAgents(prev =>
      prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a)
    );
  };

  const tabs = [
    { id: 'agents', label: 'Agents' },
    { id: 'actions', label: 'Actions' },
    { id: 'tools', label: 'Tools' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 pt-6 pb-0">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Bring Your Own Agents</h1>
              <p className="text-sm text-gray-500 mt-1">Connect your AI agents from platforms like OpenAI, Mastra, and more.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                Documentation
              </button>
              <button
                onClick={() => navigate('/byo-agents/add')}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Agent
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === tab.id
                    ? 'text-gray-900 border-gray-900'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {activeTab === 'agents' && (
          <div className="grid grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${agent.iconBg} flex items-center justify-center text-white text-sm font-bold`}>
                      {agent.icon}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{agent.slug}</span>
                  </div>
                  <Toggle enabled={agent.enabled} onChange={() => toggleAgent(agent.id)} />
                </div>

                <div className="px-5 pb-3 space-y-2.5">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 w-28 flex-shrink-0">Agent Name</span>
                    <span className="text-xs text-gray-900">{agent.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 w-28 flex-shrink-0">Agent ID</span>
                    <span className="text-xs text-gray-900 truncate">{agent.agentId}</span>
                    <CopyIcon />
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 w-28 flex-shrink-0">Deployment URL</span>
                    <a href="#" className="text-xs text-purple-600 hover:text-purple-700 truncate">{agent.deploymentUrl}</a>
                  </div>
                </div>

                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button
                      onClick={() => navigate(`/byo-agents/${agent.id}/edit`)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                    Add to Frontend
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-1">Actions</h3>
            <p className="text-sm text-gray-500">Agent actions configuration will be displayed here.</p>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-1">Tools</h3>
            <p className="text-sm text-gray-500">Agent tools configuration will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
