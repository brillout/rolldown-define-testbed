const fs = require('fs');
const esbuild = require('esbuild');

const sourceCode = `
// Variables that will be replaced by esbuild define
const APP_VERSION = '0.0.0';
const DEBUG_MODE = true;
const API_BASE_URL = 'http://localhost:3000';

// Function using these variables
function initApp() {
  console.log('App version:', APP_VERSION);
  if (DEBUG_MODE) {
    console.log('Debug mode is enabled');
  }
  console.log('API base URL:', API_BASE_URL);
}

initApp();
`;

fs.writeFileSync('temp.js', sourceCode);

esbuild.build({
  entryPoints: ['temp.js'],
  bundle: true,
  write: false,  // Don't write to file, we'll handle output
  define: {
    'APP_VERSION': JSON.stringify('1.2.3'),  // Proper string replacement
    'DEBUG_MODE': 'false',                  // Boolean replacement
    'API_BASE_URL': JSON.stringify('https://api.example.com')
  },
}).then((result) => {
  console.log('Build complete.');
  console.log('Original code:');
  console.log(sourceCode);
  
  const output = result.outputFiles[0].text;
  console.log('\nTransformed code:');
  console.log(output);
  
  fs.unlinkSync('temp.js');
}).catch((err) => {
  console.error('Build failed:', err);
  fs.unlinkSync('temp.js');
});
