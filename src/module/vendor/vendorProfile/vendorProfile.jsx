import React, { useState, useEffect } from "react";
import {
    ProfileContainer,
    FormWrapper,
    HeaderBackground,
    ProfileImageWrapper,
    ProfileImage,
    EditIcon,
    Title,
    FieldGroup,
    SaveButton,
    LogoutButton,
} from "./vendorprofile.styles";
import { TbLogout } from "react-icons/tb";
import vendorProfile from "../../../assets/vendorProfile.jpg";
import { getVendorById } from "../../../api/waterCanApi"; 


const UserProfile = () => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        area: "",
        pincode: "",
        city: "",
        state: "",
        proof: "",
    });

    const [isEditable, setIsEditable] = useState(false);

    const vendorId = localStorage.getItem("vendorId"); // Or get from auth context

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const vendorData = await getVendorById(vendorId);
                setProfile({
                    firstName: vendorData.firstName || "",
                    lastName: vendorData.lastName || "",
                    username: vendorData.username || "",
                    email: vendorData.email || "",
                    phone: vendorData.phone || "",
                    address: vendorData.address || "",
                    area: vendorData.area || "",
                    pincode: vendorData.pincode || "",
                    city: vendorData.city || "",
                    state: vendorData.state || "",
                    proof: vendorData.proof || "",
                });
            } catch (error) {
                console.error("Failed to fetch vendor data:", error.message);
            }
        };

        if (vendorId) {
            fetchVendorData();
        }
    }, [vendorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => {
        setIsEditable(true);
    };

    return (
        <ProfileContainer>
            <FormWrapper>
                <HeaderBackground />

                <ProfileImageWrapper>
                    <ProfileImage src={vendorProfile} alt="profile" />
                </ProfileImageWrapper>

                <Title>{profile.name} {profile.lastName}</Title>

                <div className="edit-button">
                    <EditIcon onClick={handleEditToggle}>✎ Edit</EditIcon>
                </div>

                <FieldGroup>
                    <label>Username</label>
                    <input
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>Email</label>
                    <input
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>Phone Number</label>
                    <input
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>Address</label>
                    <input
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>Area</label>
                    <input
                        name="area"
                        value={profile.area}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>Pincode</label>
                    <input
                        name="pincode"
                        value={profile.pincode}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>City</label>
                    <input
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>State</label>
                    <input
                        name="state"
                        value={profile.state}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>Proof Aadhar/Pan card</label>
                    <input
                        name="proof"
                        value={profile.proof}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <SaveButton disabled={!isEditable}>
                    Save
                </SaveButton>

                <LogoutButton> <TbLogout/> Logout</LogoutButton>

            </FormWrapper>
        </ProfileContainer>
    );
};

export default UserProfile;
