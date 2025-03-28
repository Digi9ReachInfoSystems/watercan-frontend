import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Select } from "antd";
// import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Container, Title, StyledTable, ModalContent, FilterContainer } from "./OrdersList.styles";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;

const OrdersList = () => {
    const BASE_URL = "http://localhost:5000/orders"; 
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");

    // Dummy Data for Testing
    useEffect(() => {
        const dummyOrders = [
            { 
                _id: "1", username: "John Doe", vendorName: "ABC Ltd.", cans: 10, 
                address: "123 Street", city: "New York", state: "NY", pincode: "10001",
                status: "Order Placed", orderDate: "2024-03-25"
            },
            { 
                _id: "2", username: "Jane Smith", vendorName: "XYZ Inc.", cans: 5, 
                address: "456 Avenue", city: "Los Angeles", state: "CA", pincode: "90001",
                status: "Shipped", orderDate: "2024-03-24"
            },
            { 
                _id: "3", username: "John Doe", vendorName: "ABC Ltd.", cans: 10, 
                address: "123 Street", city: "New York", state: "NY", pincode: "10001",
                status: "Delivered", orderDate: "2024-03-25"
            },
            { 
                _id: "4", username: "Jane Smith", vendorName: "XYZ Inc.", cans: 5, 
                address: "456 Avenue", city: "Los Angeles", state: "CA", pincode: "90001",
                status: "Cancelled", orderDate: "2024-03-24"
            }
            
        ];
        setOrders(dummyOrders);
        setFilteredOrders(dummyOrders);
    }, []);

    useEffect(() => {
        if (statusFilter === "All") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.status === statusFilter));
        }
    }, [statusFilter, orders]);

    const handleViewClick = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
    };

    const columns = [
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
        { title: "Number of Cans", dataIndex: "cans", key: "cans" },
        { 
            title: "Status", 
            dataIndex: "status", 
            key: "status",
            render: (status) => {
                let color = "";
                if (status === "Order Placed") color = "#FFA500";  // Orange
                if (status === "Shipped") color = "#1890FF";      // Blue
                if (status === "Delivered") color = "#28A745";    // Green
                if (status === "Cancelled") color = "#DC3545";    // Red

                return <span style={{ color, fontWeight: "bold" }}>{status}</span>;
            }
        },
        {
            title: "View More",
            key: "view",
            render: (_, record) => (
                <EyeOutlined
                    style={{ fontSize: "18px", cursor: "pointer", color: "#1890ff" }}
                    onClick={() => handleViewClick(record)}
                />
            ),
        },
    ];

    return (
        <Container>
            <ToastContainer />
            <Title>Orders List</Title>

            {/* Dropdown Filter */}
            <FilterContainer>
                <span>Filter by Status:</span>
                <Select defaultValue="All" style={{ width: 150 , marginTop: -5}} onChange={handleStatusFilterChange}>
                    <Option value="All">All</Option>
                    <Option value="Order Placed">Order Placed</Option>
                    <Option value="Shipped">Shipped</Option>
                    <Option value="Delivered">Delivered</Option>
                    <Option value="Cancelled">Cancelled</Option>
                </Select>
            </FilterContainer>

            <StyledTable>
                <Table 
                    columns={columns} 
                    dataSource={filteredOrders} 
                    pagination={{ pageSize: 5, showSizeChanger: false }} 
                    rowKey="_id"
                />
            </StyledTable>

            {/* Order Details Modal */}
            <Modal
                title="Order Details"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalOpen(false)}>
                        Close
                    </Button>
                ]}
                centered
            >
                {selectedOrder && (
                    <ModalContent>
                        <p><strong>Username:</strong> {selectedOrder.username}</p>
                        <p><strong>Vendor Name:</strong> {selectedOrder.vendorName}</p>
                        <p><strong>Number of Cans:</strong> {selectedOrder.cans}</p>
                        <p><strong>Delivery Address:</strong> {selectedOrder.address}</p>
                        <p><strong>City:</strong> {selectedOrder.city}</p>
                        <p><strong>State:</strong> {selectedOrder.state}</p>
                        <p><strong>Pincode:</strong> {selectedOrder.pincode}</p>
                        <p><strong>Order Status:</strong> {selectedOrder.status}</p>
                        <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
                    </ModalContent>
                )}
            </Modal>
        </Container>
    );
};

export default OrdersList;
