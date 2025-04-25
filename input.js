export function test(someObj) {
  if (someObj.__DEV__) {
    console.log('Dev mode');
  } else {
    console.log('Prod mode');
  }
}

const insideString = 'someObj.__DEV__'
console.log(insideString)

/*! Inside comment: someObj.__DEV__ */

// Nested 1
console.log(globalContext.someObj.__DEV__)

// Nested 2
console.log(someObj.__DEV__.nested)
