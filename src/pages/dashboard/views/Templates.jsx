import React from 'react';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
    const navigate = useNavigate();

    const templates = [
        { id: 1, name: 'Modern Gradient', category: 'Social', preview: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' },
        { id: 2, name: 'Dark Developer', category: 'Dev', preview: '#1a1a1a' },
        { id: 3, name: 'Clean Minimal', category: 'Blog', preview: '#f3f4f6' },
        { id: 4, name: 'Startup Launch', category: 'Business', preview: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)' },
        { id: 5, name: 'Purple Haze', category: 'Creative', preview: 'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)' },
        { id: 6, name: 'Sunset Vibes', category: 'Personal', preview: 'linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
                <p className="text-gray-500 mt-1">Start with a professionally designed template.</p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'Social', 'Dev', 'Blog', 'Business', 'Creative'].map((cat) => (
                    <button
                        key={cat}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
                            ${cat === 'All'
                                ? 'bg-gray-900 text-white'
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        onClick={() => navigate('/editor')}
                        className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden cursor-pointer"
                    >
                        <div className="aspect-video w-full relative">
                            <div className="absolute inset-0" style={{ background: template.preview }}></div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                    Use Template
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-2 inline-block">
                                {template.category}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Templates;
