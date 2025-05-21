import api from "./apiService";

export const getUserProfile = async () => {
  try {
    const response = await api.get("/api/users/");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du profil", error);
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/api/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post("/api/register/", userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    throw error;
  }
};