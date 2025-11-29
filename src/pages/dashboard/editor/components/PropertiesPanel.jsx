
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { User, Briefcase, Twitter, Github, Search, X, Upload, Check, ChevronDown, Layout, Maximize2, Sliders, Image as ImageIcon, Edit3 } from 'lucide-react';
import { PRESET_THEMES, PATTERN_STYLES } from '../constants'; // We'll export these from page or move them
import { TECH_STACK_CONFIG } from '../../../../config/techStack';
import { MAX_STACK_SELECTIONS } from '../../../../constants';

import { uploadImage } from '../../../../utils/uploadImage';
import AIChat from './AIChat';
import { useAuth } from '../../../../context/AuthContext';
import { Lock } from 'lucide-react';
import ColorPickerPopover from './ColorPickerPopover';
import MediaLibraryModal from './MediaLibraryModal';
import UpgradeModal from './UpgradeModal';
import TechStackSelector from './TechStackSelector';
import ProfileEditor from './ProfileEditor';

const PropertiesPanel = ({
    activeTool,
    formData,
    setFormData,
    selectedTech,
    handleTechSelect,
    handleTechRemove,
    availableLanguages
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const { user } = useAuth();

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleThemeSelect = (themeValue) => {
        setFormData(prev => ({ ...prev, rgbabackground: themeValue }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show local preview immediately
        const objectUrl = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, rgbabackground: objectUrl }));

        try {
            setIsUploading(true);
            const secureUrl = await uploadImage(file);
            if (secureUrl) {
                setFormData(prev => ({ ...prev, rgbabackground: secureUrl }));
            }
        } catch (error) {
            console.error("Failed to upload image:", error);
            // Revert or show error (optional)
        } finally {
            setIsUploading(false);
        }
    };

    const renderThemeParams = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Background</h3>
                    <div className="bg-green-100 p-1 rounded">
                        <Layout size={16} className="text-green-600" />
                    </div>
                </div>

                {/* Layout Selector */}
                <div className="mb-6">
                    <label className="block text-gray-900 font-medium mb-2">Layout</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => handleFormChange({ target: { name: 'layout', value: 'standard' } })}
                            className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all flex flex-col items-center gap-2 ${formData.layout !== 'modern' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}
                        >
                            <div className="w-full h-8 bg-gray-200 rounded flex flex-col items-center justify-center gap-0.5">
                                <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
                            </div>
                            Standard
                        </button>
                        <button
                            onClick={() => handleFormChange({ target: { name: 'layout', value: 'modern' } })}
                            className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all flex flex-col items-center gap-2 ${formData.layout === 'modern' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}
                        >
                            <div className="w-full h-8 bg-gray-200 rounded flex items-center justify-between px-2">
                                <div className="flex flex-col gap-0.5">
                                    <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
                                    <div className="w-4 h-1 bg-gray-400 rounded-full"></div>
                                </div>
                                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                            </div>
                            Modern
                        </button>
                    </div>
                </div>

                {/* Size Mode */}
                <div className="mb-6">
                    <label className="block text-gray-900 font-medium mb-2">Size Mode</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button className="flex-1 py-1.5 text-sm font-medium rounded-md bg-white shadow-sm text-gray-900">Fixed</button>
                        <button className="flex-1 py-1.5 text-sm font-medium rounded-md text-gray-500 hover:text-gray-900">Auto</button>
                    </div>
                </div>

                {/* Presets Button */}
                <button className="w-full mb-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Maximize2 size={16} />
                    Presets
                </button>

                {/* Dimensions */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">W</span>
                        <input type="text" value="746.73" readOnly className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 text-sm" />
                    </div>
                    <div className="text-gray-400">
                        <Sliders size={14} className="rotate-90" />
                    </div>
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">H</span>
                        <input type="text" value="1088.77" readOnly className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 text-sm" />
                    </div>
                </div>

                {/* Padding */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-gray-900 font-medium">Padding</label>
                        <button className="p-1 hover:bg-gray-100 rounded"><Sliders size={14} /></button>
                    </div>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {['None', 'Small', 'Medium', 'Large'].map(size => (
                            <button
                                key={size}
                                onClick={() => handleFormChange({ target: { name: 'padding', value: size } })}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-md ${formData.padding === size ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'} `}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fill */}
                <div>
                    <label className="block text-gray-900 font-medium mb-3">Fill</label>

                    {/* Color Picker Trigger */}
                    <div className="relative mb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500">
                                <Edit3 size={18} />
                            </div>
                            <button
                                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                                className="flex-1 h-10 rounded-lg border border-gray-200 overflow-hidden cursor-pointer relative group hover:ring-2 hover:ring-blue-500 transition-all"
                            >
                                <div className="absolute inset-0" style={{ background: formData.rgbabackground.includes('url') ? 'linear-gradient(to right, #facc15, #f97316)' : formData.rgbabackground }}></div>
                            </button>
                            <button
                                onClick={() => handleThemeSelect('transparent')}
                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Color Picker Popover */}
                        {isColorPickerOpen && (
                            <div className="absolute top-12 left-0 z-50">
                                <div className="fixed inset-0 z-40" onClick={() => setIsColorPickerOpen(false)} />
                                <ColorPickerPopover
                                    color={formData.rgbabackground}
                                    onChange={(newColor) => handleThemeSelect(newColor)}
                                    onClose={() => setIsColorPickerOpen(false)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Media Library Trigger */}
                    <button
                        onClick={() => setIsMediaLibraryOpen(true)}
                        className="w-full py-3 bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-medium rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm group"
                    >
                        <div className="p-1 bg-gray-100 group-hover:bg-blue-50 rounded text-gray-500 group-hover:text-blue-600 transition-colors">
                            <ImageIcon size={16} />
                        </div>
                        Open Media Library
                    </button>

                    {/* Quick Presets (Mini) */}
                    <div className="mt-4">
                        <label className="text-xs font-medium text-gray-500 mb-2 block uppercase tracking-wider">Quick Presets</label>
                        <div className="grid grid-cols-6 gap-2">
                            {PRESET_THEMES.slice(0, 6).map(theme => (
                                <button
                                    key={theme.id}
                                    onClick={() => handleThemeSelect(theme.value)}
                                    className={`aspect-square rounded-lg overflow-hidden border transition-all hover:scale-105 ${formData.rgbabackground === theme.value ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent'} `}
                                >
                                    <div className="w-full h-full" style={{ background: theme.value }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Media Library Modal */}
                    <MediaLibraryModal
                        isOpen={isMediaLibraryOpen}
                        onClose={() => setIsMediaLibraryOpen(false)}
                        onSelect={(url) => handleThemeSelect(url)}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            {activeTool === 'profile' && (
                <ProfileEditor
                    formData={formData}
                    handleFormChange={handleFormChange}
                />
            )}
            {activeTool === 'tech' && (
                <TechStackSelector
                    selectedTech={selectedTech}
                    handleTechSelect={handleTechSelect}
                    handleTechRemove={handleTechRemove}
                    formData={formData}
                    handleFormChange={handleFormChange}
                />
            )}
            {activeTool === 'theme' && renderThemeParams()}
            {activeTool === 'ai' && (
                <AIChat
                    formData={formData}
                    setFormData={setFormData}
                    selectedTech={selectedTech}
                    handleTechSelect={handleTechSelect}
                    handleTechRemove={handleTechRemove}
                    availableLanguages={availableLanguages}
                />
            )}
            {activeTool === 'export' && (
                <div className="text-center py-10 text-gray-500">
                    <p>Export options coming soon!</p>
                </div>
            )}
            <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
        </div>
    );
};

export default PropertiesPanel;