
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

const PropertiesPanel = ({
    activeTool,
    formData,
    setFormData,
    selectedTech,
    handleTechSelect,
    handleTechRemove,
    availableLanguages
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);
    const { user } = useAuth();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    const filteredTech = useMemo(() =>
        TECH_STACK_CONFIG.filter(tech =>
            tech.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [searchTerm]
    );

    // Group tech stack
    const techCategories = useMemo(() => {
        const categories = {};
        filteredTech.forEach(tech => {
            let category = "Frontend";
            if (tech.name.match(/node|python|java|php|go|ruby/i)) category = "Backend";
            else if (tech.name.match(/figma|design|sketch|adobe/i)) category = "Design";
            else if (tech.name.match(/docker|aws|cloud|git/i)) category = "DevOps";

            if (!categories[category]) categories[category] = [];
            categories[category].push(tech);
        });
        return categories;
    }, [filteredTech]);

    const renderProfileParams = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Watermark Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Profile Information</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Visible</span>
                        <button
                            className="w-10 h-5 bg-blue-600 rounded-full relative transition-colors"
                            onClick={() => {/* Toggle visibility logic if needed */ }}
                        >
                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Name Input */}
                    <div className="group">
                        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                        <div className="relative flex items-center">
                            <div className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                <User size={16} />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                placeholder="John Doe"
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Field Input */}
                    <div className="group">
                        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Role / Title</label>
                        <div className="relative flex items-center">
                            <div className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                <Briefcase size={16} />
                            </div>
                            <input
                                type="text"
                                name="field"
                                value={formData.field}
                                onChange={handleFormChange}
                                placeholder="Software Engineer"
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 my-4"></div>

                    {/* Social Handles */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="group">
                            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Twitter</label>
                            <div className="relative flex items-center">
                                <div className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <Twitter size={16} />
                                </div>
                                <input
                                    type="text"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleFormChange}
                                    placeholder="@username"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">GitHub</label>
                            <div className="relative flex items-center">
                                <div className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <Github size={16} />
                                </div>
                                <input
                                    type="text"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleFormChange}
                                    placeholder="username"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTechParams = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Code Editor</h3>
                    <div className="bg-blue-100 p-1 rounded">
                        <Layout size={16} className="text-blue-600" />
                    </div>
                </div>

                <p className="text-gray-500 text-xs mb-4">Select up to {MAX_STACK_SELECTIONS} technologies</p>

                {/* Selected Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedTech.map(techName => {
                        const tech = TECH_STACK_CONFIG.find(t => t.name === techName);
                        return (
                            <div key={techName} className="flex items-center gap-1 pl-2 pr-1 py-1 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700">
                                <span>{techName}</span>
                                <button onClick={() => handleTechRemove(techName)} className="hover:bg-blue-100 rounded p-0.5">
                                    <X size={12} />
                                </button>
                            </div>
                        );
                    })}
                    {selectedTech.length === 0 && <span className="text-gray-500 text-xs italic">No tech selected</span>}
                </div>

                {/* Search */}
                <div className="relative" ref={dropdownRef}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search technologies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsDropdownOpen(true)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent block pl-10 p-2.5"
                        />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                            {Object.entries(techCategories).map(([category, techs]) => (
                                <div key={category}>
                                    <div className="sticky top-0 bg-gray-50 px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                        {category}
                                    </div>
                                    {techs.map(tech => (
                                        <button
                                            key={tech.name}
                                            onClick={() => handleTechSelect(tech.name)}
                                            disabled={selectedTech.includes(tech.name) || (selectedTech.length >= MAX_STACK_SELECTIONS && !selectedTech.includes(tech.name))}
                                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors
                                                ${selectedTech.includes(tech.name) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}
                                                ${(selectedTech.length >= MAX_STACK_SELECTIONS && !selectedTech.includes(tech.name)) ? 'opacity-50 cursor-not-allowed' : ''}
`}
                                        >
                                            <img src={tech.icon} alt="" className="w-4 h-4" />
                                            <span className="flex-1">{tech.name}</span>
                                            {selectedTech.includes(tech.name) && <Check size={14} />}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Tech Stack Customization */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
                {/* Stack Style */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stack Style</label>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { id: 'glass', label: 'Glass', class: 'bg-gray-800 text-white' },
                            { id: 'solid-white', label: 'White', class: 'bg-white border border-gray-200 text-gray-900' },
                            { id: 'solid-black', label: 'Black', class: 'bg-black text-white' },
                            { id: 'none', label: 'None', class: 'bg-gray-100 text-gray-500' },
                        ].map(style => (
                            <button
                                key={style.id}
                                onClick={() => handleFormChange({ target: { name: 'techStackStyle', value: style.id } })}
                                className={`py-2 text-xs font-medium rounded-lg transition-all ${style.class} ${formData.techStackStyle === style.id ? 'ring-2 ring-blue-500 ring-offset-1' : 'opacity-70 hover:opacity-100'}`}
                            >
                                {style.label}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Individual Background Toggle */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="techStackIndividual"
                    checked={formData.techStackIndividual || false}
                    onChange={(e) => handleFormChange({ target: { name: 'techStackIndividual', value: e.target.checked } })}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="techStackIndividual" className="text-xs text-gray-600 select-none cursor-pointer">
                    Apply to individual items
                </label>
            </div>

            {/* Icon Size */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Icon Size</label>
                    <span className="text-xs text-gray-500">{formData.iconSize}px</span>
                </div>
                <input
                    type="range"
                    min="16"
                    max="64"
                    step="4"
                    name="iconSize"
                    value={formData.iconSize || 32}
                    onChange={handleFormChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
            </div>
        </div >
    );

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
            {activeTool === 'profile' && renderProfileParams()}
            {activeTool === 'tech' && renderTechParams()}
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
        </div>
    );
};

export default PropertiesPanel;