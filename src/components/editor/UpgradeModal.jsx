import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Zap, Check } from 'lucide-react';

const UpgradeModal = ({ isOpen, onClose }) => {
    const features = [
        "Remove Watermark from exports",
        "High-resolution downloads (4x)",
        "Premium templates & assets",
        "Priority support"
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-purple-100">
                                <div className="flex items-center justify-between mb-6">
                                    <Dialog.Title as="h3" className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                                            <Zap size={20} fill="currentColor" />
                                        </div>
                                        Upgrade to Pro
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                                        <p className="text-purple-900 font-medium mb-1">Unlock the full potential</p>
                                        <p className="text-sm text-purple-700">
                                            Get access to all premium features and remove branding from your exports.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3 text-sm text-gray-700">
                                                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                                                    <Check size={12} strokeWidth={3} />
                                                </div>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={onClose}
                                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Upgrade Now
                                        </button>
                                        <p className="text-center text-xs text-gray-500 mt-3">
                                            30-day money-back guarantee
                                        </p>
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

export default UpgradeModal;
