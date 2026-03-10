import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const agentsData = [
  { id: '1', slug: 'mastra-legacy', name: 'CometChat Docs agent', deploymentUrl: 'https://cometchat-docs-agent-...' },
  { id: '2', slug: 'http-agent-beta', name: 'http-agent', deploymentUrl: 'https://httpdump.app/dumps/e...' },
  { id: '3', slug: 'http', name: 'Http', deploymentUrl: 'https://2b35e2ded6f3.ngrok-fr...' },
  { id: '4', slug: 'vercelV5', name: 'Vercel Agent', deploymentUrl: 'https://2b35e2ded6f3.ngrok-fr...' },
  { id: '5', slug: 'mastra-legacy', name: 'Hello', deploymentUrl: 'https://cometchat-docs-agent-...' },
  { id: '6', slug: 'ag-ui', name: 'test-http-agen', deploymentUrl: 'https://cc5c52154a8a.ngrok-fre...' },
  { id: '7', slug: 'mastra-legacy', name: 'Scrying agent', deploymentUrl: 'https://cometchat-docs-agent-...' },
];

const platforms = [
  { id: 'langgraph', label: 'LangGraph', icon: '🔗', bg: 'bg-green-50', text: 'text-green-700' },
  { id: 'crewai', label: 'crewai', icon: '©', bg: 'bg-gray-50', text: 'text-gray-700' },
  { id: 'vercelai', label: 'Vercel AI', icon: '▲', bg: 'bg-gray-50', text: 'text-gray-700' },
  { id: 'ag2', label: 'AG2', icon: '⚡', bg: 'bg-gray-50', text: 'text-gray-700' },
  { id: 'rasa', label: 'Rasa', icon: '🤖', bg: 'bg-gray-50', text: 'text-gray-700' },
  { id: 'mastra', label: 'Mastra', icon: '✦', bg: 'bg-gray-50', text: 'text-gray-700' },
  { id: 'agno', label: 'Agno', icon: 'A', bg: 'bg-red-50', text: 'text-red-700' },
  { id: 'ag-ui', label: 'AG-UI', icon: '◇', bg: 'bg-gray-50', text: 'text-gray-700' },
  { id: 'mastra-legacy', label: 'Mastra (Legacy)', icon: '✦', bg: 'bg-gray-50', text: 'text-gray-700' },
  { id: 'http', label: 'Http', icon: '⟨⟩', bg: 'bg-gray-50', text: 'text-gray-700', badge: 'Beta' },
  { id: 'http-agent', label: 'Http Agent', icon: '⟨⟩', bg: 'bg-gray-50', text: 'text-gray-700', badge: 'Beta' },
];

const InfoIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default function ConnectAgent() {
  const navigate = useNavigate();
  const { agentId } = useParams();
  const agent = agentId ? agentsData.find(a => a.id === agentId) : null;

  const [selectedPlatform, setSelectedPlatform] = useState(agent ? 'mastra-legacy' : 'langgraph');
  const [name, setName] = useState(agent?.name || 'Customer Support Agent');
  const [iconUrl, setIconUrl] = useState('https://assets.cometchat.io/ai-agents/default-agent-profile-picture.png');
  const [greeting, setGreeting] = useState('');
  const [introMessage, setIntroMessage] = useState('');
  const [suggestedMessages, setSuggestedMessages] = useState([]);
  const [deploymentUrl, setDeploymentUrl] = useState(agent?.deploymentUrl || '');
  const [headers, setHeaders] = useState('{\n  "authorization": "Basic your_basic_auth"\n}');
  const [actionsOpen, setActionsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [groupMode, setGroupMode] = useState('active');
  const [mentionTrigger, setMentionTrigger] = useState(true);
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');
  const scrollRef = useRef(null);

  const goBack = () => navigate('/byo-agents');

  const addSuggestedMessage = () => {
    setSuggestedMessages(prev => [...prev, '']);
  };

  const updateSuggestedMessage = (index, value) => {
    setSuggestedMessages(prev => prev.map((m, i) => i === index ? value : m));
  };

  const removeSuggestedMessage = (index) => {
    setSuggestedMessages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Connect Agent</h1>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          Documentation
        </button>
      </div>

      <div className="px-8 py-8">
        {/* Platform Selector - full width */}
        <div className="mb-8 relative" ref={scrollRef}>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {platforms.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all flex-shrink-0 min-w-[80px] relative ${
                  selectedPlatform === p.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-2 -right-2 text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                    {p.badge}
                  </span>
                )}
                <div className={`w-10 h-10 rounded-lg ${p.bg} flex items-center justify-center ${p.text} text-lg font-bold`}>
                  {p.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form - constrained width, left-aligned */}
        <div className="max-w-2xl space-y-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              Name
              <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              Icon
              <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
            </label>
            <input
              type="text"
              value={iconUrl}
              onChange={(e) => setIconUrl(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>

          {/* Connect Actions */}
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setActionsOpen(!actionsOpen)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${actionsOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 18l6-6-6-6" />
              </svg>
              Connect Actions
            </button>
            {actionsOpen && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                <p className="text-sm text-gray-500">Configure actions for this agent.</p>
              </div>
            )}
          </div>

          {/* Connect Tools */}
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${toolsOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 18l6-6-6-6" />
              </svg>
              Connect Tools
            </button>
            {toolsOpen && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                <p className="text-sm text-gray-500">Configure tools for this agent.</p>
              </div>
            )}
          </div>

          {/* Group Interaction Mode */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-3">
              Group Interaction Mode
              <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
            </label>
            <div className="space-y-3">
              <label
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  groupMode === 'active'
                    ? 'border-purple-500 bg-purple-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="groupMode"
                  value="active"
                  checked={groupMode === 'active'}
                  onChange={() => setGroupMode('active')}
                  className="mt-0.5 accent-purple-600"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">Active</div>
                  <p className="text-xs text-gray-500 mt-0.5">Agent will respond to all messages in groups it belongs to. You control cost and responsiveness.</p>
                </div>
              </label>
              <label
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  groupMode === 'invoke'
                    ? 'border-purple-500 bg-purple-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="groupMode"
                  value="invoke"
                  checked={groupMode === 'invoke'}
                  onChange={() => setGroupMode('invoke')}
                  className="mt-0.5 accent-purple-600"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">Invoke</div>
                  <p className="text-xs text-gray-500 mt-0.5">Agent responds only when @mentioned or triggered by a configured keyword.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Triggers - only shown in Invoke mode */}
          {groupMode === 'invoke' && (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-5 space-y-4">
              <div className="text-sm font-medium text-gray-900">Triggers</div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-700">@mention</div>
                  <p className="text-xs text-gray-500 mt-0.5">Agent responds when @mentioned in a group message</p>
                </div>
                <button
                  onClick={() => setMentionTrigger(!mentionTrigger)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    mentionTrigger ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    mentionTrigger ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="border-t border-gray-200" />

              <div>
                <div className="text-sm text-gray-700 mb-2">Keywords</div>
                <p className="text-xs text-gray-500 mb-3">Agent responds when any of these keywords appear in a group message</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {keywords.map((kw, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-200">
                      {kw}
                      <button
                        onClick={() => setKeywords(prev => prev.filter((_, idx) => idx !== i))}
                        className="hover:bg-gray-100 rounded-full"
                      >
                        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && keywordInput.trim()) {
                        setKeywords(prev => [...prev, keywordInput.trim()]);
                        setKeywordInput('');
                      }
                    }}
                    placeholder="Type a keyword and press Enter"
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 placeholder:text-gray-400 bg-white"
                  />
                  <button
                    onClick={() => {
                      if (keywordInput.trim()) {
                        setKeywords(prev => [...prev, keywordInput.trim()]);
                        setKeywordInput('');
                      }
                    }}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Human Handoff - info section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Human Handoff</div>
                <p className="text-sm text-gray-600 mt-1">
                  This agent can escalate group conversations to a human. Configure handoff behavior in your agent's logic — CometChat provides the mechanism, your agent controls the decision.
                </p>
                <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 mt-2">
                  Learn how to set up handoff
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Greeting</label>
            <input
              type="text"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              placeholder="Greeting"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 placeholder:text-gray-400"
            />
          </div>

          {/* Introductory Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Introductory Message</label>
            <input
              type="text"
              value={introMessage}
              onChange={(e) => setIntroMessage(e.target.value)}
              placeholder="Introductory Message"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 placeholder:text-gray-400"
            />
          </div>

          {/* Suggested Messages */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
              Suggested messages
              <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
            </label>
            {suggestedMessages.map((msg, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => updateSuggestedMessage(i, e.target.value)}
                  placeholder="Enter suggested message"
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 placeholder:text-gray-400"
                />
                <button
                  onClick={() => removeSuggestedMessage(i)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={addSuggestedMessage}
              className="flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 4v16m8-8H4" />
              </svg>
              Add Suggested messages
            </button>
          </div>

          {/* Deployment URL */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              Deployment URL
              <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
            </label>
            <input
              type="text"
              value={deploymentUrl}
              onChange={(e) => setDeploymentUrl(e.target.value)}
              placeholder="Deployment URL"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 placeholder:text-gray-400"
            />
          </div>

          {/* Headers */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              Headers (Each header(key:value) on a new line). Should be a valid JSON
              <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
            </label>
            <textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 text-sm font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 resize-y"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2 pb-4">
            <button
              onClick={goBack}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
