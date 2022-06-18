function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sleep(fn, ...args) {
  await timeout(3000);
  return fn(...args);
}

export default {timeout, sleep}