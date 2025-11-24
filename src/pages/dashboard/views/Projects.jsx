import React from 'react';
import { Plus, FolderPlus, MoreVertical, Home, ChevronDown, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Your Projects</h1>
                <button
                    onClick={() => navigate('/editor')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    New
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                        <Home size={18} />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Creation Date
                        <ChevronDown size={14} />
                    </button>
                    <button className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                        <ArrowDown size={16} />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Add Folder Card */}
                <button className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all flex flex-col items-center justify-center gap-2 group">
                    <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                        <FolderPlus size={48} strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-500 font-medium">Add folder</span>
                </button>

                {/* Example Snap Card */}
                <div className="group relative aspect-[4/3] bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer">
                    <div className="h-3/4 w-full bg-gradient-to-br from-orange-300 to-red-300 relative p-4 flex items-center justify-center">
                        {/* Mock Content */}
                        <div className="w-3/4 h-2/3 bg-gray-900 rounded-lg shadow-lg p-2 flex flex-col gap-2">
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-[6px] text-gray-500 font-mono">
                                // put your code here
                            </div>
                        </div>

                        {/* Arrow Annotation (Mock) */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 text-center hidden group-hover:block animate-in fade-in slide-in-from-bottom-2">
                            <div className="text-sm font-medium text-gray-900 bg-white px-3 py-1 rounded-full shadow-lg border border-gray-100 mb-2">
                                Start with opening your first project! 😉
                            </div>
                            <svg className="w-6 h-6 mx-auto text-gray-400 transform rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>
                    <div className="h-1/4 p-3 flex items-center justify-between bg-white border-t border-gray-100">
                        <span className="font-medium text-gray-900">Project</span>
                        <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded">
                            <MoreVertical size={16} />
                        </button>
                    </div>
                </div>

                {/* Add Snap Card */}
                <button
                    onClick={() => navigate('/editor')}
                    className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all flex flex-col items-center justify-center gap-2 group"
                >
                    <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                        <Plus size={48} strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-500 font-medium">Add project</span>
                </button>
            </div>
        </div>
    );
};

export default Projects;
