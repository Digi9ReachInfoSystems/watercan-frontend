import React, { useEffect, useState, useRef } from "react";
import { 
    HeaderContainer, 
    HeaderWrapper, 
    HeaderTitle, 
    ProfileContainer, 
    ProfileIcon, 
    DropdownMenu 
} from "./vendorHeader.styles";
import { FaUserCircle } from "react-icons/fa"; 
import { getOrdersByVendor } from "../../api/serviceapi";

const VendorHeader = ({ title }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [vendorName, setVendorName] = useState("");

    useEffect(() => {
        const fetchVendorData = async () => {
            const orders = await getOrdersByVendor();
            if (orders.length > 0) {
                setVendorName(orders[0].vendor_id.name);  // ✅ Extract vendor name
            }
        };
        fetchVendorData();
    }, []);

    // Function to toggle the dropdown menu
    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <HeaderTitle>{title}</HeaderTitle>
                
                <ProfileContainer ref={dropdownRef}>
                <p>Welcome, {vendorName || "Vendor"}!</p>  {/* Display Vendor Name */}
                    
                    {/* Click on icon to toggle dropdown */}
                    <ProfileIcon onClick={toggleDropdown}>
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
