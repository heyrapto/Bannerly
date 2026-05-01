import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Link, Twitter, Linkedin, Facebook, Mail, Check } from 'lucide-react';

const ShareModal = ({ isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== 'undefined' ? window.location.href : 'https://snappify.com/view/demo';

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOptions = [
        { name: 'Twitter', icon: Twitter, color: 'bg-[#1DA1F2] text-white', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}` },
        { name: 'LinkedIn', icon: Linkedin, color: 'bg-[#0A66C2] text-white', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
        { name: 'Facebook', icon: Facebook, color: 'bg-[#1877F2] text-white', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
        { name: 'Email', icon: Mail, color: 'bg-gray-600 text-white', url: `mailto:?body=${encodeURIComponent(url)}` },
    ];

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
                                        Share Design
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Copy Link Section */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Project Link
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 truncate">
                                                {url}
                                            </div>
                                            <button
                                                onClick={handleCopy}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${copied
                                                        ? 'bg-green-50 text-green-600 border border-green-200'
                                                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {copied ? <Check size={16} /> : <Link size={16} />}
                                                {copied ? 'Copied' : 'Copy'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Social Share Grid */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Share to Socials
                                        </label>
                                        <div className="grid grid-cols-4 gap-4">
                                            {shareOptions.map((option) => (
                                                <a
                                                    key={option.name}
                                                    href={option.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex flex-col items-center gap-2 group"
                                                >
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:-translate-y-1 ${option.color}`}>
                                                        <option.icon size={20} />
                                                    </div>
                                                    <span className="text-xs text-gray-600 font-medium">{option.name}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ShareModal;
