import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getWaterCanById, updateWaterCan } from "../../../../api/waterCanApi";
import { Form, Input, InputNumber, Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;

  form {
    display: flex;
    flex-direction: column;
  }

  .ant-form-item {
    margin-bottom: 15px;
  }

  .ant-btn {
    width: 150px;
  }

  .ant-modal .ant-modal-title{
    text-align: center;
  }

  .ant-form-item .ant-form-item-control-input-content {
    display: flex;
    justify-content: flex-end;
    align-items: end;
    margin-top: 5px;
  }

  .ant-form-item .ant-form-item-control-input{
      min-height: 0px;
  }
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

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const EditWaterCan = ({ onSuccess, onClose, isEditMode, initialData }) => {

    const [form] = Form.useForm();
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
    // <FormWrapper onSubmit={handleSubmit}>
    //   <Label>Brand</Label>
    //   <Input name="Brand" value={formData.Brand} onChange={handleChange} required />

    //   <Label>MRP</Label>
    //   <Input name="MRP" value={formData.MRP} onChange={handleChange} required />

    //   <Label>Selling Price</Label>
    //   <Input
        // name="selling_price"
        // value={formData.selling_price}
        // onChange={handleChange}
        // required
    //   />

    //   <Label>Capacity (Litres)</Label>
    //   <Input
    //     name="capacityInLiters"
    //     value={formData.capacityInLiters}
    //     onChange={handleChange}
    //     required
    //   />

    //   <div style={{display: "flex", justifyContent: "flex-end"}}><SubmitButton type="submit">{isLoading ? "Updating" : "Update"} </SubmitButton></div>
    // </FormWrapper>

        <FormContainer>
          <Title>Edit Water Can</Title>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Brand"
              name="Brand"
              rules={[{ required: true, message: "Please enter brand name" }]}
            >
              <Input name="Brand" value={formData.Brand} onChange={handleChange} required />
            </Form.Item>
    
            <Form.Item
              label="MRP"
              name="MRP"
              rules={[{ required: true, message: "Please enter MRP" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} name="MRP" value={formData.MRP} onChange={handleChange} required />
            </Form.Item>
    
            <Form.Item
              label="Selling Price"
              name="selling_price"
              rules={[{ required: true, message: "Please enter selling price" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }}      name="selling_price"
        value={formData.selling_price}
        onChange={handleChange}
        required/>
            </Form.Item>
    
            <Form.Item
              label="Capacity (Litres)"
              name="capacityInLiters"
              rules={[{ required: true, message: "Please enter capacity in litres" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }}       name="capacityInLiters"
        value={formData.capacityInLiters}
        onChange={handleChange}
        required/>
            </Form.Item>
    
            <div style={{display: "flex", justifyContent: "flex-end"}}><SubmitButton type="submit">{isLoading ? "Updating" : "Update"} </SubmitButton></div>
          </Form>
          <ToastContainer />
        </FormContainer>
  );
};

export default EditWaterCan;
