// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   TabContainer,
//   Tab,
//   OrderCard,
//   UserInfo,
//   ViewMoreIcon,
//   ModalOverlay,
//   ModalContent,
//   CloseButton,
//   ModalFooter,
// } from "./VendorOrder.styles";
// import { FaEye, FaTimes } from "react-icons/fa";
// import { getOrdersByVendor } from "../../../api/serviceapi";

// const normalizeTimeSlot = (timeSlot) => {
//   return timeSlot
//     .replace(/:\d{2} /g, "") // Remove minutes (e.g., "10:00 AM - 12:00 PM" → "10 AM - 12 PM")
//     .replace(/ /g, ""); // Remove extra spaces (e.g., "10 AM - 12 PM" → "10AM-12PM")
// };

// const VendorOrder = () => {
//   const [activeTab, setActiveTab] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   // const [orders, setOrders] = useState([]);
//   const [groupedOrders, setGroupedOrders] = useState({});

//   const closeModal = () => setSelectedOrder(null);

//   useEffect(() => {
//     fetchVendorOrders();
//   }, []);

//   const fetchVendorOrders = async () => {
//     try {
//       const data = await getOrdersByVendor();
//       console.log("Fetched orders:", data); // Debugging

//       if (!data || data.length === 0) {
//         console.warn("No orders received from API");
//         // setOrders([]);
//         return;
//       }

//       // setOrders(data);

//       const groupedData = {};
//       data.forEach((order) => {
//         const normalizedSlot = normalizeTimeSlot(order.timeSlot);
//         console.log("Normalized Time Slot:", normalizedSlot); // Debugging

//         if (!groupedData[normalizedSlot]) {
//           groupedData[normalizedSlot] = [];
//         }
//         groupedData[normalizedSlot].push(order);
//       });

//       console.log("Grouped Orders:", groupedData);
//       setGroupedOrders(groupedData);

//       // Set first available tab as active
//       const firstTab = Object.keys(groupedData)[0] || null;
//       setActiveTab(firstTab);
//     } catch (error) {
//       console.error("Error fetching vendor orders:", error);
//     }
//   };

//   return (
//     <Container>
//       {/* Tabs for Time Slots */}
//       <TabContainer>
//         {Object.keys(groupedOrders).map((timeSlot) => (
//           <Tab
//             key={timeSlot}
//             active={activeTab === timeSlot}
//             onClick={() => setActiveTab(timeSlot)}
//           >
//             {timeSlot}
//           </Tab>
//         ))}
//       </TabContainer>

//       {/* Display Orders */}
//       {activeTab && groupedOrders[activeTab]?.length > 0 ? (
//         groupedOrders[activeTab].map((order) => (
//           <OrderCard key={order.id}>
//             <UserInfo>
//               <div>
//                 <strong>Name:</strong> {order.user_id?.name}
//               </div>
//               <div>
//                 <strong>Address:</strong> {order.user_id?.email}
//               </div>
//               <div>
//                 <strong>Phone Number:</strong> {order.user_id?.phoneNumber}
//               </div>
//               <div>
//                 <strong>No of WaterCans:</strong> {order.watercan_id?.capacityInLiters}
//               </div>
//             </UserInfo>
//             <ViewMoreIcon onClick={() => setSelectedOrder(order)}>
//               <FaEye />
//             </ViewMoreIcon>
//           </OrderCard>
//         ))
//       ) : (
//         <p className="text-center">No orders available</p>
//       )}

//       {/* Order Details Modal */}
//       {selectedOrder && (
//         <ModalOverlay onClick={closeModal}>
//           <ModalContent onClick={(e) => e.stopPropagation()}>
//             <CloseButton onClick={closeModal}>
//               <FaTimes />
//             </CloseButton>
//             <h3>Order Details</h3>
//             <p>
//               <strong>Order ID:</strong> {selectedOrder._id}
//             </p>
//             <p>
//               <strong>Name:</strong> {selectedOrder.user_id?.name}
//             </p>
//             <p>
//               <strong>Address:</strong> {selectedOrder.user_id?.email}
//             </p>
//             <p>
//               <strong>Phone:</strong> {selectedOrder.user_id?.phoneNumber}
//             </p>
//             <p>
//               <strong>No of WaterCans:</strong> {selectedOrder.watercan_id?.capacityInLiters}
//             </p>
//             <p>
//               <strong>Brand:</strong> {selectedOrder.watercan_id?.Brand}
//             </p>
//             <ModalFooter></ModalFooter>
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </Container>
//   );
// };

// export default VendorOrder;


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
} from "./VendorOrder.styles";
import { FaEye, FaTimes } from "react-icons/fa";
import { getOrdersByVendor } from "../../../api/serviceapi";

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

  const normalized = mapping[timeSlot.trim()] || timeSlot; // Use mapping or fallback
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
      {/* Static Time Slots */}
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

      {/* Display Orders */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderCard key={order.id}>
            <UserInfo>
              <div>
                <strong>Name:</strong> {order.user_id?.name}
              </div>
              <div>
                <strong>Address:</strong> {order.user_id?.email}
              </div>
              <div>
                <strong>Phone Number:</strong> {order.user_id?.phoneNumber}
              </div>
              <div>
                <strong>No of WaterCans:</strong> {order.watercan_id?.capacityInLiters}
              </div>
            </UserInfo>
            <ViewMoreIcon onClick={() => setSelectedOrder(order)}>
              <FaEye />
            </ViewMoreIcon>
          </OrderCard>
        ))
      ) : (
        <p className="text-center">No orders available</p>
      )}

      {/* Order Details Modal */}
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
