import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { createWaterCan } from "../../../../api/waterCanApi";
import { FormContainer, Title } from "./CreateWaterCanForm.styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateWaterCanForm = ({ onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createWaterCan(values);
      toast.success("Water can created successfully!");

      form.resetFields(); // Clear form fields
      onSuccess(); // Fetch updated data
      setTimeout(() => onClose(), 500); // Ensure modal closes smoothly
    } catch (error) {
      console.error("Error creating water can:", error);
      toast.error("Failed to create water can");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Title>Create Water Can</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
  label="Brand"
  name="Brand"
  rules={[
    { required: true, message: "Please enter brand name" },
    {
      pattern: /^[A-Za-z\s]+$/,
      message: "Brand name should contain only letters",
    },
  ]}
>
  <Input placeholder="Enter brand" />
</Form.Item>


        <Form.Item
          label="MRP"
          name="MRP"
          rules={[{ required: true, message: "Please enter MRP" }]}
        >
          <InputNumber
  min={1}
  style={{ width: "100%" }}
  parser={(value) => value.replace(/[^\d]/g, '')} // removes non-numeric input
  formatter={(value) => `${value}`} // keeps it plain
/>
        </Form.Item>

        <Form.Item
          label="Selling Price"
          name="selling_price"
          rules={[{ required: true, message: "Please enter selling price" }]}
        >
          <InputNumber
  min={1}
  style={{ width: "100%" }}
  parser={(value) => value.replace(/[^\d]/g, '')} // removes non-numeric input
  formatter={(value) => `${value}`} // keeps it plain
/>
        </Form.Item>

        <Form.Item
          label="Capacity (Litres)"
          name="capacityInLiters"
          rules={[{ required: true, message: "Please enter capacity in litres" }]}
        >
          <InputNumber
  min={1}
  style={{ width: "100%" }}
  parser={(value) => value.replace(/[^\d]/g, '')} // removes non-numeric input
  formatter={(value) => `${value}`} // keeps it plain
/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
          {/* <Button style={{ marginLeft: 10 }} onClick={handleClose}>
            Cancel
          </Button> */}
        </Form.Item>
      </Form>
      <ToastContainer />
    </FormContainer>
  );
};
// .ant-form-item .ant-form-item-control-input-content 

export default CreateWaterCanForm;
