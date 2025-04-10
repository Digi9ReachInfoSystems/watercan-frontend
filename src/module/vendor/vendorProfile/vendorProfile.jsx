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
} from "./vendorprofile.styles";
import vendorProfile from "../../../assets/vendorProfile.jpg";
import { getUserByFirebaseId, getVendorsByUserId, updateVendorsByUserId } from "../../../api/userApi";


const UserProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
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



    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const vendorId = localStorage.getItem("FUID"); // Or get from auth context

                const vendorRes = await getUserByFirebaseId(vendorId);

                const vendorData = await getVendorsByUserId(vendorRes.data._id);
                console.log("Vendor ID from localStorage:", vendorData); // Add this
                setProfile({
                    name: vendorData.data[0].name || "",
                    email: vendorData.data[0].email || "",
                    phone: vendorData.data[0].phoneNumber || "",
                    address: vendorData.data[0].address || "",
                    area: vendorData.data[0].area || "",
                    pincode: vendorData.data[0].pincode || "",
                    city: vendorData.data[0].city || "",
                    state: vendorData.data[0].state || "",
                    proof: vendorData.data[0].proof_image || "",
                });
            } catch (error) {
                console.error("Failed to fetch vendor data:", error.message);
            }
        };

        fetchVendorData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => {
        setIsEditable(true);
    };

    const handleSave = async () => {
        try {
            const firebaseId = localStorage.getItem("FUID");

            const userRes = await getUserByFirebaseId(firebaseId);
            const userId = userRes.data._id;

            const updatePayload = {
                name: profile.name,
                phoneNumber: profile.phone,
                address: profile.address,
                area: profile.area,
                pincode: profile.pincode,
                city: profile.city,
                state: profile.state,
            };

            const res = await updateVendorsByUserId(userId, updatePayload);
            console.log("Vendor update response:", res);

            alert("Vendor updated successfully");
            setIsEditable(false);
        } catch (error) {
            console.error("Failed to update vendor profile:", error.message);
            alert("Error updating vendor");
        }
    };


    return (
        <ProfileContainer>
            <FormWrapper>
                <HeaderBackground />

                <ProfileImageWrapper>
                    <ProfileImage src={vendorProfile} alt="profile" />
                </ProfileImageWrapper>

                <Title style={{ textTransform: "uppercase" }} >{profile.name}</Title>

                <div className="edit-button">
                    <EditIcon onClick={handleEditToggle}>✎ Edit</EditIcon>
                </div>

                <FieldGroup>
                    <label>Username</label>
                    <input
                        name="name"
                        value={profile.name}
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
                        disabled
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
                    <label>Proof (Aadhar / PAN Card)</label>
                    {profile.proof ? (
                        <div style={{ marginTop: "5px" }}>
                            <a
                                href={profile.proof}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                style={{ color: "#0e5b9d", fontSize: "12px" }}
                            >
                                Download Proof
                            </a>
                        </div>
                    ) : (
                        <p style={{ marginTop: "8px", color: "#888" }}>No proof uploaded</p>
                    )}

                </FieldGroup>

                <SaveButton disabled={!isEditable} onClick={handleSave}>
                    Save
                </SaveButton>

            </FormWrapper>
        </ProfileContainer>
    );
};

export default UserProfile;
