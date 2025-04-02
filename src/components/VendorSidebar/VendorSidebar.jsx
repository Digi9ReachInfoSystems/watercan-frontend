import React, { useState } from "react";
import { SideBarwrapper, Logo, HamburgerMenu } from "./VendorSidebar.styles";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaHandHoldingWater, FaBars, FaTimes } from "react-icons/fa"; // Import icons
import logo from "../../assets/logo.png"; 

const VendorSidebar = ({ setTitle, isCollapsed, setIsCollapsed }) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false); // State for mobile menu

  const SidebarItem = [
    { id: 1, name: "Dashboard", path: "/vendor", icon: <MdDashboard /> },
    { id: 2, name: "Orders", path: "/vendor/Orders", icon: <FaHandHoldingWater /> },
  ];

  return (
    <SideBarwrapper
      isCollapsed={isCollapsed}
      isMobileExpanded={isMobileExpanded} // Pass state for mobile view
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      {/* Hamburger Menu Button (Visible only on small screens) */}
      <HamburgerMenu onClick={() => setIsMobileExpanded(!isMobileExpanded)}>
        {isMobileExpanded ? <FaTimes /> : <FaBars />} {/* Toggle Icon */}
      </HamburgerMenu>

      <Logo isCollapsed={isCollapsed}>
        <img src={logo} alt="Logo" className="sidebar-logo" style={{ borderRadius: "50%"}}/>
      </Logo>

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
                  setIsMobileExpanded(false); // Close menu after clicking an item
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
  );
};

export default VendorSidebar;
