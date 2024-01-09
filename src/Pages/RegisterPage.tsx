import React from "react";
import Layout from "../components/Layout.tsx";
import RegistrationForm from "../components/RegistrationForm.tsx";
import Footer from "../components/Footer.tsx";

const RegisterPage = () => {
  return (
    <Layout>
      <h1>Registration Form</h1>
      <RegistrationForm />
    </Layout>
  );
};

export default RegisterPage;
