import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Select, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Container, Title, StyledTable, ModalContent, FilterContainer } from "./OrdersList.styles";
import {  getOrdersByVendor } from "../../../api/serviceapi";

const { Option } = Select;

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            
            // Get vendor_id from localStorage or any state management
            const vendor_Id = localStorage.getItem("vendor_id") || sessionStorage.getItem("vendor_id");
    
            if (!vendor_Id) {
                console.error("Vendor ID is missing");
                message.error("Vendor ID is missing. Please log in again.");
                return;
            }
    
            const data = await getOrdersByVendor(vendor_Id);
            setOrders(data);
            setFilteredOrders(data);
        } catch (error) {
            message.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };
    

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
                if (status === "Order Placed") color = "#FFA500";
                if (status === "Shipped") color = "#1890FF";
                if (status === "Delivered") color = "#28A745";
                if (status === "Cancelled") color = "#DC3545";

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
            <Title>Orders List</Title>

            <FilterContainer>
                <span>Filter by Status:</span>
                <Select defaultValue="All" style={{ width: 150, marginTop: -5 }} onChange={handleStatusFilterChange}>
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
                    loading={loading}
                />
            </StyledTable>

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

