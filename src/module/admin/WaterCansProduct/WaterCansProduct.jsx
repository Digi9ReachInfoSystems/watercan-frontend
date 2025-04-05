import React, { useState, useEffect } from "react";
import { Table, Popconfirm } from "antd";
import {
  Container,
  StyledButton,
  StyledHeading,
  CloseButton,
  ModalOverlay,
  ModalContent,
  StyledTable,
} from "./WaterCansProduct.styles";
import { DeleteOutlined } from "@ant-design/icons";
import {
  getAllWaterCans,
  deleteWaterCan,
  getWaterCanById,
} from "../../../api/waterCanApi";
import EditWaterCan from "./EditWaterCans/EditWaterCans";
import { IoClose } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";

const WaterCansProduct = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWaterCan, setEditingWaterCan] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getAllWaterCans();
      setData(
        response.data.map((item) => ({
          ...item,
          key: item._id,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteWaterCan(id);
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting water can:", error);
    }
  };

  const handleCreate = () => {
    setIsEditMode(false);
    setEditingWaterCan(null);
    setIsModalOpen(true);
  };

  const handleEdit = async (id) => {
    try {
      const response = await getWaterCanById(id);
      setEditingWaterCan(response.data);
      setIsEditMode(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching water can by ID:", error);
    }
  };

  const columns = [
    {
      title: "Brand",
      dataIndex: "Brand",
      key: "brand",
    },
    {
      title: "MRP",
      dataIndex: "MRP",
      key: "mrp",
    },
    {
      title: "Selling Price",
      dataIndex: "selling_price",
      key: "sellingPrice",
    },
    {
      title: "Capacity (Litres)",
      dataIndex: "capacityInLiters",
      key: "capacityByLitres",
    },
    {
      title: "Edit/Delete",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" , justifyContent: "center"}}>
          <FiEdit3
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => handleEdit(record._id)}
          />
          <Popconfirm
            title="Are you sure to delete this water can?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Container>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <StyledButton type="primary" onClick={handleCreate}>
            Create Water Can
          </StyledButton>
        </div>
        <StyledHeading>Water Cans List</StyledHeading>
        <StyledTable columns={columns} dataSource={data} pagination={false} />
      </Container>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <EditWaterCan
              onSuccess={() => {
                fetchData();
                setIsModalOpen(false);
              }}
              onClose={() => setIsModalOpen(false)}
              isEditMode={isEditMode}
              initialData={editingWaterCan}
            />
            <CloseButton onClick={() => setIsModalOpen(false)}>
              <IoClose />
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default WaterCansProduct;
