import React, { useEffect, useState } from "react";
import api from "../apiCall.tsx";
import { getJWT } from "../utils.tsx";

const UserListTable = () => {

    const [userList, setUserList] = useState<any[]>([]);
    const jwt = getJWT();

    const getUserList = async () => {
        let resp = await api.get("user_list", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }).then(resp =>{
          setUserList(resp.data);
        }).catch(error=>{
          console.log(error);
        })
    }
    
    useEffect(()=>{
        getUserList();
    }, [])



    const itemsPerPage = 2; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(userList.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
      <div className="container mt-4">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Email</th>
              <th>UserName</th>
              <th>Mobile Number</th>
              <th>Admin ?</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className={`${item.id % 2 === 0 ? "table-primary" : "table-secondary"}`}>
                <td>{item.email_id}</td>
                <td>{item.username}</td>
                <td>{item.mobile_number}</td>
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

}


export default UserListTable;

