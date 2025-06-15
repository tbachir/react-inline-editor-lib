/**
 * Modern design tokens for consistent theming
 */
export declare const designTokens: {
    readonly colors: {
        readonly primary: {
            readonly 50: "#eff6ff";
            readonly 100: "#dbeafe";
            readonly 500: "#3b82f6";
            readonly 600: "#2563eb";
            readonly 700: "#1d4ed8";
            readonly 900: "#1e3a8a";
        };
        readonly success: {
            readonly 50: "#ecfdf5";
            readonly 100: "#d1fae5";
            readonly 500: "#10b981";
            readonly 600: "#059669";
            readonly 700: "#047857";
        };
        readonly error: {
            readonly 50: "#fef2f2";
            readonly 100: "#fee2e2";
            readonly 500: "#ef4444";
            readonly 600: "#dc2626";
            readonly 700: "#b91c1c";
        };
        readonly neutral: {
            readonly 50: "#f9fafb";
            readonly 100: "#f3f4f6";
            readonly 200: "#e5e7eb";
            readonly 300: "#d1d5db";
            readonly 400: "#9ca3af";
            readonly 500: "#6b7280";
            readonly 600: "#4b5563";
            readonly 700: "#374151";
            readonly 800: "#1f2937";
            readonly 900: "#111827";
        };
    };
    readonly spacing: {
        readonly xs: "0.25rem";
        readonly sm: "0.5rem";
        readonly md: "1rem";
        readonly lg: "1.5rem";
        readonly xl: "2rem";
        readonly '2xl': "3rem";
    };
    readonly borderRadius: {
        readonly sm: "0.375rem";
        readonly md: "0.5rem";
        readonly lg: "0.75rem";
        readonly xl: "1rem";
        readonly full: "9999px";
    };
    readonly shadows: {
        readonly sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
        readonly md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
        readonly lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        readonly xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
    };
    readonly typography: {
        readonly fontFamily: {
            readonly sans: readonly ["Inter", "system-ui", "sans-serif"];
            readonly mono: readonly ["JetBrains Mono", "Consolas", "monospace"];
        };
        readonly fontSize: {
            readonly xs: readonly ["0.75rem", {
                readonly lineHeight: "1rem";
            }];
            readonly sm: readonly ["0.875rem", {
                readonly lineHeight: "1.25rem";
            }];
            readonly base: readonly ["1rem", {
                readonly lineHeight: "1.5rem";
            }];
            readonly lg: readonly ["1.125rem", {
                readonly lineHeight: "1.75rem";
            }];
            readonly xl: readonly ["1.25rem", {
                readonly lineHeight: "1.75rem";
            }];
        };
        readonly fontWeight: {
            readonly normal: "400";
            readonly medium: "500";
            readonly semibold: "600";
            readonly bold: "700";
        };
    };
    readonly animation: {
        readonly duration: {
            readonly fast: "150ms";
            readonly normal: "300ms";
            readonly slow: "500ms";
        };
        readonly easing: {
            readonly ease: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
            readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
            readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
    };
};
export type DesignTokens = typeof designTokens;
