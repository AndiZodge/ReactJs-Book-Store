import React, { useEffect } from "react";
import Layout from "../components/Layout.tsx";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.tsx";
import { checkTokenExpiry } from "../utils.tsx";
import GenreCorousel from "../components/GenreCorousel.tsx";
import Footer from "../components/Footer.tsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const checkTokenExpire = () =>{
    const jwt = checkTokenExpiry();
    if (jwt === false){
      toast.error("Token Expire");
      navigate("/login");
    }
    }
  
    useEffect(() => {
      console.log('call');
      checkTokenExpire();
    })
    
  return (
    <Layout>
      <Navbar />
      <GenreCorousel genre="Coding" />
      <GenreCorousel genre="Comic" />
      <GenreCorousel genre="All" />
      <Footer />
    </Layout>
  );
};

export default LoginPage;
