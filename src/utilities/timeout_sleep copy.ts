export function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
/* this is syncronous but doesn't block the main thread - atleast for redirections*/
export async function sleep(fn, ...args) {
  await timeout(3000);
  return fn(...args);
}

/*this will block the main thread*/
export function blocking_sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
