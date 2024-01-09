import React, { useEffect } from "react";
import Layout from "../components/Layout.tsx";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.tsx";
import { checkTokenExpiry } from "../utils.tsx";
import Footer from "../components/Footer.tsx";
import MyBooks from "../components/MyBooks.tsx";

const MyBooksPage = () => {
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
        <MyBooks/>
        <Footer />
      </Layout>
    );
};

export default MyBooksPage;
