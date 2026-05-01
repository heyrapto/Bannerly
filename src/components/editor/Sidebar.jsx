import React from 'react';
import { Layers, UploadCloud, Image, Compass, Grid2X2, Sparkles } from 'lucide-react';

const Sidebar = ({ activeTool, setActiveTool }) => {
    const menuItems = [
        { id: 'profile', label: 'Layers', icon: Layers },
        { id: 'theme', label: 'Images', icon: Image },
        { id: 'tech', label: 'Vectors', icon: Compass },
    ];

    return (
        <div className="flex flex-col items-center py-8 h-full w-24 bg-[#F9FAFB] border-r border-gray-100">
            {/* The Main Pill Container */}
            <div className="flex flex-col items-center py-4 px-2 bg-white rounded-[40px] border border-gray-200 shadow-sm gap-2">
                {menuItems.map((item) => {
                    const isActive = activeTool === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTool(item.id)}
                            className={`
                                group flex flex-col items-center justify-center w-16 transition-all duration-300 ease-in-out rounded-2xl
                                ${isActive ? 'h-20 bg-blue-50 text-blue-600' : 'h-14 text-gray-400 hover:h-20 hover:bg-gray-50 hover:text-gray-900'}
                            `}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <item.icon 
                                    size={24} 
                                    strokeWidth={isActive ? 2 : 1.5} 
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                                
                                <span className={`
                                    text-[10px] font-semibold mt-1 transition-all duration-300
                                    ${isActive ? 'opacity-100 scale-100 h-auto' : 'opacity-0 scale-75 h-0 group-hover:opacity-100 group-hover:scale-100 group-hover:h-auto group-hover:mt-1'}
                                `}>
                                    {item.label}
                                </span>
                            </div>
                        </button>
                    );
                })}

                {/* Divider */}
                <div className="w-8 h-px bg-gray-100 my-1" />

                {/* Magic Button */}
                <button
                    onClick={() => setActiveTool('ai')}
                    className={`
                        group flex flex-col items-center justify-center w-16 transition-all duration-300 ease-in-out rounded-2xl
                        ${activeTool === 'ai' 
                            ? 'h-20 bg-purple-100 text-purple-600 border border-purple-200' 
                            : 'h-14 bg-purple-50 text-purple-500 hover:h-20 hover:bg-purple-100 hover:text-purple-600'}
                    `}
                >
                    <div className="flex flex-col items-center justify-center">
                        <Sparkles 
                            size={24} 
                            strokeWidth={2} 
                            className="transition-transform duration-300 group-hover:rotate-12"
                        />
                        <span className={`
                            text-[10px] font-bold mt-1 transition-all duration-300
                            ${activeTool === 'ai' ? 'opacity-100 scale-100 h-auto' : 'opacity-0 scale-75 h-0 group-hover:opacity-100 group-hover:scale-100 group-hover:h-auto group-hover:mt-1'}
                        `}>
                            Magic
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;