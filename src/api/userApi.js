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
  