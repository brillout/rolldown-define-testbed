import * as esbuild from 'esbuild';
import fs from 'fs';
import assert from 'assert';

// Step 1: Write input
const inputPath = './input.js';
fs.writeFileSync(inputPath, `
  if (__DEV__) {
    console.log('Dev mode');
  } else {
    console.log('Prod mode');
  }
`);

// Step 2: Build with define + minify
await esbuild.build({
  entryPoints: [inputPath],
  bundle: true,
  define: {
    __DEV__: 'false',
  },
  minify: true,
  outfile: './out.js',
  write: true,
});

// Step 3: Check output
const output = fs.readFileSync('./out.js', 'utf8');

// Step 4: Assert
assert(!output.includes('__DEV__'), 'Global should be replaced');
assert(output.includes('"Prod mode"'), 'Should contain prod log');
assert(!output.includes('"Dev mode"'), 'Should not contain dev log');

console.log('✅ define replacement test passed!');
