import styled from "styled-components";

export const SideBarwrapper = styled.div`
  width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
  height: 100vh;
  position: fixed;
  // background: #f9fafb;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 30px;
`;

export const HamburgerMenu = styled.div`
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 1100;
`;

export const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 50px;
  left: 10px;
  background: white;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 200px;

  .menu-link {
    display: flex;
    align-items: center;
    padding: 10px;
    text-decoration: none;
    color: #1f2937;
    font-weight: 500;
    border-radius: 8px;
    transition: background 0.3s ease-in-out;

    &:hover {
      background: #e5e7eb;
    }

    &.active {
      background: #4f46e5;
      color: white;
    }

    .menu-link-icon {
      margin-right: 10px;
    }
  }
`;
