import { gsap } from "gsap";
import { useState, useRef, useEffect, memo, useCallback } from "react";

const VideoPreview = memo(({ children }) => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // Memoize handleMouseMove since it's a complex calculation
  const handleMouseMove = useCallback(
    ({ clientX, clientY, currentTarget }) => {
      const rect = currentTarget.getBoundingClientRect();
      const xOffset = clientX - (rect.left + rect.width / 2);
      const yOffset = clientY - (rect.top + rect.height / 2);

      if (isHovering) {
        gsap.to(sectionRef.current, {
          x: xOffset,
          y: yOffset,
          rotationY: xOffset / 2,
          rotationX: -yOffset / 2,
          transformPerspective: 500,
          duration: 1,
          ease: "power1.out",
        });

        gsap.to(contentRef.current, {
          x: -xOffset,
          y: -yOffset,
          duration: 1,
          ease: "power1.out",
        });
      }
    },
    [isHovering]
  ); // Only recreate when isHovering changes

  // Memoize hover handlers
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    if (!isHovering) {
      const resetAnimation = {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: "power1.out",
      };

      gsap.to(sectionRef.current, resetAnimation);
      gsap.to(contentRef.current, resetAnimation);
    }
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{ perspective: "500px" }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </section>
  );
});

// Add display name for debugging
VideoPreview.displayName = "VideoPreview";

export default VideoPreview;
