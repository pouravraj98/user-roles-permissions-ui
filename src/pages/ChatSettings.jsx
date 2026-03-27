import { useState } from 'react';

const InfoIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
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

const CheckIcon = () => (
  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Tooltip = ({ children, content }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute z-50 top-1/2 -translate-y-1/2 left-full ml-2.5 w-72 p-3 bg-gray-900 text-white text-xs leading-relaxed rounded-lg shadow-lg">
          {content}
          <div className="absolute top-1/2 -translate-y-1/2 right-full -mr-px border-4 border-transparent border-r-gray-900" />
        </div>
      )}
    </span>
  );
};

export default function ChatSettings() {
  const [chatLogs, setChatLogs] = useState(true);
  const [mediaAccessSecurity, setMediaAccessSecurity] = useState('basic');
  const [tokenTTL, setTokenTTL] = useState('86400');

  const [customMessages, setCustomMessages] = useState(true);
  const [groupActions, setGroupActions] = useState(true);
  const [callActivities, setCallActivities] = useState(false);
  const [threadReplies, setThreadReplies] = useState(true);

  const [decrementReplyCount, setDecrementReplyCount] = useState(false);

  const [model, setModel] = useState('gpt-3.5-turbo-0613');
  const [openAiKey, setOpenAiKey] = useState('');
  const [customInstruction, setCustomInstruction] = useState('');
  const [temperature, setTemperature] = useState('0.0');

  return (
    <div className="flex-1 overflow-auto">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="px-8 py-8 space-y-0">
        {/* Section 1: General Configuration */}
        <div className="grid grid-cols-12 gap-8 pb-10">
          <div className="col-span-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">General Configuration</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Customize conversation previews and unread counts by selecting which message types appear as the last message and adjusting how unread messages are counted.
            </p>
          </div>
          <div className="col-span-8">
            <div className="bg-white rounded-xl border border-gray-200">
              {/* Chat Logs */}
              <div className="flex items-start gap-4 px-6 py-5">
                <Toggle enabled={chatLogs} onChange={setChatLogs} />
                <div>
                  <div className="text-sm font-semibold text-gray-900">Chat Logs</div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Show or Hide the chat messages on the Live and History tabs of{' '}
                    <span className="text-purple-600 cursor-pointer hover:underline">Chats page</span>
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100" />
              {/* Media Access Security */}
              <div className="px-6 py-5 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm font-semibold text-gray-900">Media URL Access</span>
                      <Tooltip content={
                        <div className="space-y-2">
                          <p className="font-semibold text-white/90">Media URL Access levels:</p>
                          <p><span className="font-medium text-white">Public URLs</span> — Media files are accessible via direct, unrestricted URLs. No authentication required.</p>
                          <p><span className="font-medium text-white">Token-based Signed URLs</span> — Media URLs include an access token generated using the authToken or apiKey. URLs expire when the associated authToken or apiKey is deleted.</p>
                          <p><span className="font-medium text-white">Presigned URLs</span> — Media URLs are time-limited with a configurable TTL. Requires SDK v5.x+ with retry support.</p>
                        </div>
                      }>
                        <InfoIcon className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <p className="text-sm text-gray-500">Control how media file URLs are secured and accessed.</p>
                  </div>
                  <select
                    value={mediaAccessSecurity}
                    onChange={(e) => setMediaAccessSecurity(e.target.value)}
                    className="w-64 px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 cursor-pointer flex-shrink-0"
                  >
                    <option value="basic">Public URLs</option>
                    <option value="long-lived-token">Token-based Signed URLs</option>
                    <option value="short-lived-token">Presigned URLs</option>
                  </select>
                </div>

                {/* TTL Config — only for presigned URLs */}
                {mediaAccessSecurity === 'short-lived-token' && (
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900 mb-0.5">Token TTL</div>
                      <p className="text-sm text-gray-500">
                        Recommended: 86400 (1 day). URLs expire after this duration.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <input
                          type="number"
                          value={tokenTTL}
                          onChange={(e) => setTokenTTL(e.target.value)}
                          placeholder="e.g. 86400"
                          min="60"
                          className="w-48 px-4 py-2.5 pr-16 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 placeholder:text-gray-400"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">seconds</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SDK Warning Banner — Token-based Signed URLs */}
                {mediaAccessSecurity === 'long-lived-token' && (
                  <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      <span className="font-medium text-amber-800">Minimum SDK version required: v4.0+</span> Requires CometChat SDK or UI Kit version 4.0 and above. Ensure your app is updated before enabling this option.
                    </p>
                  </div>
                )}

                {/* SDK Warning Banner — Presigned URLs */}
                {mediaAccessSecurity === 'short-lived-token' && (
                  <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      <span className="font-medium text-amber-800">Minimum SDK version required: v5.x+</span> Presigned URLs expire after the configured TTL. Ensure your app uses CometChat SDK v5.0 or above which supports automatic retry and URL refresh.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200" />

        {/* Section 2: Conversation Previews */}
        <div className="grid grid-cols-12 gap-8 py-10">
          <div className="col-span-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Customise Conversation Previews and Unread Counts
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Tailor the conversation list by choosing which message types appear as the last message for each conversation & increment the unread message count.
            </p>
          </div>
          <div className="col-span-8">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-sm font-normal text-gray-500 w-1/2"></th>
                    <th className="text-center px-4 py-4 text-sm font-medium text-gray-700 w-1/4">Conversations</th>
                    <th className="text-center px-4 py-4 text-sm font-medium text-gray-700 w-1/4">Threads</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Include Standard Messages */}
                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-gray-900">Include Standard Messages</span>
                        <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center"><CheckIcon /></div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center"><CheckIcon /></div>
                    </td>
                  </tr>
                  {/* Include Custom Messages */}
                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-gray-900">Include Custom Messages</span>
                        <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <Toggle enabled={customMessages} onChange={setCustomMessages} />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center"><CheckIcon /></div>
                    </td>
                  </tr>
                  {/* Include Group Actions */}
                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-gray-900">Include Group Actions</span>
                        <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <Toggle enabled={groupActions} onChange={setGroupActions} />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center"><CrossIcon /></div>
                    </td>
                  </tr>
                  {/* Include Call Activities */}
                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-gray-900">Include Call Activities</span>
                        <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <Toggle enabled={callActivities} onChange={setCallActivities} />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center"><CrossIcon /></div>
                    </td>
                  </tr>
                  {/* Include Thread Replies */}
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-gray-900">Include Thread Replies</span>
                        <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <Toggle enabled={threadReplies} onChange={setThreadReplies} />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center"><CheckIcon /></div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="px-6 py-4 border-t border-gray-100">
                <button className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200" />

        {/* Section 3: Threads */}
        <div className="grid grid-cols-12 gap-8 py-10">
          <div className="col-span-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Threads</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Configure how threaded conversations behave when messages are deleted. These settings affect reply counts and real-time updates across all conversations and groups.
            </p>
          </div>
          <div className="col-span-8">
            <div className="bg-white rounded-xl border border-gray-200">
              {/* Decrement Reply Count Toggle */}
              <div className="flex items-start gap-4 px-6 py-5">
                <Toggle enabled={decrementReplyCount} onChange={setDecrementReplyCount} />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">Auto-decrement reply count on deletion</div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    When a threaded reply is deleted, automatically reduce the parent message's reply count.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200" />

        {/* Section 4: AI Copilot Configuration */}
        <div className="grid grid-cols-12 gap-8 pt-10">
          <div className="col-span-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Configure how your AI Copilot responds in chat
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Set your OpenAI model, temperature, and custom instructions here. These settings apply across AI-driven features like chat assistance and AI agents.
            </p>
          </div>
          <div className="col-span-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              {/* Model + OpenAI Key */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Model</label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">OpenAI Key</label>
                  <input
                    type="text"
                    value={openAiKey}
                    onChange={(e) => setOpenAiKey(e.target.value)}
                    placeholder="Enter OpenAI Key"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Custom Instruction */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  Custom Instruction
                  <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
                </label>
                <textarea
                  value={customInstruction}
                  onChange={(e) => setCustomInstruction(e.target.value)}
                  placeholder="Enter Instruction"
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 placeholder:text-gray-400 resize-y"
                />
              </div>

              {/* Open AI Temperature */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  Open AI Temperature
                  <InfoIcon className="w-3.5 h-3.5 text-gray-400" />
                </label>
                <input
                  type="text"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                />
              </div>

              {/* Update Button */}
              <div>
                <button className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
