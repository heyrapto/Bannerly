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

const initialFormState = {
    name: "",
    field: "",
    twitter: "",
    github: "",
    rgbabackground: "linear-gradient(to right, #4f46e5, #9333ea)",
};

const Editor = () => {
    const [formData, setFormData] = useLocalStorage("bannerFormData", initialFormState);
    const [selectedTech, setSelectedTech] = useLocalStorage("selectedTech", []);
    const [activeTool, setActiveTool] = useState('profile');
    const bannerRef = React.useRef(null);

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

    return (
        <EditorLayout
            onThemeSelect={handleThemeSelect}
            bannerRef={bannerRef}
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