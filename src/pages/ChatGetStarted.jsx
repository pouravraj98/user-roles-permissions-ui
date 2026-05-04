import { useState } from 'react';
import { Link } from 'react-router-dom';

const TopBarButton = ({ children, icon }) => (
  <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors">
    {icon}
    {children}
  </button>
);

const SkillCommand = () => {
  const [copied, setCopied] = useState(false);
  const command = 'npx @cometchat/skills add';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">
        <span className="text-gray-900 font-medium">Building with an AI agent?</span> Install this skill and start building instantly.
      </p>
      <div className="flex items-center gap-3 bg-gray-950 rounded-xl px-5 py-3.5 max-w-lg shadow-sm ring-1 ring-gray-900/10">
        <code className="flex-1 font-mono text-sm text-gray-100 whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="text-gray-500 select-none mr-2">$</span>
          npx @cometchat/skills add
        </code>
        <button
          onClick={handleCopy}
          className="p-1 text-gray-400 hover:text-white transition-colors shrink-0"
          aria-label="Copy command"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

const ChatPreview = () => (
  <div className="w-full h-full flex items-center justify-center">
    <img
      src="https://app.cometchat.com/static/media/chats-get-started.88e11d34b6d38937e489.png"
      alt="Chat & Messaging preview"
      className="max-w-full max-h-full object-contain"
    />
  </div>
);

const ResourceCard = ({ icon, title, description }) => (
  <button className="group relative bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-purple-300 hover:shadow-sm transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
        {icon}
      </div>
      <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17L17 7M7 7h10v10" />
      </svg>
    </div>
    <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
  </button>
);

export default function ChatGetStarted() {
  return (
    <div className="flex-1 overflow-auto relative">
      {/* Top header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Get Started / Integrate</h1>
        <div className="flex items-center gap-2">
          <TopBarButton
            icon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
              </svg>
            }
          >
            Get Help
          </TopBarButton>
          <TopBarButton
            icon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M2 10h20" />
              </svg>
            }
          >
            App Credentials
          </TopBarButton>
          <TopBarButton
            icon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            }
          >
            Documentation
          </TopBarButton>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl mx-auto">
        {/* Hero card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-10 mb-6">
          <div className="grid grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Chat & Messaging</h2>
              <p className="text-base text-gray-600 leading-relaxed mb-7 max-w-md">
                Production-ready messaging for web and mobile, ready to drop into your stack.
              </p>

              <SkillCommand />

              <div className="flex items-center gap-4 mt-6">
                <Link
                  to="/chats/get-started/integrate"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  View Integration Steps
                </Link>
                <span className="text-sm text-gray-400">or build it yourself</span>
              </div>
            </div>
            <div className="h-[360px]">
              <ChatPreview />
            </div>
          </div>
        </div>

        {/* Resource cards */}
        <div className="grid grid-cols-3 gap-4">
          <ResourceCard
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z" />
              </svg>
            }
            title="Features"
            description="Discover key chat features and capabilities"
          />
          <ResourceCard
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
              </svg>
            }
            title="Demo"
            description="Experience CometChat in action with a live demo"
          />
          <ResourceCard
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 18v-6a9 9 0 0118 0v6" />
                <path d="M21 19a2 2 0 01-2 2h-1v-7h3v5zM3 19a2 2 0 002 2h1v-7H3v5z" />
              </svg>
            }
            title="Schedule a Call"
            description="Connect with our team for tailored guidance"
          />
        </div>
      </div>

      {/* Floating chat widget */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-purple-500 text-white px-2 py-6 rounded-l-lg shadow-lg cursor-pointer">
        <p className="text-xs font-medium [writing-mode:vertical-rl] rotate-180">Chat with us</p>
      </div>
    </div>
  );
}
