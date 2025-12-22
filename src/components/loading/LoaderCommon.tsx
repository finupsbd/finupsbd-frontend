"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type LoaderCommonProps = {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
};

export default function LoaderCommon({ 
  message = "Please wait......", 
  size = 'md',
  showProgress = true
}: LoaderCommonProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (showProgress) {
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 90 ? 90 : prev + 10)); // Simulate progress
      }, 300);
      return () => clearInterval(interval);
    }
  }, [showProgress]);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-gradient-to-br  dark:from-gray-900 dark:to-gray-800 transition-all duration-300"
      role="status"
      aria-label="Loading financial data"
    >
      <div className="flex flex-col items-center space-y-4 animate-fadeIn">
        {/* Animated Branding Element */}
        {/* <div className="relative animate-float">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
          <Loader2 
            className={`${sizeClasses[size]} animate-spin-fast text-green-500 dark:text-green-400`} 
            aria-hidden="true"
          />
        </div> */}

        {/* Contextual Message */}
        <p className="text-green-900 dark:text-blue-200 font-medium text-center max-w-xs">
          {message}
          <span className="animate-pulse duration-1000">...</span>
        </p>

        {/* Progress Indicator */}
        {showProgress && (
          <div className="w-48 bg-green-200 rounded-full h-2 dark:bg-green-700">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Security Assurance */}
        {/* <p className="text-sm text-blue-800/80 dark:text-blue-300/80 mt-4 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          <span>256-bit Encryption Active</span>
        </p> */}
      </div>
    </div>
  );
}

// Mock ShieldCheck icon - replace with actual icon component from your library
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);