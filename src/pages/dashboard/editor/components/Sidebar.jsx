import React, { useState } from 'react';
import { Type, Image, Code, User, Shapes, BookOpen, MessageCircle, HelpCircle, Loader2, Waves, LayoutTemplate, Sparkles } from 'lucide-react';
import AIChat from './AIChat';

const Sidebar = ({ activeTool, setActiveTool, onToolSelect }) => {
    const [activeTab, setActiveTab] = useState('elements');

    const topTools = [
        { id: 'code', icon: Code, label: 'Code' },
        { id: 'profile', icon: User, label: 'Profile' },
        { id: 'background', icon: Image, label: 'Background' },
        { id: 'code-editor', icon: Code, label: 'Tech Stack' },
        { id: 'ai-chat', icon: Sparkles, label: 'AI Assistant' },
        { id: 'shapes', icon: Shapes, label: 'Shapes' },
        { id: 'empty', icon: null, label: '' }, // Placeholder for grid alignment
    ];

    const menuItems = [
        { id: 'watermark', label: 'Watermark', icon: Waves },
        { id: 'code-editor', label: 'Code editor', icon: LayoutTemplate },
        { id: 'background', label: 'Background', icon: Image },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Top Tool Selector Grid */}
            {/* <div className="p-4 pb-2">
                <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-300">
                    <div className="grid grid-cols-3 divide-x divide-y divide-gray-300 h-fit">
                        {topTools.map((tool, index) => (
                            <div key={index} className="relative aspect-square flex items-center justify-center">
                                {tool.icon && (
                                    <button
                                        className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-bold"
                                    >
                                        <tool.icon size={20} strokeWidth={1.5} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* Tabs */}
            <div className="px-4 mt-2">
                <div className="flex items-center justify-between bg-white rounded-t-xl border border-gray-300 border-b-0 px-2 pt-2">
                    <div className="flex gap-6">
                        <button
                            onClick={() => setActiveTab('elements')}
                            className={`pb-2 text-sm font-medium transition-colors relative
                                ${activeTab === 'elements'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }
                            `}
                        >
                            Elements
                        </button>
                        <button
                            onClick={() => setActiveTab('animations')}
                            className={`pb-2 text-sm font-medium transition-colors relative
                                ${activeTab === 'animations'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }
                            `}
                        >
                            Animations
                        </button>
                    </div>
                    <button className="pb-2 text-green-500 hover:text-green-600">
                        <BookOpen size={16} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 mx-4 mb-4 bg-white border border-gray-300 border-t-0 rounded-b-xl overflow-hidden flex flex-col">
                {/* Search/Filter Bar */}
                {/* <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 flex items-center justify-center text-blue-500 border border-blue-100 rounded-lg bg-blue-50">
                        <Loader2 size={16} className="animate-spin-slow" />
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <HelpCircle size={16} />
                    </button>
                </div> */}

                {/* Items List */}
                <div className="flex-1 overflow-y-auto py-2">
                    {activeTab === 'elements' ? (
                        <div className="space-y-0.5">
                            {menuItems.map((item) => {
                                const isActive = (activeTool === 'tech' && item.id === 'code-editor') ||
                                    (activeTool === 'theme' && item.id === 'background') ||
                                    (activeTool === 'profile' && item.id === 'watermark');

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTool(item.id === 'code-editor' ? 'tech' : item.id === 'background' ? 'theme' : item.id === 'ai-chat' ? 'ai' : 'profile');
                                            if (onToolSelect) onToolSelect();
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors relative
                                            ${isActive
                                                ? 'bg-blue-50 text-gray-900'
                                                : 'text-gray-700 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        {/* Tree line indentation simulation */}
                                        {item.id !== 'watermark' && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent" />
                                        )}

                                        <item.icon size={18} strokeWidth={1.5} className={isActive ? 'text-gray-900' : 'text-gray-500'} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                            <p>No animations yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 flex items-center justify-between mt-auto">
                <button
                    onClick={() => setActiveTool('ai')}
                    className={`w-10 h-10 bg-white rounded-full shadow-sm border border-gray-300 flex items-center justify-center transition-colors ${activeTool === 'ai' ? 'text-blue-600 border-blue-500' : 'text-gray-600 hover:text-gray-900'}`}
                >
                    <MessageCircle size={20} />
                </button>
                <button className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
                    <BookOpen size={20} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;