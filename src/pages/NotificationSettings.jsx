import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

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

const CopyIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const ResetIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0115.36-5.36M20 15a9 9 0 01-15.36 5.36" />
  </svg>
);

const TemplateDirtyContext = ({ children }) => children;

const TemplateCell = ({ value, onDirty }) => {
  const [text, setText] = useState(value);
  return (
    <textarea
      value={text}
      onChange={(e) => { setText(e.target.value); if (onDirty) onDirty(); }}
      rows={2}
      className="w-full text-sm text-gray-700 px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 resize-y bg-white"
    />
  );
};

const PushIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const EmailIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const SmsIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
);

const ChannelIcon = ({ Icon, active, selected, label, onClick }) => {
  const [show, setShow] = useState(false);
  const color = !active
    ? 'text-gray-300'
    : selected
      ? 'text-purple-600'
      : 'text-purple-400';
  return (
    <span
      className={`relative inline-flex ${active ? 'cursor-pointer' : 'cursor-default'}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={active ? onClick : undefined}
    >
      <Icon className={`w-3.5 h-3.5 ${color} transition-colors`} />
      {show && (
        <div className="absolute z-50 top-1/2 -translate-y-1/2 left-full ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] rounded-md shadow-lg whitespace-nowrap">
          {label} Notification{!active ? ' (not used)' : selected ? ' (viewing)' : ''}
          <div className="absolute top-1/2 -translate-y-1/2 right-full border-4 border-transparent border-r-gray-900" />
        </div>
      )}
    </span>
  );
};

const ChannelIcons = ({ push = false, email = false, sms = false, selected, onSelect }) => (
  <div className="flex items-center gap-2">
    <ChannelIcon Icon={PushIcon} active={push} selected={selected === 'push'} label="Push" onClick={() => onSelect('push')} />
    <ChannelIcon Icon={EmailIcon} active={email} selected={selected === 'email'} label="Email" onClick={() => onSelect('email')} />
    <ChannelIcon Icon={SmsIcon} active={sms} selected={selected === 'sms'} label="SMS" onClick={() => onSelect('sms')} />
  </div>
);

const TEMPLATE_DATA = {
  textMessage: {
    label: 'Text Message',
    rows: [
      { label: 'Title for one-on-one', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}}' },
      }},
      { label: 'Title for group', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}' },
      }},
      { label: 'Body', channels: {
        push: { default: '{{message.data.text}}', privacy: 'New message' },
        email: { default: '{{message.data.text}}', privacy: 'New message' },
        sms: { default: '{{message.data.text}}', privacy: 'New message' },
      }},
    ],
  },
  userMention: {
    label: 'User Mention',
    rows: [
      { label: 'Title for one-on-one', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}}' },
      }},
      { label: 'Title for group', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} @ {{message.data.entities.receiver.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}} @ {{message.data.entities.receiver.entity.name}}' },
      }},
      { label: 'Body', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} mentioned you: {{message.data.text()}}', privacy: 'New mention' },
        email: { default: '{{message.data.entities.sender.entity.name}} mentioned you: {{message.data.text()}}', privacy: 'New mention' },
        sms: { default: '{{message.data.entities.sender.entity.name}} mentioned you: {{message.data.text()}}', privacy: 'New mention' },
      }},
      { label: 'Body (Fallback)', isFallback: true, channels: {
        push: { default: 'New mention', privacy: 'New mention' },
        email: { default: 'New mention', privacy: 'New mention' },
        sms: { default: 'New mention', privacy: 'New mention' },
      }},
    ],
  },
  allMention: {
    label: '@all Mention',
    rows: [
      { label: 'Title for group', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} @ {{message.data.entities.receiver.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}} @ {{message.data.entities.receiver.entity.name}}' },
      }},
      { label: 'Body', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} mentioned everyone: {{message.data.text()}}', privacy: 'New mention' },
        email: { default: '{{message.data.entities.sender.entity.name}} mentioned everyone: {{message.data.text()}}', privacy: 'New mention' },
        sms: { default: '{{message.data.entities.sender.entity.name}} mentioned everyone: {{message.data.text()}}', privacy: 'New mention' },
      }},
      { label: 'Body (Fallback)', isFallback: true, channels: {
        push: { default: 'New mention', privacy: 'New mention' },
        email: { default: 'New mention', privacy: 'New mention' },
        sms: { default: 'New mention', privacy: 'New mention' },
      }},
    ],
  },
  mediaMessage: {
    label: 'Media Message',
    rows: [
      { label: 'Title for one-on-one', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}}' },
      }},
      { label: 'Title for group', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}' },
      }},
      { label: 'Body for Image', channels: {
        push: { default: '🖼️ Has sent an image', privacy: 'New image message' },
        email: { default: '🖼️ Has sent an image', privacy: 'New image message' },
      }},
      { label: 'Body for Audio', channels: {
        push: { default: '🎵 Has sent an audio', privacy: 'New audio message' },
        email: { default: '🎵 Has sent an audio', privacy: 'New audio message' },
      }},
      { label: 'Body for Video', channels: {
        push: { default: '🎬 Has sent a video', privacy: 'New video message' },
        email: { default: '🎬 Has sent a video', privacy: 'New video message' },
      }},
      { label: 'Body for File', channels: {
        push: { default: '📎 Has sent a file', privacy: 'New file message' },
        email: { default: '📎 Has sent a file', privacy: 'New file message' },
      }},
    ],
  },
  pollMessage: {
    label: 'Poll Message',
    rows: [
      { label: 'Title for one-on-one', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}}' },
      }},
      { label: 'Title for group', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}' },
      }},
      { label: 'Body', channels: {
        push: { default: 'i am reminding you last 5 min:: {{message.data.text}}', privacy: 'New message' },
        email: { default: '{{message.data.text}}', privacy: 'New message' },
        sms: { default: '{{message.data.text}}', privacy: 'New message' },
      }},
      { label: 'Body (Fallback)', isFallback: true, channels: {
        push: { default: 'New message', privacy: 'New message' },
        email: { default: 'New message', privacy: 'New message' },
        sms: { default: 'New message', privacy: 'New message' },
      }},
    ],
  },
  reminderMessage: {
    label: 'Reminder Message',
    rows: [
      { label: 'Title for one-on-one', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}}' },
      }},
      { label: 'Title for group', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}' },
      }},
      { label: 'Body', channels: {
        push: { default: '<5min> : {{message.data.text}}', privacy: 'New message' },
        email: { default: '{{message.data.text}}', privacy: 'New message' },
        sms: { default: '{{message.data.text}}', privacy: 'New message' },
      }},
      { label: 'Body (Fallback)', isFallback: true, channels: {
        push: { default: 'New message', privacy: 'New message' },
        email: { default: 'New message', privacy: 'New message' },
        sms: { default: 'New message', privacy: 'New message' },
      }},
    ],
  },
  customMessage: {
    label: 'Custom Message',
    rows: [
      { label: 'Title for one-on-one', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}}' },
      }},
      { label: 'Title for group', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}' },
      }},
      { label: 'Body', channels: {
        push: { default: 'i am reminding you last 5 min:{{message.data.text}}', privacy: 'New message' },
        email: { default: '{{message.data.text}}', privacy: 'New message' },
        sms: { default: '{{message.data.text}}', privacy: 'New message' },
      }},
      { label: 'Body (Fallback)', isFallback: true, channels: {
        push: { default: 'New message', privacy: 'New message' },
        email: { default: 'New message', privacy: 'New message' },
        sms: { default: 'New message', privacy: 'New message' },
      }},
    ],
  },
  interactiveForm: {
    label: 'Interactive Form',
    rows: [
      { label: 'Title for one-on-one', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}}' },
      }},
      { label: 'Title for group', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}' },
      }},
      { label: 'Body', channels: {
        push: { default: 'i am reminding you last 5 min:{{message.data.interactiveData.title}}', privacy: 'New message' },
        email: { default: '{{message.data.interactiveData.title}}', privacy: 'New message' },
      }},
    ],
  },
  interactiveCard: {
    label: 'Interactive Card',
    rows: [
      { label: 'Title for one-on-one', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}}' },
      }},
      { label: 'Title for group', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}' },
      }},
      { label: 'Body', channels: {
        push: { default: 'i am reminding you last 5 min:{{message.data.interactiveData.text}}', privacy: 'New message' },
        email: { default: '{{message.data.interactiveData.text}}', privacy: 'New message' },
      }},
    ],
  },
  interactiveScheduler: {
    label: 'Interactive Scheduler',
    rows: [
      { label: 'Title for one-on-one', channels: {
        push: { default: 'i am reminding you last 5 min:{{message.data.entities.sender.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}}' },
      }},
      { label: 'Title for group', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}' },
      }},
      { label: 'Body', channels: {
        push: { default: 'New invite', privacy: 'New invite' },
        email: { default: 'New invite', privacy: 'New invite' },
      }},
    ],
  },
  customInteractive: {
    label: 'Custom Interactive Message',
    rows: [
      { label: 'Title for one-on-one', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}}' },
      }},
      { label: 'Title for group', channels: {
        push: { default: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}', privacy: '{{message.data.entities.sender.entity.name}} @\n{{message.data.entities.receiver.entity.name}}' },
      }},
      { label: 'Body', channels: {
        push: { default: 'New message', privacy: 'New message' },
        email: { default: 'New message', privacy: 'New message' },
        sms: { default: 'New message', privacy: 'New message' },
      }},
    ],
  },
};

const TemplateRow = ({ label, channels, onDirty }) => {
  const availableChannels = Object.keys(channels);
  const [selectedChannel, setSelectedChannel] = useState(availableChannels[0]);
  const current = channels[selectedChannel];

  return (
    <div className="grid grid-cols-[280px_1fr_1fr] border-b border-gray-100">
      <div className="px-6 py-4 flex flex-col justify-center gap-1.5">
        <span className="text-sm font-semibold text-gray-900">{label}</span>
        <ChannelIcons
          push={!!channels.push}
          email={!!channels.email}
          sms={!!channels.sms}
          selected={selectedChannel}
          onSelect={(ch) => channels[ch] && setSelectedChannel(ch)}
        />
      </div>
      <div className="px-4 py-3">
        <TemplateCell value={current.default} onDirty={onDirty} />
      </div>
      <div className="px-4 py-3">
        <TemplateCell value={current.privacy} onDirty={onDirty} />
      </div>
    </div>
  );
};

const TemplateColumnHeader = ({ showLabel }) => (
  <div className="grid grid-cols-[280px_1fr_1fr] bg-purple-50/60 border-b border-gray-200">
    <div className="px-6 py-2.5 text-sm font-semibold text-gray-900">{showLabel || ''}</div>
    <div className="px-4 py-2.5 text-sm font-semibold text-gray-700">Default</div>
    <div className="px-4 py-2.5 text-sm font-semibold text-gray-700">Privacy</div>
  </div>
);

function TemplatesAndSounds() {
  const [openSections, setOpenSections] = useState(['common', 'email', 'sms']);
  const [isDirty, setIsDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  const markDirty = () => { setIsDirty(true); setSaved(false); };
  const handleSave = () => { setIsDirty(false); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const handleDiscard = () => { setIsDirty(false); };

  const toggleSection = (section) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <>
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Privacy Setting */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
        <span className="text-sm font-medium text-gray-700">Privacy Setting</span>
        <div className="flex items-center gap-2">
          <Toggle enabled={false} onChange={() => {}} />
          <span className="text-sm text-gray-500">Use default templates with end-user privacy override</span>
        </div>
      </div>

      {/* Common Templates and Sounds */}
      <AccordionHeader
        title="Common Templates and Sounds"
        isOpen={openSections.includes('common')}
        onToggle={() => toggleSection('common')}
      />

      {openSections.includes('common') && (
        <>
          {Object.entries(TEMPLATE_DATA).map(([key, data]) => (
            <div key={key}>
              <TemplateColumnHeader showLabel={data.label} />
              {data.rows.map((row, i) => (
                <TemplateRow key={i} label={row.label} channels={row.channels} onDirty={markDirty} />
              ))}
            </div>
          ))}

          {/* Sounds */}
          <SubsectionHeader title="Sounds" />
          <div className="grid grid-cols-[280px_1fr] border-b border-gray-100">
            <div className="px-6 py-4 flex items-center">
              <span className="text-sm font-semibold text-gray-900">Calls</span>
            </div>
            <div className="px-4 py-3">
              <input
                type="text"
                defaultValue="default"
                className="w-full text-sm text-gray-700 px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 bg-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-[280px_1fr] border-b border-gray-100">
            <div className="px-6 py-4 flex items-center">
              <span className="text-sm font-semibold text-gray-900">Sounds</span>
            </div>
            <div className="px-4 py-3">
              <input
                type="text"
                defaultValue="default"
                className="w-full text-sm text-gray-700 px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 bg-white"
              />
            </div>
          </div>
        </>
      )}

      {/* Email Notification Templates */}
      <AccordionHeader
        title="Email Notification Templates"
        isOpen={openSections.includes('email')}
        onToggle={() => toggleSection('email')}
      />

      {openSections.includes('email') && (
        <>
          <TemplateColumnHeader />
          <TemplateRow label="Email subject for one-on-one" channels={{ email: { default: 'New messages from {{senderDetails.name}}', privacy: 'New messages from {{senderDetails.name}}' }}} onDirty={markDirty} />
          <TemplateRow label="Email subject for group" channels={{ email: { default: 'New messages in {{groupDetails.name}}', privacy: 'New messages in {{groupDetails.name}}' }}} onDirty={markDirty} />
          <TemplateColumnHeader showLabel="User Mention" />
          <TemplateRow label="Email subject for one-on-one" channels={{ email: { default: '{{senderDetails.name}} mentioned you', privacy: 'New mention from {{senderDetails.name}}' }}} onDirty={markDirty} />
          <TemplateRow label="Email subject for group" channels={{ email: { default: '{{senderDetails.name}} mentioned you in {{groupDetails.name}}', privacy: 'New mention in {{groupDetails.name}}' }}} onDirty={markDirty} />
          <TemplateColumnHeader showLabel="@all Mention" />
          <TemplateRow label="Email subject for group" channels={{ email: { default: '{{senderDetails.name}} mentioned everyone in {{groupDetails.name}}', privacy: 'New mention in {{groupDetails.name}}' }}} onDirty={markDirty} />
        </>
      )}

      {/* SMS Notification Templates */}
      <AccordionHeader
        title="SMS Notification Templates"
        isOpen={openSections.includes('sms')}
        onToggle={() => toggleSection('sms')}
      />

      {openSections.includes('sms') && (
        <>
          <TemplateColumnHeader />
          <TemplateRow label="SMS template for one-on-one messages" channels={{ sms: { default: "You've received {{messages.length}} message(s) from {{senderDetails.name}}! Read them at https://your-website.com.", privacy: "You've received {{messages.length}} message(s) from {{senderDetails.name}}! Read them at https://your-website.com." }}} onDirty={markDirty} />
          <TemplateRow label="SMS template for group messages" channels={{ sms: { default: "You've received {{messages.length}} message(s) in {{groupDetails.name}}! Read them at https://your-website.com.", privacy: "You've received {{messages.length}} message(s) in {{groupDetails.name}}! Read them at https://your-website.com." }}} onDirty={markDirty} />
          <TemplateColumnHeader showLabel="User Mention" />
          <TemplateRow label="SMS template for one-on-one" channels={{ sms: { default: '{{senderDetails.name}} mentioned you! Read at https://your-website.com.', privacy: "You've been mentioned by {{senderDetails.name}}! Read at https://your-website.com." }}} onDirty={markDirty} />
          <TemplateRow label="SMS template for group" channels={{ sms: { default: '{{senderDetails.name}} mentioned you in {{groupDetails.name}}! Read at https://your-website.com.', privacy: "You've been mentioned in {{groupDetails.name}}! Read at https://your-website.com." }}} onDirty={markDirty} />
          <TemplateColumnHeader showLabel="@all Mention" />
          <TemplateRow label="SMS template for group" channels={{ sms: { default: '{{senderDetails.name}} mentioned everyone in {{groupDetails.name}}! Read at https://your-website.com.', privacy: 'New mention in {{groupDetails.name}}! Read at https://your-website.com.' }}} onDirty={markDirty} />
        </>
      )}

    </div>

      {/* Unsaved changes floating pill */}
      {isDirty && createPortal(
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 bg-white rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.16)] border border-gray-200 animate-[slideUp_0.2s_ease-out]">
          <span className="text-sm font-medium text-gray-700">Unsaved changes</span>
          <div className="w-px h-5 bg-gray-200" />
          <button
            onClick={handleDiscard}
            className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-sm font-medium text-white bg-purple-500 rounded-full hover:bg-purple-600 transition-colors"
          >
            Save
          </button>
        </div>,
        document.body
      )}

      {/* Saved confirmation */}
      {saved && createPortal(
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg shadow-lg animate-[slideUp_0.2s_ease-out]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Changes saved
        </div>,
        document.body
      )}
    </>
  );
}

export default function NotificationSettings() {
  const location = useLocation();
  const navigate = useNavigate();
  const slug = location.pathname.split('/').pop();
  const activeTab = slug === 'templates' ? 'templates' : slug === 'providers' ? 'providers' : 'preferences';
  const setActiveTab = (tab) => navigate(`/notifications/settings/${tab}`);
  const [openSections, setOpenSections] = useState(['push']);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  const [prefsDirty, setPrefsDirty] = useState(false);
  const [prefsSaved, setPrefsSaved] = useState(false);

  const handleToggleClick = (featureName) => {
    setSelectedFeature(featureName);
    setShowContactModal(true);
    setPrefsDirty(true);
    setPrefsSaved(false);
  };

  const handlePrefsSave = () => { setPrefsDirty(false); setPrefsSaved(true); setTimeout(() => setPrefsSaved(false), 2000); };
  const handlePrefsDiscard = () => { setPrefsDirty(false); };

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
    setPrefsDirty(true);
    setPrefsSaved(false);
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

          </div>
        )}

        {activeTab === 'providers' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <p className="text-gray-500 text-sm">Configure notification providers here.</p>
          </div>
        )}

        {activeTab === 'templates' && (
          <TemplatesAndSounds />
        )}
      </div>


      {/* Unsaved changes floating pill for Preferences */}
      {prefsDirty && activeTab === 'preferences' && createPortal(
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 bg-white rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.16)] border border-gray-200 animate-[slideUp_0.2s_ease-out]">
          <span className="text-sm font-medium text-gray-700">Unsaved changes</span>
          <div className="w-px h-5 bg-gray-200" />
          <button
            onClick={handlePrefsDiscard}
            className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handlePrefsSave}
            className="px-4 py-1.5 text-sm font-medium text-white bg-purple-500 rounded-full hover:bg-purple-600 transition-colors"
          >
            Save
          </button>
        </div>,
        document.body
      )}

      {/* Saved confirmation for Preferences */}
      {prefsSaved && createPortal(
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg shadow-lg animate-[slideUp_0.2s_ease-out]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Changes saved
        </div>,
        document.body
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        featureName={selectedFeature}
      />
    </div>
  );
}
