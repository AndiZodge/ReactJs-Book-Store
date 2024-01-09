
import React, { useEffect, useState } from "react";
import api from "../apiCall.tsx";
import '../css/card.css';
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getJWT } from "../utils.tsx";



const BooksCard = () => {
    const [bookList, setBookList] = useState<any[]>([]);
    const navigate = useNavigate()
    const jwt = getJWT();
    const getBookList = async () => {
    await api.get("get_books",{
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }).then(resp =>{
          setBookList(resp.data);
        }).catch(error=>{
          console.log(error);
        })
    };

    const handleCardClick = (book_id)=>{
      navigate(`/bookdetails/${book_id}`);
    }
    useEffect(() => {
      getBookList();
    }, []);


    return (
      <div className="container mt-5">
        <div className="row">
          {bookList.map((book, index) => (
            <div className="col-md-4 mb-3" key={index} onClick={() => handleCardClick(book.id)}>
              <div className="card card-hover">
                <img src={book.image} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} alt="Card" />
                <div className="card-body">
                  <h5 className="card-title text-center">{book.book_name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

};

export default BooksCard;
