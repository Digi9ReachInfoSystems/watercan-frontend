import axios from "axios";

// Set up the base URL for the API
const BASE_URL = "http://localhost:5000";

// Function to create vendor application
export const createApplication = async (applicationData) => {
    const response = await fetch(`${BASE_URL}/vendorapplication/createVendorApplication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });
  
    return response.json();
  };

export const getApplication = async () => {
    const response = await axios.get(`${BASE_URL}/vendorapplication/getAllApplications`);
    return response.data;
  };

export const createOrder = async (orderData) => {
    const response = await axios.post(`${BASE_URL}/order/createOrder`, orderData);
    return response.data;
}

export const getAllOrders = async () => {
    const response = await axios.get(`${BASE_URL}/order/getAllOrders`);
    return response.data;
}

// export const getOrdersByVendor = async (vendorId) => {
//     const response = await axios.get(`${BASE_URL}/order/getOrdersByVendor/${vendorId}`);
//     return response.data;
// }

export const getOrdersByVendor = async () => {
  const vendorId = "67dc634bacfb078c3c5d6704"; 
  try {
      const response = await axios.get(`${BASE_URL}/order/getOrdersByVendor/${vendorId}`);
      return response.data.data; // Extract orders array
  } catch (error) {
      console.error("Error fetching vendor orders:", error);
      return [];
  }
};

export const updateOrder = async (orderId, updatedData) => {
    const response = await axios.put(`${BASE_URL}/order/updateOrder/${orderId}`, updatedData);
    return response.data;
}

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


  
  

