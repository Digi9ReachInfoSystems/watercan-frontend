import React, { useState }  from "react";
import { SideBarwrapper, Logo , HamburgerMenu, MobileMenu} from "./VendorSidebar.styles";
import { NavLink } from "react-router-dom";
import { FaUsers, FaLaptop, FaCopy, FaImage , FaBars,FaTimes, } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { FaHandHoldingWater } from "react-icons/fa";

const VendorSidebar = ({ setTitle, isCollapsed, setIsCollapsed }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const SidebarItem = [
    // { id: 1, name: "Home", path: "/admin", icon: <IoHomeSharp /> },
    { id: 2, name: "Dashboard", path: "/vendor", icon: <MdDashboard /> },
    { id: 3, name: "Orders", path: "/vendor/Orders", icon: <FaHandHoldingWater /> },
    // { id: 3, name: "Users", path: "/vendor/users", icon: <FaUsers /> },
    // { id: 4, name: "Devices", path: "/vendor/devices", icon: <FaLaptop /> },
    // { id: 5, name: "Copies", path: "/vendor/copy", icon: <FaCopy /> },
    // { id: 6, name: "Frames", path: "/vendor/frame", icon: <FaImage /> },
    // { id: 7, name: "Payment", path: "/vendor/payment", icon: <RiMoneyRupeeCircleFill /> },
  ];

  return (
    <SideBarwrapper
      isCollapsed={isCollapsed}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >

<HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}>
  {isMenuOpen ? <FaTimes /> : <FaBars />}
</HamburgerMenu>

      <Logo>
        Logo
      </Logo>
      {/* <div className="menu">
        <ul className="menu-list">
          {SidebarItem.map((item) => (
            <li className="menu-item" key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
                onClick={() => {
                  setTitle(item.name); // Update Header Title immediately
                  localStorage.setItem("title", JSON.stringify(item.name)); // Store in Local Storage
                }}
                end
              >
                <span className="menu-link-icon">{item.icon}</span>
                {!isCollapsed && <span className="menu-link-text">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div> */}

<MobileMenu isOpen={isMenuOpen}>
        {SidebarItem.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
            onClick={() => {
              setTitle(item.name);
              localStorage.setItem("title", JSON.stringify(item.name));
              setIsMenuOpen(false); // Close menu on click
            }}
          >
            <span className="menu-link-icon">{item.icon}</span>
            <span className="menu-link-text">{item.name}</span>
            {/* {!isCollapsed && <span className="menu-link-text">{item.name}</span>} */}
          </NavLink>
        ))}
      </MobileMenu>
    </SideBarwrapper>
  );
};

export default VendorSidebar;
