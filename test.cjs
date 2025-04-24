// Test file for esbuild define functionality
const fs = require('fs');
const esbuild = require('esbuild');

// Original source code with variables to replace
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

// Write the source to a temporary file
fs.writeFileSync('temp.js', sourceCode);

// Build with esbuild using define to replace variables
esbuild.build({
  entryPoints: ['temp.js'],
  bundle: true,
  outfile: 'out.js',
  define: {
    'APP_VERSION': '"1.2.3"',          // Replace with string "1.2.3"
    'DEBUG_MODE': 'false',              // Replace with boolean false
    'API_BASE_URL': '"https://api.example.com"' // Replace with production URL
  },
}).then(() => {
  console.log('Build complete. Output in out.js');
  console.log('Original code:');
  console.log(sourceCode);
  
  // Show the transformed output
  const output = fs.readFileSync('out.js', 'utf-8');
  console.log('\nTransformed code:');
  console.log(output);
  
  // Clean up
  fs.unlinkSync('temp.js');
}).catch((err) => {
  console.error('Build failed:', err);
  fs.unlinkSync('temp.js');
});
