import React from 'react';
import { Twitter, Github, MapPin, Link as LinkIcon } from 'lucide-react';
import { PATTERN_STYLES } from '../constants';

const BannerCard = ({ formData, setFormData, selectedTech, availableLanguages }) => {
    // Helper to get tech stack style
    const getTechStackStyle = () => {
        const style = formData.techStackStyle || 'glass'; // default to glass
        switch (style) {
            case 'none': return 'bg-transparent border-none shadow-none';
            case 'solid-white': return 'bg-white text-gray-900 border-gray-200 shadow-lg';
            case 'solid-black': return 'bg-black text-white border-white/10 shadow-lg';
            case 'glass': default: return 'bg-black/30 backdrop-blur-md border-white/10 shadow-lg text-white';
        }
    };
    // Helper to get pattern style if background matches a preset
    // In a real app, we might store pattern info in formData directly
    const getBackgroundStyle = () => {
        // Check if it's a URL (image) or gradient
        const isImage = formData.rgbabackground.startsWith('http') || formData.rgbabackground.startsWith('blob');

        if (isImage) {
            return {
                backgroundImage: `url(${formData.rgbabackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            };
        }

        // If it's a gradient, we might want to try to match it to a preset to get the pattern
        // For now, just return the gradient
        return { background: formData.rgbabackground };
    };

    return (
        <div
            className="w-[800px] h-[266px] rounded-xl overflow-hidden shadow-2xl relative flex flex-col justify-center items-center text-white select-none"
            style={getBackgroundStyle()}
        >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

            {/* Content Container */}
            <div className={`relative z-10 flex ${formData.layout === 'modern' ? 'flex-row justify-between text-left px-16 pb-10' : 'flex-col items-center text-center px-12'} gap-6 w-full`}>

                {/* Main Info */}
                <div className={`space-y-2 ${formData.layout === 'modern' ? 'flex-1' : 'w-full'}`}>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your Name"
                        className={`text-5xl font-bold tracking-tight drop-shadow-lg bg-transparent border-none w-full focus:outline-none focus:ring-0 placeholder-white/50 ${formData.layout === 'modern' ? 'text-left' : 'text-center'}`}
                    />
                    <input
                        type="text"
                        value={formData.field}
                        onChange={(e) => setFormData(prev => ({ ...prev, field: e.target.value }))}
                        placeholder="Software Engineer"
                        className={`text-xl font-medium text-white/90 tracking-wide drop-shadow-md uppercase bg-transparent border-none w-full focus:outline-none focus:ring-0 placeholder-white/50 ${formData.layout === 'modern' ? 'text-left' : 'text-center'}`}
                    />

                    {/* Socials - Moved here for Modern Layout */}
                    {formData.layout === 'modern' && (
                        <div className="flex items-center gap-6 mt-4">
                            {formData.twitter && (
                                <div className="flex items-center gap-2 text-white/90 drop-shadow-md">
                                    <Twitter size={20} fill="currentColor" className="text-sky-400" />
                                    <span className="font-medium">@{formData.twitter.replace('@', '')}</span>
                                </div>
                            )}

                            {formData.github && (
                                <div className="flex items-center gap-2 text-white/90 drop-shadow-md">
                                    <Github size={20} fill="currentColor" />
                                    <span className="font-medium">{formData.github}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Tech Stack */}
                {selectedTech.length > 0 && (
                    <div className={`${formData.layout === 'modern' ? 'absolute bottom-6 right-6 flex items-center gap-3' : 'flex items-center justify-center mt-2'}`}>
                        {formData.layout === 'modern' && <span className="font-medium text-white/80">Stack:</span>}

                        {formData.techStackIndividual ? (
                            // Individual Items Styling
                            <div className="flex items-center gap-3">
                                {selectedTech.map(techName => {
                                    const tech = availableLanguages.find(t => t.name === techName);
                                    return tech ? (
                                        <div
                                            key={techName}
                                            className={`p-2 rounded-xl border transition-all ${getTechStackStyle()}`}
                                        >
                                            <img
                                                src={tech.icon}
                                                alt={techName}
                                                style={{ width: `${formData.iconSize || 32}px`, height: `${formData.iconSize || 32}px` }}
                                                className="drop-shadow-md"
                                            />
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        ) : (
                            // Container Styling (Original)
                            <div className={`flex items-center gap-4 px-6 py-3 rounded-2xl border transition-all ${getTechStackStyle()}`}>
                                {selectedTech.map(techName => {
                                    const tech = availableLanguages.find(t => t.name === techName);
                                    return tech ? (
                                        <img
                                            key={techName}
                                            src={tech.icon}
                                            alt={techName}
                                            style={{ width: `${formData.iconSize || 32}px`, height: `${formData.iconSize || 32}px` }}
                                            className="drop-shadow-md hover:scale-110 transition-transform duration-200"
                                        />
                                    ) : null;
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Socials - Standard Layout */}
                {formData.layout !== 'modern' && (
                    <div className="flex items-center gap-6 mt-2">
                        {formData.twitter && (
                            <div className="flex items-center gap-2 text-white/90 drop-shadow-md">
                                <Twitter size={20} fill="currentColor" className="text-sky-400" />
                                <span className="font-medium">@{formData.twitter.replace('@', '')}</span>
                            </div>
                        )}

                        {formData.github && (
                            <div className="flex items-center gap-2 text-white/90 drop-shadow-md">
                                <Github size={20} fill="currentColor" />
                                <span className="font-medium">{formData.github}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Watermark (Optional) */}
            {(formData.showWatermark !== false) && (
                <div className="absolute bottom-3 right-4 text-[10px] text-white/40 font-medium tracking-widest uppercase">
                    Made with Bannerly
                </div>
            )}
        </div>
    );
};

export default BannerCard;
