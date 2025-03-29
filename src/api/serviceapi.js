import axiosConfig from "../config/axiosConfig";

export const createApplication = async (applicationData) => {
  try{
    const response = await axiosConfig.post("/vendorapplication/createVendorApplication", applicationData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }  
}

export const getApplication = async () => {
  try {
    const response = await axiosConfig.get("/vendorapplication/getAllApplications");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
}

// export const createOrder = async (orderData) => {
//     const response = await axios.post(`${BASE_URL}/order/createOrder`, orderData);
//     return response.data;
// }


export const getAllOrders = async () => {
  try {
      const response = await axiosConfig.get("/order/getAllOrders");
      return response.data;
  } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
  }
}

export const getOrdersByVendor = async (vendor_Id) => {
  
  try {
    console.log("Fetching orders for vendor ID:", vendor_Id);
    const response = await axiosConfig.get(`/order/getOrdersByVendor/${vendor_Id}`);
    return response.data.data; 
} catch (error) {
    console.error("Error fetching vendor orders:", error);
    return [];
}
};

export const updateOrder = async (orderId, updatedData) => {
  try {
      const response = await axiosConfig.put(`/order/updateOrder/${orderId}`, updatedData);
      return response.data;
  } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
  }
}

// export const getAllOrders = async () => {
//     const response = await axios.get(`${BASE_URL}/order/getAllOrders`);
//     return response.data;
// }

// export const getOrdersByVendor = async ( ) => {
//   const vendorId = "67dc634bacfb078c3c5d6704"; 
//   try {
//       const response = await axios.get(`${BASE_URL}/order/getOrdersByVendor/${vendorId}`);
//       console.log("Vendor Orders Data:", response.data);  // ✅ Check response structure
//       return response.data.data; // Extract orders array
//   } catch (error) {
//       console.error("Error fetching vendor orders:", error);
//       return [];
//   }
// };

// export const updateOrder = async (orderId, updatedData) => {
//     const response = await axios.put(`${BASE_URL}/order/updateOrder/${orderId}`, updatedData);
//     return response.data;
// }
