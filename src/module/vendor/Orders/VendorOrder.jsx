import React, { useState } from "react";
import {
  Container,
  TabContainer,
  Tab,
  OrderCard,
  UserInfo,
  ViewMoreIcon,
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalFooter,
  CloseTextButton,
} from "./VendorOrder.styles";
import { FaEye, FaTimes } from "react-icons/fa";

const orderData = {
  "9AM-12PM": [
    { id: "ORD001", slNo: 1, name: "Emily Everton", cans: 5, address: "Street 123, City", phone: "1234567890", capacity: "20L" },
    { id: "ORD002", slNo: 2, name: "Charlotte Riley", cans: 3, address: "Street 456, City", phone: "9876543210", capacity: "25L" },
    { id: "ORD003", slNo: 3, name: "Emily Everton", cans: 5, address: "Street 123, City", phone: "1234567890", capacity: "20L" },
    { id: "ORD004", slNo: 4, name: "Charlotte Riley", cans: 3, address: "Street 456, City", phone: "9876543210", capacity: "25L" },
    { id: "ORD005", slNo: 5, name: "Emily Everton", cans: 5, address: "Street 123, City", phone: "1234567890", capacity: "20L" },
    { id: "ORD006", slNo: 6, name: "Charlotte Riley", cans: 3, address: "Street 456, City", phone: "9876543210", capacity: "25L" },
  ],
  "12PM-3PM": [
    { id: "ORD007", slNo: 7, name: "Olivia Willy", cans: 4, address: "Street 789, City", phone: "5678901234", capacity: "30L" },
    { id: "ORD008", slNo: 8, name: "Emily Everton", cans: 5, address: "Street 123, City", phone: "1234567890", capacity: "20L" },
    { id: "ORD009", slNo: 9, name: "Charlotte Riley", cans: 3, address: "Street 456, City", phone: "9876543210", capacity: "25L" },
  ],
  "3PM-6PM": [
    { id: "ORD010", slNo: 10, name: "James Noah", cans: 6, address: "Street 012, City", phone: "3456789012", capacity: "20L" },
    { id: "ORD011", slNo: 11, name: "Emily Everton", cans: 5, address: "Street 123, City", phone: "1234567890", capacity: "20L" },
    { id: "ORD012", slNo: 12, name: "Charlotte Riley", cans: 3, address: "Street 456, City", phone: "9876543210", capacity: "25L" },
    { id: "ORD013", slNo: 13, name: "Emily Everton", cans: 5, address: "Street 123, City", phone: "1234567890", capacity: "20L" },
    { id: "ORD014", slNo: 14, name: "Charlotte Riley", cans: 3, address: "Street 456, City", phone: "9876543210", capacity: "25L" },
    { id: "ORD015", slNo: 15, name: "Emily Everton", cans: 5, address: "Street 123, City", phone: "1234567890", capacity: "20L" },
    { id: "ORD016", slNo: 16, name: "Charlotte Riley", cans: 3, address: "Street 456, City", phone: "9876543210", capacity: "25L" },
    
  ],
  "6PM-9PM": [
    { id: "ORD017", slNo: 17, name: "Joshua Ardam", cans: 2, address: "Street 345, City", phone: "4567890123", capacity: "15L" },
  ],
};

const VendorOrder = () => {
  const [activeTab, setActiveTab] = useState("9AM-12PM");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const closeModal = () => setSelectedOrder(null);

  return (
    <Container>
      <TabContainer>
        {Object.keys(orderData).map((timeSlot) => (
          <Tab key={timeSlot} active={activeTab === timeSlot} onClick={() => setActiveTab(timeSlot)}>
            {timeSlot}
          </Tab>
        ))}
      </TabContainer>

      {orderData[activeTab]?.map((order) => (
        <OrderCard key={order.id}>
          <UserInfo>
            {/* <div><strong>Order ID:</strong> {order.id}</div> */}
            <div><strong>Name:</strong> {order.name}</div>
            <div><strong>No of WaterCans:</strong> {order.cans}</div>
          </UserInfo>
          <ViewMoreIcon onClick={() => setSelectedOrder(order)}>
            <FaEye />
          </ViewMoreIcon>
        </OrderCard>
      ))}

      {selectedOrder && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}><FaTimes /></CloseButton>
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Name:</strong> {selectedOrder.name}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>No of WaterCans:</strong> {selectedOrder.cans}</p>
            <p><strong>Capacity:</strong> {selectedOrder.capacity}</p>
            <ModalFooter>
              {/* <CloseTextButton onClick={closeModal}>Close</CloseTextButton> */}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default VendorOrder;
