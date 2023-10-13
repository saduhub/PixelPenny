/* eslint-disable import/no-anonymous-default-export */
class AuthService {
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/dashboard');
  }
  
  getToken() {
    return localStorage.getItem('id_token');
  }
}

export default new AuthService();
