import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {createApplication} from "../../../api/serviceapi";
import {
  FormContainer,
  FormTitle,
  StyledForm,
  InputField,
  SubmitButton,
  Message,
  ErrorMessage,
  DatePickerContainer,
} from "./Application.styles.js";
 
const ApplicationForm = () => {
  const initialFormState = {
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    pincode: "",
    city: "",
    state: "",
    delivery_start_time: null,
    delivery_end_time: null,
    deliverable_water_cans: "0",
    priceCapacityPairs: [{ price: "", capacity: "" }], // Array to store price and capacity pairs
  };
 
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
  const handleChange = (e, index = null, field = null) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };
 
    if (["name", "city", "state"].includes(name) && /\d/.test(value)) return;
    if (name === "phoneNumber" || name === "pincode" || name === "deliverable_water_cans") {
      if (!/^\d*$/.test(value)) return;
      if (name === "phoneNumber" && value.length > 10) return;
      if (name === "pincode" && value.length > 6) return;
    }
 
    if (index !== null && field) {
      const updatedArray = [...formData.priceCapacityPairs];
      updatedArray[index][field] = value;
      setFormData((prevData) => ({ ...prevData, priceCapacityPairs: updatedArray }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
 
    newErrors[name] = "";
    setErrors(newErrors);
  };
 
  const handleAddField = () => {
    setFormData((prevData) => ({
      ...prevData,
      priceCapacityPairs: [...prevData.priceCapacityPairs, { price: "", capacity: "" }],
    }));
  };
 
  const handleRemoveField = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      priceCapacityPairs: prevData.priceCapacityPairs.filter((_, i) => i !== index),
    }));
  };
 
  const filterTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };
 
  const handleSubmit = async (e) => { // Add 'async' here
    e.preventDefault();
    let validationErrors = {};
 
    if (formData.email && !emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address!";
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
 
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("");
      setIsSuccess(false);
      return;
    }
 
    // try {
    //   const response = await fetch("http://localhost:5000/api/vendors", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
 
    //   if (response.ok) {
    //     toast.success("Application submitted successfully!");
    //     setFormData(initialFormState);
    //     setErrors({});
    //   } else {
    //     toast.error("Submission failed!");
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error); // Log the error for debugging
    //   toast.error("Error submitting form!");
    // }
 
    try {
      const formattedData = {
        ...formData,
        delivery_start_time: formData.delivery_start_time ? formData.delivery_start_time.toISOString() : "",
        delivery_end_time: formData.delivery_end_time ? formData.delivery_end_time.toISOString() : "",
      };
 
      const response = await createApplication(formattedData);
     
      if (response.success) {
        toast.success("Application submitted successfully!");
        setFormData(initialFormState);
      } else {
        toast.error(response.message || "Submission failed!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred!");
    }
  };
 
 
 
 
 
  return (
    <FormContainer>
      <FormTitle>Vendor Application</FormTitle>
      {message && <Message $success={isSuccess ? "true" : "false"}>{message}</Message>}
      <StyledForm onSubmit={handleSubmit}>
        {Object.keys(initialFormState).map(
          (field) =>
            !["delivery_start_time", "delivery_end_time", "deliverable_water_cans", "priceCapacityPairs"].includes(field) && (
              <div key={field}>
                <InputField
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
                {errors[field] && <ErrorMessage>{errors[field]}</ErrorMessage>}
              </div>
            )
        )}
 
        {/* Selling Price & Capacity Fields */}
        <div>
          <label>Selling Price & Capacity</label>
          {formData.priceCapacityPairs.map((pair, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
              <button type="button" onClick={() => handleRemoveField(index)}>
                ❌
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddField}>
            ➕ Add Price & Capacity
          </button>
        </div>
 
        <DatePickerContainer>
          <label>Delivery Start Time</label>
          <DatePicker
            selected={formData.delivery_start_time}
            onChange={(time) => setFormData({ ...formData, delivery_start_time: time })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            placeholderText="Select Start Time"
            filterTime={filterTime}
            minTime={new Date().setHours(9, 0, 0)}
            maxTime={new Date().setHours(20, 0, 0)}
          />
        </DatePickerContainer>
 
        <DatePickerContainer>
          <label>Delivery End Time</label>
          <DatePicker
            selected={formData.delivery_end_time}
            onChange={(time) => setFormData({ ...formData, delivery_end_time: time })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            placeholderText="Select End Time"
            filterTime={filterTime}
            minTime={new Date().setHours(10, 0, 0)}
            maxTime={new Date().setHours(21, 0, 0)}
          />
        </DatePickerContainer>
 
        {/* <div>
  <label>Deliverable Water Cans</label>
  <InputField
    type="number"
    name="deliverable_water_cans"
    placeholder="Enter deliverable cans"
    value={formData.deliverable_water_cans}
    onChange={handleChange}
    required
  />
  {errors.deliverable_water_cans && <ErrorMessage>{errors.deliverable_water_cans}</ErrorMessage>}
</div> */}
 
        <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
        </StyledForm>
      <ToastContainer />
    </FormContainer>
  );
};
 
export default ApplicationForm;