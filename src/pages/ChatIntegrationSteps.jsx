import { useState } from 'react';
import { Link } from 'react-router-dom';

const TopBarButton = ({ children, icon }) => (
  <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors">
    {icon}
    {children}
  </button>
);

const platforms = [
  { id: 'react', name: 'React', logo: <ReactLogo /> },
  { id: 'react-router', name: 'React Router', logo: <ReactRouterLogo /> },
  { id: 'nextjs', name: 'Next.js', logo: <NextLogo /> },
  { id: 'react-native', name: 'React Native', logo: <ReactNativeLogo /> },
  { id: 'flutter', name: 'Flutter', logo: <FlutterLogo /> },
  { id: 'ios', name: 'iOS', logo: <IOSLogo /> },
  { id: 'android', name: 'Android', logo: <AndroidLogo /> },
  { id: 'angular', name: 'Angular', logo: <AngularLogo /> },
  { id: 'vue', name: 'Vue', logo: <VueLogo /> },
  { id: 'javascript', name: 'JavaScript', logo: <JSLogo /> },
  { id: 'ionic', name: 'Ionic', logo: <IonicLogo /> },
  { id: 'php', name: 'PHP', logo: <PHPLogo /> },
  { id: 'laravel', name: 'Laravel', logo: <LaravelLogo /> },
  { id: 'others', name: 'Others', logo: <OthersLogo /> },
];

function ReactLogo() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
    </svg>
  );
}

function ReactRouterLogo() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M5 12a3 3 0 100-6 3 3 0 000 6zM19 18a3 3 0 100-6 3 3 0 000 6zM12 12v6" stroke="#F44250" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function NextLogo() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#000" />
      <path d="M9 7v10M9 7l7 10" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

function ReactNativeLogo() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
    </svg>
  );
}

function FlutterLogo() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path d="M14 2L4 12l3 3 13-13h-6zM14 13l-4 4 4 4 4-4-4-4z" fill="#54C5F8" />
      <path d="M10 17l4-4 4 4-4 4-4-4z" fill="#01579B" />
    </svg>
  );
}

function IOSLogo() {
  return (
    <svg className="w-5 h-6" viewBox="0 0 24 24" fill="#000">
      <path d="M17.5 12.6c0-2.7 2.2-4 2.3-4-1.3-1.8-3.2-2.1-3.9-2.1-1.7-.2-3.2 1-4.1 1-.9 0-2.2-1-3.6-1-1.8 0-3.6 1.1-4.5 2.7-2 3.4-.5 8.5 1.4 11.3.9 1.4 2 2.9 3.4 2.8 1.4-.1 1.9-.9 3.5-.9 1.7 0 2.1.9 3.5.9 1.5 0 2.4-1.4 3.3-2.8 1.1-1.6 1.5-3.1 1.5-3.2-.1-.1-2.9-1.1-2.9-4.5zM14.7 4.6c.7-.9 1.2-2.1 1.1-3.4-1.1.1-2.4.7-3.2 1.7-.7.8-1.3 2-1.1 3.2 1.2.1 2.5-.6 3.2-1.5z" />
    </svg>
  );
}

function AndroidLogo() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#3DDC84">
      <path d="M17.5 9c-.4-2.6-2.7-4.6-5.5-4.6S6.9 6.4 6.5 9h11zM7 9.5C6.4 9.5 6 10 6 10.5v6c0 .6.4 1 1 1s1-.4 1-1v-6c0-.5-.5-1-1-1zM17 9.5c-.6 0-1 .5-1 1v6c0 .6.4 1 1 1s1-.4 1-1v-6c0-.5-.4-1-1-1zM9 10v8.5c0 .8.6 1.5 1.5 1.5h.5v3c0 .6.4 1 1 1s1-.4 1-1v-3h2v3c0 .6.4 1 1 1s1-.4 1-1v-3h.5c.8 0 1.5-.7 1.5-1.5V10H9zM15.5 6.7l.7-1.2c.1-.1 0-.3-.1-.3-.1-.1-.3 0-.3.1l-.7 1.2c-.7-.3-1.4-.5-2.1-.5s-1.4.2-2.1.5l-.7-1.2c-.1-.1-.2-.2-.3-.1s-.2.2-.1.3l.7 1.2C9.5 7.3 8.7 8.1 8.4 9h7.2c-.3-.9-1.1-1.7-2.1-2.3z" />
    </svg>
  );
}

function AngularLogo() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#DD0031">
      <path d="M12 2L2 5.5 3.5 18 12 22l8.5-4L22 5.5 12 2zm0 2.2L19.6 7 18.4 16 12 19.5 5.6 16 4.4 7 12 4.2zm0 1.7L7.5 16h1.7l1-2.3h5.6l1 2.3h1.7L12 5.9zm0 3.2l2.1 5h-4.2L12 9.1z" />
    </svg>
  );
}

function VueLogo() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path d="M2 4l10 16L22 4h-4l-6 9-6-9H2z" fill="#41B883" />
      <path d="M6 4l6 9 6-9h-3l-3 4.5L9 4H6z" fill="#34495E" />
    </svg>
  );
}

function JSLogo() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#F7DF1E">
      <rect width="24" height="24" rx="2" />
      <text x="12" y="18" textAnchor="middle" fill="#000" fontSize="11" fontWeight="bold" fontFamily="sans-serif">JS</text>
    </svg>
  );
}

function IonicLogo() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#3880FF" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill="#3880FF" />
      <circle cx="18" cy="6" r="2" fill="#3880FF" />
    </svg>
  );
}

function PHPLogo() {
  return (
    <svg className="w-6 h-4" viewBox="0 0 24 16" fill="none">
      <ellipse cx="12" cy="8" rx="11" ry="6" fill="#777BB4" />
      <text x="12" y="11" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="bold" fontFamily="serif" fontStyle="italic">php</text>
    </svg>
  );
}

function LaravelLogo() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FF2D20">
      <path d="M21.5 7.3l-5-2.9c-.2-.1-.5-.1-.7 0L11 7.3v9.4l-3.5 2-3.5-2V8.6L7.5 6.7v3.6c0 .2.1.4.3.5l4.4 2.5c.2.1.5.1.7 0l4.4-2.5c.2-.1.3-.3.3-.5V6.7l3.9 2.2v9.5l-7.7 4.4-7.7-4.4V8.9c0-.2.1-.4.3-.5l4.4-2.5c.2-.1.3-.3.3-.5V2c0-.4-.4-.6-.7-.4L2.5 4.5c-.2.1-.3.3-.3.5v13c0 .2.1.4.3.5l8.4 4.8c.2.1.5.1.7 0l8.4-4.8c.2-.1.3-.3.3-.5V7.7c0-.2-.1-.3-.3-.4z" />
    </svg>
  );
}

function OthersLogo() {
  return (
    <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

const PlatformCard = ({ platform, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3.5 bg-white border-2 rounded-xl transition-all ${
      selected
        ? 'border-purple-500 shadow-sm'
        : 'border-gray-200 hover:border-gray-300'
    }`}
  >
    <div className="shrink-0 w-6 h-6 flex items-center justify-center">
      {platform.logo}
    </div>
    <span className="text-sm font-medium text-gray-900">{platform.name}</span>
  </button>
);

const StepNumber = ({ n }) => (
  <div className="shrink-0 w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-600 bg-white">
    {n}
  </div>
);

const LearnMoreSection = ({ open, onToggle, howItWorks, whyGreat }) => (
  <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-3.5 text-left"
    >
      <span className="text-sm font-medium text-gray-900">Learn More</span>
      <svg
        className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
    {open && (
      <div className="px-5 pb-5 grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">How It Works</h4>
          <ul className="space-y-2">
            {howItWorks.map((item, i) => (
              <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-2">
                <span className="text-gray-400 mt-1.5 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Why It's Great</h4>
          <ul className="space-y-2">
            {whyGreat.map((item, i) => (
              <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-2">
                <span className="text-gray-400 mt-1.5 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
);

const IntegrationOption = ({ number, recommended, title, description, primaryAction, secondaryAction, videoLink, howItWorks, whyGreat }) => {
  const [learnMoreOpen, setLearnMoreOpen] = useState(true);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-7 mb-5">
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-semibold uppercase tracking-wider rounded-md">
          Option {number}
        </span>
        {recommended && (
          <span className="inline-flex px-2.5 py-1 bg-purple-50 text-purple-700 text-[10px] font-semibold uppercase tracking-wider rounded-md">
            Recommended
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1.5">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">{description}</p>

      <div className="flex flex-wrap items-center gap-3">
        {primaryAction && (
          <button className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors">
            {primaryAction}
          </button>
        )}
        {secondaryAction && (
          <button className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 text-sm font-medium rounded-lg transition-colors">
            {secondaryAction}
          </button>
        )}
        {videoLink && (
          <button className="inline-flex items-center gap-2 px-3 py-2 text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
            </svg>
            {videoLink}
          </button>
        )}
      </div>

      <LearnMoreSection
        open={learnMoreOpen}
        onToggle={() => setLearnMoreOpen(!learnMoreOpen)}
        howItWorks={howItWorks}
        whyGreat={whyGreat}
      />
    </div>
  );
};

const SkillsOption = () => {
  const [learnMoreOpen, setLearnMoreOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const command = 'npx @cometchat/skills add';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-7 mb-5">
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-semibold uppercase tracking-wider rounded-md">
          Option 01
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 text-[10px] font-semibold uppercase tracking-wider rounded-md">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l1.7 5.3 5.3 1.7-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2z" />
          </svg>
          For AI Agents
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
        AI Agent Skill (Auto-integrate with Claude, Cursor, Copilot)
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        Drop the CometChat skill into your AI coding assistant — it wires up the SDK, UI Kit, and user sync for you. The fastest path from zero to working chat.
      </p>

      <div className="flex items-center gap-3 bg-gray-950 rounded-xl px-5 py-3.5 max-w-xl shadow-sm ring-1 ring-gray-900/10">
        <code className="flex-1 font-mono text-sm text-gray-100 whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="text-gray-500 select-none mr-2">$</span>
          {command}
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

      <LearnMoreSection
        open={learnMoreOpen}
        onToggle={() => setLearnMoreOpen(!learnMoreOpen)}
        howItWorks={[
          'Run the command in your project root — the skill installs into your AI assistant\'s config.',
          'Ask your agent to "integrate CometChat" — it reads the skill and follows the steps.',
          'Skill handles SDK install, init, login, and a working chat screen automatically.',
        ]}
        whyGreat={[
          'Fastest path — minutes from command to working chat.',
          'Works with Claude Code, Cursor, Copilot, and any agent that supports skills/MCP.',
          'Always up-to-date — skill pulls the latest CometChat patterns, no stale tutorials.',
        ]}
      />
    </div>
  );
};

const NextStepCard = ({ icon, title, description }) => (
  <button className="group relative bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-purple-300 hover:shadow-sm transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
        {icon}
      </div>
      <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17L17 7M7 7h10v10" />
      </svg>
    </div>
    <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
    <p className="text-xs text-gray-500 leading-relaxed mb-4">{description}</p>
    <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-colors">
      Go to Docs
    </button>
  </button>
);

export default function ChatIntegrationSteps() {
  const [mode, setMode] = useState('code');
  const [selectedPlatform, setSelectedPlatform] = useState('react');

  const platformLabel = platforms.find(p => p.id === selectedPlatform)?.name || 'React';

  return (
    <div className="flex-1 overflow-auto relative">
      {/* Top header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <Link to="/chats/get-started" className="flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors">
          <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Get Started / Integrate
        </Link>
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
      <div className="p-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-10">Integrate Chat & Messaging</h1>

        {/* Step 1 */}
        <div className="mb-10">
          <div className="flex items-start gap-4 mb-6">
            <StepNumber n={1} />
            <div className="flex-1 pt-0.5">
              <h2 className="text-base font-semibold text-gray-900 mb-1">Add Chat to your frontend</h2>
              <p className="text-sm text-gray-500">Select your preferred platform or framework</p>
            </div>
          </div>

          {/* Code/No Code toggle */}
          <div className="ml-11 mb-5 inline-flex p-1 bg-gray-100 rounded-lg">
            {['code', 'no-code'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  mode === m ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {m === 'code' ? 'Code' : 'No Code'}
              </button>
            ))}
          </div>

          {/* Platform grid */}
          <div className="ml-11 grid grid-cols-4 gap-3">
            {platforms.map((p) => (
              <PlatformCard
                key={p.id}
                platform={p}
                selected={selectedPlatform === p.id}
                onClick={() => setSelectedPlatform(p.id)}
              />
            ))}
          </div>

          {/* Integration methods */}
          <div className="ml-11 mt-10">
            <h3 className="text-base font-semibold text-gray-900 mb-5">
              Integration Methods for {platformLabel}
            </h3>

            <SkillsOption />

            <IntegrationOption
              number="02"
              title={`${platformLabel} UI Kit - UI Kit Builder (Pre-Assembled UI)`}
              description="A ready-to-use chat interface—configured via a UI Kit builder—built on top of our UI Kits."
              primaryAction="Launch UI Kit Builder"
              secondaryAction="Go to UI Kit Builder Docs"
              videoLink="Video tutorial"
              howItWorks={[
                'Toggle on features mentions, reactions, media sharing, etc.',
                `Export the fully functional ${platformLabel} code and plug it into your existing app.`,
                'Customize it anytime—it\'s based on our UI Kits, so you can edit layouts, styles, or workflows as needed.',
              ]}
              whyGreat={[
                'Fastest setup—no manual component wiring.',
                'Extra features (like user/group info) included by default.',
                'No compromise on customization—still the same UI Kits behind the scenes.',
              ]}
            />

            <IntegrationOption
              number="03"
              title={`${platformLabel} UI Kit - UI Components (Assemble It Yourself)`}
              description="A collection of individual components conversation list, message list, message composer etc, each with built-in chat logic—so you're not just getting visual elements."
              primaryAction={`Go to ${platformLabel} UI Kit Docs`}
              howItWorks={[
                'Pick the components you need from our UI Kits.',
                'Arrange them in your desired layout, applying custom styling or theming.',
                'Since each component handles its own chat logic, you don\'t need to wire the SDK calls yourself.',
              ]}
              whyGreat={[
                'Flexible design—you control the look, flow, and user experience.',
                'Time-saving—no need to implement real-time messaging code from scratch.',
                'Modular—use exactly the parts you want, then integrate them your way.',
              ]}
            />

            <IntegrationOption
              number="04"
              title="JavaScript SDK (Build from Scratch)"
              description="The complete CometChat feature set with no pre-built UI."
              primaryAction="Go to JavaScript SDK Docs"
              howItWorks={[
                'Integrate the SDK into your frontend for real-time chat functionality.',
                'Build every screen and flow from the ground up, exactly how you want.',
              ]}
              whyGreat={[
                'Ultimate freedom — ideal for fully custom or highly complex requirements.',
                'Developer control — you craft every detail of the chat experience.',
                'Truly bespoke — best if you have unique design guidelines or brand needs.',
              ]}
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <StepNumber n={2} />
            <div className="flex-1 pt-0.5">
              <h2 className="text-base font-semibold text-gray-900 mb-1">User Sync - Create user in CometChat</h2>
              <p className="text-sm text-gray-500">Connect your app's user with CometChat.</p>
            </div>
          </div>
          <div className="ml-11">
            <button className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors">
              Go to Docs
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4">Next Steps</h3>
          <div className="grid grid-cols-2 gap-4">
            <NextStepCard
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              }
              title="Authenticate Users Securely"
              description="Set up secure authentication between your backend and CometChat making sure the best practices are followed"
            />
            <NextStepCard
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              }
              title="Setup Notification"
              description="Configure real-time alerts through push, email, or SMS to keep users engaged."
            />
          </div>
        </div>
      </div>

      {/* Floating chat widget */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-purple-500 text-white px-2 py-6 rounded-l-lg shadow-lg cursor-pointer">
        <p className="text-xs font-medium [writing-mode:vertical-rl] rotate-180">Chat with us</p>
      </div>
    </div>
  );
}
