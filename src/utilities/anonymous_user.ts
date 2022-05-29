import unique_id from './unique_id';

export default () => {
  let user: any = localStorage.getItem('user');
  try {
    user = user ? JSON.parse(user) : { id: unique_id(25) };
    localStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    user = { id: unique_id(25) };
    localStorage.setItem('user', JSON.stringify(user));
  }
  return user;
};
