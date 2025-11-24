import React from 'react';
import { Plus, RotateCcw, ChevronDown } from 'lucide-react';

const SlidesPanel = () => {
    return (
        <div className="h-32 bg-white border-t border-gray-200 flex flex-col relative z-30">
            {/* Reset Viewport Floating Button */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <RotateCcw size={16} />
                    Reset Viewport
                </button>
                <div className="w-8 h-4 bg-white border-b border-l border-r border-gray-200 rounded-b-lg -mt-px flex items-center justify-center shadow-sm">
                    <ChevronDown size={12} className="text-gray-400" />
                </div>
            </div>

            {/* Slides Content */}
            <div className="flex-1 p-4 flex items-center gap-4 overflow-x-auto">
                {/* Slide 1 (Active) */}
                <div className="relative group cursor-pointer">
                    <div className="w-40 h-24 bg-gray-100 rounded-lg border-2 border-blue-500 overflow-hidden relative shadow-sm">
                        {/* Mini Preview */}
                        <div className="absolute inset-2 bg-gray-900 rounded-md flex items-center justify-center">
                            <div className="text-[6px] text-gray-500 font-mono">
                                console.log
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-1 left-1 w-5 h-5 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-700 shadow-sm">
                        1
                    </div>
                </div>

                {/* Add Slide Button */}
                <button className="w-40 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-gray-400 hover:bg-gray-50 transition-all group">
                    <Plus size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Add Slide</span>
                </button>
            </div>
        </div>
    );
};

export default SlidesPanel;
