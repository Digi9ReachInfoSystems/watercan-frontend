import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
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

    .ant-table-wrapper .ant-table-tbody>tr>td{
        padding: 5px;
    }

    .ant-pagination {
        text-align: center;
        margin-top: 20px;
    }
        :where(.css-dev-only-do-not-override-tjsggz).ant-spin-nested-loading .ant-spin-container {
    position: relative;
    transition: opacity 0.3s;
    height: 35vh;
}

    a {
        color: #1890ff;
        text-decoration: none;
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
  width: 90%;
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
