
import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize } from 'lucide-react';

const Canvas = ({ children, bannerRef }) => {
    return (
        <div className="flex-1 relative bg-gray-100 overflow-hidden flex flex-col">
            {/* Canvas Area */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                <div ref={bannerRef} className="relative shadow-2xl shadow-gray-300/50 transition-all duration-300 hover:shadow-3xl">
                    {children}
                </div>
            </div>

            {/* Zoom Controls (Bottom Right) */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-gray-200 z-10">
                <button className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
                    <ZoomOut size={16} />
                </button>
                <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-gray-500 w-8 text-center">27%</span>
                <button className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
                    <ZoomIn size={16} />
                </button>
                <div className="w-px h-4 bg-gray-200 mx-1"></div>
                <button className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
                    <RotateCcw size={14} />
                </button>
            </div>
        </div>
    );
};

export default Canvas;
