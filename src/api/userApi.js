import axiosConfig from "../config/axiosConfig";

export const createUser = async (userData) => {
  try {
    const response = await axiosConfig.post("/user/create", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

export const loginUser = async (user_id) => {
    try {
      const response = await axiosConfig.post("/user/get-user", { user_id });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
    }
  };
  
  export const forgotPassword = async (email) => {
    try {
      const response = await axiosConfig.post("/user/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
    }
  };

  export const getUserByFirebaseId = async (UID) => {
    try {
      const response = await axiosConfig.get(`/user/get-user-by-firebase-id/${UID}`);
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
    }
  };

  export const getUserById = async (user_id) => {
    try {
      const response = await axiosConfig.get("/user/get-all-users/${user_id}", { user_id });
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
    }
  };
  
  