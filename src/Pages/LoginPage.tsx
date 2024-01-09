import React from "react"
import LoginForm from "../components/LoginForm.tsx";
import Layout from "../components/Layout.tsx";
import Footer from "../components/Footer.tsx";



const LoginPage = () =>{
    
    return (
      <Layout>
        <h1>Login Page</h1>
        <LoginForm />
      </Layout>
    );
}

export default LoginPage;