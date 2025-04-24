import * as esbuild from 'esbuild';
import fs from 'fs';
import assert from 'assert';

// Step 1: Write a sample input file
const inputPath = './input.js';
fs.writeFileSync(inputPath, `
  if (__DEV__) {
    console.log('Dev mode');
  } else {
    console.log('Prod mode');
  }
`);

// Step 2: Bundle using esbuild with define
await esbuild.build({
  entryPoints: [inputPath],
  bundle: true,
  define: {
    __DEV__: 'false', // Replace global
  },
  outfile: './out.js',
  write: true,
});

// Step 3: Capture the output
const output = fs.readFileSync('./out.js', 'utf8');

// Step 4: Assert replacement happened
assert(!output.includes('__DEV__'), 'Global should be replaced');
assert(output.includes('"Prod mode"'), 'Should contain prod log');
assert(!output.includes('"Dev mode"'), 'Should not contain dev log');

console.log('✅ define replacement test passed!');
