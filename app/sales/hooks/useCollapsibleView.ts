import { useState, useCallback, useEffect } from "react";

export function useCollapsibleView(
  initialState = {
    stats: false,
    charts: false,
    history: true,
  }
) {
  // ========================================================================
  // State
  // ========================================================================

  const [isMobile, setIsMobile] = useState(false);
  const [expandedSections, setExpandedSections] = useState(initialState);

  // ========================================================================
  // Effects
  // ========================================================================

  useEffect(() => {
    // Check initial screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();

    // Listen for window resize
    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ========================================================================
  // Handlers
  // ========================================================================

  const toggleSection = useCallback(
    (section: keyof typeof expandedSections) => {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    },
    []
  );

  // ========================================================================
  // Return
  // ========================================================================

  return {
    isMobile,
    expandedSections,
    toggleSection,
  };
}
