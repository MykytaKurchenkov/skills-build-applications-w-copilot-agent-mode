/**
 * API URL Configuration for both Codespaces and localhost
 */
export declare const getApiUrl: () => string;
export declare const getEnvironment: () => "codespaces" | "local";
export declare const getServerConfig: () => {
    port: number;
    host: string;
    apiUrl: string;
    environment: "codespaces" | "local";
    isDevelopment: boolean;
};
declare const _default: {
    getApiUrl: () => string;
    getEnvironment: () => "codespaces" | "local";
    getServerConfig: () => {
        port: number;
        host: string;
        apiUrl: string;
        environment: "codespaces" | "local";
        isDevelopment: boolean;
    };
};
export default _default;
//# sourceMappingURL=api.d.ts.map