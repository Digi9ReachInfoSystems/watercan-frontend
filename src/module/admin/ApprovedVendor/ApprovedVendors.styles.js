import styled from "styled-components";
import { Table } from "antd";

export const Container = styled.div`
  padding: 20px;
  max-width: 100%;
  margin-left: 35px;
  text-align: center;
`;

export const StyledHeading = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;

  @media (max-width: 1360px) {
    font-size: 18px;
  }
`;

export const StyledTable = styled(Table)`
  .ant-table {
    border-radius: 8px; 
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    color: black !important; 
    font-weight: bold;
    text-align: center;
    width: 200px;
  }

  .ant-table-tbody > tr > td {
    text-align: center;
    padding: 12px;
  }

  .ant-table-tbody > tr {
    transition: background-color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
    position: relative;
  }

  .ant-table-tbody > tr:hover {
    background-color: #2290AC20 !important;
    transform: translateY(-4px) translateZ(-4px);
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }

  :where(.css-dev-only-do-not-override-tjsggz).ant-table-wrapper 
  .ant-table-tbody 
  .ant-table-row 
  > .ant-table-cell-row-hover {
    background: none;
  }

   :where(.css-dev-only-do-not-override-tjsggz).ant-btn-variant-outlined, :where(.css-dev-only-do-not-override-tjsggz).ant-btn-variant-dashed{
  width: 50%;
  height: 4vh;
      font-size: 16px;

  }

  :where(.css-dev-only-do-not-override-tjsggz).ant-btn-color-dangerous.ant-btn-variant-solid {
    width: 50%;
    height: 4vh;
        font-size: 16px;

  }


  .ant-table-row:hover {
    background-color: #f0f5ff !important;
  }

  @media (max-width: 1360px) {
    .ant-table-thead > tr > th {
      font-size: 12px;
      padding: 10px;
    }

    .ant-table-tbody > tr > td {
      font-size: 10px;
      padding: 8px;
    }

    .ant-pagination .ant-pagination-item {
      font-size: 10px;
      min-width: 22px;
      height: 22px;
      line-height: 20px;
      margin: auto 0;
    }

    @media (max-width: 1360px) {
    :where(.css-dev-only-do-not-override-tjsggz).ant-btn-variant-outlined, :where(.css-dev-only-do-not-override-tjsggz).ant-btn-variant-dashed{
    width: 50%;
    height: 4vh;
    font-size: 12px;
  }

  :where(.css-dev-only-do-not-override-tjsggz).ant-btn-color-dangerous.ant-btn-variant-solid {
    width: 50%;
    height: 4vh;
        font-size: 12px;
  }
  }
`;

export const SkeletonWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 10px;

  @keyframes shimmer-wave {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .skeleton-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    align-items: center;
    text-align: center;
    padding-left: 24px;
    padding-right: 24px;
  }

  .skeleton-cell {
    flex: 1;
    height: 18px;
    width: 100px;
    margin: 0 8px;
    border-radius: 6px;
    animation: shimmer-wave 1.5s infinite linear;
    background-image: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 50%,
      #f0f0f0 75%
    );
    background-size: 200% 100%;
    background-position: -200% 0;
    border: 1px solid #f1f1f1;
  }

  .skeleton-cell:last-child {
    // height: 32px;
    border-radius: 20px;
    // width: 100px;
    flex: 0 0 100px;
  }

  .skeleton-cell:nth-child(1) {
    flex: 0 0 300px; 
  }
  .skeleton-cell:nth-child(2) {
    flex: 0 0 300px; 
  }
  .skeleton-cell:nth-child(3) {
    flex: 0 0 300px; 
  }
  .skeleton-cell:nth-child(4) {
    flex: 0 0 300px; 
  }
  .skeleton-cell:nth-child(5) {
    flex: 0 0 150px; 
  }

  @media (max-width: 1360px) {
    .skeleton-row {
      padding: 8px 16px;
    }

    .skeleton-cell {
      height: 14px;
    }

    .skeleton-cell:nth-child(1) {
      flex: 0 0 200px;
    }
    .skeleton-cell:nth-child(2) {
      flex: 0 0 200px;
    }
    .skeleton-cell:nth-child(3) {
      flex: 0 0 200px;
    }
    .skeleton-cell:nth-child(4) {
      flex: 0 0 200px;
    }
    .skeleton-cell:nth-child(5) {
      flex: 0 0 200px;
    }
    .skeleton-cell:last-child {
      // height: 26px;
      flex: 0 0 100px;
    }
  }
`;
