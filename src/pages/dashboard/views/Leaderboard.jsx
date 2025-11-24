import React from 'react';
import { Trophy, TrendingUp, Users } from 'lucide-react';

const Leaderboard = () => {
    const topCreators = [
        { id: 1, name: 'Sarah Chen', banners: 142, views: '12.5k', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
        { id: 2, name: 'Mike Ross', banners: 98, views: '8.2k', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
        { id: 3, name: 'Alex Kim', banners: 85, views: '7.9k', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
        { id: 4, name: 'Emma Wilson', banners: 72, views: '6.1k', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
        { id: 5, name: 'David Lee', banners: 65, views: '5.4k', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
                <p className="text-gray-500 mt-1">Top creators and trending banners this week.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Top Creators List */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Trophy className="text-yellow-500" size={20} />
                            Top Creators
                        </h2>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button className="px-3 py-1 text-xs font-medium bg-white shadow-sm rounded-md text-gray-900">Weekly</button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-900">Monthly</button>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {topCreators.map((creator, index) => (
                            <div key={creator.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full
                                    ${index === 0 ? 'bg-yellow-100 text-yellow-600' :
                                        index === 1 ? 'bg-gray-100 text-gray-600' :
                                            index === 2 ? 'bg-orange-100 text-orange-600' :
                                                'text-gray-400'
                                    }
                                `}>
                                    {index + 1}
                                </div>
                                <img src={creator.avatar} alt={creator.name} className="w-10 h-10 rounded-full bg-gray-100" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                                    <p className="text-xs text-gray-500">{creator.banners} banners created</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-gray-900">{creator.views}</div>
                                    <div className="text-xs text-gray-500">views</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats & Trends */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-purple-100">Trending Now</div>
                                <div className="text-xl font-bold">Gradient Styles</div>
                            </div>
                        </div>
                        <p className="text-sm text-purple-100 opacity-90">
                            Gradient backgrounds are seeing a 45% increase in usage this week.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Users size={20} className="text-blue-500" />
                            <h3 className="font-bold text-gray-900">Community Stats</h3>
                        </div>
                        <div className="space-y-4 mt-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">New Creators</span>
                                    <span className="font-medium text-gray-900">+128</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div className="bg-green-500 h-1.5 rounded-full w-[70%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">Banners Created</span>
                                    <span className="font-medium text-gray-900">1,432</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div className="bg-blue-500 h-1.5 rounded-full w-[85%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
