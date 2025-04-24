const esbuild = require('esbuild');

const source = `
// 1. For direct replacement of free variables (must be undeclared)
console.log('BUILD_ENV:', BUILD_ENV);

// 2. For replacing constant values - use object properties
const config = {
  version: APP_VERSION,  // Will be replaced
  debug: DEBUG_MODE     // Will be replaced
};

console.log('Version:', config.version);
console.log('Debug mode:', config.debug);
`;

esbuild.build({
  stdin: { contents: source },
  bundle: true,
  write: false,
  define: {
    // 1. Replace free variables (no declarations)
    'BUILD_ENV': '"production"',
    
    // 2. Replace property values
    'APP_VERSION': '"1.2.3"',
    'DEBUG_MODE': 'false'
  }
}).then(result => {
  console.log('Transformed code:\n');
  console.log(result.outputFiles[0].text);
}).catch(err => {
  console.error('Build failed:', err);
});
