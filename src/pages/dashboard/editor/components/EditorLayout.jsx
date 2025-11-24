import React from 'react';
import Header from './Header';
import SlidesPanel from './SlidesPanel';

const EditorLayout = ({
    sidebar,
    canvas,
    properties,
    onThemeSelect,
    bannerRef,
    slides,
    activeSlideIndex,
    onAddSlide,
    onRemoveSlide,
    onSelectSlide
}) => {
    return (
        <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Top Navigation */}
            <Header onThemeSelect={onThemeSelect} bannerRef={bannerRef} />

            {/* Main Editor Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-72 bg-white border-r border-gray-200 flex-shrink-0 z-20">
                    {sidebar}
                </div>

                {/* Center Canvas Area */}
                <div className="flex-1 flex flex-col min-w-0 relative">
                    {canvas}

                    {/* Bottom Slides Panel */}
                    <div className=" bg-white border-t border-gray-200 z-30">
                        <SlidesPanel
                            slides={slides}
                            activeSlideIndex={activeSlideIndex}
                            onAddSlide={onAddSlide}
                            onRemoveSlide={onRemoveSlide}
                            onSelectSlide={onSelectSlide}
                        />
                    </div>
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
