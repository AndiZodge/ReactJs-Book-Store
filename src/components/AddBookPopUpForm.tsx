import React, { useState } from "react";
import api from "../apiCall.tsx";
import toast from "react-hot-toast";
import { getJWT } from "../utils.tsx";

const AddBookPopUpForm = () => {
    const parse_jwt = getJWT();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    book_name: "",
    description: "",
    cost_per_book: 0,
    quantity_available: 0,
    image: "",
    genre: "",
    image_file: ""
  });
const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    try{
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
    }catch{
      toast.error('Could not upload image')
    }
  });
};



  const handleFormValues = async  (e) => {
    console.log(e.target.value);
    console.log(e.target.id);
    console.log(e);
    if (e.target.id === "image") {
      const file = e.target.files[0];

      if (file) {
        try {
          const base64String = await readFileAsDataURL(file);
          setFormData({ ...formData, [e.target.id]: base64String });
        } catch (error) {
          toast.error("Error reading file");
        }
      }
    } else {
      let value = e.target.value;
      setFormData({ ...formData, [e.target.id]: value });
      console.log(formData);
    }
  }; 

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const handleOnFormSubmit = async (e) => {
    e.preventDefault();
    await api.post('add_book', formData, {
        headers: {
          Authorization: `Bearer ${parse_jwt}`,
        }}).then(response =>{
      setFormData({
        book_name: "",
        cost_per_book: 0,
        quantity_available: 0,
        description: "",
        image: "",
        genre: "",
        image_file: "",
      });
      setShowForm(false);
    }).catch(error =>{
      console.log(error);
      // toast.error(error)
    })
  };
  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={toggleForm}>
        Add New Book
      </button>

      {showForm && (
        <div
          className="position-fixed w-25 p-3 border bg-dark rounded navbar-dark"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <button className="btn-close float-end" onClick={toggleForm}></button>
          <h2>Add New Book</h2>
          <form onSubmit={handleOnFormSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input required type="text" onChange={handleFormValues} value={formData.book_name} className="form-control" id="book_name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input required type="text" onChange={handleFormValues} value={formData.description} className="form-control" id="description" />
            </div>
            <div className="mb-3">
              <label className="form-label">Cost</label>
              <input required type="number" onChange={handleFormValues} value={formData.cost_per_book} className="form-control" id="cost_per_book" />
            </div>
            <div className="mb-3">
              <label className="form-label">Genre</label>
              <input required type="string" onChange={handleFormValues} value={formData.genre} className="form-control" id="genre" />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                required
                type="number"
                onChange={handleFormValues}
                value={formData.quantity_available}
                className="form-control"
                id="quantity_available"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input required type="file" onChange={handleFormValues} className="form-control" id="image" />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Book
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddBookPopUpForm;
