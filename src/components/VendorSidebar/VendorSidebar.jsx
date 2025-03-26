// import React, { useState } from "react";
// import { HamburgerMenu, MobileMenu } from "./VendorSidebar.styles";
// import { NavLink } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { MdDashboard } from "react-icons/md";
// import { FaHandHoldingWater } from "react-icons/fa";

// const VendorSidebar = ({ setTitle }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const SidebarItem = [
//     { id: 2, name: "Dashboard", path: "/vendor", icon: <MdDashboard /> },
//     { id: 3, name: "Orders", path: "/vendor/Orders", icon: <FaHandHoldingWater /> },
//   ];

//   return (
//     <>
//       <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}>
//         {isMenuOpen ? <FaTimes /> : <FaBars />}
//       </HamburgerMenu>

//       <MobileMenu isOpen={isMenuOpen}>
//         {SidebarItem.map((item) => (
//           <NavLink
//             key={item.id}
//             to={item.path}
//             className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
//             onClick={() => {
//               setTitle(item.name);
//               localStorage.setItem("title", JSON.stringify(item.name));
//               setIsMenuOpen(false);
//             }}
//           >
//             <span className="menu-link-icon">{item.icon}</span>
//             <span className="menu-link-text">{item.name}</span>
//           </NavLink>
//         ))}
//       </MobileMenu>
//     </>
//   );
// };

// export default VendorSidebar;



//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7


// import React from "react";
//  import { SideBarwrapper, Logo } from "./VendorSidebar.styles";
//  import { NavLink } from "react-router-dom";
//  import { MdDashboard } from "react-icons/md";
//  import { FaHandHoldingWater } from "react-icons/fa";
//  const VendorSidebar = ({ setTitle, isCollapsed, setIsCollapsed }) => {
//    const SidebarItem = [
//      { id: 1, name: "Dashboard", path: "/vendor", icon: <MdDashboard /> },
//      { id: 2, name: "Orders", path: "/vendor/Orders", icon: <FaHandHoldingWater /> },
//    ];
 
//    return (
//      <SideBarwrapper
//        isCollapsed={isCollapsed}
//        onMouseEnter={() => setIsCollapsed(false)}
//        onMouseLeave={() => setIsCollapsed(true)}
//      >
//        <Logo>
//          Logo
//        </Logo>
//        <div className="menu">
//          <ul className="menu-list">
//            {SidebarItem.map((item) => (
//              <li className="menu-item" key={item.id}>
//                <NavLink
//                  to={item.path}
//                  className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
//                  onClick={() => {
//                    setTitle(item.name); // Update Header Title immediately
//                    localStorage.setItem("title", JSON.stringify(item.name)); // Store in Local Storage
//                  }}
//                  end
//                >
//                  <span className="menu-link-icon">{item.icon}</span>
//                  {!isCollapsed && <span className="menu-link-text">{item.name}</span>}
//                </NavLink>
//              </li>
//            ))}
//          </ul>
//        </div>
//      </SideBarwrapper>
//    );
//  };
 
//  export default VendorSidebar;


//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


import React, { useState, useEffect } from "react";
import { SideBarwrapper, ContentWrapper, Logo, HamburgerMenu, MobileMenu } from "./VendorSidebar.styles";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaHandHoldingWater } from "react-icons/fa";

const VendorSidebar = ({ setTitle }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Sidebar for Desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu

  const SidebarItem = [
    { id: 1, name: "Dashboard", path: "/vendor", icon: <MdDashboard /> },
    { id: 2, name: "Orders", path: "/vendor/Orders", icon: <FaHandHoldingWater /> },
  ];

  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <SideBarwrapper
          isCollapsed={isCollapsed}
          onMouseEnter={() => setIsCollapsed(false)}
          onMouseLeave={() => setIsCollapsed(true)}
        >
          <Logo>Logo</Logo>
          <div className="menu">
            <ul className="menu-list">
              {SidebarItem.map((item) => (
                <li className="menu-item" key={item.id}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
                    onClick={() => {
                      setTitle(item.name);
                      localStorage.setItem("title", JSON.stringify(item.name));
                    }}
                    end
                  >
                    <span className="menu-link-icon">{item.icon}</span>
                    {!isCollapsed && <span className="menu-link-text">{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </SideBarwrapper>
      )}

      {/* Mobile Hamburger Menu */}
      {isMobile && (
        <>
          <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </HamburgerMenu>

          <MobileMenu isOpen={isMenuOpen}>
            {SidebarItem.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
                onClick={() => {
                  setTitle(item.name);
                  localStorage.setItem("title", JSON.stringify(item.name));
                  setIsMenuOpen(false);
                }}
              >
                <span className="menu-link-icon">{item.icon}</span>
                <span className="menu-link-text">{item.name}</span>
              </NavLink>
            ))}
          </MobileMenu>
        </>
      )}
    </>
  );
};

export default VendorSidebar;







// import React from "react";
// import { SideBarwrapper, Logo } from "./VendorSidebar.styles";
// import { NavLink } from "react-router-dom";
// import { MdDashboard } from "react-icons/md";
// import { FaHandHoldingWater } from "react-icons/fa";

// const VendorSidebar = ({ setTitle, isCollapsed, setIsCollapsed }) => {
//   const SidebarItem = [
//     { id: 1, name: "Dashboard", path: "/vendor", icon: <MdDashboard /> },
//     { id: 2, name: "Orders", path: "/vendor/Orders", icon: <FaHandHoldingWater /> },
//   ];

//   return (
//     <SideBarwrapper
//       isCollapsed={isCollapsed}
//       onMouseEnter={() => setIsCollapsed(false)}
//       onMouseLeave={() => setIsCollapsed(true)}
//     >
//       <Logo>Logo</Logo>
//       <div className="menu">
//         <ul className="menu-list">
//           {SidebarItem.map((item) => (
//             <li className="menu-item" key={item.id}>
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
//                 onClick={() => {
//                   setTitle(item.name);
//                   localStorage.setItem("title", JSON.stringify(item.name));
//                 }}
//                 end
//               >
//                 <span className="menu-link-icon">{item.icon}</span>
//                 {!isCollapsed && <span className="menu-link-text">{item.name}</span>}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </SideBarwrapper>
//   );
// };

// export default VendorSidebar;
