import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getWaterCanById, updateWaterCan } from "../../../../api/waterCanApi";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  font-weight: bold;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 20%;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditWaterCan = ({ onSuccess, onClose, isEditMode, initialData }) => {
  const [formData, setFormData] = useState({
    Brand: "",
    MRP: "",
    selling_price: "",
    capacityInLiters: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWaterCanData = async () => {
      if (isEditMode && initialData) {
        try {
          const response = await getWaterCanById(initialData._id);
          console.log("watercan", response.data);
          setFormData({
            Brand: response.data.Brand || "",
            MRP: response.data.MRP || "",
            selling_price: response.data.selling_price || "",
            capacityInLiters: response.data.capacityInLiters || "",
          });
        } catch (error) {
          console.error("Error fetching water can data:", error);
        }
      }
    };
    fetchWaterCanData();
  }, [isEditMode, initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateWaterCan(initialData._id, formData);
      } else {
        console.log("error")// Make sure this is defined if using create
      }
      onSuccess();
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Label>Brand</Label>
      <Input name="Brand" value={formData.Brand} onChange={handleChange} required />

      <Label>MRP</Label>
      <Input name="MRP" value={formData.MRP} onChange={handleChange} required />

      <Label>Selling Price</Label>
      <Input
        name="selling_price"
        value={formData.selling_price}
        onChange={handleChange}
        required
      />

      <Label>Capacity (Litres)</Label>
      <Input
        name="capacityInLiters"
        value={formData.capacityInLiters}
        onChange={handleChange}
        required
      />

      <div style={{display: "flex", justifyContent: "flex-end"}}><SubmitButton type="submit">{isLoading ? "Updating" : "Update"} </SubmitButton></div>
    </FormWrapper>
  );
};

export default EditWaterCan;
