"use client";

import React, { useState, useEffect } from "react";

export function InteractiveWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-64 w-full bg-surface/20 border border-header-border rounded-sm animate-pulse flex items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-accent/40 animate-ping" />
      </div>
    );
  }

  return <>{children}</>;
}
