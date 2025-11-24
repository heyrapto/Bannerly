import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { User, CreditCard, Bell, Shield } from 'lucide-react';

const Settings = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your account and subscription preferences.</p>
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
                        <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-white shadow-md overflow-hidden">
                            <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                Change Avatar
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                defaultValue={user?.name}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <CreditCard size={20} className="text-gray-400" />
                        Subscription
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-100 rounded-xl mb-6">
                        <div>
                            <div className="font-bold text-purple-900">Free Plan</div>
                            <div className="text-sm text-purple-700">You are currently on the free plan.</div>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                            Upgrade to Pro
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <span className="text-gray-600">Billing Cycle</span>
                            <span className="font-medium text-gray-900">Monthly</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-gray-100">
                            <span className="text-gray-600">Next Payment</span>
                            <span className="font-medium text-gray-900">N/A</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications & Security */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                        <Bell size={20} className="text-gray-400" />
                        Notifications
                    </h2>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                            <span className="text-gray-700 text-sm">Email me about product updates</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                            <span className="text-gray-700 text-sm">Email me about new templates</span>
                        </label>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                        <Shield size={20} className="text-gray-400" />
                        Security
                    </h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Change Password
                    </button>
                    <div className="mt-2">
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Settings;
