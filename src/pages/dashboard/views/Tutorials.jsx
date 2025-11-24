import React from 'react';
import { PlayCircle } from 'lucide-react';

const Tutorials = () => {
    const videos = [
        { id: 1, title: "Getting Started with Header.io", duration: "2:30", thumbnail: "bg-blue-100" },
        { id: 2, title: "Advanced Customization", duration: "5:45", thumbnail: "bg-purple-100" },
        { id: 3, title: "Exporting for Different Platforms", duration: "3:15", thumbnail: "bg-green-100" },
        { id: 4, title: "Using AI Assistant", duration: "4:20", thumbnail: "bg-orange-100" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Tutorials</h1>
                <p className="text-gray-500 mt-1">Learn how to make the most of Header.io.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map(video => (
                    <div key={video.id} className="group cursor-pointer">
                        <div className={`aspect-video rounded-xl ${video.thumbnail} mb-3 relative overflow-hidden`}>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                                <PlayCircle size={48} className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 duration-300" />
                            </div>
                            <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                                {video.duration}
                            </span>
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {video.title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tutorials;
