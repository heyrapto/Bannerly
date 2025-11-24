import React, { useState, useEffect } from 'react';
import { Monitor, X } from 'lucide-react';

const MobileWarningModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if mobile
        const isMobile = window.innerWidth < 768;
        // Check if already shown in this session
        const hasShown = sessionStorage.getItem('mobileWarningShown');

        if (isMobile && !hasShown) {
            setIsOpen(true);
            sessionStorage.setItem('mobileWarningShown', 'true');
        }
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative animate-in zoom-in-95 duration-300">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                        <Monitor size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900">Better on Desktop</h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                        For the best experience creating your banners, we recommend using Bannerly on a desktop or laptop computer.
                    </p>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
                    >
                        Continue Anyway
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileWarningModal;
