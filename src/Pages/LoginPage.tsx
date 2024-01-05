import React from "react"
import LoginForm from "../components/LoginForm.tsx";
import Layout from "../components/Layout.tsx";



const LoginPage = () =>{
    console.log("hOME");
    
    return (
      <Layout>
        <h1>Login Page</h1>
        <LoginForm />

      </Layout>
    );
}

export default LoginPage;