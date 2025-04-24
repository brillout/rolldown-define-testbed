// rolldown.config.ts
import { defineConfig } from 'rolldown';

const inputCode = `
  function test(someObj) {
    if (someObj.__DEV__) {
      console.log('Dev mode');
    } else {
      console.log('Prod mode');
    }
  }
`;

export default defineConfig({
  input: inputCode, // Pass your code directly here
  define: {
    'someObj.__DEV__': 'false', // Define property access replacement
  },
  // Optional: You can still minify and bundle if needed
  minify: true,
  // Optional: Output configuration
  outfile: 'out.js', // or omit if you want the result in memory
});
