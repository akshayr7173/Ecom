export function registerUser({ name, email, password }) {
  localStorage.setItem("authUser", JSON.stringify({ name, email, password }));
}

export function getStoredUser() {
  return JSON.parse(localStorage.getItem("authUser"));
}

export function loginUser(email, password) {
  const user = getStoredUser();
  if (!user) return false;
  return user.email === email && user.password === password;
}

export function isAuthenticated() {
  return !!localStorage.getItem("isLoggedIn");
}

export function setAuthenticated(value) {
  if (value) localStorage.setItem("isLoggedIn", "true");
  else localStorage.removeItem("isLoggedIn");
}

export function logoutUser() {
  localStorage.removeItem("isLoggedIn");
}