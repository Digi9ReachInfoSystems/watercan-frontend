import React, { useState, useEffect } from "react";
import {
  Container,
  StyledHeading,
  StyledTable,
  SkeletonWrapper,
} from "./ApprovedVendors.styles";
import {
  getApprovedVendors,
  restrictVendorById,
  unrestrictVendorById,
} from "../../../api/ApprovedVendorsApi";
import { Button, message, Popconfirm } from "antd";

const ApprovedVendors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getApprovedVendors();
      setTimeout(() => {
        setData(response.data);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching approved vendors:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRestrict = async (id) => {
    try {
      await restrictVendorById(id);
      message.success("Vendor restricted successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to restrict vendor", error);
    }
  };

  const handleUnrestrict = async (id) => {
    try {
      await unrestrictVendorById(id);
      message.success("Vendor unrestricted successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to unrestrict vendor", error);
    }
  };

  const columns = [
    {
      title: "Vendor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Restricted",
      dataIndex: "restricted",
      key: "restricted",
      render: (restricted) => (restricted ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title={`Are you sure you want to ${record.restricted ? "unrestrict" : "restrict"} this vendor?`}
          onConfirm={() =>
            record.restricted
              ? handleUnrestrict(record._id)
              : handleRestrict(record._id)
          }
          okText="Yes"
          cancelText="No"
        >
          <Button
            type={record.restricted ? "default" : "primary"}
            danger={!record.restricted}
          >
            {record.restricted ? "Unrestrict" : "Restrict"}
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Container>
      <StyledHeading>Approved Vendors List</StyledHeading>
      {loading ? (
        <SkeletonWrapper>
          {[...Array(5)].map((_, index) => (
            <div className="skeleton-row" key={index}>
              <div className="skeleton-cell react-loading-skeleton"></div>
              <div className="skeleton-cell react-loading-skeleton"></div>
              <div className="skeleton-cell react-loading-skeleton"></div>
              <div className="skeleton-cell react-loading-skeleton"></div>
              <div className="skeleton-cell react-loading-skeleton"></div>
            </div>
          ))}
        </SkeletonWrapper>
      ) : (
        <StyledTable
          rowKey="_id"
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      )}
    </Container>
  );
};

export default ApprovedVendors;
