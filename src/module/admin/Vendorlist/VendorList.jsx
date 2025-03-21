import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Select } from "antd";
import { Link } from "react-router-dom";
import { Container, Title, StyledTable, ModalContent, ButtonGroup, FilterContainer } from "./VendorList.styles";

const { Option } = Select;

const VendorList = () => {
    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("Pending");

    useEffect(() => {
        const dummyData = [
            { 
                key: "1", 
                name: "John Doe", 
                email: "john@example.com", 
                phoneNumber: "9876543210", 
                address: "123 Main Street", 
                city: "New York", 
                state: "NY", 
                pincode: "10001", 
                deliveryStartTime: "8:00 AM", 
                deliveryEndTime: "12:00 PM", 
                deliverableCans: 10, 
                status: "Pending" 
            },
            { 
                key: "2", 
                name: "Jane Smith", 
                email: "jane@example.com", 
                phoneNumber: "9876543211", 
                address: "456 Elm Street", 
                city: "Los Angeles", 
                state: "CA", 
                pincode: "90001", 
                deliveryStartTime: "9:00 AM", 
                deliveryEndTime: "1:00 PM", 
                deliverableCans: 20, 
                status: "Approved" 
            },
            { 
                key: "3", 
                name: "Michael Johnson", 
                email: "michael@example.com", 
                phoneNumber: "9876543212", 
                address: "789 Pine Street", 
                city: "Chicago", 
                state: "IL", 
                pincode: "60601", 
                deliveryStartTime: "7:30 AM", 
                deliveryEndTime: "11:30 AM", 
                deliverableCans: 15, 
                status: "Rejected" 
            }
        ];

        setVendors(dummyData);
        setFilteredVendors(dummyData.filter(vendor => vendor.status === statusFilter));
    }, []);

    useEffect(() => {
        setFilteredVendors(vendors.filter(vendor => vendor.status === statusFilter));
    }, [statusFilter, vendors]);

    const handleStatusClick = (vendor) => {
        setSelectedVendor(vendor);
        setIsModalOpen(true);
    };

    const handleApprove = () => {
        setVendors(prevVendors => prevVendors.map(v => v.key === selectedVendor.key ? { ...v, status: "Approved" } : v));
        setIsModalOpen(false);
    };

    const handleReject = () => {
        setVendors(prevVendors => prevVendors.map(v => v.key === selectedVendor.key ? { ...v, status: "Rejected" } : v));
        setIsModalOpen(false);
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
        { title: "Delivery Start Time", dataIndex: "deliveryStartTime", key: "deliveryStartTime" },
        { title: "Delivery End Time", dataIndex: "deliveryEndTime", key: "deliveryEndTime" },
        { 
            title: "Status", 
            dataIndex: "status", 
            key: "status", 
            render: (_, record) => (
                <Link to="#" onClick={() => handleStatusClick(record)}>
                    {record.status}
                </Link>
            ) 
        }
    ];

    return (
        <Container>
            <Title>Vendor List</Title>

            {/* Dropdown Filter */}
            <FilterContainer>
                <span style={{ marginTop: "8px" }}>Filter by Status: </span>
                <Select defaultValue="Pending" style={{ width: 150 }} onChange={handleStatusFilterChange}>
                    <Option value="Pending">Pending</Option>
                    <Option value="Approved">Approved</Option>
                    <Option value="Rejected">Rejected</Option>
                </Select>
            </FilterContainer>

            <StyledTable>
                <Table 
                    columns={columns} 
                    dataSource={filteredVendors} 
                    pagination={{ pageSize: 5, showSizeChanger: false }} 
                    rowKey="key" 
                />
            </StyledTable>

            <Modal
                title="Vendor Details"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
            >
                {selectedVendor && (
                    <ModalContent>
                        <p><strong>Name:</strong> {selectedVendor.name}</p>
                        <p><strong>Email:</strong> {selectedVendor.email}</p>
                        <p><strong>Phone Number:</strong> {selectedVendor.phoneNumber}</p>
                        <p><strong>Address:</strong> {selectedVendor.address}</p>
                        <p><strong>City:</strong> {selectedVendor.city}</p>
                        <p><strong>State:</strong> {selectedVendor.state}</p>
                        <p><strong>Pincode:</strong> {selectedVendor.pincode}</p>
                        <p><strong>Delivery Start Time:</strong> {selectedVendor.deliveryStartTime}</p>
                        <p><strong>Delivery End Time:</strong> {selectedVendor.deliveryEndTime}</p>
                        <p><strong>Deliverable Cans:</strong> {selectedVendor.deliverableCans}</p>

                        <ButtonGroup>
                            <Button type="primary" onClick={handleApprove}>Approve</Button>
                            <Button type="danger" onClick={handleReject}>Reject</Button>
                        </ButtonGroup>
                    </ModalContent>
                )}
            </Modal>
        </Container>
    );
};

export default VendorList;
