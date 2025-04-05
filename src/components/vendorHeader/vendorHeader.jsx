import React, { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getVendorById } from "../../api/waterCanApi";
import {
  HeaderContainer,
  HeaderWrapper,
  ProfileContainer,
  ProfileIcon,
  DropdownMenu
} from "./vendorHeader.styles";

const VendorHeader = ({ vendorId }) => {
  const [vendorName, setVendorName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchVendorName = async () => {
        try {
          const vendor = await getVendorById(vendorId);
          console.log("Fetched vendor:", vendor); // 👈 add this
          setVendorName(vendor?.name || "Vendor");
        } catch (err) {
          console.error("Error fetching vendor name:", err);
        }
      };
    fetchVendorName();
  }, [vendorId]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <ProfileContainer ref={dropdownRef}>
          <p>Welcome, {vendorName}</p>
          <ProfileIcon onClick={() => setDropdownOpen((prev) => !prev)}>
            <FaUserCircle size={24} />
          </ProfileIcon>
          {dropdownOpen && (
            <DropdownMenu>
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenu>
          )}
        </ProfileContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default VendorHeader;
