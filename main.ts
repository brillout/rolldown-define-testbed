import * as esbuild from 'esbuild';
import assert from 'assert';

// Step 1: Define input code
const inputCode = `
  function test(someObj) {
    if (someObj.__DEV__) {
      console.log('Dev mode');
    } else {
      console.log('Prod mode');
    }
  }
`;

// Step 2: Transform using esbuild
const result = await esbuild.transform(inputCode, {
  loader: 'ts',
  define: {
    'someObj.__DEV__': 'false',
  },
  minify: true,
});

// Step 3: Inspect & assert
const output = result.code;
console.log('Transformed Output:\n' + output);

// Step 4: Assertions
assert(!output.includes('__DEV__'), 'Global should be replaced');
assert(output.includes('"Prod mode"'), 'Should contain prod log');
assert(!output.includes('"Dev mode"'), 'Should not contain dev log');

console.log('✅ define replacement test passed!');
