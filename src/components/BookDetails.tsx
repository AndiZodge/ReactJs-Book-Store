import React, { useEffect, useState } from "react";
import api from "../apiCall.tsx";
import toast, { Toaster } from "react-hot-toast";
import { getJWT } from "../utils.tsx";

const BookDetails = (props) => {
    const { id } = props;
    const jwt = getJWT();
    const [isEditing, setIsEditing] = useState(false)
    const [details, setDetails] = useState({
      book_name: "",
      description: "",
      cost_per_book: 0,
      quantity_available: 0,
      image: "",
      genre: ""
    }); 
    const readFileAsDataURL = (file) => {

  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    } catch {
      toast.error("Could not upload image");
    }
  });
};
useEffect(() => {
  getBookDetails();
}, []);

const handleFormValues = async (e) => {
  console.log(e.target.value);
  console.log(e.target.id);
  console.log(e);
  if (e.target.id === "image") {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64String = await readFileAsDataURL(file);
        setDetails({ ...details, [e.target.id]: base64String });
      } catch (error) {
        toast.error("Error reading file");
      }
    }
  } else {
    let value = e.target.value;
    setDetails({ ...details, [e.target.id]: value });
  }
}; 

    const handleOnFormSubmit = async (e) => {
        e.preventDefault();
        await api.put(`update_book/${id}`, details, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }).then(resp =>{
          setIsEditing(!isEditing);
        }).catch(error=>{
          console.log(error);
          // toast.error(error);
        })        
    }
    const getBookDetails = async () => {
            const resp = await api.get(`get_book/${id}`);
            console.log(resp);
            if (resp.status ===200){
                setDetails(resp.data)
            }else{
                toast.error('failed to get data')
            }
        }
    const handleEdit =() =>{
            setIsEditing(!isEditing)
        }
        
    return (
      <div className="container-fluid mt-4">
        {/* <Toaster position="top-right"/> */}

        {isEditing ? (
          <div>
            <form onSubmit={handleOnFormSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input required type="text" onChange={handleFormValues} value={details.book_name} className="form-control" id="book_name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input required type="text" onChange={handleFormValues} value={details.description} className="form-control" id="description" />
              </div>
              <div className="mb-3">
                <label className="form-label">Cost</label>
                <input required type="number" onChange={handleFormValues} value={details.cost_per_book} className="form-control" id="cost_per_book" />
              </div>
              <div className="mb-3">
                <label className="form-label">Genre</label>
                <input required type="string" onChange={handleFormValues} value={details.genre} className="form-control" id="genre" />
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  required
                  type="number"
                  onChange={handleFormValues}
                  value={details.quantity_available}
                  className="form-control"
                  id="quantity_available"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input type="file" onChange={handleFormValues} className="form-control" id="image" />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Book
              </button>
            </form>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src={details.image} className="img-fluid" style={{ maxHeight: "300px", maxWidth: "100%", objectFit: "cover" }} alt="details" />
            </div>
            <div className="col-md-6">
              <h2>{details.book_name}</h2>
              <p>
                <strong>Description:</strong> {details.description}
              </p>
              <p>
                <strong>Genre:</strong> {details.genre}
              </p>
              <p>
                <strong>Price:</strong> ${details.cost_per_book}
              </p>

              <p>
                <strong>Quantity:</strong> {details.quantity_available}
              </p>
              <button className="btn btn-dark" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    );
    };
export default BookDetails;
