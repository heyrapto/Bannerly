import React, { useState, useCallback } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { TECH_STACK_CONFIG } from "../../../config/techStack";
import { MAX_STACK_SELECTIONS } from "../../../constants";
import EditorLayout from "./components/EditorLayout";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import PropertiesPanel from "./components/PropertiesPanel";
import BannerCard from "./components/BannerCard";
import { PRESET_THEMES, PATTERN_STYLES } from "./constants";
import LoadingScreen from "./components/LoadingScreen";

const initialFormState = {
    name: "",
    field: "",
    twitter: "",
    github: "",
    rgbabackground: "linear-gradient(to right, #4f46e5, #9333ea)",
    layout: "standard",
};

const Editor = () => {
    // State for multiple slides
    const [slides, setSlides] = useLocalStorage("bannerSlides", [{
        id: crypto.randomUUID(),
        data: initialFormState
    }]);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const [selectedTech, setSelectedTech] = useLocalStorage("selectedTech", []);
    const [activeTool, setActiveTool] = useState('profile');
    const bannerRef = React.useRef(null);

    // Get current slide data
    const activeSlide = slides[activeSlideIndex] || slides[0];
    const formData = activeSlide.data;

    // Update current slide data
    const setFormData = useCallback((newDataOrFn) => {
        setSlides(prevSlides => {
            const newSlides = [...prevSlides];
            const currentSlide = newSlides[activeSlideIndex];

            const newData = typeof newDataOrFn === 'function'
                ? newDataOrFn(currentSlide.data)
                : newDataOrFn;

            newSlides[activeSlideIndex] = {
                ...currentSlide,
                data: newData
            };
            return newSlides;
        });
    }, [activeSlideIndex, setSlides]);

    // Slide Handlers
    const handleAddSlide = () => {
        setSlides(prev => [
            ...prev,
            { id: crypto.randomUUID(), data: initialFormState }
        ]);
        setActiveSlideIndex(prev => prev + 1);
    };

    const handleRemoveSlide = (e, index) => {
        e.stopPropagation();
        if (slides.length <= 1) return; // Don't delete last slide

        setSlides(prev => prev.filter((_, i) => i !== index));
        if (activeSlideIndex >= index && activeSlideIndex > 0) {
            setActiveSlideIndex(prev => prev - 1);
        }
    };

    const handleSelectSlide = (index) => {
        setActiveSlideIndex(index);
    };

    const handleTechSelect = useCallback((techName) => {
        setSelectedTech(prev => {
            if (prev.includes(techName)) {
                return prev.filter(tech => tech !== techName);
            }
            if (prev.length >= MAX_STACK_SELECTIONS) {
                return prev;
            }
            return [...prev, techName];
        });
    }, [setSelectedTech]);

    const handleTechRemove = useCallback((techName) => {
        setSelectedTech(prev => prev.filter(tech => tech !== techName));
    }, [setSelectedTech]);

    const handleThemeSelect = (themeValue) => {
        setFormData(prev => ({ ...prev, rgbabackground: themeValue }));
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <EditorLayout
            onThemeSelect={handleThemeSelect}
            bannerRef={bannerRef}
            slides={slides}
            activeSlideIndex={activeSlideIndex}
            onAddSlide={handleAddSlide}
            onRemoveSlide={handleRemoveSlide}
            onSelectSlide={handleSelectSlide}
            sidebar={
                <Sidebar
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                />
            }
            canvas={
                <Canvas bannerRef={bannerRef}>
                    <BannerCard
                        formData={formData}
                        setFormData={setFormData}
                        selectedTech={selectedTech}
                        availableLanguages={TECH_STACK_CONFIG}
                    />
                </Canvas>
            }
            properties={
                <PropertiesPanel
                    activeTool={activeTool}
                    formData={formData}
                    setFormData={setFormData}
                    selectedTech={selectedTech}
                    handleTechSelect={handleTechSelect}
                    handleTechRemove={handleTechRemove}
                />
            }
        />
    );
};

export default Editor;