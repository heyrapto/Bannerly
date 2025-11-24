import React from 'react';
import Header from './Header';
import SlidesPanel from './SlidesPanel';
import MobileBottomNav from './MobileBottomNav';
import { X } from 'lucide-react';

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
    const [mobileActivePanel, setMobileActivePanel] = React.useState(null);

    return (
        <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Top Navigation */}
            <Header onThemeSelect={onThemeSelect} bannerRef={bannerRef} />

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative pb-[60px] md:pb-0">
                {/* Left Sidebar - Desktop */}
                <div className="hidden md:block w-72 bg-white border-r border-gray-200 flex-shrink-0 z-20">
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
                {/* Properties Panel - Right Sidebar - Desktop */}
                <div className="hidden md:block w-80 flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto z-20">
                    {properties}
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <MobileBottomNav
                onOpenTools={() => setMobileActivePanel('tools')}
                onOpenLayers={() => setMobileActivePanel('layers')}
                onOpenSettings={() => setMobileActivePanel('properties')}
                onExport={() => alert('Export on mobile coming soon!')}
            />

            {/* Mobile Drawers */}
            {mobileActivePanel && (
                <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="font-bold text-lg capitalize">{mobileActivePanel}</h3>
                        <button onClick={() => setMobileActivePanel(null)} className="p-2 bg-gray-100 rounded-full">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {mobileActivePanel === 'tools' && sidebar}
                        {mobileActivePanel === 'properties' && properties}
                        {mobileActivePanel === 'layers' && <div className="p-4 text-center text-gray-500">Layers coming soon</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditorLayout;
