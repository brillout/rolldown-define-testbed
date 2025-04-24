import { rolldown } from 'rolldown';

const bundle = await rolldown({
  // input options
  input: 'src/main.js',
});

// generate bundles in memory with different output options
const res = await bundle.generate({
  // output options
  format: 'esm',
});
// console.log('res', JSON.stringify(res, null, 2))
console.log('res', res.output[0].code)
