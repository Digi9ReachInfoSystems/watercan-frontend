import React, { useState, useRef, useEffect } from "react";
import { SideBarwrapper, Logo, HamburgerMenu } from "./VendorSidebar.styles";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaHandHoldingWater, FaBars } from "react-icons/fa";
import logo from "../../assets/logo.png";

const VendorSidebar = ({ setTitle, isCollapsed, setIsCollapsed }) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const sidebarRef = useRef(null);

  const SidebarItem = [
    { id: 1, name: "Dashboard", path: "/vendor", icon: <MdDashboard /> },
    {
      id: 2,
      name: "Orders",
      path: "/vendor/Orders",
      icon: <FaHandHoldingWater />,
    },
  ];

  // Handle outside click to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isMobileExpanded
      ) {
        setIsMobileExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileExpanded]);

  return (
    <SideBarwrapper
      ref={sidebarRef}
      isCollapsed={isCollapsed}
      isMobileExpanded={isMobileExpanded}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div>
      {/* Show Hamburger only if menu is NOT expanded */}
      {!isMobileExpanded && (
        <HamburgerMenu onClick={() => setIsMobileExpanded(true)}>
          <FaBars />
        </HamburgerMenu>
      )}

      {/* Show Logo only after mobile menu is expanded OR on wider screens */}
      {(isMobileExpanded || window.innerWidth > 480) && (
        <Logo isCollapsed={isCollapsed} isMobileExpanded={isMobileExpanded}>
          <img
            src={logo}
            alt="Logo"
            className="sidebar-logo"
            style={{ borderRadius: "50%" }}
          />
        </Logo>
      )}
      </div>

      <div className="menu">
        <ul className="menu-list">
          {SidebarItem.map((item) => (
            <li className="menu-item" key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
                onClick={() => {
                  setTitle(item.name);
                  localStorage.setItem("title", JSON.stringify(item.name));
                  setIsMobileExpanded(false); // Close on link click
                }}
                end
              >
                <span className="menu-link-icon">{item.icon}</span>
                {!isCollapsed && (
                  <span className="menu-link-text">{item.name}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </SideBarwrapper>
  );
};

export default VendorSidebar;
