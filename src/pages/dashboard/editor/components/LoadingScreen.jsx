const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 mb-8">
                <img src="/logo.svg" width={100} alt="" />
                <span className="font-bold text-neutral-700 text-lg hidden md:block -ml-6">Header.io</span>
            </div>


            {/* Spinner */}
            <div className="w-20 h-20 border-2 border-gray-100 border-t-neutral-600 rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingScreen;
