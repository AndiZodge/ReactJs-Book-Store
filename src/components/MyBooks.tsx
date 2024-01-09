import React, { useEffect, useState } from "react";
import api from "../apiCall.tsx";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { checkTokenExpiry, getJWT } from "../utils.tsx";
// #CHANGE API
const MyBooks = () => {
  const navigate = useNavigate();
  const jwt = checkTokenExpiry();
  const parse_jwt = getJWT();
  if (jwt === false) {
    toast.error("Token Expire");
    navigate("/login");
  }
  const [myBooks, setMyBooks] = useState<any[]>([]);

  const getMyBooks = async () => {
    const payload = { 'user_id': jwt.sub }
    console.log(payload);
    
    await api
      .get("/my_books", {
        headers: {
          Authorization: `Bearer ${parse_jwt}`,
        },
      })
      .then((resp) => {
        setMyBooks(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(()=>{
    getMyBooks();
  },[])
  return (
    <div className="container">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>Book Name</th>
            <th>Quantity</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {myBooks.map((item, index) => (
            <tr key={item.id} className={`${item.id % 2 === 0 ? "table-primary" : "table-secondary"}`}>
              <td>{index+1}</td>
              <td>{item.book_name}</td>
              <td>{item.quantity}</td>
              <td>{item.total_cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;
