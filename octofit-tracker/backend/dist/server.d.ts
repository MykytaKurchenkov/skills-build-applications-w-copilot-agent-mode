import { Express } from 'express';
declare const app: Express;
declare const PORT = 8000;
/**
 * Build API URL based on environment
 * Uses CODESPACE_NAME when available for Codespaces environment
 * Falls back to localhost for local development
 */
declare const getApiUrl: () => string;
declare const getEnvironment: () => "codespaces" | "local";
export { app, PORT, getApiUrl, getEnvironment };
//# sourceMappingURL=server.d.ts.map