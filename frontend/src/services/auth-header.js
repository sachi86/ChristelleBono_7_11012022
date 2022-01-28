export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    const error = "userToken is lost! You can't continue";
  
    if (user && user.token) {
      return { 'x-access-token': user.token };  // for Node.js Express back-end
    } else {
      return {"error": error};
    }
  }