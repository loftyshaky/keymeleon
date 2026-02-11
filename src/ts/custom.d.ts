declare module '*.svg' {
    const content: string;
    export default content;
}

interface Window {
    // Chrome WebView properties
    chrome: {
        webview: {
            postMessage: (message: string) => void;
            // Add other webview methods as needed
            addEventListener: (type: string, listener: (event: MessageEvent) => void) => void;
            removeEventListener: (type: string, listener: (event: MessageEvent) => void) => void;
        };
        runtime: any; // Chrome extension runtime
    };
}
