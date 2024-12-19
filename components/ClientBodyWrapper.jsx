"use client";
import { useEffect } from "react";

export default function ClientBodyWrapper({ children }) {
  useEffect(() => {
    // Remove Grammarly attributes on mount
    const body = document.querySelector('body');
    body.removeAttribute('data-new-gr-c-s-check-loaded');
    body.removeAttribute('data-gr-ext-installed');
  }, []);

  return children;
} 