// import React, { useState, useEffect } from "react";
// import { Table, Button, Popconfirm } from "antd";
// import { Container, StyledButton, StyledHeading,CloseButton, ModalOverlay, ModalContent } from "./WaterCansProduct.styles";
// import { DeleteOutlined } from "@ant-design/icons";
// import { getAllWaterCans , deleteWaterCan} from "../../../api/waterCanApi";
// import CreateWaterCanForm from "./createwaterCanForm/CreateWaterCanForm";
// import { StyledTable } from "./WaterCansProduct.styles";

// const WaterCansProduct = () => {
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getAllWaterCans();
//         setData(
//           response.data.map((item) => ({
//             ...item,
//             key: item._id, // Using _id as key
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await deleteWaterCan(id); // Await API response
//       setData((prevData) => prevData.filter((item) => item._id !== id));
//     } catch (error) {
//       console.error("Error deleting water can:", error);
//     }
//   };
  

//   const columns = [
//     {
//       title: "Brand",
//       dataIndex: "Brand",
//       key: "brand",
//     },
//     {
//       title: "MRP",
//       dataIndex: "MRP",
//       key: "mrp",
//     },
//     {
//       title: "Selling Price",
//       dataIndex: "selling_price",
//       key: "sellingPrice",
//     },
//     {
//       title: "Capacity (Litres)",
//       dataIndex: "capacityInLiters",
//       key: "capacityByLitres",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Popconfirm
//           title="Are you sure to delete this water can?"
//           onConfirm={() => handleDelete(record._id)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
//         </Popconfirm>
//       ),
//     },
//   ];

//   const handleCreate = () => {
//     setIsModalOpen(true);
//   };

//   return (
//     <>
//     <Container>
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <StyledButton type="primary" onClick={handleCreate}>Create Water Can</StyledButton>
//       </div>
//       <StyledHeading>Water Cans List</StyledHeading>
//       <StyledTable columns={columns} dataSource={data} pagination={false} />
//     </Container>

//     {
//       isModalOpen && (
//         <ModalOverlay>
//           <ModalContent>
//             <CreateWaterCanForm onSuccess={() => {}} onClose={() => setIsModalOpen(false)} />
//             <CloseButton onClick={() => setIsModalOpen(false)}>X</CloseButton>
//           </ModalContent>
//         </ModalOverlay>
//       )
//     }

//     </>
//   );
// };

// export default WaterCansProduct;

import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm } from "antd";
import { Container, StyledButton, StyledHeading, CloseButton, ModalOverlay, ModalContent } from "./WaterCansProduct.styles";
import { DeleteOutlined } from "@ant-design/icons";
import { getAllWaterCans, deleteWaterCan } from "../../../api/waterCanApi";
import CreateWaterCanForm from "./createwaterCanForm/CreateWaterCanForm";
import { StyledTable } from "./WaterCansProduct.styles";
import { IoClose } from "react-icons/io5";

const WaterCansProduct = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await getAllWaterCans();
      setData(
        response.data.map((item) => ({
          ...item,
          key: item._id, // Using _id as key
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this water can?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
        </Popconfirm>
      ),
    },
  ];

  const handleCreate = () => {
    setIsModalOpen(true);
  };

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
            <CreateWaterCanForm 
              onSuccess={fetchData} // Call fetchData after creating water can
              onClose={() => setIsModalOpen(false)} 
            />
            <CloseButton onClick={() => setIsModalOpen(false)}> <IoClose /> </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default WaterCansProduct;
