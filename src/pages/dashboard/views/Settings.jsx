import React from 'react';
import { User, Bell, Shield } from 'lucide-react';

const Settings = () => {
    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your preferences.</p>
            </div>

            {/* Profile Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <User size={20} className="text-gray-400" />
                        Profile Information
                    </h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-white shadow-md overflow-hidden flex items-center justify-center text-gray-400 text-3xl">
                            👤
                        </div>
                        <div>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                Change Avatar
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Appearance / Preferences */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Bell size={20} className="text-gray-400" />
                        Preferences
                    </h2>
                </div>
                <div className="p-6 space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-700 text-sm">Show export tips</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-700 text-sm">Auto-save banner edits</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;
