import React from 'react';
import { Home, LayoutTemplate, GraduationCap, Settings, Trophy } from 'lucide-react';

const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'tutorials', label: 'Tutorials', icon: GraduationCap },
    { id: 'settings', label: 'Settings', icon: Settings },
];

const DashboardSidebar = ({ activeView, setActiveView }) => {
    return (
        <div className="relative flex flex-col items-center py-6 h-full">
            {/* Pill container */}
            <div className="flex flex-col items-center gap-1 bg-gray-100/80 backdrop-blur-sm rounded-2xl px-2 py-3 shadow-sm border border-gray-200/60">
                {menuItems.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                        <div key={item.id} className="relative group flex items-center">
                            {/* Icon button */}
                            <button
                                onClick={() => setActiveView(item.id)}
                                className={`
                                    w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200
                                    ${isActive
                                        ? 'bg-white shadow-md text-gray-900'
                                        : 'text-gray-500 hover:bg-white/70 hover:text-gray-800 hover:shadow-sm'
                                    }
                                `}
                                title={item.label}
                            >
                                <item.icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                            </button>

                            {/* Hover label — slides in from right */}
                            <div className="
                                pointer-events-none absolute left-full ml-3 z-50
                                opacity-0 translate-x-[-6px]
                                group-hover:opacity-100 group-hover:translate-x-0
                                transition-all duration-200 ease-out
                            ">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap">
                                    {item.label}
                                    {/* Arrow */}
                                    <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Ad card at bottom */}
            <div className="mt-auto">
                <div className="relative group flex items-center">
                    <div className="w-11 flex flex-col items-center gap-1 bg-gray-100/80 backdrop-blur-sm rounded-2xl px-2 py-3 shadow-sm border border-gray-200/60">
                        <div className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            V
                        </div>
                    </div>

                    {/* Hover card */}
                    <div className="
                        pointer-events-none absolute left-full ml-3 z-50 w-44
                        opacity-0 translate-x-[-6px]
                        group-hover:opacity-100 group-hover:translate-x-0
                        transition-all duration-200 ease-out
                    ">
                        <div className="relative p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-blue-100 shadow-lg">
                            <span className="absolute right-full top-4 border-4 border-transparent border-r-purple-50" />
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center text-white text-[10px] font-bold">V</div>
                                <span className="font-bold text-gray-900 text-xs">Vemetric</span>
                            </div>
                            <p className="text-[10px] font-semibold text-gray-900 mb-0.5">Privacy-first Analytics</p>
                            <p className="text-[9px] text-gray-600 mb-2">Own your Data. Grow Smarter.</p>
                            <button className="w-full py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-medium rounded pointer-events-auto transition-colors">
                                Start Free
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebar;
