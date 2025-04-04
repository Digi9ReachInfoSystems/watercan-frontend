import styled from "styled-components";
import { Modal } from "antd";

export const Container = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 95%;
    margin-left: 35px;
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

export const FilterContainer = styled.div`
    display: flex;
    justify-content: end;   
    margin-bottom: 15px;
    
    span {
        font-size: 16px;
        margin-right: 10px;
        font-weight: bold;
    }
`;

export const StyledTable = styled.div`
    .ant-table {
        background: #fff;
        border-radius: 8px;
    }

    .ant-table-thead > tr > th {
        background: #fff;
        font-weight: bold;
        text-align: center;
    }

    .ant-table-tbody > tr > td {
        text-align: center;
    }

    .ant-pagination {
        text-align: center;
        margin-top: 20px;
    }

    a {
        color: #1890ff;
        text-decoration: none;
        font-weight: bold;
    }

    a:hover {
        text-decoration: underline;
    }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 24px;
    border-radius: 10px;
  }
  .ant-modal-title {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 16px;
  color: #444;
`;

export const DetailRow = styled.p`
  margin: 0;
  strong {
    font-weight: 600;
    color: #222;
  }
`;

export const OrderStatus = styled.div`
  font-weight: bold;
  padding: 7px 8px;
  border-radius: 10px;
  display: inline-block; 
  width: 40%;
  text-align: center;
  
color: ${({ status }) =>
    status === "Order placed" ? "orange" :
    status === "confirmed" ? "blue" :  // Darker Orange
    status === "Shipped" ? "purple" :
    status === "Delivered" ? "green" :
    status === "Cancelled" ? "red" : "black"};

background-color: ${({ status }) =>
    status === "Order placed" ? "rgba(255, 165, 0, 0.3)" :
    status === "confirmed" ? "rgba(113, 123, 219, 0.3)" :  // Darker Orange Background
    status === "Shipped" ? "rgba(146, 59, 146, 0.29)" :
    status === "Delivered" ? "rgba(20, 255, 71, 0.4)" :
    status === "Cancelled" ? "rgba(255, 0, 0, 0.3)" : "rgba(200, 200, 200, 0.3)"};

border: 0.5px solid ${({ status }) =>
    status === "Order placed" ? "orange" :
    status === "confirmed" ? "blue" :  // Darker Orange Border
    status === "Shipped" ? "purple" :
    status === "Delivered" ? "green" :
    status === "Cancelled" ? "red" : "black"};
`;
