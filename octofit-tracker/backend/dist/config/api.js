"use strict";
/**
 * API URL Configuration for both Codespaces and localhost
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerConfig = exports.getEnvironment = exports.getApiUrl = void 0;
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        // Codespaces environment
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    // Localhost development
    return `http://localhost:8000`;
};
exports.getApiUrl = getApiUrl;
const getEnvironment = () => {
    return process.env.CODESPACE_NAME ? 'codespaces' : 'local';
};
exports.getEnvironment = getEnvironment;
const getServerConfig = () => {
    return {
        port: 8000,
        host: '0.0.0.0', // Listen on all interfaces for Codespaces
        apiUrl: (0, exports.getApiUrl)(),
        environment: (0, exports.getEnvironment)(),
        isDevelopment: process.env.NODE_ENV !== 'production'
    };
};
exports.getServerConfig = getServerConfig;
exports.default = {
    getApiUrl: exports.getApiUrl,
    getEnvironment: exports.getEnvironment,
    getServerConfig: exports.getServerConfig
};
//# sourceMappingURL=api.js.map