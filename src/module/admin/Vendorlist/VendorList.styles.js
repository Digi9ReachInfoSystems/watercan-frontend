// import styled from "styled-components";

// export const Container = styled.div`
//     padding: 20px;
//     background: #ffffff;
//     border-radius: 8px;
//     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//     max-width: 95%;
//     margin-left: 35px;

//     h2 {
//         text-align: center;
//         color: #222;
//         font-size: 24px;
//         font-weight: 600;
//         margin-bottom: 20px;
//     }
    
//     .ant-table {
//         background: white;
//         border-radius: 8px;
//         overflow: hidden; /* Ensures the table border-radius is applied */
//     }

//     .ant-table-thead > tr > th {
//         background: #f5f5f5;
//         color: #333;
//         font-weight: bold;
//         text-align: center;
//     }

//     .ant-table-tbody > tr > td {
//         text-align: center;
//     }

//     .ant-pagination {
//         margin-top: 20px;
//         text-align: center;
//     }

//     @media (max-width: 768px) {
//         max-width: 100%;
//         padding: 10px;

//         h2 {
//             font-size: 20px;
//         }

//         .ant-table {
//             font-size: 14px;
//         }
//     }
// `;


import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: auto;
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
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
`;
