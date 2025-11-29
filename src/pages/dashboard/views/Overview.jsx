import React from 'react';
import { Plus, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Overview = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const recentBanners = [
        { id: 1, name: 'Project Launch', date: '2 hours ago', preview: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' },
        { id: 2, name: 'Blog Header', date: '1 day ago', preview: 'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)' },
        { id: 3, name: 'Twitter Banner', date: '3 days ago', preview: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || 'Creator'}! 👋</h1>
                    <p className="text-gray-500 mt-1">Ready to create something amazing today?</p>
                </div>
                <button
                    onClick={() => navigate('/editor')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Create New
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-gray-500 text-sm font-medium mb-2">Total Banners</div>
                    <div className="text-3xl font-bold text-gray-900">12</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-gray-500 text-sm font-medium mb-2">Views</div>
                    <div className="text-3xl font-bold text-gray-900">1.2k</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-gray-500 text-sm font-medium mb-2">Plan</div>
                    <div className="text-3xl font-bold text-purple-600">Free</div>
                </div>
            </div>

            {/* Recent Projects */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Recent Projects</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        View All <ArrowRight size={16} />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Create New Card */}
                    <button
                        onClick={() => navigate('/editor')}
                        className="aspect-video rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-3 group"
                    >
                        <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors">
                            <Plus size={24} />
                        </div>
                        <span className="text-gray-500 group-hover:text-blue-600 font-medium">Create New Banner</span>
                    </button>

                    {/* Recent Banners */}
                    {recentBanners.map((banner) => (
                        <div key={banner.id} className="group relative aspect-video bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer">
                            <div className="h-2/3 w-full" style={{ background: banner.preview }}></div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{banner.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <Clock size={12} />
                                    {banner.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Overview;
