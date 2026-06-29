interface Window {
    // Chrome WebView properties
    chrome: {
        webview: {
            postMessage: (message: string) => void;
            // Add other webview methods as needed
            addEventListener: (type: string, listener: (event: MessageEvent) => void) => void;
            removeEventListener: (type: string, listener: (event: MessageEvent) => void) => void;
        };
        // oxlint-disable-next-line typescript/no-explicit-any
        runtime: any; // Chrome extension runtime
    };
}
