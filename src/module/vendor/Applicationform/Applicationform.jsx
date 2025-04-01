import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createApplication, fetchPincodeDetails } from "../../../api/serviceapi.js";
import { useNavigate } from "react-router-dom";
import watercan from "../../../assets/watercan.jpg";
import { uploadFileToFirebase } from "../../../utils/uploadFileToFirebase.js";
import {
  Container,
  ContentContainer,
  FormContainer,
  FormTitle,
  StyledForm,
  InputField,
  SubmitButton,
  Message,
  ErrorMessage,
  DatePickerContainer,
} from "./Application.styles.js";
import { Select } from "antd";
// import { Content } from "antd/es/layout/layout.js";

const ApplicationForm = () => {
  const initialFormState = {
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    pincode: "",
    city: "",
    state: "",
    selectedArea: "", // New field for area selection
    areas: [], // Store available areas from API
    delivery_start_time: null,
    delivery_end_time: null,
    deliverable_water_cans: "0",
    proof_image: "",
    priceCapacityPairs: [{ price: "", capacity: "" }],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const { Option } = Select;

  const [fileName, setFileName] = useState("Upload File");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Show file name on UI
      console.log("Uploading file:", file.name);
  
      try {
        const fileUrl = await uploadFileToFirebase(file, "vendor_proofs");
        console.log("File uploaded successfully:", fileUrl);
  
        setFormData((prevData) => ({
          ...prevData,
          proof_image: fileUrl, // Store the URL instead of file itself
        }));
  
        toast.success("File uploaded successfully!");
      } catch (error) {
        console.error("Upload failed:", error.message); // Log error
        toast.error(`File upload failed! ${error.message}`);
      }
    }
  };
  
  


const handleChange = async (e, index = null, field = null) => {
  const { name, value } = e.target;
  let newErrors = { ...errors };
  let isValid = true;

  // Validation logic based on field type
  switch (name) {
    case "name":
      isValid = /^[A-Za-z\s]*$/.test(value);
      if (!isValid) newErrors[name] = "Only alphabets and spaces allowed!";
      break;

    case "email":
      isValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
      if (!isValid) newErrors[name] = "Email must be in the format example@gmail.com";
      break;

    case "phoneNumber":
      isValid = /^[0-9]{10}$/.test(value);
      if (!isValid) newErrors[name] = "Phone number must be exactly 10 digits!";
      break;

   

    default:
      break;
  }

  // Update errors state
  if (isValid) {
    newErrors[name] = "";
  }
  setErrors(newErrors);

  // Always update formData, even if invalid
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));

  // Fetch city & state when pincode is 6 digits
  // Pincode validation & area fetching
  if (name === "pincode" && value.length === 6) {
    try {
      const pincodeData = await fetchPincodeDetails(value);

      if (pincodeData && Array.isArray(pincodeData) && pincodeData.length > 0 && pincodeData[0].Status !== "404") {
        const { PostOffice } = pincodeData[0];

        if (PostOffice && PostOffice.length > 0) {
          const { District, State } = PostOffice[0];

          setFormData((prevData) => ({
            ...prevData,
            city: District || prevData.city,
            state: State || prevData.state,
            areas: PostOffice.map(area => area.Name), // Store available areas
            selectedArea: "", // Reset selected area
          }));
        }
      } else {
        toast.error("Invalid Pincode or API Error!");
      }
    } catch (error) {
      console.error("Pincode API Error:", error);
      toast.error("Failed to fetch city, state, and areas!");
    }
  }

  // Handle price & capacity fields dynamically
  if (index !== null && field) {
    const updatedArray = [...formData.priceCapacityPairs];
    updatedArray[index][field] = value;
    setFormData((prevData) => ({ ...prevData, priceCapacityPairs: updatedArray }));
  }
};  

const handleAddField = () => {
  setFormData((prevData) => ({
    ...prevData,
    priceCapacityPairs: [
      ...prevData.priceCapacityPairs,
      { id: Date.now(), price: "", capacity: "" }, // Generate a unique ID
    ],
  }));
};


  const handleRemoveField = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      priceCapacityPairs: prevData.priceCapacityPairs.filter((_, i) => i !== index),
    }));
  };

  const formatTime = (date) => {
    if (!date || isNaN(date.getTime())) return ""; // Prevents errors
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  };
 
  const validateField = (name, value) => {
    let errorMessage = "";
  
    if (!value.trim()) {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
     else {
      switch (name) {
        case "name":
          if (!/^[A-Za-z\s]+$/.test(value)) {
            errorMessage = "Name should contain only alphabets";
          }
          break;
  
        case "email":
          if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
            errorMessage = "Email must be in the format example@gmail.com";
          }
          break;
  
          case "phoneNumber":
            isValid = /^[0-9]{0,10}$/.test(value); // Only numbers, max length 10
            if (!isValid || value.length > 10) newErrors[name] = "Only numbers allowed, max 10 digits!";
            break;
  
        case "pincode":
          if (!/^\d{6}$/.test(value)) {
            errorMessage = "Pincode must be exactly 6 digits!";
          }
          break;
  
        default:
          break;
      }
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  
    // ** Ensure input is updated even if validation fails **
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

    const convertToDate = (timeStr) => {
      if (!timeStr) return null;
      const [hours, minutes] = timeStr.split(":");
      const date = new Date();
      date.setHours(hours, minutes, 0, 0); // Set time while keeping today's date
      return date;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let validationErrors = {};
    
      // Validate all fields
      Object.keys(formData).forEach((field) => {
        if (!formData[field] && field !== "city" && field !== "state") {
          validationErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
      });
    
      // Specific field validations
      if (formData.email && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
        validationErrors.email = "Email must be in the format example@gmail.com";
      }
      if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
        validationErrors.phoneNumber = "Phone number must be exactly 10 digits!";
      }
      if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
        validationErrors.pincode = "Pincode must be exactly 6 digits!";
      }
      if (!formData.delivery_start_time || !formData.delivery_end_time) {
        validationErrors.delivery_start_time = "Required";
        validationErrors.delivery_end_time = "Required";
      }
    
// **File validation (Optional)**
if (formData.aadharFile && !isValidFileType(formData.aadharFile)) {
  validationErrors.aadharFile = "Invalid file type for Aadhar";
}

if (formData.panFile && !isValidFileType(formData.panFile)) {
  validationErrors.panFile = "Invalid file type for PAN";
}

if (formData.gstFile && !isValidFileType(formData.gstFile)) {
  validationErrors.gstFile = "Invalid file type for GST";
}

      // Stop submission if there are errors
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setMessage("");
        setIsSuccess(false);
        return;
      }
    
      try {
        const formattedData = {
          ...formData,
          delivery_start_time: formData.delivery_start_time ? formData.delivery_start_time.toISOString() : "",
          delivery_end_time: formData.delivery_end_time ? formData.delivery_end_time.toISOString() : "",
        };

        if (!formData.proof_image) {
          toast.error("Please upload a file before submitting!");
          return;
        }
    
        const response = await createApplication(formattedData);
    
        if (response.success) {
          navigate("/registration-successfully");
          setFormData(initialFormState);
        } else {
          toast.error(response.message || "Submission failed!");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An error occurred!");
      }
    };
    

      const [selectedFile, setSelectedFile] = useState(null);
     

     
      const handleUpload = () => {
        if (selectedFile) {
          console.log("Uploading:", selectedFile.name);
          // Handle file upload logic here (API call, etc.)
        }
      };

 
  return (
    <Container>
      <ContentContainer>

 
      <div className="container">
  <img src={watercan} alt="Logo" className="logo" />
  <div className="overlay-text">
    <h1 className="heading">Hello Vendor,</h1>
    
  </div>
</div>

        
      </ContentContainer>

    <FormContainer>
    <FormTitle>Vendor Application</FormTitle>
{message && <Message $success={isSuccess ? "true" : "false"}>{message}</Message>}
<StyledForm onSubmit={handleSubmit}>
  <div>
    <InputField
      type="text"
      name="name"
      placeholder="Name"
      value={formData.name}
      onChange={handleChange}
      // onBlur={(e) => validateField(field,e.target.value)}
      required
    />
    {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
  </div>

<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
<div>
    <InputField
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      required
    />
    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
  </div>

  <div>
    <InputField
      type="text"
      name="phone"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={handleChange}
      maxLength="10"
      required
    />
    {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
  </div>
</div>
  
<div>
    <InputField
      type="text"
      name="address"
      placeholder="Address"
      value={formData.address}
      onChange={handleChange}
      required
    />
    {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr ", gap: "20px" }}>
  <div>
    <InputField
      type="text"
      name="pincode"
      placeholder="Pincode"
      value={formData.pincode}
      onChange={async (e) => {
        handleChange(e);
        if (e.target.value.length === 6) {
          try {
            const pincodeData = await fetchPincodeDetails(e.target.value);
            if (pincodeData && pincodeData[0]) {
              setFormData((prevData) => ({
                ...prevData,
                city: pincodeData[0].city || "",
                state: pincodeData[0].state || "",
              }));
            }
          } catch (error) {
            toast.error("Failed to fetch city and state!");
          }
        }
      }}
      required
    />
    {errors.pincode && <ErrorMessage>{errors.pincode}</ErrorMessage>}
  </div>

  <div>
  <Select
  name="selectedArea"
  value={formData.selectedArea || undefined} // Ensure it's undefined when no value is selected
  onChange={(value) => handleChange({ target: { name: "selectedArea", value } })}
  placeholder="Select Area"
  required
>
  {formData.areas.map((area, index) => (
    <Option key={index} value={area}>
      {area}
    </Option>
  ))}
</Select>

{errors.selectedArea && <ErrorMessage>{errors.selectedArea}</ErrorMessage>}
</div>

  </div>

  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

  <div>
    <InputField
      type="text"
      name="city"
      placeholder="City"
      value={formData.city}
      onChange={handleChange}
      required
    />
    {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
  </div>

  <div>
    <InputField
      type="text"
      name="state"
      placeholder="State"
      value={formData.state}
      onChange={handleChange}
      required
    />
    {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
  </div>

  </div>

  


      <div style={{ display:"flex", flexDirection:"column", gap:"10px"}}>
      {formData.priceCapacityPairs.map((pair, index) => (
        <div style={{ display:"flex", width:"100%", gap:"20px"}} key={index}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width:"90%" }} >
          <InputField
              type="number"
              placeholder="Enter price"
              value={pair.price}
              onChange={(e) => handleChange(e, index, "price")}
              min="1"
              required
            />

            <InputField
              type="number"
              placeholder="Enter capacity"
              value={pair.capacity}
              onChange={(e) => handleChange(e, index, "capacity")}
              min="1"
              required
            />
          </div>
          <button style={{width:"5%", borderRadius:"5px", padding:"8px", border:"none"}} type="button" onClick={() => handleRemoveField(index)}>❌</button>
          </div>
          ))}
          <button style={{width:"40%", borderRadius:"5px", padding:"8px", border:"none"}} type="button" onClick={handleAddField}>➕ Add Price & Capacity</button>
          </div>
  
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      <DatePickerContainer>
        <DatePicker
          selected={formData.delivery_start_time}
          onChange={(time) => setFormData({ ...formData, delivery_start_time: time })}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeFormat="HH:mm"
          dateFormat="HH:mm"
          placeholderText="Delivery Start Time"
          // filterTime={filterTime}
          minTime={new Date().setHours(9, 0, 0)}
          maxTime={new Date().setHours(20, 0, 0)}
        />
      </DatePickerContainer>
  
      <DatePickerContainer>
        <DatePicker
          selected={formData.delivery_end_time}
          onChange={(time) => setFormData({ ...formData, delivery_end_time: time })}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeFormat="HH:mm"
          dateFormat="HH:mm"
          placeholderText="Delivery End Time"
          // filterTime={filterTime}
          minTime={new Date().setHours(10, 0, 0)}
          maxTime={new Date().setHours(21, 0, 0)}
        />
      </DatePickerContainer>
      </div>


<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      {/* First Upload Button */}
      <label
        style={{
          display: "inline-block",
          padding: "8px 20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
          position: "relative",
          background: "#fff",
          textAlign: "center",
          fontSize: "16px",
          // fontWeight: "bold",
          width: "100%",
          color: "#ccc"
        }}
      >
        {fileName}
        <input
          type="file"
          onChange={handleFileChange}
          style={{
            opacity: 0,
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
        />
      </label>
    </div>

  
      <SubmitButton type="submit">Submit</SubmitButton>
    </StyledForm>
    <ToastContainer />
  </FormContainer>  
  </Container>
  );
};
 
export default ApplicationForm;