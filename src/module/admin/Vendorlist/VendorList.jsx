// import React, { useEffect, useState } from "react";
// import { Table } from "antd";
// import { Container } from "./VendorList.styles";

// const VendorList = () => {
//     const [vendors, setVendors] = useState([]);

//     // Fetch vendor data (Replace with API call)
//     useEffect(() => {
//         const dummyData = [
//             {
//                 key: "1",
//                 name: "John Doe",
//                 email: "john@example.com",
//                 address: "123 Main St",
//                 phoneNumber: "9876543210",
//                 pincode: "110001",
//                 city: "New York",
//                 state: "NY"
//             },
//             {
//                 key: "2",
//                 name: "Jane Smith",
//                 email: "jane@example.com",
//                 address: "456 Elm St",
//                 phoneNumber: "9876543211",
//                 pincode: "110002",
//                 city: "Los Angeles",
//                 state: "CA"
//             },
//             {
//                 key: "3",
//                 name: "Jane",
//                 email: "j@example.com",
//                 address: "456 St",
//                 phoneNumber: "9876543211",
//                 pincode: "110090",
//                 city: "Bengaluru",
//                 state: "KA"
//             },
//             {
//                 key: "4",
//                 name: "Alice",
//                 email: "alice@example.com",
//                 address: "789 Pine St",
//                 phoneNumber: "9876543222",
//                 pincode: "110003",
//                 city: "San Francisco",
//                 state: "CA"
//             },
//             {
//                 key: "5",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "6",
//                 name: "Charlie",
//                 email: "charlie@example.com",
//                 address: "202 Maple St",
//                 phoneNumber: "9876543244",
//                 pincode: "110005",
//                 city: "Austin",
//                 state: "TX"
//             },
//             {
//                 key: "7",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "8",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "9",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "10",
//                 name: "John Doe",
//                 email: "john@example.com",
//                 address: "123 Main St",
//                 phoneNumber: "9876543210",
//                 pincode: "110001",
//                 city: "New York",
//                 state: "NY"
//             },
//             {
//                 key: "11",
//                 name: "Jane Smith",
//                 email: "jane@example.com",
//                 address: "456 Elm St",
//                 phoneNumber: "9876543211",
//                 pincode: "110002",
//                 city: "Los Angeles",
//                 state: "CA"
//             },
//             {
//                 key: "12",
//                 name: "Jane",
//                 email: "j@example.com",
//                 address: "456 St",
//                 phoneNumber: "9876543211",
//                 pincode: "110090",
//                 city: "Bengaluru",
//                 state: "KA"
//             },
//             {
//                 key: "13",
//                 name: "Alice",
//                 email: "alice@example.com",
//                 address: "789 Pine St",
//                 phoneNumber: "9876543222",
//                 pincode: "110003",
//                 city: "San Francisco",
//                 state: "CA"
//             },
//             {
//                 key: "14",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "15",
//                 name: "Charlie",
//                 email: "charlie@example.com",
//                 address: "202 Maple St",
//                 phoneNumber: "9876543244",
//                 pincode: "110005",
//                 city: "Austin",
//                 state: "TX"
//             },
//             {
//                 key: "16",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "17",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "18",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "19",
//                 name: "John Doe",
//                 email: "john@example.com",
//                 address: "123 Main St",
//                 phoneNumber: "9876543210",
//                 pincode: "110001",
//                 city: "New York",
//                 state: "NY"
//             },
//             {
//                 key: "20",
//                 name: "Jane Smith",
//                 email: "jane@example.com",
//                 address: "456 Elm St",
//                 phoneNumber: "9876543211",
//                 pincode: "110002",
//                 city: "Los Angeles",
//                 state: "CA"
//             },
//             {
//                 key: "21",
//                 name: "Jane",
//                 email: "j@example.com",
//                 address: "456 St",
//                 phoneNumber: "9876543211",
//                 pincode: "110090",
//                 city: "Bengaluru",
//                 state: "KA"
//             },
//             {
//                 key: "22",
//                 name: "Alice",
//                 email: "alice@example.com",
//                 address: "789 Pine St",
//                 phoneNumber: "9876543222",
//                 pincode: "110003",
//                 city: "San Francisco",
//                 state: "CA"
//             },
//             {
//                 key: "23",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "24",
//                 name: "Charlie",
//                 email: "charlie@example.com",
//                 address: "202 Maple St",
//                 phoneNumber: "9876543244",
//                 pincode: "110005",
//                 city: "Austin",
//                 state: "TX"
//             },
//             {
//                 key: "25",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "26",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "27",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "28",
//                 name: "John Doe",
//                 email: "john@example.com",
//                 address: "123 Main St",
//                 phoneNumber: "9876543210",
//                 pincode: "110001",
//                 city: "New York",
//                 state: "NY"
//             },
//             {
//                 key: "29",
//                 name: "Jane Smith",
//                 email: "jane@example.com",
//                 address: "456 Elm St",
//                 phoneNumber: "9876543211",
//                 pincode: "110002",
//                 city: "Los Angeles",
//                 state: "CA"
//             },
//             {
//                 key: "30",
//                 name: "Jane",
//                 email: "j@example.com",
//                 address: "456 St",
//                 phoneNumber: "9876543211",
//                 pincode: "110090",
//                 city: "Bengaluru",
//                 state: "KA"
//             },
//             {
//                 key: "31",
//                 name: "Alice",
//                 email: "alice@example.com",
//                 address: "789 Pine St",
//                 phoneNumber: "9876543222",
//                 pincode: "110003",
//                 city: "San Francisco",
//                 state: "CA"
//             },
//             {
//                 key: "32",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "33",
//                 name: "Charlie",
//                 email: "charlie@example.com",
//                 address: "202 Maple St",
//                 phoneNumber: "9876543244",
//                 pincode: "110005",
//                 city: "Austin",
//                 state: "TX"
//             },
//             {
//                 key: "34",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "35",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//             {
//                 key: "36",
//                 name: "Bob",
//                 email: "bob@example.com",
//                 address: "101 Cedar St",
//                 phoneNumber: "9876543233",
//                 pincode: "110004",
//                 city: "Seattle",
//                 state: "WA"
//             },
//         ];
//         setVendors(dummyData);
//     }, []);

//     // Define table columns
//     const columns = [
//         { title: "Name", dataIndex: "name", key: "name" },
//         { title: "Email", dataIndex: "email", key: "email" },
//         // { title: "Address", dataIndex: "address", key: "address" },
//         { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
//         // { title: "Pincode", dataIndex: "pincode", key: "pincode" },
//         // { title: "City", dataIndex: "city", key: "city" },
//         // { title: "State", dataIndex: "state", key: "state" },
//     ];

//     return (
//         <Container>
//             <h2>Vendor List</h2>
//             <Table 
//                 columns={columns} 
//                 dataSource={vendors} 
//                 pagination={{ pageSize: 5, showSizeChanger: false }} // Ensuring only 5 per page
//             />
//         </Container>
//     );
// };

// export default VendorList;




// import React, { useEffect, useState } from "react";
// import { Table } from "antd";
// import { Container } from "./VendorList.styles";

// const VendorList = () => {
//     const [vendors, setVendors] = useState([]);

//     // Fetch vendor data (Replace with API call)
//     useEffect(() => {
//         const dummyData = [
//             { key: "1", name: "John Doe", email: "john@example.com", phoneNumber: "9876543210", deliveryStartTime: "8:00 AM", deliveryEndTime: "12:00 PM", status: "Active" },
//             { key: "2", name: "Jane Smith", email: "jane@example.com", phoneNumber: "9876543211", deliveryStartTime: "9:00 AM", deliveryEndTime: "1:00 PM", status: "Inactive" },
//             { key: "3", name: "Michael Johnson", email: "michael@example.com", phoneNumber: "9876543212", deliveryStartTime: "7:30 AM", deliveryEndTime: "11:30 AM", status: "Active" },
//             { key: "4", name: "Emily Davis", email: "emily@example.com", phoneNumber: "9876543213", deliveryStartTime: "10:00 AM", deliveryEndTime: "2:00 PM", status: "Inactive" },
//             { key: "5", name: "Daniel Brown", email: "daniel@example.com", phoneNumber: "9876543214", deliveryStartTime: "6:00 AM", deliveryEndTime: "10:00 AM", status: "Active" },
//             { key: "6", name: "Sarah Wilson", email: "sarah@example.com", phoneNumber: "9876543215", deliveryStartTime: "9:30 AM", deliveryEndTime: "1:30 PM", status: "Inactive" },
//             { key: "7", name: "David Lee", email: "david@example.com", phoneNumber: "9876543216", deliveryStartTime: "7:00 AM", deliveryEndTime: "11:00 AM", status: "Active" },
//             { key: "8", name: "Sophia Taylor", email: "sophia@example.com", phoneNumber: "9876543217", deliveryStartTime: "8:30 AM", deliveryEndTime: "12:30 PM", status: "Inactive" },
//             { key: "9", name: "James Anderson", email: "james@example.com", phoneNumber: "9876543218", deliveryStartTime: "10:30 AM", deliveryEndTime: "2:30 PM", status: "Active" },
//             { key: "10", name: "Olivia Thomas", email: "olivia@example.com", phoneNumber: "9876543219", deliveryStartTime: "6:30 AM", deliveryEndTime: "10:30 AM", status: "Inactive" },
//             { key: "11", name: "William Martinez", email: "william@example.com", phoneNumber: "9876543220", deliveryStartTime: "9:00 AM", deliveryEndTime: "1:00 PM", status: "Active" },
//             { key: "12", name: "Isabella Jackson", email: "isabella@example.com", phoneNumber: "9876543221", deliveryStartTime: "8:00 AM", deliveryEndTime: "12:00 PM", status: "Inactive" },
//             { key: "13", name: "Benjamin White", email: "benjamin@example.com", phoneNumber: "9876543222", deliveryStartTime: "7:30 AM", deliveryEndTime: "11:30 AM", status: "Active" },
//             { key: "14", name: "Mia Harris", email: "mia@example.com", phoneNumber: "9876543223", deliveryStartTime: "10:00 AM", deliveryEndTime: "2:00 PM", status: "Inactive" },
//             { key: "15", name: "Lucas Clark", email: "lucas@example.com", phoneNumber: "9876543224", deliveryStartTime: "6:00 AM", deliveryEndTime: "10:00 AM", status: "Active" },
//             { key: "16", name: "Charlotte Lewis", email: "charlotte@example.com", phoneNumber: "9876543225", deliveryStartTime: "9:30 AM", deliveryEndTime: "1:30 PM", status: "Inactive" },
//             { key: "17", name: "Alexander Hall", email: "alexander@example.com", phoneNumber: "9876543226", deliveryStartTime: "7:00 AM", deliveryEndTime: "11:00 AM", status: "Active" },
//             { key: "18", name: "Amelia Young", email: "amelia@example.com", phoneNumber: "9876543227", deliveryStartTime: "8:30 AM", deliveryEndTime: "12:30 PM", status: "Inactive" },
//             { key: "19", name: "Ethan King", email: "ethan@example.com", phoneNumber: "9876543228", deliveryStartTime: "10:30 AM", deliveryEndTime: "2:30 PM", status: "Active" },
//             { key: "20", name: "Harper Wright", email: "harper@example.com", phoneNumber: "9876543229", deliveryStartTime: "6:30 AM", deliveryEndTime: "10:30 AM", status: "Inactive" },
//             { key: "21", name: "Daniel Lopez", email: "daniel.lopez@example.com", phoneNumber: "9876543230", deliveryStartTime: "9:00 AM", deliveryEndTime: "1:00 PM", status: "Active" },
//             { key: "22", name: "Ella Hill", email: "ella.hill@example.com", phoneNumber: "9876543231", deliveryStartTime: "8:00 AM", deliveryEndTime: "12:00 PM", status: "Inactive" },
//             { key: "23", name: "Henry Scott", email: "henry.scott@example.com", phoneNumber: "9876543232", deliveryStartTime: "7:30 AM", deliveryEndTime: "11:30 AM", status: "Active" },
//             { key: "24", name: "Grace Green", email: "grace.green@example.com", phoneNumber: "9876543233", deliveryStartTime: "10:00 AM", deliveryEndTime: "2:00 PM", status: "Inactive" },
//             { key: "25", name: "Matthew Adams", email: "matthew.adams@example.com", phoneNumber: "9876543234", deliveryStartTime: "6:00 AM", deliveryEndTime: "10:00 AM", status: "Active" },
//             { key: "26", name: "Lily Baker", email: "lily.baker@example.com", phoneNumber: "9876543235", deliveryStartTime: "9:30 AM", deliveryEndTime: "1:30 PM", status: "Inactive" },
//             { key: "27", name: "Samuel Nelson", email: "samuel.nelson@example.com", phoneNumber: "9876543236", deliveryStartTime: "7:00 AM", deliveryEndTime: "11:00 AM", status: "Active" },
//             { key: "28", name: "Zoe Carter", email: "zoe.carter@example.com", phoneNumber: "9876543237", deliveryStartTime: "8:30 AM", deliveryEndTime: "12:30 PM", status: "Inactive" },
//             { key: "29", name: "Andrew Perez", email: "andrew.perez@example.com", phoneNumber: "9876543238", deliveryStartTime: "10:30 AM", deliveryEndTime: "2:30 PM", status: "Active" },
//             { key: "30", name: "Chloe Turner", email: "chloe.turner@example.com", phoneNumber: "9876543239", deliveryStartTime: "6:30 AM", deliveryEndTime: "10:30 AM", status: "Inactive" }
//         ];

//         setVendors(dummyData);
//     }, []);

//         // Define table columns
//         const columns = [
//             { title: "Name", dataIndex: "name", key: "name" },
//             { title: "Email", dataIndex: "email", key: "email" },
//             { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
//             { title: "Delivery Start Time", dataIndex: "deliveryStartTime", key: "deliveryStartTime" },
//             { title: "Delivery End Time", dataIndex: "deliveryEndTime", key: "deliveryEndTime" },
//             { title: "Status", dataIndex: "status", key: "status" }
//         ];

//     return <Table columns={columns} dataSource={vendors} pagination={{ pageSize: 5, showSizeChanger: false }} rowKey="key" />;
// };

// export default VendorList;



import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Container, Title, StyledTable } from "./VendorList.styles";

const VendorList = () => {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const dummyData = [
            { key: "1", name: "John Doe", email: "john@example.com", phoneNumber: "9876543210", deliveryStartTime: "8:00 AM", deliveryEndTime: "12:00 PM", status: "Pending" },
            { key: "2", name: "Jane Smith", email: "jane@example.com", phoneNumber: "9876543211", deliveryStartTime: "9:00 AM", deliveryEndTime: "1:00 PM", status: "Pending" },
            { key: "3", name: "Michael Johnson", email: "michael@example.com", phoneNumber: "9876543212", deliveryStartTime: "7:30 AM", deliveryEndTime: "11:30 AM", status: "Pending" },
        ];

        setVendors(dummyData);
    }, []);

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
        { title: "Delivery Start Time", dataIndex: "deliveryStartTime", key: "deliveryStartTime" },
        { title: "Delivery End Time", dataIndex: "deliveryEndTime", key: "deliveryEndTime" },
        { title: "Status", dataIndex: "status", key: "status" }
    ];

    return (
        <Container>
            <Title>Vendor List</Title>
            <StyledTable>
                <Table 
                    columns={columns} 
                    dataSource={vendors} 
                    pagination={{ pageSize: 5, showSizeChanger: false }} 
                    rowKey="key" 
                />
            </StyledTable>
        </Container>
    );
};

export default VendorList;
