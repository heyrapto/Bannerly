import React from 'react';
import { Twitter, Github, MapPin, Link as LinkIcon } from 'lucide-react';
import { PATTERN_STYLES } from '../constants';

const BannerCard = ({ formData, setFormData, selectedTech, availableLanguages }) => {
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
            <div className={`relative z-10 flex ${formData.layout === 'modern' ? 'flex-row justify-between text-left px-16' : 'flex-col items-center text-center px-12'} gap-6 w-full`}>

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
                    <div className={`${formData.layout === 'modern' ? 'flex flex-col items-end justify-center' : 'flex items-center justify-center'} gap-4`}>
                        <div className={`flex ${formData.layout === 'modern' ? 'flex' : 'flex-row'} items-center gap-4 bg-black/30 backdrop-blur-md px-6 py-3 rounded-3xl border border-white/10 shadow-lg mt-2`}>
                            {selectedTech.map(techName => {
                                const tech = availableLanguages.find(t => t.name === techName);
                                return tech ? (
                                    <img
                                        key={techName}
                                        src={tech.icon}
                                        alt={techName}
                                        className="w-8 h-8 drop-shadow-md hover:scale-110 transition-transform duration-200"
                                    />
                                ) : null;
                            })}
                        </div>
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
            <div className="absolute bottom-3 right-4 text-[10px] text-white/40 font-medium tracking-widest uppercase">
                Made with Bannerly
            </div>
        </div>
    );
};

export default BannerCard;
