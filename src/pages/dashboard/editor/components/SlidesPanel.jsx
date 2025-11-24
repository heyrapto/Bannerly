import React from 'react';
import { Plus, RotateCcw, X, MoreHorizontal } from 'lucide-react';

const SlidesPanel = ({ slides = [], activeSlideIndex = 0, onAddSlide, onRemoveSlide, onSelectSlide }) => {
    return (
        <div className="h-full flex flex-col relative bg-gray-50">
            {/* Floating Reset Button (Absolute positioned relative to this panel or canvas?) 
                Actually, the reference shows it floating above the panel. 
                Let's keep it here for now or move it if needed. 
            */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200 z-40">
                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                    <RotateCcw size={14} />
                    Reset Viewport
                </button>
            </div>

            {/* Slides List */}
            <div className="flex-1 p-4 overflow-x-auto flex items-center gap-4">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        onClick={() => onSelectSlide(index)}
                        className={`relative group flex-shrink-0 w-64 aspect-video rounded-lg border-2 transition-all cursor-pointer overflow-hidden
                            ${index === activeSlideIndex
                                ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                                : 'border-gray-200 hover:border-gray-300'
                            }
                        `}
                    >
                        {/* Slide Preview (Miniature) */}
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center relative">
                            {/* Background Preview */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: slide.data.rgbabackground,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />

                            {/* Content Placeholder */}
                            <div className="relative z-10 flex flex-col items-center gap-2 opacity-50 scale-50">
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm"></div>
                                <div className="w-32 h-4 bg-white rounded shadow-sm"></div>
                                <div className="w-24 h-3 bg-white rounded shadow-sm"></div>
                            </div>
                        </div>

                        {/* Slide Number Badge */}
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                            {index + 1}
                        </div>

                        {/* Actions (Hover) */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                                onClick={(e) => onRemoveSlide(e, index)}
                                className="p-1 bg-white text-red-500 rounded hover:bg-red-50 shadow-sm"
                                title="Remove Slide"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add Slide Button */}
                <button
                    onClick={onAddSlide}
                    className="flex-shrink-0 w-64 aspect-video rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-blue-600 group"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                        <Plus size={20} />
                    </div>
                    <span className="text-sm font-medium">Add Slide</span>
                </button>
            </div>
        </div>
    );
};

export default SlidesPanel;
