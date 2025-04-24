import * as esbuild from 'esbuild';
import assert from 'assert';

// Step 1: Input code (string)
const inputCode = `
  if (__DEV__) {
    console.log('Dev mode');
  } else {
    console.log('Prod mode');
  }
`;

// Step 2: Transform with esbuild
const result = await esbuild.transform(inputCode, {
  loader: 'ts',
  define: {
    __DEV__: 'false',
  },
  minify: true,
  bundle: false,
});

// Step 3: Inspect output
const output = result.code;
console.log('Bundled Output:\n' + output);

// Step 4: Assertions
assert(!output.includes('__DEV__'), 'Global should be replaced');
assert(output.includes('"Prod mode"'), 'Should contain prod log');
assert(!output.includes('"Dev mode"'), 'Should not contain dev log');

console.log('✅ define replacement test passed!');
