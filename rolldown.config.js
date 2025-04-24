// rolldown.config.js
const { defineConfig } = require('rolldown');

const inputCode = `
  function test(someObj) {
    if (someObj.__DEV__) {
      console.log('Dev mode');
    } else {
      console.log('Prod mode');
    }
  }
`;

module.exports = defineConfig({
  input: inputCode, // Use your code directly as a string
  define: {
    'someObj.__DEV__': 'false', // Replace property access
  },
  minify: true, // Optional: Minify the code
  outfile: 'out.js', // Output the result to a file (optional)
});
