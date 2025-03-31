import styled from "styled-components";
import { Table } from "antd";

export const Container = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  margin-left: 35px;
  text-align: center;
`;

export const StyledButton = styled.button`
  background: #1890ff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;

  &:hover {
    background: #40a9ff;
  }
`;

export const StyledHeading = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 500px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 22px;
`;

export const StyledTable = styled(Table)`
  .ant-table {
    border: 1px solid #ddd; 
    border-radius: 8px; 
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    color: black !important; 
    font-weight: bold;
    text-align: center;
  }

  .ant-table-tbody > tr > td {
    text-align: center;
    padding: 12px;
  }

  .ant-table-row:hover {
    background-color: #f0f5ff !important; 
  }
`;