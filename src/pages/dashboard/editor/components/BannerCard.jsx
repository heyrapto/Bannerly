import React from 'react';
import { Twitter, Github, MapPin, Link as LinkIcon } from 'lucide-react';
import { PATTERN_STYLES } from '../constants';

const BannerCard = ({ formData, selectedTech, availableLanguages }) => {
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
            <div className="relative z-10 flex flex-col items-center gap-6 w-full px-12">

                {/* Main Info */}
                <div className="text-center space-y-2">
                    <h1 className="text-5xl font-bold tracking-tight drop-shadow-lg">
                        {formData.name || "Your Name"}
                    </h1>
                    <p className="text-xl font-medium text-white/90 tracking-wide drop-shadow-md uppercase">
                        {formData.field || "Software Engineer"}
                    </p>
                </div>

                {/* Tech Stack */}
                {selectedTech.length > 0 && (
                    <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-lg mt-2">
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
                )}

                {/* Socials */}
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
            </div>

            {/* Watermark (Optional) */}
            <div className="absolute bottom-3 right-4 text-[10px] text-white/40 font-medium tracking-widest uppercase">
                Made with Bannerly
            </div>
        </div>
    );
};

export default BannerCard;
