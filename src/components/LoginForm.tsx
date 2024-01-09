import React, { useState } from "react";
import api from "../apiCall.tsx";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
// import BASE_URL from "../config.tsx";
import {jwtDecode} from "jwt-decode";
const LoginForm = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    let handleFormChanges = (e) => {
        let value = e.target.value
        setFormData({...formData, [e.target.name]: value})
    }

    const goToRegisterPage = () => {
      navigate("/register");
    }

    let handleFormSubmit = async (e) =>{
       e.preventDefault();
      try {
        let resp = await api.post("/user_login", formData);
        if (resp.status === 200) {
          try {
            let token = resp.data.jwt;
            let og_jwt = token;
            let decodedToken = jwtDecode(token);
            localStorage.setItem("jwt", JSON.stringify(decodedToken));
            localStorage.setItem("og_jwt", og_jwt);

            navigate("/bookstore");
          } catch (error) {
            toast.error(error.message);
            setFormData({ password: "", username: "" });
          }
        }
      } catch (error) {
        toast.error(error.message);
        setFormData({ password: "", username: "" });
      }
    }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="border p-4 bg-dark" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleFormChanges}
                className="form-control"
                id="username"
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleFormChanges}
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-primary mt-2">
                    Login
                  </button>
                </div>
                <div className="col">
                  <button type="button" className="btn btn-primary mt-2" onClick={goToRegisterPage}>
                    Create New Account
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
