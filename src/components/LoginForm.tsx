import React, { useState } from "react";
import api from "../apiCall.tsx";
const LoginForm = () => {

    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });

    let handleFormChanges = (e) => {
        let value = e.target.value
        setFormData({...formData, [e.target.name]: value})
    }

    let handleFormSubmit = async (e) =>{
       e.preventDefault();
       console.log(formData);
       let resp = await api.post("/user_login", formData);
       console.log(resp);
       
    }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="border p-4" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="userName"
                // value={formData.userName}
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
                value={formData.password}
                onChange={handleFormChanges}
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
