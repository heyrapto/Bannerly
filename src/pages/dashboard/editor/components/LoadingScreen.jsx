import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white font-mono font-bold text-xl shadow-lg">
                    {`<>`}
                </div>
                <span className="font-bold text-gray-900 text-3xl tracking-tight">Bannerly</span>
            </div>

            {/* Spinner */}
            <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingScreen;
