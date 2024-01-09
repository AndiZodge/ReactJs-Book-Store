import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { checkTokenExpiry } from "../utils.tsx";

const Navbar = () => {
  const [showAddBooks, setShowAddBooks] = useState(false)
  const [showUserList, setShowUserList] = useState(false);
  const [showUserBooksList, setShowUserBooksList] = useState(false);

  const navigate = useNavigate();

  const checkTokenExpire = () => {
    const jwt = checkTokenExpiry()
    if (jwt === false){
      toast.error("Token Expire");
      navigate("/login");
    }else{
      const is_admin = jwt.is_admin;
      if (is_admin === true){
        setShowAddBooks(true);
        setShowUserBooksList(true)
        setShowUserList(true)
      }
    }
  };
  const handleAddBookList = () =>{
    navigate('/addbooks')
  }
  const handleBookStore = () =>{
    navigate("/bookstore");
  }
  const handleMyBooks = () => {
      navigate("/mybooks");
    }
  const handleuserList = () => {
      navigate("/userlist");
    };
  const handleuserbookList = () => {
      navigate("/userbooklist");
    };
  useEffect(() => {
    checkTokenExpire();
  });
  const handleLogOut = () =>{
    localStorage.removeItem("og_jwt");
    localStorage.removeItem("jwt");
    navigate("/login");
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <button className="navbar-brand btn btn-outline-none btn-lg btn-block text-white" onClick={handleBookStore}>
          Book Store
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {showUserBooksList && (
              <li className="nav-item">
                <button className="navbar-brand btn btn-outline-none btn-lg btn-block text-white" onClick={handleuserbookList}>
                  User-Book List
                </button>
              </li>
            )}
            {showAddBooks && (
              <li className="nav-item">
                <button className="navbar-brand btn btn-outline-none btn-lg btn-block text-white" onClick={handleAddBookList}>
                  Books List
                </button>
              </li>
            )}
            {showUserList && (
              <li className="nav-item">
                <button className="navbar-brand btn btn-outline-none btn-lg btn-block text-white" onClick={handleuserList}>
                  User List
                </button>
              </li>
            )}
            <li className="nav-item">
              <button className="navbar-brand btn btn-outline-none btn-lg btn-block text-white" onClick={handleMyBooks}>
                My Books
              </button>
            </li>
            <li className="nav-item">
              <button className="navbar-brand btn btn-outline-none btn-lg btn-block text-white" onClick={handleLogOut}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
