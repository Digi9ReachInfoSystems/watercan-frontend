import styled from 'styled-components';

export const HeaderContainer = styled.div`
    // height: 80px;
    // background-color: rgb(247, 245, 245);
    color: #1d1d1d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const HeaderWrapper = styled.div`
    width: 100%;
    height: 80px;
    background-color: #2290AC20;
    color: #1d1d1d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding-right: 20px;
    
font-family: "Montserrat", sans-serif;

@media (max-width: 1360px) {
height: 60px;
    padding-right: 10px;
    font-size: 18px;
}
`;

export const HeaderTitle = styled.h1`
display: flex;
align-items: center;
flex-direction: row;
justify-content: center;
font-size: 24px;
font-weight: bold;
margin-right:200px;
font-family: "Montserrat", sans-serif;
`;

export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
`;

export const ProfileIcon = styled.div`
    margin-left: 10px;
    font-size: 24px;
    color: #333;
    cursor: pointer;

    @media (max-width: 1360px) {
        font-size: 20px;
        margin-left: 5px;
    }
`;

export const DropdownMenu = styled.div`
    position: absolute;
    right: 0;
    top: 40px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    padding: 5px 0;
    z-index: 10;

    button {
        background: none;
        border: none;
        padding: 10px 20px;
        width: 100%;
        text-align: left;
        cursor: pointer;
        font-size: 14px;

        &:hover {
            background: #f0f0f0;
        }

        @media (max-width: 1360px) {
            font-size: 12px;
            padding: 8px 15px;
        }
    }
        @media (max-width: 1360px) {
            padding: 0px;
            top: 30px;
}
`;
