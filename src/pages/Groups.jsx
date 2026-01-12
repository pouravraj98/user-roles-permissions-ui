import { useState } from 'react';
import { Link } from 'react-router-dom';

export const sampleGroups = [
  { id: 'cometchat-guid-1', name: 'Hiking Group', icon: '🥾', type: 'Private', memberCount: 5, description: 'Explore, connect, and chat with fellow outdoor enthusiasts', created: 'Dec 04, 2025' },
  { id: 'cometchat-guid-2', name: 'Book Club', icon: '📚', type: 'Public', memberCount: 12, description: 'Monthly book discussions and recommendations', created: 'Nov 15, 2025' },
  { id: 'cometchat-guid-3', name: 'Fitness Team', icon: '💪', type: 'Private', memberCount: 8, description: 'Stay motivated with workout buddies', created: 'Oct 20, 2025' },
  { id: 'cometchat-guid-4', name: 'Tech Talk', icon: '💻', type: 'Public', memberCount: 25, description: 'Discuss the latest in technology', created: 'Sep 10, 2025' },
  { id: 'cometchat-guid-5', name: 'Photography', icon: '📷', type: 'Password', memberCount: 15, description: 'Share your best shots and get feedback', created: 'Aug 05, 2025' },
];

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = sampleGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">Groups</h1>
      </div>

      <div className="p-6">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Group
          </button>
          <div className="relative">
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 w-64"
            />
          </div>
        </div>

        {/* Groups Table */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-3 border-b border-gray-100 grid grid-cols-12 gap-4 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">Group</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Members</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredGroups.map((group) => (
              <Link
                key={group.id}
                to={`/groups/${group.id}`}
                className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50/50 cursor-pointer block"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-lg">
                    {group.icon}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">{group.name}</span>
                    <span className="text-xs text-gray-500">{group.id}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    group.type === 'Public' ? 'bg-green-100 text-green-800' :
                    group.type === 'Private' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {group.type}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-gray-600">{group.memberCount}</div>
                <div className="col-span-2 text-sm text-gray-500">{group.created}</div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {filteredGroups.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No groups found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or create a new group.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
