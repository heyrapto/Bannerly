import { useState, useEffect, useRef } from "react";

const RAW_TEXT =
    "Great design opens doors 🚪 and we will help you unlock them 🔓 with intuitive tools 🤖 crafted for clarity, creativity 🎨 and impact 💥 We create for people ❤️ to help you share your story, grow your presence, and inspire others 🌟";

const WORDS = RAW_TEXT.split(" ").filter(Boolean);
const SCROLL_HEIGHT = "400vh";

export default function MissionSection() {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
            "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap";
        document.head.appendChild(link);

        const onScroll = () => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const totalScrollable = el.offsetHeight - window.innerHeight;
            const scrolled = -rect.top;
            setProgress(Math.max(0, Math.min(1, scrolled / totalScrollable)));
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div>
            <div
                ref={containerRef}
                style={{ height: SCROLL_HEIGHT, position: "relative" }}
            >
                <div
                    style={{
                        position: "sticky",
                        top: 0,
                        height: "100vh",
                        background: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 2rem",
                        overflow: "hidden",
                    }}
                >
                    <div className="text-center mb-16">
                        <h3 className="text-lg font-medium text-neutral-800">Header.io Manifesto</h3>
                    </div>

                    {/* Revealed text */}
                    <p
                        style={{
                            fontSize: "clamp(1.75rem, 4vw, 3.75rem)",
                            lineHeight: 1.45,
                            textAlign: "center",
                            maxWidth: "880px",
                            margin: 0,
                            fontWeight: 500,
                        }}
                    >
                        {WORDS.map((word, i) => {
                            const start = i / WORDS.length;
                            const end = (i + 1) / WORDS.length;
                            const wp = Math.max(0, Math.min(1, (progress - start) / (end - start)));
                            const opacity = 0.07 + wp * 0.93;
                            return (
                                <span
                                    key={i}
                                    style={{
                                        opacity,
                                        display: "inline",
                                        transition: "opacity 80ms linear",
                                    }}
                                >
                                    {word}
                                    {i < WORDS.length - 1 ? " " : ""}
                                </span>
                            );
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}