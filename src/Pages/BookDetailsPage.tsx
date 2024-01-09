import React from "react";
import Layout from "../components/Layout.tsx";
import BookDetails from "../components/BookDetails.tsx";
import Navbar from "../components/Navbar.tsx";
  import { useParams } from "react-router-dom";
import Footer from "../components/Footer.tsx";

const BookDetailsPage = (props) => {
  let { id } = useParams(); 
  return (
    <Layout>
      <Navbar />
      <BookDetails id={id} />
      <Footer />
    </Layout>
  );
};

export default BookDetailsPage;
