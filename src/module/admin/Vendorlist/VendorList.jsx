import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Select } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { getApplication } from "../../../api/serviceapi";
import { Container, Title, StyledTable, ModalContent, ButtonGroup, FilterContainer } from "./VendorList.styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;

const VendorList = () => {
    const BASE_URL = "http://localhost:5000/vendorapplication";
    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");

    // Fetch vendors from backend
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const data = await getApplication(); 
                console.log("Fetched Vendors:", data); 
                setVendors(data);
                setFilteredVendors(data);
            } catch (error) {
                console.error("Error fetching vendor applications:", error);
            }
        };
        fetchVendors();
    }, []);

    useEffect(() => {
        if (statusFilter === "All") {
            setFilteredVendors(vendors);
        } else {
            setFilteredVendors(vendors.filter(vendor => vendor.status === statusFilter));
        }
    }, [statusFilter, vendors]);

    const handleStatusClick = (vendor) => {
        setSelectedVendor(vendor);
        setIsModalOpen(true);
    };

    const handleApprove = async () => {
        if (!selectedVendor || !selectedVendor._id) {
            console.error("Error: No selected vendor or missing _id");
            return;
        }
        
        console.log("Approving vendor with ID:", selectedVendor._id); // Debug log
    
        try {
            await axios.put(`${BASE_URL}/approveVendorApplication/${selectedVendor._id}`, { status: "approved" }); 
            setVendors(prev => prev.map(v => v._id === selectedVendor._id ? { ...v, status: "approved" } : v));
            setIsModalOpen(false);
            toast.success("Vendor approved successfully!");
        } catch (error) {
            console.error("Error updating vendor status:", error.response?.data || error.message);
        }
    };
    
    
    const handleReject = async () => {
        if (!selectedVendor) return;
    
        try {
            await axios.put(`${BASE_URL}/rejectVendorApplication/${selectedVendor._id}`, { status: "rejected" }); 
            setVendors(prev => prev.map(v => v._id === selectedVendor._id ? { ...v, status: "rejected" } : v));
            setIsModalOpen(false);
            toast.error("Vendor rejected successfully!");
        } catch (error) {
            console.error("Error updating vendor status:", error);
        }
    };
    

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
        { title: "Delivery Start Time", dataIndex: "delivery_start_time", key: "delivery_start_time" },
        { title: "Delivery End Time", dataIndex: "delivery_end_time", key: "delivery_end_time" },
        { 
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => {
                let color = "";
                let statusText = record.status.charAt(0).toUpperCase() + record.status.slice(1); // Capitalize first letter
        
                if (record.status === "pending") color = "orange"; 
                if (record.status === "approved") color = "green"; 
                if (record.status === "rejected") color = "red";
        
                return (
                    <Link to="#" onClick={() => handleStatusClick(record)} style={{ color, fontWeight: "bold" }}>
                        {statusText} 
                    </Link>
        
                );
            }
        }
    ];
    
    return (
        <Container>
             <ToastContainer />  
            <Title>Vendor List</Title>

            {/* Dropdown Filter */}
            <FilterContainer>
                <span style={{ marginTop: "8px" }}>Filter by Status: </span>
                <Select defaultValue="All" style={{ width: 150 }} onChange={handleStatusFilterChange}>
                    <Option value="All">All</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="approved">Approved</Option>
                    <Option value="rejected">Rejected</Option>
                </Select>
            </FilterContainer>

            <StyledTable>
                <Table 
                    columns={columns} 
                    dataSource={filteredVendors} 
                    pagination={{ pageSize: 5, showSizeChanger: false }} 
                    rowKey="_id" 
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
                        <p><strong>Delivery Start Time:</strong> {selectedVendor.delivery_start_time}</p>
                        <p><strong>Delivery End Time:</strong> {selectedVendor.delivery_end_time}</p>
                        <p><strong>Deliverable Cans:</strong> {selectedVendor.deliverable_water_cans.length}</p>

                        
                        <ButtonGroup>
              <Button
                type="primary"
                onClick={handleApprove}
                disabled={selectedVendor?.status === "approved"}
              >
                Approve
              </Button>
              <Button
                type="primary"
                onClick={handleReject}
                disabled={selectedVendor?.status === "rejected"}
              >
                Reject
              </Button>
            </ButtonGroup>
                    </ModalContent>
                )}
            </Modal>
        </Container>
    );
};

export default VendorList;
