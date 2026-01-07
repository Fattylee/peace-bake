import { useState, useCallback } from "react";

export function useCollapsibleView(
  initialState = {
    stats: false,
    charts: false,
    history: true,
  }
) {
  // ========================================================================
  // Initial State
  // ========================================================================
  // State
  // ========================================================================

  const [expandedSections, setExpandedSections] = useState(initialState);

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
    expandedSections,
    toggleSection,
  };
}
