/* eslint-disable import/no-anonymous-default-export */
class AuthService {
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/dashboard');
  }
}

export default new AuthService();
