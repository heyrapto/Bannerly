
import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize } from 'lucide-react';

const Canvas = ({ children, bannerRef }) => {
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
    const handleReset = () => setZoom(1);

    return (
        <div className="flex-1 relative bg-gray-100 overflow-hidden flex flex-col">
            {/* Canvas Area */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                <div
                    ref={bannerRef}
                    className="relative shadow-2xl shadow-gray-300/50 transition-all duration-300 hover:shadow-3xl origin-center"
                    style={{ transform: `scale(${zoom})` }}
                >
                    {children}
                </div>
            </div>

            {/* Zoom Controls (Bottom Right) */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                    onClick={handleZoomOut}
                    className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded"
                >
                    <ZoomOut size={16} />
                </button>
                <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-200"
                        style={{ width: `${((zoom - 0.5) / 1.5) * 100}%` }}
                    ></div>
                </div>
                <span className="text-xs font-medium text-gray-500 w-8 text-center">
                    {Math.round(zoom * 100)}%
                </span>
                <button
                    onClick={handleZoomIn}
                    className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded"
                >
                    <ZoomIn size={16} />
                </button>
                <div className="w-px h-4 bg-gray-200 mx-1"></div>
                <button
                    onClick={handleReset}
                    className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded"
                    title="Reset Zoom"
                >
                    <RotateCcw size={14} />
                </button>
            </div>
        </div>
    );
};

export default Canvas;
