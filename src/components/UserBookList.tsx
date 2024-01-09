import React, { useEffect, useState } from "react";
import api from "../apiCall.tsx";
import toast from "react-hot-toast";
import { getJWT } from "../utils.tsx";

const UserBookListTable = () => {
  const [userBookList, setUserBookList] = useState<any[]>([]);
  const jwt = getJWT();

  const getUserList = async () => {
    await api.get("user_book_list", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }).then(resp =>{
          setUserBookList(resp.data);
        }).catch(error=>{
          console.log(error);
        })
  };
  useEffect(() => {
    getUserList();
  }, []);

  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentItems = userBookList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(userBookList.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Book Name</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Quantity</th>
            <th>Total Cost</th>
            <th>Admin ?</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className={`${item.id % 2 === 0 ? "table-primary" : "table-secondary"}`}>
              <td>{item.book_name}</td>
              <td>{item.username}</td>

              <td>{item.email_id}</td>
              <td>{item.quantity}</td>
              <td>{item.total_cost}</td>
              <td>{item.is_admin ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserBookListTable;
