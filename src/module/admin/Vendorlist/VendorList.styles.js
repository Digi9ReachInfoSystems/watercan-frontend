import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    // max-width: 95%;
    margin-left: 40px;
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

export const ModalContent = styled.div`
    p {
        font-size: 16px;
        margin: 8px 0;
        color: #333;
    }

    strong {
        color: #000;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button {
        width: 45%;
        font-size: 16px;
    }
`;

export const OrderStatus = styled.div`
  font-weight: bold;
  padding: 5px 6px;
  border-radius: 10px;
  display: inline-block; 
  width: 60%;
  text-align: center;
  cursor: pointer;
  
color: ${({ status }) =>
    status === "pending" ? "orange" :
    status === "approved" ? "green" :
    status === "rejected" ? "red" : "black"};

background-color: ${({ status }) =>
    status === "pending" ? "rgba(255, 166, 0, 0.38)" :
    status === "approved" ? "rgba(20, 255, 71, 0.53)" :
    status === "rejected" ? "rgba(255, 0, 0, 0.31)" : "rgba(200, 200, 200, 0.3)"};

border: 0.5px solid ${({ status }) =>
    status === "pending" ? "orange" :
    status === "approved" ? "green" :
    status === "rejected" ? "red" : "black"};
`;
