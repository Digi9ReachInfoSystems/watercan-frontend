// import styled from "styled-components";

// export const Logo = styled.div`
//   font-size: 24px;
//   font-weight: bold;
//   color: #1f2937;
//   margin-bottom: 30px;
// `;

// export const HamburgerMenu = styled.div`
//   font-size: 24px;
//   cursor: pointer;
//   position: absolute;
//   top: 50px;
//   left: 60px;
//   z-index: 1200;
//   color: black; /* Ensuring it's visible */
// `;

// export const MobileMenu = styled.div`
//   display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
//   flex-direction: column;
//   position: absolute;
//   top: 80px;
//   left: 50px;
//   gap: 10px;
//   background: white;
//   padding: 15px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   width: 200px;
  

//   .menu-link {
//     display: flex;
//     align-items: center;
//     padding: 10px;
//     text-decoration: none;
//     color: #1f2937;
//     font-weight: 500;
//     border-radius: 8px;
//     transition: background 0.3s ease-in-out;

//     &:hover {
//       background: #e5e7eb;
//     }

//     &.active {
//       background: #4f46e5;
//       color: white;
//     }

//     .menu-link-icon {
//       margin-right: 10px;
//     }
//   }
// `;

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// import styled from "styled-components";
 
//  export const PageWrapper = styled.div`
//    display: flex;
//    height: 100vh;
//  `;
 
//  export const SideBarwrapper = styled.div`
//    width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
//    height: 100vh;
//    position: fixed;
//    font-family: "Montserrat", sans-serif;
//    display: flex;
//    flex-direction: column;
//    background: #f9fafb; /* Light gray background */
//    transition: width 0.3s ease-in-out;
//    overflow: hidden;
//    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
//    z-index: 1000;
//    align-items: center;
//    padding-top: 20px;
//    padding: 10px;
 
//    .logo {
//      display: flex;
//      justify-content: center;
//      align-items: center;
//      padding: 20px;
//      color: #1f2937;
//      font-size: ${({ isCollapsed }) => (isCollapsed ? "18px" : "24px")};
//      transition: font-size 0.3s ease-in-out;
//      font-weight: bold;
//    }
 
//    .menu {
//      flex-grow: 1;
//      display: flex;
//      flex-direction: column;
//      margin-top: 10px;
//      font-family: "Montserrat", sans-serif;
//      width: 100%;
//    }
 
//    .menu-list {
//      list-style: none;
//      padding: 0;
//      display: flex;
//      flex-direction: column;
//      gap: 5px;
//      font-family: "Montserrat", sans-serif;
//    }
 
//    .menu-item {
//      width: 100%;
//    }
 
//    .menu-link {
//      display: flex;
//      align-items: center;
//      justify-content: ${({ isCollapsed }) => (isCollapsed ? "center" : "flex-start")};
//      padding: 12px;
//      color: #1f2937; /* Default text color */
//      text-decoration: none;
//      font-size: ${({ isCollapsed }) => (isCollapsed ? "16px" : "18px")};
//      font-weight: 500;
//      border-radius: 8px;
//      transition: all 0.3s ease-in-out;
//      white-space: nowrap;
//      overflow: hidden;
//      font-family: "Montserrat", sans-serif;
 
//      &:hover {
//        background: #e5e7eb; /* Light hover effect */
//        color: #1f2937;
//      }
 
//      &.active {
//        background: #4f46e5; /* Active state */
//        color: white;
//        font-weight: bold;
 
//        /* Ensure icon turns white when active */
//        .menu-link-icon {
//          color: white;
//        }
//      }
//    }
 
//    .menu-link-icon {
//      font-size: 20px;
//      min-width: 40px;
//      display: flex;
//      justify-content: center;
//      align-items: center;
//      color: #1f2937; /* Default icon color (Black) */
//      transition: color 0.3s ease-in-out;
//    }
 
//    .menu-link.active .menu-link-icon {
//      color: white !important; /* Ensure icon turns white when selected */
//    }
 
//    .menu-link-text {
//      display: ${({ isCollapsed }) => (isCollapsed ? "none" : "inline")};
//    }
 
//    /* Channels Section */
//    .menu-section {
//      font-size: 14px;
//      text-transform: uppercase;
//      color: #9ca3af;
//      margin: 10px 0 5px 20px;
//      font-weight: bold;
//    }
 
//    /* Dropdown Menu */
//    .submenu {
//      display: ${({ isOpen }) => (isOpen ? "block" : "none")};
//      padding-left: ${({ isCollapsed }) => (isCollapsed ? "0px" : "20px")};
//    }
//  `;
 
//  export const ContentWrapper = styled.div`
//    margin-left: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
//    width: calc(100% - ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")});
//    padding: 20px;
//    transition: margin-left 0.3s ease-in-out, width 0.3s ease-in-out;
//    overflow-y: auto;
//    font-family: "Montserrat", sans-serif;
//  `;
 
//  export const Logo = styled.div`
//  font-size: 24px;
//  font-weight: bold;
//  color: #1f2937;
//  margin-top:30px;
//  margin-bottom:50px;
//  `;




//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&





import styled from "styled-components";

/* Desktop Sidebar */
export const SideBarwrapper = styled.div`
  width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
  transition: width 0.3s ease-in-out;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  align-items: center;
  padding-top: 20px;
  padding: 10px;

  .menu {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 100%;
  }

  .menu-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .menu-item {
    width: 100%;
  }

  .menu-link {
    display: flex;
    align-items: center;
    justify-content: ${({ isCollapsed }) => (isCollapsed ? "center" : "flex-start")};
    padding: 12px;
    color: #1f2937;
    text-decoration: none;
    font-size: ${({ isCollapsed }) => (isCollapsed ? "16px" : "18px")};
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    white-space: nowrap;
    overflow: hidden;

    &:hover {
      background: #e5e7eb;
      color: #1f2937;
    }

    &.active {
      background: #4f46e5;
      color: white;
      font-weight: bold;

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
    color: #1f2937;
    transition: color 0.3s ease-in-out;
  }

  .menu-link.active .menu-link-icon {
    color: white !important;
  }

  .menu-link-text {
    display: ${({ isCollapsed }) => (isCollapsed ? "none" : "inline")};
  }
`;

/* Content Wrapper for Desktop */
export const ContentWrapper = styled.div`
  margin-left: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
  width: calc(100% - ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")});
  padding: 20px;
  transition: margin-left 0.3s ease-in-out, width 0.3s ease-in-out;
  overflow-y: auto;
`;

/* Logo */
export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 50px;
`;

/* Mobile Hamburger Menu */
export const HamburgerMenu = styled.div`
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 50px;
  left: 60px;
  z-index: 1200;
  color: black;
`;

/* Mobile Sidebar */
export const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 80px;
  left: 20px;
  background: white;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 200px;
  gap: 10px;

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









// import styled from "styled-components";

// export const PageWrapper = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// export const Logo = styled.div`
//   font-size: 24px;
//   font-weight: bold;
//   color: #1f2937;
//   text-align: center;
//   margin-bottom: 20px;
//   width: 100%;
// `;

// export const SideBarwrapper = styled.div`
//   width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
//   height: 100vh;
//   position: fixed;
//   font-family: "Montserrat", sans-serif;
//   display: flex;
//   flex-direction: column;
//   background: #f9fafb;
//   transition: width 0.3s ease-in-out;
//   overflow: hidden;
//   box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
//   z-index: 1000;
//   align-items: center;
//   padding-top: 20px;
//   padding: 10px;

//   .logo {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 20px;
//     color: #1f2937;
//     font-size: ${({ isCollapsed }) => (isCollapsed ? "18px" : "24px")};
//     transition: font-size 0.3s ease-in-out;
//     font-weight: bold;
//   }

//   .menu {
//     flex-grow: 1;
//     display: flex;
//     flex-direction: column;
//     margin-top: 10px;
//     font-family: "Montserrat", sans-serif;
//     width: 100%;
//   }

//   .menu-list {
//     list-style: none;
//     padding: 0;
//     display: flex;
//     flex-direction: column;
//     gap: 5px;
//   }

//   .menu-item {
//     width: 100%;
//   }

//   .menu-link {
//     display: flex;
//     align-items: center;
//     justify-content: ${({ isCollapsed }) => (isCollapsed ? "center" : "flex-start")};
//     padding: 12px;
//     color: #1f2937;
//     text-decoration: none;
//     font-size: ${({ isCollapsed }) => (isCollapsed ? "16px" : "18px")};
//     font-weight: 500;
//     border-radius: 8px;
//     transition: all 0.3s ease-in-out;
//     white-space: nowrap;
//     overflow: hidden;

//     &:hover {
//       background: #e5e7eb;
//       color: #1f2937;
//     }

//     &.active {
//       background: #4f46e5;
//       color: white;
//       font-weight: bold;

//       .menu-link-icon {
//         color: white;
//       }
//     }
//   }

//   .menu-link-icon {
//     font-size: 20px;
//     min-width: 40px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     color: #1f2937;
//     transition: color 0.3s ease-in-out;
//   }

//   .menu-link.active .menu-link-icon {
//     color: white !important;
//   }

//   .menu-link-text {
//     display: ${({ isCollapsed }) => (isCollapsed ? "none" : "inline")};
//   }
// `;
