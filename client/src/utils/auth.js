import decode from 'jwt-decode';
/* eslint-disable import/no-anonymous-default-export */
class AuthService {
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/dashboard');
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  isAuthenticated() {
   const token = this.getToken()

   if (!token) {
    return false;
   }

  const expired = this.isTokenExpired(token)
  
  if (expired){
    return false;
  }

  return true;
  }

}

export default new AuthService();
