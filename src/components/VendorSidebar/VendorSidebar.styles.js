import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export const SideBarwrapper = styled.div`
  width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
  height: 100vh;
  position: fixed;
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  background: #2290AC;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  align-items: center;
  padding-top: 20px;
  padding: 10px;

     .logo {
     display: flex;
     justify-content: center;
     align-items: center;
     padding: 20px;
     color: #1f2937;
     font-size: ${({ isCollapsed }) => (isCollapsed ? "18px" : "24px")};
     transition: font-size 0.3s ease-in-out;
     font-weight: bold;
   }

      .menu {
    //  flex-grow: 1;
     display: flex;
     flex-direction: column;
     margin-top: 10px;
     font-family: "Montserrat", sans-serif;
     width: 100%;
   }
        .menu-list {
     list-style: none;
     padding: 0;
     display: flex;
     flex-direction: column;
     gap: 5px;
     font-family: "Montserrat", sans-serif;
   }
 
   .menu-item {
     width: 100%;
   }
 
   .menu-link {
     display: flex;
     align-items: center;
     justify-content: ${({ isCollapsed }) => (isCollapsed ? "center" : "flex-start")};
     padding: 12px;
     color: #1f2937; /* Default text color */
     text-decoration: none;
     font-size: ${({ isCollapsed }) => (isCollapsed ? "16px" : "18px")};
     font-weight: 500;
    box-shadow: none;
     border-radius: 8px;
     transition: all 0.3s ease-in-out;
     white-space: nowrap;
     overflow: hidden;
     font-family: "Montserrat", sans-serif;
    //  margin-top: 60px; 
     &:hover {
      background:rgba(165, 170, 179, 0.71);
       color: #1f2937;
     }
 
     &.active {
      background:rgba(229, 231, 235, 0.94); 
       color: white;
       font-weight: bold;
 
       /* Ensure icon turns white when active */
       .menu-link-icon {
         color: white;
       }
     }
   }
 
   .menu-link-icon {
     font-size: 20px;
     min-width: 40px;
     display: flex;
     justify-content: center;
     align-items: center;
     color: white;
     transition: color 0.3s ease-in-out;
   }
 
   .menu-link.active .menu-link-icon {
     color: black !important; 
   }
 
   .menu-link-text {
     display: ${({ isCollapsed }) => (isCollapsed ? "none" : "inline")};
     color: white;
   }

   .menu-link.active .menu-link-text {
   color: black !important;
   }
 
   /* Channels Section */
   .menu-section {
     font-size: 14px;
     text-transform: uppercase;
     color: #9ca3af;
     margin: 10px 0 5px 20px;
     font-weight: bold;
   }
 
   /* Dropdown Menu */
   .submenu {
     display: ${({ isOpen }) => (isOpen ? "block" : "none")};
     padding-left: ${({ isCollapsed }) => (isCollapsed ? "0px" : "20px")};
   }

  /* Mobile View (≤480px) */
@media (max-width: 480px) {
  width: ${({ isMobileExpanded }) => (isMobileExpanded ? "250px" : "60px")};
  background: ${({ isMobileExpanded }) => (isMobileExpanded ? "#2290AC" : "none")};
  box-shadow: ${({ isMobileExpanded }) => (isMobileExpanded ? "2px 0 10px rgba(0, 0, 0, 0.1)" : "none")};


    /* Hide menu items initially */
    .menu-list {
      display: ${({ isMobileExpanded }) => (isMobileExpanded ? "flex" : "none")}; 
      flex-direction: column;
      width: 100%;
      background: #2290AC;
      height: 100vh;
      margin-top: 60px; 
    }
  }
`;

export const Logo = styled.div`
  .sidebar-logo {
    width: ${({ isCollapsed }) => (isCollapsed ? "40px" : "80px")};
    transition: width 0.3s ease-in-out;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
    margin-bottom: -40px;
  }
`;


/* Hamburger Menu Button */
export const HamburgerMenu = styled.div`
    display: none;
  position: fixed; /* Keep it fixed so it overlaps */
  top: 35px;
  left: 25px;
  font-size: 24px;
  cursor: pointer;
  z-index: 1100; /* High z-index to overlap other components */
  padding: 10px;
  border-radius: 50%;

  @media (max-width: 480px) {
    display: block;
  }
`;
