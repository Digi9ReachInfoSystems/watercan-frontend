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
import { getVendorById} from "../../api/waterCanApi"; // Adjust the import path as necessary
import { getUserByFirebaseId, getVendorsByUserId } from "../../api/userApi";

const VendorHeader = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [vendorName, setVendorName] = useState("");

    useEffect(() => {
        const fetchVendorData = async () => {
            const fUID = localStorage.getItem("FUID");
            const users= await getUserByFirebaseId(fUID);
            const vendor= await getVendorsByUserId(users.data._id); // Fetch vendor data using user ID
            console.log("Vendor data:", vendor); // Log vendor data for debugging
            // const orders = await getVendorById(vendor.data.[0]); // Fetch vendor data using user ID
            // if (orders.length > 0) {
                setVendorName(vendor.data[0].name);  // ✅ Extract vendor name
            // }
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
                {/* <HeaderTitle>{title}</HeaderTitle> */}
                
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
