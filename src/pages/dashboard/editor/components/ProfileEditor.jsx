import React, { useState } from 'react';
import { User, Briefcase, Twitter, Github, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';
import UpgradeModal from './UpgradeModal';

const ProfileEditor = ({ formData, handleFormChange }) => {
    const { user } = useAuth();
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // Mock visibility state

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-gray-900">Profile Information</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Manage your personal details
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className={`p-1.5 rounded-lg transition-colors ${isVisible ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
                    title={isVisible ? "Visible on banner" : "Hidden from banner"}
                >
                    {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
            </div>

            {/* Personal Details */}
            <div className="space-y-4">
                <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        <User size={12} />
                        Full Name
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        <Briefcase size={12} />
                        Role / Title
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="field"
                            value={formData.field}
                            onChange={handleFormChange}
                            placeholder="Software Engineer"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 text-gray-400 font-medium">Social Profiles</span>
                </div>
            </div>

            {/* Social Handles */}
            <div className="space-y-4">
                <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        <Twitter size={12} className="text-blue-400" />
                        Twitter
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                        <input
                            type="text"
                            name="twitter"
                            value={formData.twitter.replace(/^@/, '')}
                            onChange={(e) => handleFormChange({ target: { name: 'twitter', value: e.target.value ? `@${e.target.value.replace(/^@/, '')}` : '' } })}
                            placeholder="username"
                            className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        <Github size={12} className="text-gray-700" />
                        GitHub
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="github"
                            value={formData.github}
                            onChange={handleFormChange}
                            placeholder="username"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Watermark Toggle */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-3 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                            <span className="text-lg">💧</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-gray-900">Watermark</span>
                                {(!user || user.plan !== 'pro') && (
                                    <span className="px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-black uppercase rounded flex items-center gap-0.5 shadow-sm">
                                        <Lock size={8} /> Pro
                                    </span>
                                )}
                            </div>
                            <p className="text-[10px] text-gray-500 font-medium">Add branding to exports</p>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="checkbox"
                            name="showWatermark"
                            id="showWatermark"
                            checked={formData.showWatermark !== false}
                            onChange={(e) => {
                                if (user?.plan === 'pro') {
                                    handleFormChange({ target: { name: 'showWatermark', value: e.target.checked } });
                                } else {
                                    setIsUpgradeModalOpen(true);
                                }
                            }}
                            className="sr-only peer"
                        />
                        <label
                            htmlFor="showWatermark"
                            className="relative block w-11 h-6 bg-gray-200 rounded-full cursor-pointer transition-all duration-300 peer-checked:bg-blue-600 hover:shadow-sm"
                        >
                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${formData.showWatermark !== false ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </label>
                    </div>
                </div>
            </div>

            <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
        </div>
    );
};

export default ProfileEditor;
