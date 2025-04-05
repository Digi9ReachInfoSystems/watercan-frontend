import { useEffect, useState } from "react";
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
import {getAllWaterCans} from "../../../api/waterCanApi.js";
import { getUserByFirebaseId } from "../../../api/userApi.js"; // Import function
import { auth } from "../../../config/firebaseConfig.js"; // Import Firebase auth instance

const ApplicationForm = () => {
  const initialFormState = {
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    pincode: "",
    city: "",
    state: "",
    area: "", // New field for area selection
    delivery_start_time: null,
    delivery_end_time: null,
    deliverable_water_cans: [],
    proof_image: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [deliverableWaterCans, setAvailableWaterCans] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // To manage the loading state
  const [availableAreas, setAvailableAreas] = useState([]); // Store available areas separately



  const { Option } = Select;

  const [fileName, setFileName] = useState("Upload File");




  useEffect(() => {
    const getUsers = async () => {
      try {
        const UID = localStorage.getItem("FUID");
        console.log("Stored UID:", UID); // Debugging log
    
        if (!UID) throw new Error("UID not found in localStorage");
    
        // Call API function
        const responseData = await getUserByFirebaseId(UID);
        console.log("API Response:", responseData); // Debugging log
    
        // Check if data is returned
        if (!responseData || !responseData.data || !responseData.data._id) {
          throw new Error("User ID (_id) not found in API response");
        }
    
        const user = responseData.data;
    
        setFormData((prevData) => ({
          ...prevData,
          user_id: user._id, // Assign _id as user_id
          name: user.name,
          email: user.email,
          address: user.address,
          phoneNumber: user.phoneNumber,
          pincode: user.pincode,
          city: user.city,
          state: user.state,
          area: user.areas?.[0] || "", 
          delivery_end_time: user.delivery_end_time,
          delivery_start_time: user.delivery_start_time,
          deliverable_water_cans: user.deliverable_water_cans,
          proof_image: user.proof_image,
          latitude: user.latitude,
          longitude: user.longitude,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    

    const fetchWaterCans = async () => {
      try {
        const response = await getAllWaterCans();
        console.log("Water Cans Response:", response);
        setAvailableWaterCans(response.data || []);
      } catch (error) {
        console.error("Error fetching water cans:", error);
        toast.error("Failed to fetch water can capacities!");
      } finally {
        setLoading(false);
      }
    };

    fetchWaterCans();


      getUsers(); 
    // }
  }, []);
  
  


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

  
  if (name === "pincode" && value.length === 6) {
    try {
      const pincodeData = await fetchPincodeDetails(value);
  
      if (!pincodeData || !Array.isArray(pincodeData) || pincodeData.length === 0) {
        throw new Error("Invalid Pincode or API Error!");
      }
  
      let postOffices = pincodeData.map(({ area, district, state, lat, lng}) => ({
        area,
        district,
        state,
        latitude: lat,  
        longitude: lng,
      }));
  
      if (postOffices.length > 0) {
        setAvailableAreas(postOffices.map(areaObj => areaObj.area)); // Store available areas
        setFormData((prevData) => ({
          ...prevData,
          city: postOffices[0].district || prevData.city,
          state: postOffices[0].state || prevData.state,
          latitude: postOffices[0].latitude || prevData.latitude,
          longitude: postOffices[0].longitude || prevData.longitude,
          area: "", // Reset selected area so user can pick
        }));
      } else {
        throw new Error("Invalid Pincode or No Data Found!");
      }
    } catch (error) {
      console.error("Pincode API Error:", error.message);
      toast.error(error.message || "Failed to fetch city, state, and areas!");
    }
  }
  
  
  
  
  

  // Handle price & capacity fields dynamically
  if (index !== null && field) {
    const updatedArray = [...formData.deliverable_water_cans];
    updatedArray[index][field] = value;
    setFormData((prevData) => ({ ...prevData, deliverable_water_cans: updatedArray }));
  }

  // console.log("Form Data:", formData);  
};  



useEffect(() => {

}, []);


const validateField = (name, value) => {
  switch (name) {
    case "name":
      return value.trim() ? "" : "Name is required";

    case "email":
      if (!value.trim()) return "Email is required";
      return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ? "" : "Email must be in the format example@gmail.com";

      case "phoneNumber":
        if (!value.trim()) return "Phone number is required";
        return /^\d{10}$/.test(value) ? null : "Phone number must be exactly 10 digits!";
      
    case "address":
      return value.trim() ? "" : "Address is required";

    case "pincode":
      if (!value.trim()) return "Pincode is required";
      return /^\d{6}$/.test(value) ? "" : "Pincode must be exactly 6 digits!";

    case "area":
      return value ? "" : "Select an area";

    case "city":
      return value.trim() ? "" : "City is required";

    case "state":
      return value.trim() ? "" : "State is required";

    case "deliverable_water_cans":
      return value.length ? "" : "Select at least one water can size";

    case "delivery_start_time":
      return value ? "" : "Delivery start time is required";

    case "delivery_end_time":
      if (!value) return "Delivery end time is required";
      return value > formData.delivery_start_time ? "" : "End time must be after start time";

    case "proof_image":
      return value ? "" : "Please upload a file before submitting!";

    case "aadharFile":
    case "panFile":
    case "gstFile":
      return value && isValidFileType(value) ? "" : `Invalid file type for ${name}`;

    default:
      return "";
  }
};

// Updated handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("all data:", formData);
  let validationErrors = {};

  // Validate all fields
  Object.keys(formData).forEach((field) => {
    const errorMessage = validateField(field, formData[field]);
    if (errorMessage) {
      validationErrors[field] = errorMessage;
    }
  });

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

    const response = await createApplication(formattedData);

    console.log( "all data", formData)

    // if (response.success) {
    //   navigate("/registration-successfully");
    //   setFormData(initialFormState);
    // } else {
    //   toast.error(response.message || "Submission failed!");
    // }
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("An error occurred!");
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
      onBlur={(e) => setErrors((prev) => ({ ...prev, name: validateField(e.target.name, e.target.value) }))}
      required
    />
    {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
  </div>

<div className="form-row-two">
<div>
    <InputField
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      onBlur={(e) => setErrors((prev) => ({ ...prev, email: validateField(e.target.name, e.target.value) }))}
      required
    />
    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
  </div>
  <div>

  <InputField
  type="text"
  name="phoneNumber"
  placeholder="Phone Number"
  value={formData.phoneNumber}
  onChange={handleChange}
  onBlur={(e) => {
    const errorMsg = validateField(e.target.name, e.target.value);
    setErrors((prev) => ({ ...prev, phoneNumber: errorMsg })); // Store error
  }}
  maxLength="10"
  required
/>
{errors.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>}

</div>

</div>
  
<div>
    <InputField
      type="text"
      name="address"
      placeholder="Address"
      value={formData.address}
      onChange={handleChange}
      onBlur={(e) => 
      { const errorMsg = validateField(e.target.name, e.target.value); setErrors((prev) => ({ ...prev, address: errorMsg } ) ); } } 
      required
    />
    {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
  </div>

  <div className="form-row">
  <div>
    <InputField
      type="text"
      name="pincode"
      placeholder="Pincode"
      value={formData.pincode}
      onChange={async (e) => {
        handleChange(e);
      }}
      onBlur={(e) => {
        const errorMsg = validateField(e.target.name, e.target.value);
        setErrors((prev) => ({ ...prev, pincode: errorMsg }));
      }}
      required
    />
    {errors.pincode && <ErrorMessage>{errors.pincode}</ErrorMessage>}
  </div>

  <div>
  {/* <Select
  name="area"
  value={formData.area || undefined} // Ensure it's undefined when no value is selected
  onChange={(value) => handleChange({ target: { name: "area", value } })}
  onBlur={(e) => setErrors((prev) => ({ ...prev, area: validateField(e.target.name, e.target.value) }))}
  placeholder="Select Area"
  required
>
  {formData.areas.map((area, index) => (
    <Option key={index} value={area}>
      {area}
    </Option>
  ))}
</Select> */}

<Select
  name="area"
  value={formData.area || undefined}
  onChange={(value) => setFormData((prevData) => ({ ...prevData, area: value }))}
  placeholder="Select Area"
  required
>
  {availableAreas.map((area, index) => (
    <Option key={index} value={area}>
      {area}
    </Option>
  ))}
</Select>

{errors.area && <ErrorMessage>{errors.area}</ErrorMessage>}
</div>

  </div>

  <div className="form-row">

  <div>
    <InputField
      type="text"
      name="city"
      placeholder="City"
      value={formData.city}
      onChange={handleChange}
      onBlur={(e) => setErrors((prev) => ({ ...prev, city: validateField(e.target.name, e.target.value) }))}
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
      onBlur={(e) => setErrors((prev) => ({ ...prev, state: validateField(e.target.name, e.target.value) }))}
      required
    />
    {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
  </div>

  </div>


  <div>
      <Select
        mode="multiple"
        name="deliverable_water_cans"
        value={formData.deliverable_water_cans}
        onChange={(value) =>
          setFormData((prevData) => ({ ...prevData, deliverable_water_cans: value }))
        }
        placeholder={loading ? "Loading..." : "Select Deliverable Water Cans"}
        style={{ width: "100%", border: "1px solid #ccc", borderRadius: "5px" }}
        onBlur={() =>
          setErrors((prev) => ({
            ...prev,
            deliverable_water_cans: validateField(
              "deliverable_water_cans",
              formData.deliverable_water_cans
            ),
          }))
        }
        required
        disabled={loading}
      >
        {!loading ? (
          deliverableWaterCans.map((waterCan) => (
            <Option key={waterCan._id} value={waterCan._id}>
              {waterCan.capacityInLiters} Litres
            </Option>
          ))
        ) : (
          <Option disabled>Loading...</Option>
        )}
      </Select>
      {errors.deliverable_water_cans && <ErrorMessage>{errors.deliverable_water_cans}</ErrorMessage>}
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
          onBlur={(e) => setErrors((prev) => ({ ...prev, delivery_start_time: validateField(e.target.name, e.target.value) }))}
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
          onBlur={(e) => setErrors((prev) => ({ ...prev, delivery_end_time: validateField(e.target.name, e.target.value) }))}
          minTime={new Date().setHours(10, 0, 0)}
          maxTime={new Date().setHours(21, 0, 0)}
        />
      </DatePickerContainer>
      </div>

{/* <div className="form-row-time">
  <DatePickerContainer>
    <Select
      name="delivery_start_time"
      value={formData.delivery_start_time}
      onChange={(e) => setFormData({ ...formData, delivery_start_time: e.target.value })}
      onBlur={(e) => setErrors((prev) => ({ ...prev, name: validateField(e.target.name, e.target.value) }))}
      required
      placeholder="Select Delivery Start Time"
    >
      {timeSlots.slice(0, -1).map((slot, index) => (
        <option key={index} value={slot}>{slot}</option>
      ))}
    </Select>
  </DatePickerContainer>

  <DatePickerContainer>
    <Select
      name="delivery_end_time"
      value={formData.delivery_end_time}
      onChange={(e) => setFormData({ ...formData, delivery_end_time: e.target.value })}
      onBlur={(e) => setErrors((prev) => ({ ...prev, name: validateField(e.target.name, e.target.value) }))}
      required
      placeholder="Select Delivery End Time"
    >
      {timeSlots.slice(1).map((slot, index) => (
        <option key={index} value={slot}>{slot}</option>
      ))}
    </Select>
  </DatePickerContainer>
</div> */}



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
          onBlur={(e) => setErrors((prev) => ({ ...prev, proof_image: validateField(e.target.name, e.target.value) }))}
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
