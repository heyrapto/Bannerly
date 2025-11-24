import React, { useState } from 'react';
import { Type, Image, Code, FileText, Settings, Layers, Zap, BookOpen, Waves, LayoutTemplate } from 'lucide-react';

const Sidebar = ({ activeTool, setActiveTool }) => {
    const [activeTab, setActiveTab] = useState('elements');

    const menuItems = [
        { id: 'watermark', label: 'Watermark', icon: Waves },
        { id: 'code-editor', label: 'Code editor', icon: LayoutTemplate },
        { id: 'background', label: 'Background', icon: Image },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('elements')}
                    className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors relative
                        ${activeTab === 'elements' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}
                    `}
                >
                    Elements
                </button>
                <button
                    onClick={() => setActiveTab('animations')}
                    className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors relative flex items-center justify-center gap-2
                        ${activeTab === 'animations' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}
                    `}
                >
                    Animations
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] rounded font-bold leading-none">NEW</span>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'elements' && (
                    <div className="space-y-1">
                        {/* Search Placeholder */}
                        <div className="mb-4 relative">
                            <div className="w-full h-9 border border-gray-200 rounded-lg flex items-center px-3 text-gray-400 text-sm bg-white hover:border-gray-300 transition-colors cursor-text">
                                <span className="mr-2">🔍</span> Search elements...
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="space-y-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTool(item.id === 'code-editor' ? 'tech' : item.id === 'background' ? 'theme' : 'profile')}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                        ${(activeTool === 'tech' && item.id === 'code-editor') || (activeTool === 'theme' && item.id === 'background') || (activeTool === 'profile' && item.id === 'watermark')
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <item.icon size={18} strokeWidth={2} />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'animations' && (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm text-center">
                        <Zap size={32} className="mb-2 opacity-50" />
                        <p>Animations coming soon!</p>
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between text-gray-500">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                    <Settings size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                    <BookOpen size={20} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;