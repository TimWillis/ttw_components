export default (N = 7, type = 'alpha_numeric') => {
  const s =
    type === 'alpha_numeric'
      ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array(N)
    .join()
    .split(',')
    .map(function () {
      return s.charAt(Math.floor(Math.random() * s.length));
    })
    .join('');
};
