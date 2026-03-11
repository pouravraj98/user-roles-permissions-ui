import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- Sample Data ---
const sampleConversations = [
  {
    id: 'conv-1', type: '1:1', tags: ['support', 'priority'],
    participants: [
      { uid: 'cometchat-uid-1', name: 'Andrew Joseph', avatar: 'AJ', role: 'user', joinDate: 'Dec 04, 2025' },
      { uid: 'cometchat-uid-2', name: 'George Alan', avatar: 'GA', role: 'user', joinDate: 'Dec 04, 2025' },
    ],
    lastMessage: 'Sure, let me check and get back to you on that.',
    lastMessageTime: '2026-03-10T14:32:00Z',
    createdAt: '2025-12-04T10:00:00Z',
  },
  {
    id: 'conv-2', type: 'group', groupName: 'Hiking Group', groupIcon: '🥾', groupType: 'public', unreadCount: 3, tags: ['recreation', 'weekend'],
    participants: [
      { uid: 'cometchat-uid-1', name: 'Andrew Joseph', avatar: 'AJ', role: 'admin', joinDate: 'Nov 20, 2025' },
      { uid: 'cometchat-uid-3', name: 'Nancy Grace', avatar: 'NG', role: 'moderator', joinDate: 'Nov 22, 2025' },
      { uid: 'cometchat-uid-4', name: 'Susan Marie', avatar: 'SM', role: 'participant', joinDate: 'Nov 25, 2025' },
      { uid: 'cometchat-uid-5', name: 'John Smith', avatar: 'JS', role: 'participant', joinDate: 'Dec 01, 2025' },
      { uid: 'cometchat-uid-6', name: 'Emily Chen', avatar: 'EC', role: 'participant', joinDate: 'Dec 10, 2025' },
    ],
    lastMessage: 'The trail opens at 7am this Saturday!',
    lastMessageTime: '2026-03-10T11:15:00Z',
    createdAt: '2025-11-20T09:00:00Z',
  },
  {
    id: 'conv-3', type: '1:1',
    participants: [
      { uid: 'cometchat-uid-3', name: 'Nancy Grace', avatar: 'NG', role: 'user', joinDate: 'Dec 04, 2025' },
      { uid: 'cometchat-uid-4', name: 'Susan Marie', avatar: 'SM', role: 'user', joinDate: 'Dec 04, 2025' },
    ],
    lastMessage: 'Can you review the document I sent?',
    lastMessageTime: '2026-03-09T18:45:00Z',
    createdAt: '2025-12-04T10:00:00Z',
  },
  {
    id: 'conv-4', type: 'group', groupName: 'Book Club', groupIcon: '📚', groupType: 'public', unreadCount: 0,
    participants: [
      { uid: 'cometchat-uid-2', name: 'George Alan', avatar: 'GA', role: 'admin', joinDate: 'Oct 15, 2025' },
      { uid: 'cometchat-uid-3', name: 'Nancy Grace', avatar: 'NG', role: 'participant', joinDate: 'Oct 18, 2025' },
      { uid: 'cometchat-uid-7', name: 'Rachel Kim', avatar: 'RK', role: 'participant', joinDate: 'Oct 20, 2025' },
    ],
    lastMessage: 'Next month we should read "Project Hail Mary"',
    lastMessageTime: '2026-03-09T09:20:00Z',
    createdAt: '2025-10-15T09:00:00Z',
  },
  {
    id: 'conv-5', type: '1:1',
    participants: [
      { uid: 'cometchat-uid-5', name: 'John Smith', avatar: 'JS', role: 'user', joinDate: 'Dec 04, 2025' },
      { uid: 'cometchat-uid-6', name: 'Emily Chen', avatar: 'EC', role: 'user', joinDate: 'Dec 04, 2025' },
    ],
    lastMessage: 'Thanks for the quick response!',
    lastMessageTime: '2026-03-08T16:10:00Z',
    createdAt: '2025-12-04T10:00:00Z',
  },
  {
    id: 'conv-6', type: 'group', groupName: 'Tech Talk', groupIcon: '💻', groupType: 'private', unreadCount: 1, tags: ['engineering', 'internal'],
    participants: [
      { uid: 'cometchat-uid-1', name: 'Andrew Joseph', avatar: 'AJ', role: 'admin', joinDate: 'Sep 01, 2025' },
      { uid: 'cometchat-uid-5', name: 'John Smith', avatar: 'JS', role: 'moderator', joinDate: 'Sep 05, 2025' },
      { uid: 'cometchat-uid-6', name: 'Emily Chen', avatar: 'EC', role: 'participant', joinDate: 'Sep 10, 2025' },
      { uid: 'cometchat-uid-7', name: 'Rachel Kim', avatar: 'RK', role: 'participant', joinDate: 'Sep 12, 2025' },
    ],
    lastMessage: 'Has anyone tried the new React compiler?',
    lastMessageTime: '2026-03-08T10:00:00Z',
    createdAt: '2025-09-01T09:00:00Z',
  },
  {
    id: 'conv-7', type: '1:1',
    participants: [
      { uid: 'cometchat-uid-1', name: 'Andrew Joseph', avatar: 'AJ', role: 'user', joinDate: 'Jan 10, 2026' },
      { uid: 'cometchat-uid-7', name: 'Rachel Kim', avatar: 'RK', role: 'user', joinDate: 'Jan 10, 2026' },
    ],
    lastMessage: 'I\'ll send the wireframes by EOD',
    lastMessageTime: '2026-03-07T15:30:00Z',
    createdAt: '2026-01-10T10:00:00Z',
  },
];

// Moderation statuses: 'approved' | 'flagged' | 'blocked'
// Violation types: 'profanity-filter' | 'image-moderation' | 'spam' | 'sexual' | 'harassment' | 'hate-speech'
const sampleMessages = {
  'conv-1': [
    { id: 'msg-1', sender: { uid: 'cometchat-uid-1', name: 'Andrew Joseph', avatar: 'AJ' }, content: 'Hey George, do you have the latest API docs?', type: 'text', timestamp: '2026-03-10T14:20:00Z', deliveredTo: 1, readBy: 1, totalRecipients: 1, reactions: [], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-2', sender: { uid: 'cometchat-uid-2', name: 'George Alan', avatar: 'GA' }, content: 'Which API are you referring to? The v3 REST API or the WebSocket one?', type: 'text', timestamp: '2026-03-10T14:22:00Z', deliveredTo: 1, readBy: 1, totalRecipients: 1, reactions: [], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-3', sender: { uid: 'cometchat-uid-1', name: 'Andrew Joseph', avatar: 'AJ' }, content: 'The v3 REST API. I need the authentication endpoints specifically.', type: 'text', timestamp: '2026-03-10T14:25:00Z', updatedAt: '2026-03-10T14:28:00Z', metadata: { priority: 'high', department: 'engineering', source: 'mobile-app' }, deliveredTo: 1, readBy: 0, totalRecipients: 1, reactions: [{ emoji: '👍', count: 1 }], tags: ['api-docs'], moderation: { status: 'approved' } },
    { id: 'msg-3b', sender: { uid: 'cometchat-uid-2', name: 'George Alan', avatar: 'GA' }, content: 'auth-endpoints-v3.pdf', type: 'file', fileSize: '2.4 MB', timestamp: '2026-03-10T14:27:00Z', deliveredTo: 1, readBy: 0, totalRecipients: 1, reactions: [], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-4', sender: { uid: 'cometchat-uid-2', name: 'George Alan', avatar: 'GA' }, content: 'Sure, let me check and get back to you on that.', type: 'text', timestamp: '2026-03-10T14:32:00Z', deliveredTo: 1, readBy: 1, totalRecipients: 1, reactions: [], tags: [], moderation: { status: 'approved' } },
  ],
  'conv-2': [
    { id: 'msg-5', sender: { uid: 'cometchat-uid-3', name: 'Nancy Grace', avatar: 'NG' }, content: 'Hey everyone! Who\'s up for a hike this weekend?', type: 'text', timestamp: '2026-03-10T10:00:00Z', deliveredTo: 4, readBy: 4, totalRecipients: 4, reactions: [{ emoji: '🙋', count: 2 }, { emoji: '🙋‍♂️', count: 1 }], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-6', sender: { uid: 'cometchat-uid-1', name: 'Andrew Joseph', avatar: 'AJ' }, content: 'I\'m in! Which trail are we thinking?', type: 'text', timestamp: '2026-03-10T10:15:00Z', deliveredTo: 4, readBy: 4, totalRecipients: 4, reactions: [], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-7', sender: { uid: 'cometchat-uid-4', name: 'Susan Marie', avatar: 'SM' }, content: 'How about the Canyon Loop? It\'s beautiful this time of year.', type: 'text', timestamp: '2026-03-10T10:30:00Z', deliveredTo: 4, readBy: 3, totalRecipients: 4, reactions: [{ emoji: '❤️', count: 3 }], tags: ['suggestion'], moderation: { status: 'approved' } },
    { id: 'msg-8', sender: { uid: 'cometchat-uid-5', name: 'John Smith', avatar: 'JS' }, content: 'This is absolute garbage, worst trail I\'ve ever been on', type: 'text', timestamp: '2026-03-10T10:45:00Z', deliveredTo: 4, readBy: 4, totalRecipients: 4, reactions: [], tags: [], moderation: { status: 'flagged', violationType: 'profanity-filter', reason: 'Spam / Unwanted Content', reportedBy: { name: 'Nancy Grace', uid: 'cometchat-uid-3' } } },
    { id: 'msg-8b', sender: { uid: 'cometchat-uid-4', name: 'Susan Marie', avatar: 'SM' }, content: 'canyon-loop-trail-map.png', type: 'image', fileSize: '1.8 MB', timestamp: '2026-03-10T10:50:00Z', deliveredTo: 4, readBy: 3, totalRecipients: 4, reactions: [{ emoji: '🗺️', count: 2 }], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-9', sender: { uid: 'cometchat-uid-6', name: 'Emily Chen', avatar: 'EC' }, content: 'Count me in too! Should I bring snacks?', type: 'text', timestamp: '2026-03-10T11:00:00Z', deliveredTo: 4, readBy: 3, totalRecipients: 4, reactions: [{ emoji: '🎉', count: 2 }], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-10', sender: { uid: 'cometchat-uid-3', name: 'Nancy Grace', avatar: 'NG' }, content: 'The trail opens at 7am this Saturday!', type: 'text', timestamp: '2026-03-10T11:15:00Z', deliveredTo: 4, readBy: 2, totalRecipients: 4, reactions: [{ emoji: '👍', count: 3 }, { emoji: '🏔️', count: 1 }], tags: ['logistics'], moderation: { status: 'approved' } },
  ],
  'conv-3': [
    { id: 'msg-11', sender: { uid: 'cometchat-uid-3', name: 'Nancy Grace', avatar: 'NG' }, content: 'Hi Susan, I just sent over the Q1 report.', type: 'text', timestamp: '2026-03-09T18:30:00Z', deliveredTo: 1, readBy: 1, totalRecipients: 1, reactions: [], tags: ['report'], moderation: { status: 'approved' } },
    { id: 'msg-12', sender: { uid: 'cometchat-uid-4', name: 'Susan Marie', avatar: 'SM' }, content: 'Got it, thanks! I\'ll look at it tonight.', type: 'text', timestamp: '2026-03-09T18:35:00Z', deliveredTo: 1, readBy: 1, totalRecipients: 1, reactions: [], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-13', sender: { uid: 'cometchat-uid-3', name: 'Nancy Grace', avatar: 'NG' }, content: 'Can you review the document I sent?', type: 'text', timestamp: '2026-03-09T18:45:00Z', deliveredTo: 1, readBy: 0, totalRecipients: 1, reactions: [], tags: [], moderation: { status: 'approved' } },
  ],
  'conv-4': [
    { id: 'msg-14', sender: { uid: 'cometchat-uid-7', name: 'Rachel Kim', avatar: 'RK' }, content: 'What did everyone think of this month\'s book?', type: 'text', timestamp: '2026-03-09T09:00:00Z', deliveredTo: 2, readBy: 2, totalRecipients: 2, reactions: [], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-15', sender: { uid: 'cometchat-uid-3', name: 'Nancy Grace', avatar: 'NG' }, content: 'I loved it! The ending was unexpected.', type: 'text', timestamp: '2026-03-09T09:10:00Z', deliveredTo: 2, readBy: 2, totalRecipients: 2, reactions: [{ emoji: '❤️', count: 1 }], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-16', sender: { uid: 'cometchat-uid-2', name: 'George Alan', avatar: 'GA' }, content: 'Next month we should read "Project Hail Mary"', type: 'text', timestamp: '2026-03-09T09:20:00Z', updatedAt: '2026-03-09T09:25:00Z', deliveredTo: 2, readBy: 2, totalRecipients: 2, reactions: [{ emoji: '👍', count: 2 }, { emoji: '📖', count: 1 }], tags: ['suggestion'], moderation: { status: 'approved' } },
  ],
  'conv-5': [
    { id: 'msg-17', sender: { uid: 'cometchat-uid-5', name: 'John Smith', avatar: 'JS' }, content: 'Emily, can you help me with the integration tests?', type: 'text', timestamp: '2026-03-08T15:50:00Z', deliveredTo: 1, readBy: 1, totalRecipients: 1, reactions: [], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-18', sender: { uid: 'cometchat-uid-6', name: 'Emily Chen', avatar: 'EC' }, content: 'Sure! Send me the test file and I\'ll take a look.', type: 'text', timestamp: '2026-03-08T16:00:00Z', deliveredTo: 1, readBy: 1, totalRecipients: 1, reactions: [], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-18b', sender: { uid: 'cometchat-uid-6', name: 'Emily Chen', avatar: 'EC' }, content: 'voice-note-0308.m4a', type: 'audio', fileSize: '340 KB', duration: '0:42', timestamp: '2026-03-08T16:05:00Z', deliveredTo: 1, readBy: 1, totalRecipients: 1, reactions: [], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-19', sender: { uid: 'cometchat-uid-5', name: 'John Smith', avatar: 'JS' }, content: 'Thanks for the quick response!', type: 'text', timestamp: '2026-03-08T16:10:00Z', deliveredTo: 1, readBy: 1, totalRecipients: 1, reactions: [{ emoji: '😊', count: 1 }], tags: [], moderation: { status: 'approved' } },
  ],
  'conv-6': [
    { id: 'msg-20', sender: { uid: 'cometchat-uid-7', name: 'Rachel Kim', avatar: 'RK' }, content: 'Has anyone tried the new React compiler?', type: 'text', timestamp: '2026-03-08T10:00:00Z', deliveredTo: 3, readBy: 3, totalRecipients: 3, reactions: [], tags: ['react'], moderation: { status: 'approved' } },
    { id: 'msg-21', sender: { uid: 'cometchat-uid-1', name: 'Andrew Joseph', avatar: 'AJ' }, content: 'Yes! The automatic memoization is impressive. No more useMemo everywhere.', type: 'text', timestamp: '2026-03-08T10:12:00Z', metadata: { '@injected': { extensions: { 'smart-reply': { reply_positive: 'Awesome!', reply_neutral: 'Interesting', reply_negative: 'Not sure about that' } } } }, deliveredTo: 3, readBy: 3, totalRecipients: 3, reactions: [{ emoji: '🔥', count: 2 }], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-22', sender: { uid: 'cometchat-uid-5', name: 'John Smith', avatar: 'JS' }, content: 'fuck this framework honestly, it breaks everything', type: 'text', timestamp: '2026-03-08T10:20:00Z', deliveredTo: 3, readBy: 2, totalRecipients: 3, reactions: [], tags: [], moderation: { status: 'blocked', violationType: 'profanity-filter', reason: 'Profanity detected in message content', reportedBy: { name: 'System / Auto-moderation', uid: 'system' } } },
    { id: 'msg-23', sender: { uid: 'cometchat-uid-6', name: 'Emily Chen', avatar: 'EC' }, content: 'That\'s great! Any issues with existing hooks?', type: 'text', timestamp: '2026-03-08T10:25:00Z', deliveredTo: 3, readBy: 3, totalRecipients: 3, reactions: [], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-24-img', sender: { uid: 'cometchat-uid-5', name: 'John Smith', avatar: 'JS' }, content: 'screenshot-upload.jpg', type: 'image', fileSize: '890 KB', timestamp: '2026-03-08T10:30:00Z', deliveredTo: 3, readBy: 1, totalRecipients: 3, reactions: [], tags: [], moderation: { status: 'flagged', violationType: 'image-moderation', reason: 'Image flagged for manual review — potential policy violation', reportedBy: { name: 'System / Auto-moderation', uid: 'system' } } },
  ],
  'conv-7': [
    { id: 'msg-24', sender: { uid: 'cometchat-uid-1', name: 'Andrew Joseph', avatar: 'AJ' }, content: 'Hey Rachel, can we sync on the design for the new feature?', type: 'text', timestamp: '2026-03-07T15:00:00Z', deliveredTo: 1, readBy: 1, totalRecipients: 1, reactions: [], tags: [], moderation: { status: 'approved' } },
    { id: 'msg-25', sender: { uid: 'cometchat-uid-7', name: 'Rachel Kim', avatar: 'RK' }, content: 'Sure, I have some wireframes ready. Want me to share?', type: 'text', timestamp: '2026-03-07T15:10:00Z', deliveredTo: 1, readBy: 1, totalRecipients: 1, reactions: [], tags: ['design'], moderation: { status: 'approved' } },
    { id: 'msg-26', sender: { uid: 'cometchat-uid-1', name: 'Andrew Joseph', avatar: 'AJ' }, content: 'I\'ll send the wireframes by EOD', type: 'text', timestamp: '2026-03-07T15:30:00Z', deliveredTo: 1, readBy: 0, totalRecipients: 1, reactions: [], tags: [], moderation: { status: 'approved' } },
  ],
};

// --- Helpers ---
const formatTime = (iso) => {
  const d = new Date(iso);
  const now = new Date('2026-03-11T12:00:00Z');
  const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return d.toLocaleDateString([], { weekday: 'short' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

const formatFullTime = (iso) => {
  const d = new Date(iso);
  return d.toLocaleString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const getConversationName = (conv) => {
  if (conv.type === 'group') return conv.groupName;
  return conv.participants.map(p => p.name).join(' & ');
};

const avatarColors = [
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-purple-400 to-pink-500',
  'from-amber-400 to-orange-500',
  'from-cyan-400 to-blue-500',
  'from-rose-400 to-red-500',
];

const getAvatarColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

function highlightText(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-yellow-200 rounded px-0.5">{part}</mark>
      : part
  );
}

const moderationStyles = {
  approved: { bg: '', border: '', badge: 'bg-green-50 text-green-700', label: 'Approved' },
  flagged: { bg: 'bg-amber-50/60', border: 'border-l-2 border-l-amber-400', badge: 'bg-amber-50 text-amber-700 border border-amber-200', label: 'Flagged' },
  blocked: { bg: 'bg-red-50/50', border: 'border-l-2 border-l-red-400', badge: 'bg-red-50 text-red-700 border border-red-200', label: 'Blocked' },
};

const onlineUsers = new Set(['cometchat-uid-1', 'cometchat-uid-3', 'cometchat-uid-6']);

const enrichMessage = (msg, conv) => {
  const participant = conv.participants.find(p => p.uid === msg.sender.uid);
  return {
    ...msg,
    conversationId: conv.id,
    category: msg.category || 'message',
    receiverType: conv.type === 'group' ? 'group' : 'user',
    receiver: conv.type === 'group'
      ? { uid: conv.id, name: conv.groupName }
      : conv.participants.find(p => p.uid !== msg.sender.uid) || conv.participants[0],
    updatedAt: msg.updatedAt || msg.timestamp,
    metadata: msg.metadata || null,
    sender: {
      ...msg.sender,
      role: participant?.role || 'default',
      status: onlineUsers.has(msg.sender.uid) ? 'online' : 'offline',
    },
  };
};

// --- Main Component ---
export default function ConversationExplorer() {
  const [selectedConv, setSelectedConv] = useState(null);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageSearch, setMessageSearch] = useState('');
  const [hoveredMsg, setHoveredMsg] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterTag, setFilterTag] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConv]);

  const allTags = [...new Set(sampleConversations.flatMap(c => c.tags || []))];

  const filteredConversations = sampleConversations.filter(conv => {
    const name = getConversationName(conv).toLowerCase();
    const matchesSearch = !searchQuery || name.includes(searchQuery.toLowerCase()) ||
      conv.participants.some(p => p.uid.toLowerCase().includes(searchQuery.toLowerCase()) || p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || conv.type === filterType;
    const matchesTag = !filterTag || (conv.tags && conv.tags.includes(filterTag));
    return matchesSearch && matchesType && matchesTag;
  });

  const currentMessages = selectedConv ? (sampleMessages[selectedConv.id] || []).map(m => enrichMessage(m, selectedConv)) : [];
  const filteredMessages = messageSearch
    ? currentMessages.filter(m => m.content.toLowerCase().includes(messageSearch.toLowerCase()))
    : currentMessages;

  const isFlaggedOrBlocked = (msg) => msg.moderation?.status === 'flagged' || msg.moderation?.status === 'blocked';

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Conversation Explorer</h1>
          <p className="text-sm text-gray-500 mt-0.5">Browse and review conversations across your app</p>
        </div>
        <div className="text-xs text-gray-400">{sampleConversations.length} conversations</div>
      </div>

      {/* 3-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT PANEL — Conversation List */}
        <div className="w-[320px] border-r border-gray-200 bg-white flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or user ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded transition-colors ${showFilters ? 'bg-gray-100 text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
            {showFilters && (
              <div className="mt-2 space-y-2">
                <div className="flex gap-1.5 flex-wrap">
                  {[{ id: 'all', label: 'All' }, { id: '1:1', label: '1:1' }, { id: 'group', label: 'Group' }].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFilterType(f.id)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${filterType === f.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                {allTags.length > 0 && (
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Tags</span>
                    <div className="flex gap-1.5 flex-wrap mt-1">
                      <button
                        onClick={() => setFilterTag('')}
                        className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full transition-colors ${!filterTag ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        All
                      </button>
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setFilterTag(filterTag === tag ? '' : tag)}
                          className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full transition-colors ${filterTag === tag ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conv => {
              const isSelected = selectedConv?.id === conv.id;
              const convName = getConversationName(conv);
              return (
                <button
                  key={conv.id}
                  onClick={() => { setSelectedConv(conv); setSelectedMsg(null); }}
                  className={`w-full text-left px-4 py-3.5 border-b border-gray-100 transition-colors ${isSelected ? 'bg-purple-50 border-l-2 border-l-purple-500' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-start gap-3">
                    {conv.type === 'group' ? (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-lg flex-shrink-0">
                        {conv.groupIcon}
                      </div>
                    ) : (
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(conv.participants[0].name)} flex items-center justify-center text-white text-xs font-medium flex-shrink-0`}>
                        {conv.participants[0].avatar}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 truncate">{convName}</span>
                        <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                          <span className="text-[11px] text-gray-400">{formatTime(conv.lastMessageTime)}</span>
                          {conv.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold bg-purple-600 text-white">{conv.unreadCount}</span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${conv.type === 'group' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                          {conv.type === 'group' ? 'Group' : '1:1'}
                        </span>
                        {conv.type === 'group' && conv.groupType && (
                          <span className="text-[10px] text-gray-400 capitalize">{conv.groupType}</span>
                        )}
                        <span className="text-[10px] text-gray-400">{conv.participants.length} members</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
            {filteredConversations.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">No conversations found</p>
                <p className="text-xs text-gray-500 mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>

        {/* CENTER PANEL — Chat Bubble View */}
        <div className="flex-1 flex flex-col bg-gray-50 min-w-0">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 px-5 py-3.5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  {selectedConv.type === 'group' ? (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-base">
                      {selectedConv.groupIcon}
                    </div>
                  ) : (
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(selectedConv.participants[0].name)} flex items-center justify-center text-white text-xs font-medium`}>
                      {selectedConv.participants[0].avatar}
                    </div>
                  )}
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">{getConversationName(selectedConv)}</h2>
                    <p className="text-xs text-gray-500">{selectedConv.participants.length} members · {currentMessages.length} messages</p>
                  </div>
                </div>
                <div className="relative">
                  <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search in conversation..."
                    value={messageSearch}
                    onChange={(e) => setMessageSearch(e.target.value)}
                    className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 w-56"
                  />
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-0.5">
                {filteredMessages.map((msg, idx) => {
                  const isHovered = hoveredMsg === msg.id;
                  const isSelected = selectedMsg?.id === msg.id;
                  const prevMsg = filteredMessages[idx - 1];
                  const sameSender = prevMsg && prevMsg.sender.uid === msg.sender.uid && !isFlaggedOrBlocked(msg) && !isFlaggedOrBlocked(prevMsg);
                  const modStyle = moderationStyles[msg.moderation?.status] || moderationStyles.approved;
                  const isBlocked = msg.moderation?.status === 'blocked';
                  const isFlagged = msg.moderation?.status === 'flagged';

                  return (
                    <div
                      key={msg.id}
                      className={`group relative flex items-start gap-3 px-3 py-1.5 rounded-lg transition-colors cursor-pointer
                        ${isSelected ? 'bg-purple-50 ring-1 ring-purple-200' : isHovered ? 'bg-white/80' : modStyle.bg}
                        ${!isSelected && (isFlagged || isBlocked) ? modStyle.border : ''}
                        ${!sameSender ? 'mt-3' : ''}
                      `}
                      onMouseEnter={() => setHoveredMsg(msg.id)}
                      onMouseLeave={() => setHoveredMsg(null)}
                      onClick={() => setSelectedMsg(msg)}
                    >
                      {!sameSender ? (
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(msg.sender.name)} flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0 mt-0.5`}>
                          {msg.sender.avatar}
                        </div>
                      ) : (
                        <div className="w-8 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        {!sameSender && (
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-gray-900">{msg.sender.name}</span>
                            {msg.sender.role && msg.sender.role !== 'default' && msg.sender.role !== 'user' && msg.sender.role !== 'participant' && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium capitalize">{msg.sender.role}</span>
                            )}
                            <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${msg.sender.status === 'online' ? 'bg-green-400' : 'bg-gray-300'}`} title={msg.sender.status} />
                            <span className="text-[11px] text-gray-400">{formatTime(msg.timestamp)}</span>
                            {msg.updatedAt && msg.updatedAt !== msg.timestamp && (
                              <span className="text-[10px] text-gray-400 italic">(edited)</span>
                            )}
                            {/* Inline moderation status badge next to name */}
                            {(isFlagged || isBlocked) && (
                              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium ${modStyle.badge}`}>
                                {isFlagged && <ModerationIcon type="flagged" />}
                                {isBlocked && <ModerationIcon type="blocked" />}
                                {modStyle.label}
                              </span>
                            )}
                          </div>
                        )}
                        {/* Message type badge for non-text types */}
                        {msg.type !== 'text' && (
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                              <MessageTypeIcon type={msg.type} />
                              {msg.type}
                            </span>
                            {msg.category && msg.category !== 'message' && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600">{msg.category}</span>
                            )}
                          </div>
                        )}
                        {/* Message content — blocked messages show masked content */}
                        {isBlocked ? (
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                            <p className="text-sm text-red-400 italic leading-relaxed">This message has been blocked</p>
                          </div>
                        ) : (
                          <p className={`text-sm leading-relaxed ${isFlagged ? 'text-amber-800' : 'text-gray-700'}`}>
                            {messageSearch ? highlightText(msg.content, messageSearch) : msg.content}
                          </p>
                        )}
                        {/* Violation type badge below content for flagged/blocked */}
                        {(isFlagged || isBlocked) && msg.moderation?.violationType && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${isBlocked ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                              {msg.moderation.violationType}
                            </span>
                          </div>
                        )}
                        {/* Reactions */}
                        {msg.reactions.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {msg.reactions.map((r, i) => (
                              <span key={i} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white rounded-full text-xs border border-gray-200">
                                <span>{r.emoji}</span>
                                {r.count > 1 && <span className="text-[10px] text-gray-500">{r.count}</span>}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Hover Actions */}
                      {isHovered && (
                        <div className="absolute right-2 -top-3 flex items-center bg-white border border-gray-200 rounded-lg shadow-sm z-10">
                          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-l-lg transition-colors" title="Edit message">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete message">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors" title="Ban/block sender">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-r-lg transition-colors" title="Flag/moderate">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
                {filteredMessages.length === 0 && messageSearch && (
                  <div className="text-center py-12">
                    <p className="text-sm text-gray-500">No messages matching "{messageSearch}"</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1">Select a conversation</h3>
                <p className="text-sm text-gray-500">Choose a conversation from the list to view messages</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL — Details & Metadata */}
        <div className="w-[380px] border-l border-gray-200 bg-white flex flex-col overflow-y-auto flex-shrink-0">
          {selectedConv ? (
            <>
              {/* Conversation Info */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Conversation Details</h3>
                  <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Export
                  </button>
                </div>
                <div className="space-y-3">
                  <DetailRow label="Conversation ID" value={selectedConv.id} mono />
                  <DetailRow label="Conversation Type">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${selectedConv.type === 'group' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                      {selectedConv.type === 'group' ? 'group' : 'user'}
                    </span>
                  </DetailRow>
                  {selectedConv.type === 'group' && (
                    <>
                      <DetailRow label="Group Name" value={selectedConv.groupName} />
                      <DetailRow label="Group Type" value={selectedConv.groupType || 'public'} />
                      <DetailRow label="Owner" value={selectedConv.participants.find(p => p.role === 'admin')?.name || '—'} />
                    </>
                  )}
                  <DetailRow label="Members" value={selectedConv.participants.length} />
                  <DetailRow label="Messages" value={currentMessages.length} />
                  <DetailRow label="Unread Count" value={selectedConv.unreadCount || 0} />
                  <DetailRow label="Created At" value={formatFullTime(selectedConv.createdAt)} />
                  <DetailRow label="Updated At" value={formatFullTime(selectedConv.lastMessageTime)} />
                  {selectedConv.tags?.length > 0 && (
                    <div>
                      <span className="text-xs text-gray-500">Tags</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedConv.tags.map((t, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700 border border-gray-200">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Members */}
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Members ({selectedConv.participants.length})</h3>
                <div className="space-y-2.5">
                  {selectedConv.participants.map(p => (
                    <div key={p.uid} className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${getAvatarColor(p.name)} flex items-center justify-center text-white text-[9px] font-medium flex-shrink-0`}>
                        {p.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-medium text-gray-900 truncate">{p.name}</p>
                          {p.role && p.role !== 'user' && p.role !== 'participant' && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium capitalize">{p.role}</span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400 font-mono truncate">{p.uid}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Message Metadata */}
              {selectedMsg ? (
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Message Details</h3>
                  <div className="space-y-3">
                    <MetaField label="Message ID" value={selectedMsg.id} mono />
                    <MetaField label="Conversation ID" value={selectedMsg.conversationId} mono />
                    <MetaField label="Sender">
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${getAvatarColor(selectedMsg.sender.name)} flex items-center justify-center text-white text-[7px] font-medium`}>
                          {selectedMsg.sender.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs text-gray-900">{selectedMsg.sender.name}</p>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${selectedMsg.sender.status === 'online' ? 'bg-green-400' : 'bg-gray-300'}`} />
                            <span className="text-[10px] text-gray-400 capitalize">{selectedMsg.sender.status}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-mono">{selectedMsg.sender.uid}</p>
                        </div>
                      </div>
                      {selectedMsg.sender.role && (
                        <div className="mt-1">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium capitalize">Role: {selectedMsg.sender.role}</span>
                        </div>
                      )}
                    </MetaField>
                    <MetaField label="Category">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700 mt-0.5">{selectedMsg.category}</span>
                    </MetaField>
                    <MetaField label="Type" value={selectedMsg.type} />
                    <MetaField label="Receiver">
                      <div className="mt-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${selectedMsg.receiverType === 'group' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                            {selectedMsg.receiverType}
                          </span>
                          <span className="text-xs text-gray-900">{selectedMsg.receiver?.name}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">{selectedMsg.receiver?.uid}</p>
                      </div>
                    </MetaField>
                    <MetaField label="Sent At" value={formatFullTime(selectedMsg.timestamp)} />
                    {selectedMsg.updatedAt && selectedMsg.updatedAt !== selectedMsg.timestamp && (
                      <MetaField label="Updated At">
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs text-gray-900">{formatFullTime(selectedMsg.updatedAt)}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-medium">edited</span>
                        </div>
                      </MetaField>
                    )}
                    <MetaField label="Read Receipts">
                      <div className="space-y-1.5 mt-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Delivered to</span>
                          <span className="text-xs text-gray-900">{selectedMsg.deliveredTo}/{selectedMsg.totalRecipients}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-gray-400 h-1.5 rounded-full" style={{ width: `${(selectedMsg.deliveredTo / selectedMsg.totalRecipients) * 100}%` }} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Read by</span>
                          <span className="text-xs text-gray-900">{selectedMsg.readBy}/{selectedMsg.totalRecipients}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(selectedMsg.readBy / selectedMsg.totalRecipients) * 100}%` }} />
                        </div>
                      </div>
                    </MetaField>
                    {selectedMsg.reactions.length > 0 && (
                      <MetaField label="Reactions">
                        <div className="flex gap-1.5 flex-wrap mt-0.5">
                          {selectedMsg.reactions.map((r, i) => (
                            <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 rounded-full text-xs border border-gray-200">
                              <span>{r.emoji}</span>
                              <span className="text-gray-500">{r.count}</span>
                            </span>
                          ))}
                        </div>
                      </MetaField>
                    )}

                    {/* Moderation Section */}
                    <ModerationDetails msg={selectedMsg} />

                    {selectedMsg.tags.length > 0 && (
                      <MetaField label="Tags">
                        <div className="flex flex-wrap gap-1">
                          {selectedMsg.tags.map((t, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700 border border-gray-200">{t}</span>
                          ))}
                        </div>
                      </MetaField>
                    )}

                    {/* Metadata (collapsible JSON) */}
                    {selectedMsg.metadata && (
                      <CollapsibleMetadata metadata={selectedMsg.metadata} />
                    )}

                    <MetaField label="Content">
                      {/* File/media preview for non-text types */}
                      {selectedMsg.type !== 'text' && (
                        <FilePreview msg={selectedMsg} />
                      )}
                      <p className={`text-xs p-2.5 rounded-lg border leading-relaxed ${selectedMsg.moderation?.status === 'blocked' ? 'bg-red-50/50 border-red-100 text-gray-700' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
                        {selectedMsg.content}
                      </p>
                      {selectedMsg.moderation?.status === 'blocked' && (
                        <p className="text-[10px] text-red-400 mt-1 italic flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Blocked — visible to admins only
                        </p>
                      )}
                    </MetaField>
                  </div>
                </div>
              ) : (
                <div className="p-5 flex-1 flex items-start justify-center pt-8">
                  <p className="text-xs text-gray-400">Click a message to view its metadata</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-5">
              <p className="text-xs text-gray-400 text-center">Select a conversation to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- File Preview (right panel) ---
function FilePreview({ msg }) {
  const isBlocked = msg.moderation?.status === 'blocked';
  const isFlagged = msg.moderation?.status === 'flagged';
  const borderCls = isBlocked ? 'border-red-200 bg-red-50/30' : isFlagged ? 'border-amber-200 bg-amber-50/30' : 'border-gray-200 bg-gray-50';

  if (msg.type === 'image') {
    return (
      <div className={`mt-1 mb-2 rounded-lg border overflow-hidden ${borderCls}`}>
        <div className="relative">
          <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            {isBlocked ? (
              <div className="text-center">
                <svg className="w-8 h-8 text-red-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                <p className="text-[10px] text-red-400 mt-1">Blocked image</p>
              </div>
            ) : (
              <div className="text-center">
                <svg className="w-10 h-10 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="text-[10px] text-gray-400 mt-1">Image preview</p>
              </div>
            )}
          </div>
          {isFlagged && (
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-100 text-amber-700 border border-amber-200">
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                Flagged
              </span>
            </div>
          )}
        </div>
        <div className="px-2.5 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-[10px] text-gray-600 truncate">{msg.content}</span>
          </div>
          {msg.fileSize && <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{msg.fileSize}</span>}
        </div>
      </div>
    );
  }

  if (msg.type === 'video') {
    return (
      <div className={`mt-1 mb-2 rounded-lg border overflow-hidden ${borderCls}`}>
        <div className="w-full h-28 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
          {msg.duration && <span className="absolute bottom-2 right-2 text-[10px] text-white/80 bg-black/50 px-1.5 py-0.5 rounded">{msg.duration}</span>}
        </div>
        <div className="px-2.5 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            <span className="text-[10px] text-gray-600 truncate">{msg.content}</span>
          </div>
          {msg.fileSize && <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{msg.fileSize}</span>}
        </div>
      </div>
    );
  }

  if (msg.type === 'audio') {
    return (
      <div className={`mt-1 mb-2 rounded-lg border p-3 ${borderCls}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-400 rounded-full" style={{ width: '35%' }} />
              </div>
              {msg.duration && <span className="text-[10px] text-gray-400 flex-shrink-0">{msg.duration}</span>}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>
              <span className="text-[10px] text-gray-600 truncate">{msg.content}</span>
            </div>
          </div>
        </div>
        {msg.fileSize && <p className="text-[10px] text-gray-400 mt-1.5 ml-12">{msg.fileSize}</p>}
      </div>
    );
  }

  // file (default)
  const ext = msg.content?.split('.').pop()?.toLowerCase() || '';
  const extColors = { pdf: 'bg-red-100 text-red-600', doc: 'bg-blue-100 text-blue-600', docx: 'bg-blue-100 text-blue-600', xls: 'bg-green-100 text-green-600', xlsx: 'bg-green-100 text-green-600', zip: 'bg-amber-100 text-amber-600' };
  const extCls = extColors[ext] || 'bg-gray-100 text-gray-600';

  return (
    <div className={`mt-1 mb-2 rounded-lg border p-3 ${borderCls}`}>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${extCls}`}>
          <span className="text-[10px] font-bold uppercase">{ext || 'FILE'}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-900 font-medium truncate">{msg.content}</p>
          <div className="flex items-center gap-2 mt-0.5">
            {msg.fileSize && <span className="text-[10px] text-gray-400">{msg.fileSize}</span>}
            <span className="text-[10px] text-gray-400 uppercase">{ext} file</span>
          </div>
        </div>
        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0" title="Download">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        </button>
      </div>
    </div>
  );
}

// --- Message Type Icon ---
function MessageTypeIcon({ type }) {
  const cls = "w-3 h-3";
  if (type === 'image') return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
  if (type === 'video') return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
  if (type === 'audio') return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>;
  if (type === 'file') return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
  return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}

// --- Collapsible Metadata ---
function CollapsibleMetadata({ metadata }) {
  const [isOpen, setIsOpen] = useState(false);
  const json = JSON.stringify(metadata, null, 2);
  const keys = Object.keys(metadata);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 w-full text-left group"
      >
        <svg className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Metadata</span>
        <span className="text-[10px] text-gray-400 ml-1">({keys.length} {keys.length === 1 ? 'key' : 'keys'})</span>
      </button>
      {isOpen && (
        <pre className="mt-1.5 text-[10px] text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100 overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap break-all">
          {json}
        </pre>
      )}
      {!isOpen && (
        <div className="mt-1 flex flex-wrap gap-1">
          {keys.map(k => (
            <span key={k} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 font-mono border border-gray-100">{k}</span>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Moderation Details Panel ---
function ModerationDetails({ msg }) {
  const mod = msg.moderation;
  if (!mod) return null;

  const isApproved = mod.status === 'approved';
  const isFlagged = mod.status === 'flagged';
  const isBlocked = mod.status === 'blocked';
  const style = moderationStyles[mod.status] || moderationStyles.approved;

  return (
    <div>
      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Moderation</span>
      <div className={`mt-1.5 rounded-lg border p-3 ${
        isApproved ? 'border-gray-100 bg-gray-50/50' :
        isFlagged ? 'border-amber-200 bg-amber-50/50' :
        'border-red-200 bg-red-50/50'
      }`}>
        {/* Status badge */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${style.badge}`}>
            <ModerationIcon type={mod.status} />
            {style.label}
          </span>
          {(isFlagged || isBlocked) && mod.violationType && (
            <span className="text-[10px] font-mono text-gray-500">{mod.violationType}</span>
          )}
        </div>

        {/* Violation + Reason for flagged/blocked */}
        {(isFlagged || isBlocked) && (
          <div className="mt-2.5 space-y-2">
            {mod.violationType && (
              <div>
                <span className="text-[10px] text-gray-500">Violation Type</span>
                <p className="text-xs text-gray-900 mt-0.5 font-medium">{mod.violationType}</p>
              </div>
            )}
            {mod.reason && (
              <div>
                <span className="text-[10px] text-gray-500">Reason</span>
                <p className="text-xs text-gray-700 mt-0.5">{mod.reason}</p>
              </div>
            )}
            {mod.reportedBy && (
              <div>
                <span className="text-[10px] text-gray-500">Reported By</span>
                <div className="flex items-center gap-2 mt-0.5">
                  {mod.reportedBy.uid === 'system' ? (
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                  ) : (
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${getAvatarColor(mod.reportedBy.name)} flex items-center justify-center text-white text-[7px] font-medium`}>
                      {mod.reportedBy.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <span className="text-xs text-gray-900">{mod.reportedBy.name}</span>
                </div>
              </div>
            )}

            {/* Divider + Link to Moderation Logs */}
            <div className="pt-2 border-t border-dashed border-gray-200">
              <Link
                to="/chats/moderation"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                View in Moderation Logs
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Moderation Icon ---
function ModerationIcon({ type }) {
  if (type === 'approved') return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  );
  if (type === 'flagged') return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
  );
  if (type === 'blocked') return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
  );
  return null;
}

// --- Small helper components ---
function DetailRow({ label, value, mono, children }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-xs text-gray-500">{label}</span>
      {children || <span className={`text-xs text-gray-900 text-right ${mono ? 'font-mono' : ''}`}>{value}</span>}
    </div>
  );
}

function MetaField({ label, value, mono, children }) {
  return (
    <div>
      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{label}</span>
      {children || <p className={`text-xs text-gray-900 mt-0.5 ${mono ? 'font-mono' : ''}`}>{value}</p>}
    </div>
  );
}
