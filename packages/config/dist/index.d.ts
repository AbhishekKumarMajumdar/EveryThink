declare const sharedTailwindThemes: {
    readonly colors: {
        readonly brand: {
            readonly DEFAULT: "#2563eb";
            readonly foreground: "#f5f5f5";
        };
        readonly accent: {
            readonly DEFAULT: "#f97316";
            readonly foreground: "#0a0a0a";
        };
    };
    readonly borderRadius: {
        readonly md: "0.5rem";
        readonly lg: "0.75rem";
        readonly full: "9999px";
    };
};
type SharedTailwindThemes = typeof sharedTailwindThemes;

export { type SharedTailwindThemes, sharedTailwindThemes };
