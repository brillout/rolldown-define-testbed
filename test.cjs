const esbuild = require('esbuild');

// Test case showing both patterns
const source = `
// 1. Free variable replacement (identifier)
console.log('BUILD_ENV:', BUILD_ENV);

// 2. Literal value replacement
const APP_VERSION = '0.0.0';  // Will match literal '0.0.0'
const DEBUG = true;          // Will match literal 'true'
`;

esbuild.build({
  stdin: { contents: source },
  bundle: true,
  write: false,
  define: {
    // 1. Free variable pattern (identifier)
    'BUILD_ENV': JSON.stringify('production'),
    
    // 2. Literal value pattern (exact match)
    "'0.0.0'": JSON.stringify('1.2.3'),  // Note the extra quotes
    'true': 'false'
  },
}).then(result => {
  console.log(result.outputFiles[0].text);
});
