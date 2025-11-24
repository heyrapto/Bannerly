import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { SHORTCUTS_CONFIG } from '../../../../config/shortcuts';

const ShortcutsModal = ({ isOpen, onClose }) => {
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
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <Dialog.Title as="h3" className="text-xl font-bold text-gray-900">
                                        Keyboard shortcuts
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                    {Object.entries(SHORTCUTS_CONFIG).map(([key, section]) => (
                                        <div key={key}>
                                            <h4 className="text-sm font-semibold text-gray-900 mb-4">{section.title}</h4>
                                            <div className="space-y-3">
                                                {section.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-600 border-b border-dotted border-gray-300 pb-0.5">{item.label}</span>
                                                        <div className="flex items-center gap-1">
                                                            {item.keys.map((k, kIdx) => (
                                                                <kbd
                                                                    key={kIdx}
                                                                    className={`
                                                                        px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-md
                                                                        ${k === '/' ? 'border-none bg-transparent px-0 text-gray-400' : 'shadow-sm'}
                                                                    `}
                                                                >
                                                                    {k}
                                                                </kbd>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ShortcutsModal;
