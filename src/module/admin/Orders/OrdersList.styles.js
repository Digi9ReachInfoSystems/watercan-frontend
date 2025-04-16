import styled from "styled-components";
import { Modal } from "antd";

export const Container = styled.div`
    padding: 20px 0;
    margin-left: 40px;
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;

@media (max-width: 1360px) {
    font-size: 18px;
    margin-bottom: 10px;
}
`;

export const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;   
    margin-bottom: 15px;
    
    .span {
        font-size: 16px;
        margin-right: 10px;
        font-weight: bold;

        @media (max-width: 1360px) {
            font-size: 14px;
        }
    }

    @media (max-width: 1360px) {
    
    .ant-select-single{
    font-size: 10px;
    height: 25px;
    }
    .ant-select .ant-select-arrow{
    right: 20px;
    }

    .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
    font-size: 10px;}

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

    :where(.css-dev-only-do-not-override-tjsggz).ant-table-wrapper .ant-table-tbody>tr>td {
        padding: 5px;
    }

    a {
        color: #1890ff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    @media (max-width: 1360px) {
        .ant-table-thead > tr > th {
            font-size: 12px;
        }

        .ant-table-tbody > tr > td {
            font-size: 10px;
        }

              .ant-pagination .ant-pagination-item {
            font-size: 10px;
            min-width: 22px;
            height: 22px;
            line-height: 20px;
            margin: auto 0;
        }
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

  @media (max-width: 1360px) {
    .ant-modal-title {
      font-size: 18px;
    }
      .ant-modal-content{
      padding: 10px;
      width: 350px;
      margin: 0 auto;}
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

    @media (max-width: 1360px) {
        font-size: 12px;
        margin-bottom: 5px;
        strong {
            font-size: 14px;
        }

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

    @media (max-width: 1360px) {
        font-size: 10px;
        width: 60%;
        padding: 5px 8px;
    }
`;

export const TitleContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px
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
