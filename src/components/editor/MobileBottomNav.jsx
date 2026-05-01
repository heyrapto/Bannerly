import React from 'react';
import { Plus, Layers, Settings, Download } from 'lucide-react';

const MobileBottomNav = ({ onOpenTools, onOpenLayers, onOpenSettings, onExport }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between z-50 pb-safe">
            <button onClick={onOpenTools} className="flex flex-col items-center gap-1 text-gray-600">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                    <Plus size={24} />
                </div>
                <span className="text-[10px] font-medium">Add</span>
            </button>

            <button onClick={onOpenLayers} className="flex flex-col items-center gap-1 text-gray-600">
                <Layers size={24} />
                <span className="text-[10px] font-medium">Layers</span>
            </button>

            <button onClick={onOpenSettings} className="flex flex-col items-center gap-1 text-gray-600">
                <Settings size={24} />
                <span className="text-[10px] font-medium">Edit</span>
            </button>

            <button onClick={onExport} className="flex flex-col items-center gap-1 text-gray-600">
                <Download size={24} />
                <span className="text-[10px] font-medium">Export</span>
            </button>
        </div>
    );
};

export default MobileBottomNav;
