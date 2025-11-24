import React, { Fragment, useState } from 'react';
import { LayoutDashboard, Palette, Download, Share2, MonitorPlay, Keyboard, User, ChevronDown, Image as ImageIcon, Copy, FileText, Video, Lock } from 'lucide-react';
import { Menu, Transition, Popover } from '@headlessui/react';
import { PRESET_THEMES } from '../constants';
import { downloadImage } from '../../../../utils/downloadImage';
import ShortcutsModal from './ShortcutsModal';
import ShareModal from './ShareModal';
import SignInModal from '../../../../components/auth/SignInModal';
import { useAuth } from '../../../../context/AuthContext';
import { useToast } from '../../../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ onThemeSelect, bannerRef }) => {
    const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const { user, logout } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleExport = async (scale) => {
        if (!bannerRef || !bannerRef.current) {
            console.error("Export failed: Banner element not found (ref is null)");
            alert("Could not find banner element to export. Please try again.");
            return;
        }

        try {
            console.log(`Starting export at ${scale}x scale...`);
            await downloadImage(bannerRef.current, 'png', scale);
            console.log("Export completed successfully");
        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export image. See console for details.");
        }
    };

    const handleShare = () => {
        // Mock share functionality
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert("Link copied to clipboard!");
        }).catch(() => {
            alert("Failed to copy link.");
        });
    };

    return (
        <header className="h-16 flex items-center justify-between px-4 z-40 relative">
            {/* Left: Logo & Navigation */}
            <div className="flex items-center gap-6 cursor-pointer">
                <div className="flex items-center" onClick={() => navigate("/")}>
                    <img src="/logo.svg" width={50} alt="" />
                    <span className="font-bold text-neutral-700 text-lg hidden md:block">headerio</span>
                </div>

                <div className="hidden md:flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors" onClick={() => navigate("/dashboard")}>
                        <div className="w-5 h-5 bg-purple-100 text-purple-600 rounded flex items-center justify-center">
                            <LayoutDashboard size={14} />
                        </div>
                        Dashboard
                    </button>
                    <div className="w-px h-4 bg-gray-200 mx-1"></div>

                    {/* Theme Dropdown */}
                    <Popover className="relative">
                        <Popover.Button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors outline-none">
                            <div className="w-5 h-5 bg-orange-100 text-orange-600 rounded flex items-center justify-center">
                                <Palette size={14} />
                            </div>
                            Theme
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">Themes</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {PRESET_THEMES.slice(0, 6).map((theme) => (
                                        <button
                                            key={theme.id}
                                            onClick={() => onThemeSelect && onThemeSelect(theme.value)}
                                            className="aspect-video rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 transition-all relative group"
                                        >
                                            <div className="w-full h-full" style={{ background: theme.value }}></div>
                                            {/* Mini Window Preview */}
                                            <div className="absolute inset-2 bg-gray-900/80 rounded flex flex-col p-1 gap-1 opacity-80">
                                                <div className="flex gap-0.5">
                                                    <div className="w-1 h-1 rounded-full bg-red-500"></div>
                                                    <div className="w-1 h-1 rounded-full bg-yellow-500"></div>
                                                    <div className="w-1 h-1 rounded-full bg-green-500"></div>
                                                </div>
                                                <div className="w-full h-1 bg-gray-700 rounded-full"></div>
                                                <div className="w-2/3 h-1 bg-gray-700 rounded-full"></div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                </div>
            </div>

            {/* Center: Actions */}
            <div className="flex items-center gap-3">
                {/* Export Dropdown */}
                <Menu as="div" className="relative hidden md:block">
                    <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                        <Download size={16} />
                        Export
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 focus:outline-none z-50 py-1 divide-y divide-gray-100">
                            <div className="p-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button onClick={() => handleExport(2)} className={`${active ? 'bg-gray-50' : ''} group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700`}>
                                            <div className="flex items-center gap-3">
                                                <ImageIcon size={16} className="text-gray-500" />
                                                Download
                                            </div>
                                            <div className="flex bg-gray-100 rounded p-0.5" onClick={(e) => e.stopPropagation()}>
                                                <span onClick={() => handleExport(1)} className="px-1.5 py-0.5 text-xs font-medium text-gray-500 hover:bg-white hover:text-gray-900 rounded cursor-pointer">1x</span>
                                                <span onClick={() => handleExport(2)} className="px-1.5 py-0.5 text-xs font-medium bg-white text-blue-600 shadow-sm rounded cursor-pointer">2x</span>
                                                <span onClick={() => handleExport(4)} className="px-1.5 py-0.5 text-xs font-medium text-gray-500 hover:bg-white hover:text-gray-900 rounded cursor-pointer">4x</span>
                                            </div>
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className={`${active ? 'bg-gray-50' : ''} group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700`}>
                                            <Copy size={16} className="text-gray-500" />
                                            Copy to clipboard
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="p-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className={`${active ? 'bg-gray-50' : ''} group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed`}>
                                            <div className="flex items-center gap-3">
                                                <FileText size={16} className="text-gray-500" />
                                                Download PDF
                                            </div>
                                            <Lock size={12} className="text-gray-400" />
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className={`${active ? 'bg-gray-50' : ''} group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed`}>
                                            <div className="flex items-center gap-3">
                                                <Video size={16} className="text-gray-500" />
                                                Export Video
                                            </div>
                                            <span className="text-[10px] font-bold bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">BETA</span>
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>

                <button
                    onClick={() => setIsShareOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                    <Share2 size={16} />
                    <span className="hidden md:inline">Share</span>
                </button>
                <button
                    onClick={() => alert("Presentation mode coming soon!")}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                    <MonitorPlay size={16} />
                    Present
                </button>
            </div >

            {/* Right: User & Upgrade */}
            < div className="flex items-center gap-4" >
                {!user ? (
                    <button
                        onClick={() => setIsSignInOpen(true)}
                        className="hidden md:flex px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm items-center gap-1"
                    >
                        <span className="text-yellow-300">✨</span> Upgrade
                    </button>
                ) : (
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">
                        <span className="text-yellow-500">★</span> Pro Plan
                    </div>
                )}

                <div className="hidden md:block h-8 w-px bg-gray-200"></div>

                <button
                    onClick={() => setIsShortcutsOpen(true)}
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <Keyboard size={16} />
                    Shortcuts
                </button>

                <button className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors overflow-hidden">
                    {user ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <User size={18} />
                    )}
                </button>
            </div >

            {/* Modals */}
            <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
            <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
            <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
        </header >
    );
};

export default Header;
