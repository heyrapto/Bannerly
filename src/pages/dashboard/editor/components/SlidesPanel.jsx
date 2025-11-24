import React from 'react';
import { Plus, RotateCcw, X, ChevronDown, ChevronUp } from 'lucide-react';

const SlidesPanel = ({ slides = [], activeSlideIndex = 0, onAddSlide, onRemoveSlide, onSelectSlide }) => {
    const [isExpanded, setIsExpanded] = React.useState(true);

    return (
        <div className={`relative bg-gray-50 border-t border-gray-200 transition-all duration-300 ease-in-out ${isExpanded ? 'h-40' : 'h-2'} md:h-auto`}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white border border-gray-200 border-b-0 rounded-t-lg hidden md:flex items-center justify-center text-gray-500 hover:text-gray-700 z-40 shadow-sm"
            >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>

            {/* Floating Reset Button */}
            <div className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200 z-40 transition-all duration-300 ${isExpanded ? '-top-16 md:-top-16' : '-top-12 md:-top-12'}`}>
                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                    <RotateCcw size={14} />
                    Reset Viewport
                </button>
            </div>

            {/* Slides List Container */}
            <div
                className={`relative bg-gray-50 transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-32 md:max-h-48 border-t border-gray-200' : 'max-h-0 border-t-0'} h-32 md:h-auto`}
            >
                {/* Slides List */}
                <div className="w-full h-full p-2 md:p-4 overflow-x-auto flex items-center gap-2 md:gap-4">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            onClick={() => onSelectSlide(index)}
                            className={`relative group flex-shrink-0 w-24 md:w-40 aspect-video rounded-lg border-2 transition-all cursor-pointer overflow-hidden
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
                        className="flex-shrink-0 w-24 md:w-40 aspect-video rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-1 md:gap-2 text-gray-500 hover:text-blue-600 group"
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                            <Plus size={16} className="md:w-5 md:h-5" />
                        </div>
                        <span className="text-xs md:text-sm font-medium">Add Slide</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SlidesPanel;