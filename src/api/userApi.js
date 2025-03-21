import axiosConfig from "../config/axiosConfig";

export const createUser = async (userData) => {
  try {
    console.log("Sending user data:", userData); // Debugging log
    const response = await axiosConfig.post("/user/create", userData);
    console.log("User created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error("Server error");
  }
};
