import { rolldown } from 'rolldown';

const bundle = await rolldown({
  input: 'input.js',
  define: {
    'someObj.__DEV__': 'false',
  },
});

const res = await bundle.generate({
  format: 'esm',
});
// console.log('res', JSON.stringify(res, null, 2))
console.log('res', res.output[0].code)
