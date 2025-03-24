import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createApplication, getAllWatercans } from "../../../api/serviceapi";
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
    deliverable_water_cans: [{ MRP: "", capacityInLiters: "" }],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [waterCans, setWaterCans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWaterCans = async () => {
      try {
        const { success, data } = await getAllWatercans();
        
        if (success) {
          setWaterCans(data);
        } else {
          console.error("Failed to fetch water cans. Invalid response:", data);
        }
      } catch (error) {
        console.error("Error fetching water cans:", error);
      }
    };
  
    fetchWaterCans();
  }, []);
  
  

  const handleChange = (e, index = null, field = null) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (["name", "city", "state"].includes(name) && /\d/.test(value)) return;
    if (["phoneNumber", "pincode"].includes(name) && !/^\d*$/.test(value)) return;
    if (name === "phoneNumber" && value.length > 10) return;
    if (name === "pincode" && value.length > 6) return;

    if (index !== null && field) {
      const updatedArray = [...formData.deliverable_water_cans];
      updatedArray[index][field] = value;

      setFormData((prevData) => ({
        ...prevData,
        deliverable_water_cans: updatedArray,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    newErrors[name] = "";
    setErrors(newErrors);
  };

  const handleAddField = () => {
    setFormData((prevData) => ({
      ...prevData,
      deliverable_water_cans: [...prevData.deliverable_water_cans, { MRP: "", capacityInLiters: "" }],
    }));
  };

  const handleRemoveField = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      deliverable_water_cans: prevData.deliverable_water_cans.filter((_, i) => i !== index),
    }));
  };

  const filterTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.delivery_start_time || !formData.delivery_end_time) {
      validationErrors.delivery_start_time = "Required";
      validationErrors.delivery_end_time = "Required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formattedData = {
        ...formData,
        delivery_start_time: formData.delivery_start_time?.toISOString(),
        delivery_end_time: formData.delivery_end_time?.toISOString(),
      };

      console.log("Submitting Data:", formattedData);

      const response = await createApplication(formattedData);

      if (response.success) {
        toast.success("Application submitted successfully!");
        setFormData(initialFormState);
        navigate("/registration-successfully");
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
            !["delivery_start_time", "delivery_end_time", "deliverable_water_cans"].includes(field) && (
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
          {formData.deliverable_water_cans.map((pair, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <select
  value={pair.MRP}
  onChange={(e) => handleChange({ target: { name: "MRP", value: e.target.value } }, index, "MRP")}
  required
>
  <option value="">Select Price</option>
  {waterCans.map((can) => (
    <option key={can._id} value={can.MRP}>
      {can.MRP} Rs
    </option>
  ))}
</select>

<select
  value={pair.capacityInLiters}
  onChange={(e) => handleChange({ target: { name: "capacityInLiters", value: e.target.value } }, index, "capacityInLiters")}
  required
>
  <option value="">Select Capacity</option>
  {waterCans.map((can) => (
    <option key={can._id} value={can.capacityInLiters}>
      {can.capacityInLiters}L
    </option>
  ))}
</select>


              <button type="button" onClick={() => handleRemoveField(index)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={handleAddField}>➕ Add Price & Capacity</button>
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


        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>
      <ToastContainer />
    </FormContainer>
  );
};

export default ApplicationForm;