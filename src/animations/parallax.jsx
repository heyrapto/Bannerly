import { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxTransition = ({
  topSection,
  bottomSection,
  scrollDistance = 1500, 
}) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [totalHeight, setTotalHeight] = useState(scrollDistance);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Track viewport height for responsive calculations
  useLayoutEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  // measure bottom section height dynamically
  useLayoutEffect(() => {
    if (bottomRef.current && viewportHeight > 0) {
      // Container height should include viewport height for animation space
      // but we'll adjust positioning to prevent extra space in document flow
      const bottomHeight = bottomRef.current.offsetHeight;
      setTotalHeight(bottomHeight + viewportHeight);
    }
  }, [viewportHeight]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animations
  const topScale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.96, 0.96]);
  const topOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);
  // Start from viewport height below, end at natural position
  const bottomY = useTransform(scrollYProgress, [0, 1], ["100vh", "0%"]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ 
        // Height includes viewport for animation, but we'll use negative margin to offset
        height: `${totalHeight}px`,
        // Negative margin-bottom to cancel out the extra viewport height in document flow
        marginBottom: viewportHeight > 0 ? `-${viewportHeight}px` : 0
      }}
    >
      <motion.div
        className="sticky top-0 h-screen w-full z-1 transform-gpu"
        style={{ scale: topScale, opacity: topOpacity, willChange: "transform, opacity" }}
      >
        {topSection}
      </motion.div>

      <motion.div
        ref={bottomRef}
        className="absolute top-0 left-0 w-full z-2 transform-gpu"
        style={{ y: bottomY, willChange: "transform" }}
      >
        {bottomSection}
      </motion.div>
    </div>
  );
};

export default ParallaxTransition;