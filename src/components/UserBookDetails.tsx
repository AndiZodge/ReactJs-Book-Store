import React, { useEffect, useState } from "react";
import api from "../apiCall.tsx";
import toast from "react-hot-toast";
import { checkTokenExpiry, getJWT } from "../utils.tsx";
import { useNavigate, useParams } from "react-router";

const UserBookDetails = () => {
    const navigate = useNavigate()
    const jwt = checkTokenExpiry();
    if (jwt === false) {
      toast.error("Token Expire");
      navigate("/login");
    }
  const parse_jwt = getJWT();

  const { id } = useParams(); 
  const [details, setDetails] = useState({
    id: "",
    book_name: "",
    description: "",
    cost_per_book: 0,
    quantity_available: 0,
    image: "",
    genre: "",
  });



  useEffect(() => {
    getBookDetails();
  }, []);

  const handleSubmit = async () =>{

      let allDetails = {
        book_id: details.id,
        user_id: jwt.sub,
        total_cost: details.cost_per_book
      };
    await api.post('/buy_book', allDetails,{
          headers: {
            Authorization: `Bearer ${parse_jwt}`,
          },
        }).then(resp =>{
          navigate("/mybooks");
        }).catch(error=>{
          console.log(error);
        })
  }

  const getBookDetails = async () => {
    await api.get(`get_book/${id}`, {
          headers: {
            Authorization: `Bearer ${parse_jwt}`,
          },
        }).then(resp =>{
          setDetails(resp.data);
        }).catch(error=>{
          console.log(error);
        })
  }


  return (
    <div className="container-fluid mt-4">
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
            <p className="text-danger">
              {details.quantity_available <10 ? details.quantity_available ===0? <p></p>:<p>Only <strong>{details.quantity_available}</strong> book pending</p> : <></>}
            </p>
            { details.quantity_available === 0 ?
              <button className="btn btn-dark text-danger" >Out Of Stock</button> 
              :<button className="btn btn-dark" onClick={handleSubmit}>Buy Now</button>
            }
          </div>
        </div>
    
    </div>
  );
};
export default UserBookDetails;
