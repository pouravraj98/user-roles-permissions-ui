import { useState } from 'react';

const ContactModal = ({ isOpen, onClose, featureName }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRequestEnable = () => {
    // This would send a request to Zendesk
    console.log('Sending request to Zendesk for feature:', featureName);
    // TODO: Integrate with Zendesk API
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <>
            {/* Success Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Title */}
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">
              Request Submitted
            </h3>

            {/* Success Description */}
            <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
              We've received your request. Our team will reach out to you shortly to help enable this feature.
            </p>

            {/* Done Button */}
            <button
              onClick={handleClose}
              className="w-full py-3 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              Done
            </button>
          </>
        ) : (
          <>
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">
              Enable Feature
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
              To enable <span className="font-medium text-gray-700">"{featureName}"</span>, please contact our team. We'll help you get set up quickly.
            </p>

            {/* CTA Button */}
            <button
              onClick={handleRequestEnable}
              className="w-full py-3 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Request to Enable
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Toggle = ({ enabled, onChange }) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-purple-500' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
};

const InfoTooltip = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      {isVisible && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
          {text}
        </div>
      )}
    </div>
  );
};

const ToggleRow = ({ label, enabled, onToggleClick, infoText }) => {
  return (
    <div className="flex items-center justify-between py-4 px-6 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">{label}</span>
        {infoText && <InfoTooltip text={infoText} />}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">Enable</span>
        <button
          onClick={() => onToggleClick(label)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? 'bg-purple-500' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
              enabled ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

const SubsectionHeader = ({ title }) => {
  return (
    <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
      <span className="text-sm font-medium text-gray-600">{title}</span>
    </div>
  );
};

const AccordionHeader = ({ title, isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-200"
    >
      <span className="text-gray-500 text-xs">
        {isOpen ? '▼' : '▶'}
      </span>
      <span className="text-sm font-semibold text-gray-900">{title}</span>
    </button>
  );
};

export default function NotificationSettings() {
  const [activeTab, setActiveTab] = useState('preferences');
  const [openSections, setOpenSections] = useState(['push']);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  const handleToggleClick = (featureName) => {
    setSelectedFeature(featureName);
    setShowContactModal(true);
  };

  // Push Notification Preferences state
  const [pushPreferences, setPushPreferences] = useState({
    includeEntireMessage: false,
    includeMessageMetadata: true,
    includeSenderMetadata: true,
    includeReceiverMetadata: true,
    trimCometChatMessage: false,
    additionalData: '{}',
    enableUnreadBadgeCount: false,
  });

  // Email Notification Preferences state
  const [emailPreferences, setEmailPreferences] = useState({
    enableEmailNotifications: true,
    includeMessagePreview: true,
    sendDigestEmails: false,
  });

  // SMS Notification Preferences state
  const [smsPreferences, setSmsPreferences] = useState({
    enableSmsNotifications: false,
    includeSenderName: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const updatePushPreference = (key, value) => {
    setPushPreferences(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'providers', label: 'Providers' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'templates', label: 'Templates and Sounds' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          Documentation
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'preferences' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Push Notification Preferences */}
            <AccordionHeader
              title="Push Notification Preferences"
              isOpen={openSections.includes('push')}
              onToggle={() => toggleSection('push')}
            />

            {openSections.includes('push') && (
              <>
                {/* Push Payload Message Options */}
                <SubsectionHeader title="Push Payload Message Options" />

                <ToggleRow
                  label="Include entire message object in payload"
                  enabled={pushPreferences.includeEntireMessage}
                  onToggleClick={handleToggleClick}
                />
                <ToggleRow
                  label="Include message metadata in payload"
                  enabled={pushPreferences.includeMessageMetadata}
                  onToggleClick={handleToggleClick}
                />
                <ToggleRow
                  label="Include sender's metadata in payload"
                  enabled={pushPreferences.includeSenderMetadata}
                  onToggleClick={handleToggleClick}
                />
                <ToggleRow
                  label="Include receiver's metadata in payload"
                  enabled={pushPreferences.includeReceiverMetadata}
                  onToggleClick={handleToggleClick}
                />
                <ToggleRow
                  label="Trim CometChat message object"
                  enabled={pushPreferences.trimCometChatMessage}
                  onToggleClick={handleToggleClick}
                />

                {/* Additional Data in Payload */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <label className="block text-sm text-gray-700 mb-3">
                    Additional Data in Payload
                  </label>
                  <textarea
                    value={pushPreferences.additionalData}
                    onChange={(e) => updatePushPreference('additionalData', e.target.value)}
                    className="w-full max-w-2xl h-28 px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y font-mono text-gray-600"
                    placeholder="{}"
                  />
                </div>

                {/* Unread Badge Count */}
                <SubsectionHeader title="Unread Badge Count" />

                <ToggleRow
                  label="Enable unread badge count"
                  enabled={pushPreferences.enableUnreadBadgeCount}
                  onToggleClick={handleToggleClick}
                  infoText="Displays the total number of unread messages as a badge on the app icon. Works on iOS and Android devices that support badge counts."
                />
              </>
            )}

            {/* Email Notification Preferences */}
            <AccordionHeader
              title="Email Notification Preferences"
              isOpen={openSections.includes('email')}
              onToggle={() => toggleSection('email')}
            />

            {openSections.includes('email') && (
              <>
                <ToggleRow
                  label="Enable email notifications"
                  enabled={emailPreferences.enableEmailNotifications}
                  onToggleClick={handleToggleClick}
                />
                <ToggleRow
                  label="Include message preview in emails"
                  enabled={emailPreferences.includeMessagePreview}
                  onToggleClick={handleToggleClick}
                />
                <ToggleRow
                  label="Send digest emails"
                  enabled={emailPreferences.sendDigestEmails}
                  onToggleClick={handleToggleClick}
                />
              </>
            )}

            {/* SMS Notification Preferences */}
            <AccordionHeader
              title="SMS Notification Preferences"
              isOpen={openSections.includes('sms')}
              onToggle={() => toggleSection('sms')}
            />

            {openSections.includes('sms') && (
              <>
                <ToggleRow
                  label="Enable SMS notifications"
                  enabled={smsPreferences.enableSmsNotifications}
                  onToggleClick={handleToggleClick}
                />
                <ToggleRow
                  label="Include sender name in SMS"
                  enabled={smsPreferences.includeSenderName}
                  onToggleClick={handleToggleClick}
                />
              </>
            )}

            {/* Action Bar */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                Reset to default
              </button>
              <button className="px-5 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 shadow-sm">
                Save
              </button>
            </div>
          </div>
        )}

        {activeTab === 'providers' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <p className="text-gray-500 text-sm">Configure notification providers here.</p>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <p className="text-gray-500 text-sm">Configure notification templates and sounds here.</p>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        featureName={selectedFeature}
      />
    </div>
  );
}
