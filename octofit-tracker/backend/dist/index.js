"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
// Start server on all interfaces for Codespaces compatibility
server_1.app.listen(server_1.PORT, '0.0.0.0', () => {
    console.log(`\n🚀 OctoFit Tracker API`);
    console.log(`   Environment: ${(0, server_1.getEnvironment)()}`);
    console.log(`   Port: ${server_1.PORT}`);
    console.log(`   API URL: ${(0, server_1.getApiUrl)()}`);
    console.log(`   Health Check: ${(0, server_1.getApiUrl)()}/api/health\n`);
});
//# sourceMappingURL=index.js.map