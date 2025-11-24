import React from 'react';
import Header from './Header';
import SlidesPanel from './SlidesPanel';

const EditorLayout = ({ sidebar, canvas, properties, onThemeSelect, bannerRef }) => {
    return (
        <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Top Navigation */}
            <Header onThemeSelect={onThemeSelect} bannerRef={bannerRef} />

            {/* Main Editor Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar - Tools Navigation */}
                <div className="w-72 flex-shrink-0 bg-white border-r border-gray-200 z-20 flex flex-col">
                    {sidebar}
                </div>

                {/* Center Column: Canvas + Slides Panel */}
                <div className="flex-1 flex flex-col relative overflow-hidden bg-gray-100">
                    {/* Canvas - Main Preview Area */}
                    <div className="flex-1 relative overflow-hidden flex flex-col">
                        {canvas}
                    </div>

                    {/* Bottom Slides Panel */}
                    <SlidesPanel />
                </div>

                {/* Properties Panel - Right Sidebar */}
                <div className="w-80 flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto z-20">
                    {properties}
                </div>
            </div>
        </div>
    );
};

export default EditorLayout;
