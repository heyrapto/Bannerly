import React, { useState } from 'react';
import { X, Search, Upload, Image as ImageIcon, Smile, Hand, Box } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { uploadImage } from '../../../../utils/uploadImage';

// Mock Data for Library
const LIBRARY_CATEGORIES = [
    { id: 'dev', label: 'Developer Logos', icon: Box },
    { id: 'logos', label: 'Other Logos', icon: Box },
    { id: 'backgrounds', label: 'Backgrounds', icon: ImageIcon },
    { id: 'emojis', label: 'Emojis', icon: Smile },
    { id: 'hands', label: 'Hands', icon: Hand },
    { id: 'others', label: 'Others', icon: Box },
];

const MOCK_ASSETS = {
    dev: [
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg',
    ],
    backgrounds: [
        'linear-gradient(to right, #4f46e5, #9333ea)',
        'linear-gradient(to right, #ec4899, #8b5cf6)',
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80',
        'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80',
        'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=80',
        'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&q=80',
        'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    ]
};

const MediaLibraryModal = ({ isOpen, onClose, onSelect }) => {
    const [activeTab, setActiveTab] = useState('library');
    const [activeCategory, setActiveCategory] = useState('dev');
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const url = await uploadImage(file);
            if (url) {
                onSelect(url);
                onClose();
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const currentAssets = MOCK_ASSETS[activeCategory] || [];

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <Dialog.Title className="text-xl font-bold text-gray-900">Add Media</Dialog.Title>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex px-6 border-b border-gray-200">
                        <button
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'library' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('library')}
                        >
                            Library
                        </button>
                        <button
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'custom' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('custom')}
                        >
                            Custom Images <span className="ml-1 text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">PRO</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 overflow-hidden">
                        {activeTab === 'library' && (
                            <>
                                {/* Sidebar */}
                                <div className="w-64 border-r border-gray-200 overflow-y-auto p-4 space-y-1">
                                    {LIBRARY_CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeCategory === cat.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <span>{cat.label}</span>
                                            {activeCategory === cat.id && <div className="w-1 h-4 bg-blue-600 rounded-full" />}
                                        </button>
                                    ))}
                                </div>

                                {/* Main Area */}
                                <div className="flex-1 flex flex-col bg-gray-50">
                                    {/* Search */}
                                    <div className="p-4 border-b border-gray-200 bg-white">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder={`Search ${LIBRARY_CATEGORIES.find(c => c.id === activeCategory)?.label}...`}
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 rounded-lg text-sm transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Grid */}
                                    <div className="flex-1 overflow-y-auto p-6">
                                        <div className="grid grid-cols-4 gap-4">
                                            {currentAssets.map((asset, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        onSelect(asset);
                                                        onClose();
                                                    }}
                                                    className="aspect-square rounded-xl border border-gray-200 bg-white overflow-hidden hover:ring-2 hover:ring-blue-500 hover:shadow-md transition-all group relative"
                                                >
                                                    {asset.includes('gradient') || asset.startsWith('#') ? (
                                                        <div className="w-full h-full" style={{ background: asset }} />
                                                    ) : (
                                                        <div className="w-full h-full p-4 flex items-center justify-center">
                                                            <img src={asset} alt="" className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform" />
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                            {/* Placeholders for empty categories */}
                                            {currentAssets.length === 0 && (
                                                <div className="col-span-4 text-center py-10 text-gray-400">
                                                    No assets found in this category.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'custom' && (
                            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600">
                                    <Upload size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Upload your own images</h3>
                                <p className="text-gray-500 mb-8 max-w-md">
                                    Drag and drop your images here, or click to browse. Supported formats: PNG, JPG, SVG.
                                </p>
                                <label className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors shadow-lg shadow-blue-600/20">
                                    {isUploading ? 'Uploading...' : 'Browse Files'}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                                </label>
                            </div>
                        )}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default MediaLibraryModal;
