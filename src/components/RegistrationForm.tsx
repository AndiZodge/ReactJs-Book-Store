import React, { useState } from "react";
import api from "../apiCall.tsx";
// import  useHistory  from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegistrationForm = () => {
    const navigate = useNavigate();

    const goToLoginPage = () =>{
        navigate('/login')
    }

    const [formData, setFormData] = useState({
      username: "",
      password: "",
      email_id: "",
      confirm_password: "",
      mobile_number: "",
    });

    let handleFormChanges = (e) => {
        let value = e.target.value;    
        setFormData({ ...formData, [e.target.name]: value });
    };

    let handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        let is_psw_same = formData.confirm_password === formData.password ? true: false
        if (is_psw_same) {
            let resp = await api.post("create_user", formData);
            if (resp.status === 201){
              goToLoginPage()
            }else{
                toast.error('some error occured')
            }
        }
        else{
            toast.error('password not matching');
        }
        
    };

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
                  onChange={handleFormChanges}
                  value={formData.username}
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                />
              </div>
              <div className="form-group mt-4 ">
                <label htmlFor="email">Email Id</label>
                <input
                  type="email"
                  name="email_id"
                  required
                  onChange={handleFormChanges}
                  value={formData.email_id}
                  className="form-control"
                  id="email_id"
                  placeholder="Enter your email Id"
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="mobile_number">Mobile Number</label>
                <input
                  type="text"
                  name="mobile_number"
                  required
                  value={formData.mobile_number}
                  onChange={handleFormChanges}
                  className="form-control"
                  id="mobile_number"
                  placeholder="Enter your Mobile Number"
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
              <div className="form-group mt-4">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  required
                  onChange={handleFormChanges}
                  value={formData.confirm_password}
                  className="form-control"
                  id="confirm_password"
                  placeholder="Confirm password"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default RegistrationForm;
