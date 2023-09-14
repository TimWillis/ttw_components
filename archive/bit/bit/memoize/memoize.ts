export default (fn: any) => {
  let cache = {},
    key;
  return (...args: any[]) => {
    key = JSON.stringify(args);
    return cache[key] || (cache[key] = fn.call(null, ...args));
  };
};
