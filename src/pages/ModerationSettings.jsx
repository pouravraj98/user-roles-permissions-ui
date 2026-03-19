import { useState } from 'react';

const Toggle = ({ enabled, onChange, size = 'default' }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex items-center rounded-full transition-colors flex-shrink-0 ${
      enabled ? 'bg-purple-500' : 'bg-gray-300'
    } ${size === 'sm' ? 'h-5 w-9' : 'h-6 w-11'}`}
  >
    <span
      className={`inline-block transform rounded-full bg-white transition-transform ${
        size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
      } ${enabled
        ? (size === 'sm' ? 'translate-x-[18px]' : 'translate-x-6')
        : 'translate-x-1'
      }`}
    />
  </button>
);

const EyeIcon = () => (
  <svg className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-3 h-3 text-amber-400 inline-block ml-1" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// --- Rules Data ---
const rulesData = [
  {
    category: 'Word Pattern Match',
    provider: null,
    mediaType: null,
    rules: [
      { name: 'Profanity Filter', ruleId: 'profanity-filter', description: 'Identifies profane words in text and custom messages.', condition: 'Text or Custom contains keywords from Profanity list', action: 'Blocked Message', createdOn: 'Jun 14, 2024, 14:26', lastEdited: 'Jul 09, 2024, 13:07', builtIn: true, enabled: false },
      { name: 'Contact Details Filter', ruleId: 'contact-details-filter', description: 'Identifies and removes phone numbers from text', condition: 'Text or Custom contains phone number patterns', action: 'Blocked Message', createdOn: 'Jun 12, 2024, 15:28', lastEdited: 'Jun 12, 2024, 15:28', builtIn: true, enabled: false },
      { name: 'Email Filter', ruleId: 'email-filter', description: 'Identify and remove email address from messages', condition: 'Text or Custom contains email address patterns', action: 'Blocked Message', createdOn: 'Jun 11, 2024, 15:28', lastEdited: 'Jun 11, 2024, 15:28', builtIn: true, enabled: false },
    ],
  },
  {
    category: 'CometChat AI',
    provider: 'CometChat AI',
    mediaType: 'Text Rules',
    rules: [
      { name: 'AI Spam Detection', ruleId: 'ai-spam-detection', description: 'AI-powered text moderation to detect spam messages.', condition: 'Text or Custom contains keywords from Spam list', action: 'Blocked Message', createdOn: 'Jun 14, 2024, 13:00', lastEdited: 'Jul 09, 2024, 13:07', builtIn: true, enabled: false },
      { name: 'AI Scam Detection', ruleId: 'ai-scam-detection', description: 'AI-powered text moderation to detect scam messages.', condition: 'Text or Custom contains keywords from Scam list', action: 'Blocked Message', createdOn: 'Jun 14, 2024, 13:00', lastEdited: 'Jul 09, 2024, 13:07', builtIn: true, enabled: false },
      { name: 'AI Platform Circumvention', ruleId: 'platform-circumvention', description: 'AI powered Platform Circumvention detects and prevents attempts to bypass platform rules and restrictions.', condition: 'Text or Custom contains keywords from Platform Circumvention list', action: 'Blocked Message', createdOn: 'Jun 14, 2024, 13:00', lastEdited: 'Jul 09, 2024, 13:07', builtIn: true, enabled: false },
      { name: 'AI Message Toxicity', ruleId: 'ai-message-toxicity', description: 'AI-powered tool to detect and flag toxic or harmful language in text, ensuring safer communication.', condition: 'Text or Custom contains toxic or harmful language', action: 'Flagged Message', createdOn: 'Jun 14, 2024, 12:59', lastEdited: 'Jul 09, 2024, 13:07', builtIn: true, enabled: false },
    ],
  },
  {
    category: 'CometChat AI',
    provider: null,
    mediaType: 'Media Rules',
    rules: [
      { name: 'AI Image Moderation', ruleId: 'ai-image-moderation', description: 'AI-powered image moderation to detect unsafe content.', condition: 'Image contains any unsafe content', action: 'Blocked Message', createdOn: 'Jun 25, 2024, 13:48', lastEdited: 'Jun 25, 2024, 13:48', builtIn: true, enabled: false },
      { name: 'AI Video Moderation', ruleId: 'ai-video-moderation', description: 'AI-powered video moderation to detect unsafe content.', condition: 'Video contains any unsafe content', action: 'Blocked Message', createdOn: 'Jun 14, 2024, 12:59', lastEdited: 'Jun 14, 2024, 12:59', builtIn: true, enabled: false },
      { name: 'Malware & Virus Scanner', ruleId: 'malware-virus-scanner', description: 'Scans all file attachments for malware and viruses using industry-standard scanning engines. Detected files are blocked automatically.', condition: 'Files contains Malware & Virus Scanner detection', action: 'Blocked Message', createdOn: 'Mar 19, 2026, 10:00', lastEdited: 'Mar 19, 2026, 10:00', builtIn: true, enabled: false, enterprise: true },
    ],
  },
  {
    category: 'OpenAI',
    provider: 'OpenAI',
    mediaType: 'Text Rules',
    rules: [
      { name: 'Spam And Scam Prompt (All Languages)', ruleId: 'openai-spam-scam', description: 'A predefined OpenAI moderation prompt to identify spam messages, phishing attempts, and fraudulent schemes.', condition: 'Text or Custom contains spam or scam content', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Non-Consensual Sexual Content Or Exploitation...', ruleId: 'openai-sexual-exploitation', description: 'A predefined OpenAI moderation prompt to detect sexual exploitation, grooming, or non-consensual content.', condition: 'Text or Custom contains sexual exploitation content', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Impersonation Or Fraud Prompt (All Languages)', ruleId: 'openai-impersonation-fraud', description: 'A predefined OpenAI moderation prompt to detect deceptive attempts to impersonate individuals or organizations.', condition: 'Text or Custom contains impersonation or fraud content', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Hate And Harassment Prompt (All Languages)', ruleId: 'openai-hate-harassment', description: 'A predefined OpenAI moderation prompt to detect hateful or harassing language toward individuals or groups.', condition: 'Text or Custom contains hate or harassment content', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Privacy And Sensitive Info Prompt (All Languages)', ruleId: 'openai-privacy-sensitive', description: 'A predefined OpenAI moderation prompt to identify personal or sensitive information shared without consent.', condition: 'Text or Custom contains personal or sensitive information', action: 'Flagged Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Explicit Or Inappropriate Content Prompt (All La...', ruleId: 'openai-explicit-content', description: 'A predefined OpenAI moderation prompt to detect explicit sexual descriptions, graphic violence, or other unsuitable text.', condition: 'Text or Custom contains explicit or inappropriate content', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Violent Or Terroristic Threats Prompt (All Langua...', ruleId: 'openai-violent-threats', description: 'A predefined OpenAI moderation prompt to detect content that encourages, promotes, or glorifies violence or extremism.', condition: 'Text or Custom contains violent or terroristic threats', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Self-Harm Or Suicidal Content Prompt (All Lang...', ruleId: 'openai-self-harm', description: 'A predefined OpenAI moderation prompt to detect messages suggesting self-harm, suicidal thoughts, or related instructions.', condition: 'Text or Custom contains self-harm or suicidal content', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
    ],
  },
  {
    category: 'OpenAI',
    provider: null,
    mediaType: 'Media Rules',
    rules: [
      { name: 'Explicit Or Sexual Content Prompt', ruleId: 'openai-media-explicit', description: 'A predefined OpenAI moderation prompt to identify nudity, explicit sexual content, or suggestive imagery unsuitable for general audiences.', condition: 'Image contains explicit or sexual content', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Fraud Or Scam Indicators Prompt', ruleId: 'openai-media-fraud', description: 'A predefined OpenAI moderation prompt to flag manipulated or fraudulent images, such as fake IDs or doctored screenshots.', condition: 'Image contains fraud or scam indicators', action: 'Flagged Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Privacy Or Personal Data Prompt', ruleId: 'openai-media-privacy', description: 'A predefined OpenAI moderation prompt to identify images containing personal or sensitive data, such as IDs, addresses, or financial documents.', condition: 'Image contains personal or sensitive data', action: 'Flagged Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Self-Harm Or Suicidal Content Prompt', ruleId: 'openai-media-self-harm', description: 'A predefined OpenAI moderation prompt to detect imagery suggesting self-harm, suicidal ideation, or content that promotes self-injury.', condition: 'Image contains self-harm or suicidal content', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Minor Safety And Exploitation Prompt', ruleId: 'openai-media-minor-safety', description: 'A predefined OpenAI moderation prompt to detect child sexual content, exploitative imagery of minors, or unsafe depictions of children.', condition: 'Image contains child exploitation content', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Hate Or Harassment Prompt', ruleId: 'openai-media-hate', description: 'A predefined OpenAI moderation prompt to detect hate symbols, extremist insignia, and harassing imagery.', condition: 'Image contains hate symbols or harassing imagery', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Graphic Violence Or Gore Prompt', ruleId: 'openai-media-violence', description: 'A predefined OpenAI moderation prompt to detect images of extreme violence, gore, or other disturbing content.', condition: 'Image contains graphic violence or gore', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
      { name: 'Terrorism Or Extremist Promotion Prompt', ruleId: 'openai-media-terrorism', description: 'A predefined OpenAI moderation prompt to detect extremist propaganda, terrorist symbols, or images promoting violent ideologies.', condition: 'Image contains terrorism or extremist promotion', action: 'Blocked Message', createdOn: 'Feb 23, 2024, 16:10', lastEdited: 'Feb 23, 2024, 16:10', builtIn: true, enabled: false },
    ],
  },
];

function RuleDetailModal({ rule, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">{rule.name}</h2>
            {rule.enterprise && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-700 uppercase tracking-wider">Enterprise</span>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {/* Rule Info */}
          <div className="border-l-2 border-gray-200 pl-5 space-y-2 mb-6">
            <div className="text-sm">
              <span className="text-gray-500">Rule Name: </span>
              <span className="text-gray-900 font-medium">{rule.name}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Rule ID: </span>
              <span className="text-gray-900 font-medium">{rule.ruleId}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Rule Description: </span>
              <span className="text-gray-900">{rule.description}</span>
            </div>
          </div>

          {/* Conditions */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Conditions</h3>
            <span className="inline-block px-3.5 py-2 bg-gray-100 text-sm text-gray-700 rounded-lg">{rule.condition}</span>
          </div>

          {/* Actions */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Actions</h3>
            <span className="inline-block px-3.5 py-2 bg-gray-100 text-sm text-gray-700 rounded-lg">{rule.action}</span>
          </div>

          {/* Footer metadata */}
          <div className="border-t border-gray-100 pt-4 flex items-center gap-8">
            <div className="text-xs text-gray-400">
              <span>Created On: </span>
              <span className="text-gray-600 font-medium">{rule.createdOn}</span>
            </div>
            <div className="text-xs text-gray-400">
              <span>Last Edited On: </span>
              <span className="text-gray-600 font-medium">{rule.lastEdited}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Select type options per message type
const selectTypeOptions = {
  Text: ['Profanity', 'Spam', 'Scam', 'Toxicity', 'Platform Circumvention', 'Custom Pattern'],
  Image: ['Any unsafe content', 'Violence', 'Alcohol', 'Gambling', 'Drugs & Tobacco', 'Rude Gestures', 'Explicit Nudity', 'Non-Explicit Nudity', 'Swimwear or Underwear', 'Visually Disturbing', 'Hate Symbols'],
  Video: ['Any unsafe content', 'Violence', 'Alcohol', 'Gambling', 'Drugs & Tobacco', 'Rude Gestures', 'Explicit Nudity', 'Non-Explicit Nudity', 'Swimwear or Underwear', 'Visually Disturbing', 'Hate Symbols'],
  Files: ['Malware & Virus Scanner'],
};

function AddRuleForm({ onBack }) {
  const [messageAction, setMessageAction] = useState('block');
  const [blockUser, setBlockUser] = useState(false);
  const [kickUser, setKickUser] = useState(false);
  const [banUser, setBanUser] = useState(false);
  const [conditions, setConditions] = useState([{ messageType: '', operator: '', selectType: '' }]);

  const updateCondition = (index, field, value) => {
    setConditions(prev => prev.map((c, i) => {
      if (i !== index) return c;
      const updated = { ...c, [field]: value };
      // Reset downstream fields when upstream changes
      if (field === 'messageType') { updated.operator = ''; updated.selectType = ''; }
      if (field === 'operator') { updated.selectType = ''; }
      return updated;
    }));
  };

  const addCondition = () => {
    setConditions(prev => [...prev, { messageType: '', operator: '', selectType: '' }]);
  };

  const removeCondition = (index) => {
    setConditions(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  };

  return (
    <div className="flex-1 overflow-auto flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Add Rule</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-8 py-6 space-y-8">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
          <input
            type="text"
            placeholder="Rule name"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 focus:bg-white placeholder:text-gray-400"
          />
        </div>

        {/* ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">ID</label>
          <input
            type="text"
            placeholder="unique_rule_identifier"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 focus:bg-white placeholder:text-gray-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
          <input
            type="text"
            placeholder="Rule description"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 focus:bg-white placeholder:text-gray-400"
          />
        </div>

        {/* Filters */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Filters</label>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Meet all of the following filters</span>
            </div>
            <div className="p-4 space-y-3">
              <select className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 cursor-pointer">
                <option>Filter by</option>
                <option>Message type</option>
                <option>Sender role</option>
                <option>Receiver type</option>
                <option>File type</option>
              </select>
              <div>
                <button className="flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8" />
                  </svg>
                  Add another...
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Conditions */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Conditions</label>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Meet any of the following conditions</span>
            </div>
            <div className="p-4 space-y-3">
              {conditions.map((condition, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {/* Message Type dropdown */}
                  <select
                    value={condition.messageType}
                    onChange={(e) => updateCondition(idx, 'messageType', e.target.value)}
                    className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 cursor-pointer min-w-[160px]"
                  >
                    <option value="">Message type</option>
                    <optgroup label="Message">
                      <option value="Text">Text</option>
                      <option value="Image">Image</option>
                      <option value="Video">Video</option>
                      <option value="Files">Files</option>
                    </optgroup>
                  </select>

                  {/* Operator dropdown - shows after message type selected */}
                  {condition.messageType && (
                    <select
                      value={condition.operator}
                      onChange={(e) => updateCondition(idx, 'operator', e.target.value)}
                      className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 cursor-pointer min-w-[140px]"
                    >
                      <option value="">Operator</option>
                      <option value="Contains">Contains</option>
                    </select>
                  )}

                  {/* Select type dropdown - shows after operator selected */}
                  {condition.operator && (
                    <select
                      value={condition.selectType}
                      onChange={(e) => updateCondition(idx, 'selectType', e.target.value)}
                      className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 cursor-pointer min-w-[200px]"
                    >
                      <option value="">Select type</option>
                      {(selectTypeOptions[condition.messageType] || []).map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {/* Remove button */}
                  <button
                    onClick={() => removeCondition(idx)}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove condition"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth={2} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
                    </svg>
                  </button>
                </div>
              ))}
              <div>
                <button
                  onClick={addCondition}
                  className="flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8" />
                  </svg>
                  Add another...
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Actions</label>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Perform these actions</span>
            </div>
            <div className="p-4 space-y-5">
              {/* Message Action */}
              <div className="flex items-start gap-12">
                <span className="text-sm text-gray-900 font-medium w-32 flex-shrink-0 pt-0.5">Message Action</span>
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="radio" name="messageAction" value="block" checked={messageAction === 'block'} onChange={(e) => setMessageAction(e.target.value)} className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700">Block</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="radio" name="messageAction" value="flag" checked={messageAction === 'flag'} onChange={(e) => setMessageAction(e.target.value)} className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700">Flag</span>
                  </label>
                </div>
              </div>

              {/* User Action */}
              <div className="flex items-start gap-12">
                <span className="text-sm text-gray-900 font-medium w-32 flex-shrink-0 pt-0.5">User Action</span>
                <div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={blockUser} onChange={(e) => setBlockUser(e.target.checked)} className="w-4 h-4 rounded text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700">Block User</span>
                  </label>
                </div>
              </div>

              {/* Group Action */}
              <div className="flex items-start gap-12">
                <span className="text-sm text-gray-900 font-medium w-32 flex-shrink-0 pt-0.5">Group Action</span>
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={kickUser} onChange={(e) => setKickUser(e.target.checked)} className="w-4 h-4 rounded text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700">Kick User</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={banUser} onChange={(e) => setBanUser(e.target.checked)} className="w-4 h-4 rounded text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700">Ban User</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-8 py-4 flex items-center justify-end gap-3 bg-white sticky bottom-0">
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
          Save
        </button>
      </div>
    </div>
  );
}

export default function ModerationSettings() {
  const [moderationEnabled, setModerationEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('rules');
  const [showAddRule, setShowAddRule] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [ruleStates, setRuleStates] = useState(() => {
    const states = {};
    rulesData.forEach(section => {
      section.rules.forEach(rule => {
        states[rule.name] = rule.enabled;
      });
    });
    return states;
  });

  const toggleRule = (name) => {
    setRuleStates(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const tabs = [
    { id: 'rules', label: 'Rules' },
    { id: 'lists', label: 'Lists' },
    { id: 'advanced', label: 'Advanced Settings' },
  ];

  // Group sections: track when a new provider category starts
  let lastProvider = null;

  if (showAddRule) {
    return <AddRuleForm onBack={() => setShowAddRule(false)} />;
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          Documentation
        </button>
      </div>

      <div className="px-8 py-6">
        {/* Moderation Master Toggle */}
        <div className="flex items-start gap-4 mb-8">
          <Toggle enabled={moderationEnabled} onChange={setModerationEnabled} />
          <div>
            <div className="text-sm font-semibold text-gray-900">Moderation</div>
            <p className="text-sm text-gray-500 mt-0.5">Turn on content moderation to filter harmful or unwanted messages automatically.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between border-b border-gray-200 mb-0">
          <div className="flex gap-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 'rules' && (
            <button
              onClick={() => setShowAddRule(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Rule
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'rules' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-4">Name</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-2">Created On</div>
              <div className="col-span-1" />
            </div>

            {/* Rules Sections */}
            {rulesData.map((section, sIdx) => {
              const showProviderHeader = section.provider && section.provider !== lastProvider;
              if (section.provider) lastProvider = section.provider;

              return (
                <div key={sIdx}>
                  {/* Provider Header (CometChat AI, OpenAI) */}
                  {showProviderHeader && (
                    <div className="px-6 py-3 bg-gray-100 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-900">{section.provider}</span>
                    </div>
                  )}

                  {/* Category / Media Type sub-header */}
                  {section.mediaType ? (
                    <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{section.mediaType}</span>
                    </div>
                  ) : section.category && !section.provider ? (
                    <div className="px-6 py-3 bg-gray-100 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-900">{section.category}</span>
                    </div>
                  ) : null}

                  {/* Rules Rows */}
                  {section.rules.map((rule, rIdx) => (
                    <div
                      key={rIdx}
                      className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="col-span-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-900">{rule.name}</span>
                          {rule.builtIn && <StarIcon />}
                          {rule.enterprise && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-purple-100 text-purple-700 uppercase tracking-wider">Enterprise</span>
                          )}
                        </div>
                      </div>
                      <div className="col-span-4">
                        <span className="text-sm text-gray-500 leading-relaxed">{rule.description}</span>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        {rule.enterprise ? (
                          <div className="relative group">
                            <Toggle size="sm" enabled={false} onChange={() => {}} />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-[10px] leading-relaxed rounded-lg shadow-lg text-center z-10">
                              Upgrade to Enterprise to enable this rule
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                            </div>
                          </div>
                        ) : (
                          <Toggle size="sm" enabled={ruleStates[rule.name]} onChange={() => toggleRule(rule.name)} />
                        )}
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm text-gray-500">{rule.createdOn}</span>
                      </div>
                      <div className="col-span-1 flex justify-end" onClick={() => setSelectedRule(rule)}>
                        <EyeIcon />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'lists' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 p-8">
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Moderation Lists</p>
              <p className="text-xs text-gray-500 mt-1">Manage custom word lists and block lists for moderation rules.</p>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 p-8">
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Advanced Settings</p>
              <p className="text-xs text-gray-500 mt-1">Configure advanced moderation settings like auto-actions, escalation rules, and thresholds.</p>
            </div>
          </div>
        )}
      </div>

      {/* Rule Detail Modal */}
      {selectedRule && <RuleDetailModal rule={selectedRule} onClose={() => setSelectedRule(null)} />}
    </div>
  );
}
