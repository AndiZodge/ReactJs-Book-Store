import React, { useEffect } from "react";
import Layout from "../components/Layout.tsx";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar.tsx";
import { checkTokenExpiry } from "../utils.tsx";
import AddBooks from "../components/AddBooks.tsx";
import BooksCard from "../components/BooksCard.tsx";
import Footer from "../components/Footer.tsx";

const AddBooksPage = () => {
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
        <BooksCard />
      <AddBooks />
      <Footer />
    </Layout>
  );
};

export default AddBooksPage;
