export default function authHeader() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log("hello sessionStorage!");
  console.log(user);
  if (user && user.token) {
    console.log(user.token);
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return { };
  }
}