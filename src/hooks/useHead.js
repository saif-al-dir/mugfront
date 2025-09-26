import { useEffect } from 'react';

export const useHead = (headElements) => {
    useEffect(() => {
        // Add elements to <head>
        headElements.forEach((element) => {
            if (typeof element === 'string') {
                // For simple text like title
                document.title = element;
            } else {
                // For meta, link, etc.
                const el = document.createElement(element.tag || 'meta');
                Object.entries(element.props || {}).forEach(([key, value]) => {
                    el.setAttribute(key, value);
                });
                if (element.content) el.content = element.content; // For <meta>
                document.head.appendChild(el);
            }
        });

        // Cleanup on unmount (optional but good practice)
        return () => {
            // Reverse to remove in order added
            headElements.forEach((element) => {
                if (typeof element !== 'string') {
                    const existing = document.querySelector(
                        `${element.tag || 'meta'}[${Object.entries(element.props || {}).map(([k, v]) => `${k}="${v}"`).join('][')}]`
                    );
                    if (existing) document.head.removeChild(existing);
                }
            });
            // Reset title if needed
            document.title = 'Default Title';
        };
    }, [headElements]); // Re-run if headElements change
};
