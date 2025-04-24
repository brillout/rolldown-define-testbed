const fs = require('fs');
const esbuild = require('esbuild');

const sourceCode = `
// This pattern ensures esbuild will replace these constants
process.env.APP_VERSION;
process.env.DEBUG_MODE;
process.env.API_BASE_URL;

// Function using these variables
function initApp() {
  console.log('App version:', process.env.APP_VERSION);
  if (process.env.DEBUG_MODE === 'true') {
    console.log('Debug mode is enabled');
  }
  console.log('API base URL:', process.env.API_BASE_URL);
}

initApp();
`;

fs.writeFileSync('temp.js', sourceCode);

esbuild.build({
  entryPoints: ['temp.js'],
  bundle: true,
  write: false,
  define: {
    'process.env.APP_VERSION': JSON.stringify('1.2.3'),
    'process.env.DEBUG_MODE': JSON.stringify('false'),
    'process.env.API_BASE_URL': JSON.stringify('https://api.example.com')
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
