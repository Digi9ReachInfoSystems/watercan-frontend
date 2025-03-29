import React, { useEffect, useState } from "react";
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
  Username,
  Cans,
  UserStatus,
  NoOrders,
} from "./VendorOrder.styles";
import { FaTimes } from "react-icons/fa";
import { TbDotsVertical } from "react-icons/tb";
import { getOrdersByVendor } from "../../../api/serviceapi";
import noorder from "../../../assets/noOrder.png"

// Static time slots for filtering
const STATIC_TIME_SLOTS = ["10AM-12PM", "12PM-3PM", "3PM-6PM", "6PM-9PM"];

// Normalize API time slot to match our static time slots
const normalizeTimeSlot = (timeSlot) => {
  if (!timeSlot) return null;

  const mapping = {
    "10:00 AM - 12:00 PM": "10AM-12PM",
    "12:00 PM - 03:00 PM": "12PM-3PM",
    "03:00 PM - 06:00 PM": "3PM-6PM",
    "06:00 PM - 09:00 PM": "6PM-9PM",
  };

  const normalized = mapping[timeSlot.trim()] || timeSlot; 
  console.log(`Original: ${timeSlot} → Normalized: ${normalized}`);
  return normalized;
};

const VendorOrder = () => {
  const [activeTab, setActiveTab] = useState(STATIC_TIME_SLOTS[0]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const closeModal = () => setSelectedOrder(null);

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  const fetchVendorOrders = async () => {
    try {
      const data = await getOrdersByVendor();
      console.log("Fetched orders from API:", data);

      if (!data || data.length === 0) {
        console.warn("No orders received from API");
        setOrders([]);
        return;
      }

      // Normalize time slots before storing orders
      const normalizedOrders = data.map((order) => ({
        ...order,
        timeSlot: normalizeTimeSlot(order.timeSlot),
      }));

      setOrders(normalizedOrders);
    } catch (error) {
      console.error("Error fetching vendor orders:", error);
    }
  };

  // Filter orders based on selected tab
  const filteredOrders = orders.filter((order) => order.timeSlot === activeTab);

  return (
    <Container>
      <TabContainer>
        {STATIC_TIME_SLOTS.map((timeSlot) => (
          <Tab
            key={timeSlot}
            active={activeTab === timeSlot}
            onClick={() => setActiveTab(timeSlot)}
          >
            {timeSlot}
          </Tab>
        ))}
      </TabContainer>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderCard key={order._id}>
            <UserInfo>
              <Username>{order.user_id?.name?.charAt(0).toUpperCase() + order.user_id?.name?.slice(1).toLowerCase()}</Username>
              <Cans>No of WaterCans:{order.watercan_id?.capacityInLiters}</Cans>
            </UserInfo>

            <UserStatus status={order.orderStatus}>{order.orderStatus}</UserStatus>   

            <ViewMoreIcon onClick={() => setSelectedOrder(order)}>
            <TbDotsVertical />
            </ViewMoreIcon>
          </OrderCard>
        ))
      ) : (
<NoOrders>
  <img src={noorder} alt="No Orders" />
  <p>No orders available</p>
</NoOrders>      )}

      {selectedOrder && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>
              <FaTimes />
            </CloseButton>
            <h3>Order Details</h3>
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Name:</strong> {selectedOrder.user_id?.name}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.user_id?.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedOrder.user_id?.phoneNumber}
            </p>
            <p>
              <strong>No of WaterCans:</strong> {selectedOrder.watercan_id?.capacityInLiters}
            </p>
            <p>
              <strong>Brand:</strong> {selectedOrder.watercan_id?.Brand}
            </p>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default VendorOrder;
