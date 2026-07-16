// components/dc-map/DcMapPlateActivator.tsx
//
// Thin client component that sets/clears the body[data-dcm-plate="1"]
// attribute when the DC Map page mounts/unmounts.
//
// Why a separate component: page.tsx must remain a Server Component
// (for metadata/SEO) but useEffect requires "use client". This small
// activator is the only client boundary needed — DcMapExperience is
// already client-only and handles all interactivity independently.
"use client";

import { useEffect } from "react";

export default function DcMapPlateActivator() {
  useEffect(() => {
    // Activate plate mode: CSS hides SVG artwork, shows PNG master plate
    document.body.dataset.dcmPlate = "1";
    return () => {
      // Clean up when navigating away so other pages are unaffected
      delete document.body.dataset.dcmPlate;
    };
  }, []);

  // Renders nothing — side-effect only
  return null;
}
