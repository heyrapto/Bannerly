import { useEffect, useRef } from 'react';
import { animateTextReveal } from '../../animations/textReveal';

const MissionSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const cleanup = animateTextReveal(sectionRef.current, textRef.current);
        return cleanup;
    }, []);

    const text = "Great design opens doors 🚪 and we will help you unlock them 🔓 with intuitive tools 🤖 crafted for clarity, creativity 🎨 and impact 💥 We create for people ❤️ to help you share your story, grow your presence, and inspire others 🌟";

    const parts = text.split(/(🚪|🔓|🤖|🎨|💥|❤️|🌟)/g);

    return (
        <section ref={sectionRef} className="w-screen bg-white">
            <div className="max-w-[1440px] mx-auto px-6 py-32">
                <div className="text-center mb-16">
                    <h3 className="text-lg font-medium text-neutral-800">Header.io Manifesto</h3>
                </div>

                <div ref={textRef} className="text-center max-w-5xl mx-auto">
                    <p className="text-3xl md:text-6xl lg:text-7xl font-medium leading-tight">
                        {parts.map((part, index) => {
                            if (/[\u{1F300}-\u{1F9FF}]/u.test(part)) {
                                return (
                                    <span
                                        key={index}
                                        className="char inline-block mx-2"
                                    >
                                        {part}
                                    </span>
                                );
                            }

                            return part.split('').map((char, charIndex) => (
                                <span
                                    key={`${index}-${charIndex}`}
                                    className="char inline-block"
                                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                                >
                                    {char}
                                </span>
                            ));
                        })}

                    </p>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
