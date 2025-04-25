import { rolldown } from 'rolldown';
import { replacePlugin } from 'rolldown/experimental';

const bundle = await rolldown({
  input: 'input.js',
  plugins: [
    replacePlugin({
      values: {
        'someObj.__DEV__': 'false',
      },
      delimiters: ['(?<!\\.)\\b', '\\b(?!\\.)'],
    })
  ],
});

const res = await bundle.generate({
  format: 'esm',
});
// console.log('res', JSON.stringify(res, null, 2))
console.log(res.output[0].code)
