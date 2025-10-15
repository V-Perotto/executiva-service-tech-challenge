import api from "../api/api";

export function getToken() {
  return localStorage.getItem("token");
}

export function isLogged() {
  return !!getToken();
}

export async function loginUser(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
}

export async function registerUser(name: string, email: string, password: string) {
  await api.post("/auth/register", { name, email, password });
}

export function logout() {
  localStorage.removeItem("token");
}