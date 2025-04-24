export function test(someObj) {
  if (someObj.__DEV__) {
    console.log('Dev mode');
  } else {
    console.log('Prod mode');
  }
}
