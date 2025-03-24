import axios from "axios";

// Set up the base URL for the API
const BASE_URL = "http://localhost:5000/vendorapplication";

// Function to create vendor application
export const createApplication = async (applicationData) => {
    const response = await fetch(`${BASE_URL}/createVendorApplication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });
  
    return response.json();
  };

  export const getApplication = async () => {
    const response = await axios.get(`${BASE_URL}/getAllApplications`);
    return response.data;
  };

// import axiosConfig from "../config/axiosConfig";

// export const createApplication = async (applicationData) => {
//   try {
//     const response = await axiosConfig.post("/vendorapplication/createVendorApplication", applicationData);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : new Error("Server error");
//   }
// };

// export const getApplication = async () => {
//   try {
//     const response = await axiosConfig.get("/vendorapplication/getAllApplications");
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : new Error("Server error");
//   }
// };

// export const getAllWatercans = async () => {
//   try {
//     const response = await axiosConfig.get("/watercan/getAllWatercans");
    
//     if (response.data.success) {
//       return response.data; // Returning { success: true, data: [...] }
//     } else {
//       throw new Error("Failed to fetch water cans");
//     }
//   } catch (error) {
//     console.error("Error fetching water cans:", error);
//     throw error.response ? error.response.data : new Error("Server error");
//   }
// };


  
  

