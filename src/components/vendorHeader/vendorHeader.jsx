import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getVendorById } from "../../api/waterCanApi";
import UserProfile from "../../module/vendor/vendorProfile/vendorProfile";
import {
  HeaderContainer,
  HeaderWrapper,
  ProfileContainer,
  ProfileIcon,
} from "./vendorHeader.styles";
import { SidebarContainer, Overlay } from "../vendorHeader/vendorHeader.styles";

const VendorHeader = ({ vendorId }) => {
  const [vendorName, setVendorName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchVendorName = async () => {
      try {
        const vendor = await getVendorById(vendorId);
        console.log("Fetched vendor:", vendor);
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
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <ProfileContainer>
            <p>Welcome, {vendorName}</p>
            <ProfileIcon onClick={() => setSidebarOpen((prev) => !prev)}>
              <FaUserCircle size={24} />
            </ProfileIcon>
          </ProfileContainer>
        </HeaderWrapper>
      </HeaderContainer>

      <Overlay open={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      <SidebarContainer open={sidebarOpen}>
        <UserProfile handleLogout={handleLogout} />
      </SidebarContainer>
    </>
  );
};

export default VendorHeader;
