import { app, PORT, getApiUrl, getEnvironment } from './server';

// Start server on all interfaces for Codespaces compatibility
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 OctoFit Tracker API`);
  console.log(`   Environment: ${getEnvironment()}`);
  console.log(`   Port: ${PORT}`);
  console.log(`   API URL: ${getApiUrl()}`);
  console.log(`   Health Check: ${getApiUrl()}/api/health\n`);
});
