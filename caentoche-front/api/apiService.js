import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:80",
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token JWT automatiquement
/* api.interceptors.request.use(async (config) => {
  const token = "TOKEN_QUE_TU_RECUPERES"; // À récupérer dynamiquement
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
}); */

export default api;
