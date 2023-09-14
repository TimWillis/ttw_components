export default (obj: any) => {
  return Object.keys(obj)
    .reduce(function (a, k) {
      a.push((k + '=' + encodeURIComponent(obj[k])) as never);
      return a;
    }, [])
    .join('&');
};
