import axiosConfig from "../config/axiosConfig";

export const createWaterCan = async (waterCanData) => {
    try {
      const response = await axiosConfig.post("/watercan/create", waterCanData);
      return response.data;
    } catch (error) {
      console.error("Create Water Can Error:", error.response || error);
      throw error.response ? error.response.data : new Error("Server error");
    }
  };
  

export const getAllWaterCans = async () => {
    try {
        const response = await axiosConfig.get("/watercan/getAllWatercans");
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Server error");
    }
};

export const deleteWaterCan = async (waterCanId) => {
    try {
        const response = await axiosConfig.delete(`/watercan/deleteWatercanById/${waterCanId}`);
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Server error");
    }
};

