import { rollup } from 'rollup';
import replace from '@rollup/plugin-replace';

const bundle = await rollup({
  input: 'input.js',
  plugins: [
    replace({
      values: {
        'someObj.__DEV__': 'false',
      },
      delimiters: ['(?<!\\.)\\b', '\\b(?!\\.)'],
      preventAssignment: true
    })
  ],
});

const res = await bundle.generate({
  format: 'esm',
});

console.log(res.output[0].code);
