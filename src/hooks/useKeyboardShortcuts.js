import { useEffect } from 'react';

export const useKeyboardShortcuts = ({
    onSave,
    onUndo,
    onRedo,
    onCopy,
    onPaste,
    onDelete,
    onNewSlide,
    onDuplicateSlide,
    onPresent
}) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Check for modifier keys (Cmd on Mac, Ctrl on Windows)
            const isMod = e.metaKey || e.ctrlKey;
            const isShift = e.shiftKey;

            // Save: Cmd+S
            if (isMod && e.key === 's') {
                e.preventDefault();
                onSave && onSave();
            }

            // Undo: Cmd+Z
            if (isMod && !isShift && e.key === 'z') {
                e.preventDefault();
                onUndo && onUndo();
            }

            // Redo: Cmd+Shift+Z or Cmd+Y
            if ((isMod && isShift && e.key === 'z') || (isMod && e.key === 'y')) {
                e.preventDefault();
                onRedo && onRedo();
            }

            // Copy: Cmd+C (handled natively mostly, but good for custom objects)
            if (isMod && e.key === 'c') {
                // e.preventDefault(); // Don't prevent default copy for text
                onCopy && onCopy();
            }

            // Paste: Cmd+V
            if (isMod && e.key === 'v') {
                // e.preventDefault(); // Don't prevent default paste for text
                onPaste && onPaste();
            }

            // Delete / Backspace
            if (e.key === 'Delete' || e.key === 'Backspace') {
                // Only delete if not typing in an input
                if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                    onDelete && onDelete();
                }
            }

            // New Slide: Cmd+Shift+N (or similar) - Let's use Cmd+Option+N or just check config
            // For now, let's assume standard shortcuts

            // Present: Cmd+Enter or F5
            if ((isMod && e.key === 'Enter') || e.key === 'F5') {
                e.preventDefault();
                onPresent && onPresent();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onSave, onUndo, onRedo, onCopy, onPaste, onDelete, onNewSlide, onDuplicateSlide, onPresent]);
};
