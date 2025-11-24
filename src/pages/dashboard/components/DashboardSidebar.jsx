import React from 'react';
import { Home, LayoutTemplate, GraduationCap, BookOpen, Settings, LogOut, Trophy } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = ({ activeView, setActiveView }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'templates', label: 'Templates', icon: LayoutTemplate },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        { id: 'tutorials', label: 'Tutorials', icon: GraduationCap },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="w-64 bg-white flex flex-col h-full py-6 pr-6 pl-4">
            <div className="flex-1 space-y-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all
                            ${activeView === item.id
                                ? 'bg-blue-50 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }
                        `}
                    >
                        <item.icon size={18} className={activeView === item.id ? 'text-gray-900' : 'text-gray-500'} />
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-blue-100 mb-4 relative overflow-hidden">
                    <button
                        onClick={() => { }} // Close handler
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">V</div>
                        <span className="font-bold text-gray-900 text-sm">Vemetric</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-900 mb-1">Privacy-first Analytics</p>
                    <p className="text-[10px] text-gray-600 mb-3">Own your Data. Grow Smarter.</p>
                    <button className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors">
                        Start Free
                    </button>
                    <div className="mt-2 text-[10px] text-gray-400 text-center underline cursor-pointer">
                        Want to see your ad here?
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebar;
