import React, { useEffect } from "react";
import Layout from "../components/Layout.tsx";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.tsx";
import { checkTokenExpiry } from "../utils.tsx";
import Footer from "../components/Footer.tsx";
import UserBookListTable from "../components/UserBookList.tsx";

const UserBookListPage = () => {
  const navigate = useNavigate();
  const checkTokenExpire = () => {
    const jwt = checkTokenExpiry();
    if (jwt === false) {
      toast.error("Token Expire");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkTokenExpire();
  });

  return (
    <Layout>
      <Navbar />
      <UserBookListTable/>
      <Footer />
    </Layout>
  );
};

export default UserBookListPage;
