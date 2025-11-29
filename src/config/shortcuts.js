export const SHORTCUTS_CONFIG = {
    general: {
        title: "General",
        items: [
            { label: "Open command menu", keys: ["⌘", "K"] },
            { label: "Undo", keys: ["⌘", "Z"] },
            { label: "Redo", keys: ["⌘", "Shift", "Z"] },
        ]
    },
    canvas: {
        title: "Canvas",
        items: [
            { label: "Zoom level", keys: ["⌘", "+", "/", "-"] },
            { label: "Horizontal scroll", keys: ["Shift", "Scroll"] },
        ]
    },
    selection: {
        title: "Selected Element",
        items: [
            { label: "Copy & Paste", keys: ["⌘", "C", "/", "V"] },
            { label: "Duplicate", keys: ["⌘", "D"] },
            { label: "Delete", keys: ["⌫"] },
            { label: "Move", keys: ["Arrows"] },
            { label: "Move fast", keys: ["Shift", "Arrows"] },
        ]
    },
    slides: {
        title: "Slides",
        items: [
            { label: "Next Slide", keys: ["→"] },
            { label: "Previous Slide", keys: ["←"] },
            { label: "New Slide", keys: ["⌘", "Enter"] },
        ]
    }
};
