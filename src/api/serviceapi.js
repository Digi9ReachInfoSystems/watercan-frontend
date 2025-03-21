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
  
  

