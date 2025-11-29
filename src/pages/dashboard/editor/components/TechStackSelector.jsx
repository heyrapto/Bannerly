import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, Check, ChevronDown, Sliders, LayoutGrid, List } from 'lucide-react';
import { TECH_STACK_CONFIG } from '../../../../config/techStack';
import { MAX_STACK_SELECTIONS } from '../../../../constants';

const TechStackSelector = ({
    selectedTech,
    handleTechSelect,
    handleTechRemove,
    formData,
    handleFormChange
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

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

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-gray-900">Technologies</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Select up to {MAX_STACK_SELECTIONS} items
                    </p>
                </div>
                <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-medium border border-blue-100">
                    {selectedTech.length}/{MAX_STACK_SELECTIONS}
                </div>
            </div>

            {/* Selected Tags (Chips) */}
            <div className="min-h-[32px] flex flex-wrap gap-2">
                {selectedTech.length > 0 ? (
                    selectedTech.map(techName => {
                        const tech = TECH_STACK_CONFIG.find(t => t.name === techName);
                        return (
                            <button
                                key={techName}
                                onClick={() => handleTechRemove(techName)}
                                className="group flex items-center gap-2 pl-2 pr-1.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 shadow-sm hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all"
                            >
                                {tech?.icon && <img src={tech.icon} alt="" className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />}
                                <span>{techName}</span>
                                <div className="p-0.5 rounded-md group-hover:bg-red-100 transition-colors">
                                    <X size={10} />
                                </div>
                            </button>
                        );
                    })
                ) : (
                    <div className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 gap-2">
                        <LayoutGrid size={20} className="opacity-50" />
                        <span className="text-xs">No technologies selected</span>
                    </div>
                )}
            </div>

            {/* Search & Dropdown (Command Palette Style) */}
            <div className="relative" ref={dropdownRef}>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <Search size={16} />
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search languages, frameworks, tools..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsDropdownOpen(true)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block pl-10 p-3 transition-all placeholder:text-gray-400"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => { setSearchTerm(""); inputRef.current?.focus(); }}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl max-h-[320px] overflow-y-auto overflow-x-hidden animate-in fade-in zoom-in-95 duration-200 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                        {Object.entries(techCategories).map(([category, techs]) => (
                            <div key={category} className="mb-2 last:mb-0">
                                <div className="sticky top-0 bg-white/95 backdrop-blur px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 z-10 flex items-center gap-2">
                                    {category}
                                    <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded text-[9px]">{techs.length}</span>
                                </div>
                                <div className="p-1 grid grid-cols-1 gap-0.5">
                                    {techs.map(tech => {
                                        const isSelected = selectedTech.includes(tech.name);
                                        const isDisabled = !isSelected && selectedTech.length >= MAX_STACK_SELECTIONS;

                                        return (
                                            <button
                                                key={tech.name}
                                                onClick={() => {
                                                    handleTechSelect(tech.name);
                                                    inputRef.current?.focus();
                                                }}
                                                disabled={isDisabled}
                                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left rounded-lg transition-all group relative
                                                    ${isSelected
                                                        ? 'bg-blue-50 text-blue-700'
                                                        : isDisabled
                                                            ? 'opacity-40 cursor-not-allowed'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                                    }
                                                `}
                                            >
                                                <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${isSelected ? 'bg-white shadow-sm' : 'bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:shadow-sm'}`}>
                                                    <img src={tech.icon} alt="" className="w-4 h-4" />
                                                </div>
                                                <span className="flex-1 font-medium">{tech.name}</span>
                                                {isSelected && <Check size={14} className="text-blue-600" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                        {filteredTech.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                <p className="text-sm">No results found for "{searchTerm}"</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Customization Controls */}
            <div className="pt-6 border-t border-gray-100 space-y-5">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Appearance</label>
                </div>

                {/* Stack Style */}
                <div className="grid grid-cols-4 gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
                    {[
                        { id: 'glass', label: 'Glass' },
                        { id: 'solid-white', label: 'White' },
                        { id: 'solid-black', label: 'Black' },
                        { id: 'none', label: 'None' },
                    ].map(style => (
                        <button
                            key={style.id}
                            onClick={() => handleFormChange({ target: { name: 'techStackStyle', value: style.id } })}
                            className={`py-2 text-xs font-medium rounded-lg transition-all ${formData.techStackStyle === style.id
                                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                                }`}
                        >
                            {style.label}
                        </button>
                    ))}
                </div>

                {/* Icon Size Slider */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Sliders size={14} className="text-gray-400" />
                            Icon Size
                        </label>
                        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                            {formData.iconSize}px
                        </span>
                    </div>
                    <input
                        type="range"
                        min="16"
                        max="64"
                        step="4"
                        name="iconSize"
                        value={formData.iconSize || 32}
                        onChange={handleFormChange}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-medium px-1">
                        <span>16px</span>
                        <span>32px</span>
                        <span>48px</span>
                        <span>64px</span>
                    </div>
                </div>

                {/* Individual Toggle */}
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors group">
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.techStackIndividual || false}
                            onChange={(e) => handleFormChange({ target: { name: 'techStackIndividual', value: e.target.checked } })}
                            className="peer sr-only"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">Apply style to individual items</span>
                </label>
            </div>
        </div>
    );
};

export default TechStackSelector;
