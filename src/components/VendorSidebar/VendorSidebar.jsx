import React, { useState } from "react";
import { SideBarWrapper, HamburgerMenu, MobileMenu } from "./VendorSidebar.styles";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaHandHoldingWater } from "react-icons/fa";

const VendorSidebar = ({ setTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const SidebarItem = [
    { id: 2, name: "Dashboard", path: "/vendor", icon: <MdDashboard /> },
    { id: 3, name: "Orders", path: "/vendor/Orders", icon: <FaHandHoldingWater /> },
  ];

  return (
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
  );
};

export default VendorSidebar;