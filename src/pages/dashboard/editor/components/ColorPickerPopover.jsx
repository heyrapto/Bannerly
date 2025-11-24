import React, { useState, useEffect } from 'react';
import { X, Check, Clock, Grid, RotateCcw } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';

const PRESET_COLORS = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e',
    '#1f2937', '#4b5563', '#9ca3af', '#d1d5db', '#f3f4f6', '#ffffff', '#000000'
];

const PRESET_GRADIENTS = [
    'linear-gradient(to right, #4f46e5, #9333ea)',
    'linear-gradient(to right, #ec4899, #8b5cf6)',
    'linear-gradient(to right, #3b82f6, #10b981)',
    'linear-gradient(to right, #f59e0b, #ef4444)',
    'linear-gradient(to right, #06b6d4, #3b82f6)',
    'linear-gradient(to right, #8b5cf6, #d946ef)',
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
];

const ColorPickerPopover = ({ color, onChange, onClose }) => {
    const [activeTab, setActiveTab] = useState(color.includes('gradient') ? 'gradient' : 'solid');
    const [customColor, setCustomColor] = useState(color);
    const [opacity, setOpacity] = useState(100);
    const [angle, setAngle] = useState(90);

    useEffect(() => {
        setCustomColor(color);
        if (color.includes('gradient')) {
            setActiveTab('gradient');
        } else {
            setActiveTab('solid');
        }
    }, [color]);

    const handleColorChange = (newColor) => {
        setCustomColor(newColor);
        onChange(newColor);
    };

    const handleOpacityChange = (e) => {
        setOpacity(e.target.value);
        // Logic to apply opacity to hex/rgb would go here
        // For now, we'll just update state as a placeholder for the UI
    };

    const handleAngleChange = (e) => {
        const newAngle = e.target.value;
        setAngle(newAngle);
        if (customColor.includes('gradient')) {
            // Simple regex to replace angle in gradient string
            // This is a basic implementation; robust parsing would be better
            const updatedGradient = customColor.replace(/\d+deg/, `${newAngle}deg`);
            if (updatedGradient !== customColor) {
                handleColorChange(updatedGradient);
            }
        }
    };

    return (
        <div className="absolute z-50 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Snap Colors:</h3>
                <div className="flex gap-2">
                    <div className="w-6 h-6 rounded border border-gray-200" style={{ background: customColor }}></div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
                <button
                    className={`flex-1 pb-2 text-sm font-medium transition-colors ${activeTab === 'solid' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('solid')}
                >
                    Solid
                </button>
                <button
                    className={`flex-1 pb-2 text-sm font-medium transition-colors ${activeTab === 'gradient' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('gradient')}
                >
                    Gradient
                </button>
            </div>

            {/* Controls */}
            <div className="space-y-4 mb-4">
                {/* Opacity Slider */}
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-pink-300"></div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={opacity}
                        onChange={handleOpacityChange}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-400"
                    />
                    <div className="w-4 h-4 rounded bg-yellow-100 border border-gray-200"></div>
                </div>

                {/* Angle Slider (Gradient only) */}
                {activeTab === 'gradient' && (
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-gray-700">Degrees</label>
                        <div className="flex items-center gap-2 flex-1 mx-3">
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={angle}
                                onChange={handleAngleChange}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                        <span className="text-xs text-gray-400 w-8 text-right">{angle}°</span>
                    </div>
                )}

                {/* Hex Input */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={customColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder={activeTab === 'solid' ? '#FFFFFF' : 'linear-gradient...'}
                    />
                    <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-xs font-medium rounded-md transition-colors">
                        Apply
                    </button>
                </div>
            </div>

            {/* Presets */}
            <div>
                <div className="flex items-center gap-4 mb-2 border-b border-gray-100 pb-2">
                    <button className="text-gray-400 hover:text-gray-600"><Clock size={14} /></button>
                    <button className="text-blue-600 border-b-2 border-blue-600 pb-2 -mb-2.5"><Grid size={14} /></button>
                </div>

                <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1">
                    {activeTab === 'solid' ? (
                        PRESET_COLORS.map(c => (
                            <button
                                key={c}
                                onClick={() => handleColorChange(c)}
                                className="w-8 h-8 rounded-lg border border-gray-100 hover:scale-110 transition-transform shadow-sm"
                                style={{ background: c }}
                            />
                        ))
                    ) : (
                        PRESET_GRADIENTS.map((g, i) => (
                            <button
                                key={i}
                                onClick={() => handleColorChange(g)}
                                className="w-8 h-8 rounded-lg border border-gray-100 hover:scale-110 transition-transform shadow-sm"
                                style={{ background: g }}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ColorPickerPopover;
