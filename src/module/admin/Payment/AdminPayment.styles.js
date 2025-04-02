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

export const ToggleContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 10px;
`;

export const ToggleButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ isActive }) => (isActive ? "#1890ff" : "#ddd")};
    color: ${({ isActive }) => (isActive ? "#fff" : "#333")};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ isActive }) => (isActive ? "#1678c2" : "#bbb")};
    }
`;

export const ContentContainer = styled.div`
    margin-top: 20px;
`;
