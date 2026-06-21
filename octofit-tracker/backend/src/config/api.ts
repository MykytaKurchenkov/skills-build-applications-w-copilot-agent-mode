/**
 * API URL Configuration for both Codespaces and localhost
 */

export const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    // Codespaces environment
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  // Localhost development
  return `http://localhost:8000`;
};

export const getEnvironment = (): 'codespaces' | 'local' => {
  return process.env.CODESPACE_NAME ? 'codespaces' : 'local';
};

export const getServerConfig = () => {
  return {
    port: 8000,
    host: '0.0.0.0', // Listen on all interfaces for Codespaces
    apiUrl: getApiUrl(),
    environment: getEnvironment(),
    isDevelopment: process.env.NODE_ENV !== 'production'
  };
};

export default {
  getApiUrl,
  getEnvironment,
  getServerConfig
};
