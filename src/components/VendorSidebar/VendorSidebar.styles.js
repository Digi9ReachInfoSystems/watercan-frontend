import styled from "styled-components";

export const SideBarWrapper = styled.div`
  width: 60px; /* Fixed width for only showing the hamburger menu */
  // height: 100vh;
  position: fixed;
  background: transparent; /* Sidebar is now transparent */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  z-index: 1100; /* Ensure it overlays the background */
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
  top: 40px;
  left: 20px;
  z-index: 1200;
  color: black; /* Ensuring it's visible */
`;

export const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 10px;
  gap: 10px;
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
