export default (N = 1) => {
  var s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array(N)
    .join()
    .split(',')
    .map(function () {
      return s.charAt(Math.floor(Math.random() * s.length));
    })
    .join('');
};
