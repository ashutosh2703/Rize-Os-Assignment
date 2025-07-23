export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!getToken();
}

export function login(token) {
  setToken(token);
  window.location.href = '/dashboard';
}

export function logout() {
  removeToken();
  window.location.href = '/login';
} 