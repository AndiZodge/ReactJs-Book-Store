import React, { useEffect, useState } from "react";
import api from "../apiCall.tsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/card.css";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getJWT } from "../utils.tsx";

const GenreCorousel = (props) => {
  let {genre} = props
  const navigate = useNavigate()
  const jwt = getJWT();

  const genreObj = {'genre': genre}
  const [bookList, setBookList] = useState<any[]>([]);
  const getBookList = async () => {
  await api.post("get_books_by_genre", genreObj, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }).then(resp =>{
          setBookList(resp.data);
        }).catch(error=>{
          console.log(error);
        });
    }
  useEffect(() => {
    getBookList();
  }, []);

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
  const handleClick = (id) =>{
    navigate(`/details/${id}`);
    
  }
return (
  <div className="container mt-5 flex justify-center">
    <h2>{genre} Books</h2>
    <Slider {...settings}>
      {bookList.map((book) => (
        <div className="col-md-4 ml-3" key={book.name} onClick={ ()=> {handleClick(book.id)}}>
          <div className="card card-hover">
            <img src={book.image} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} alt="Card" />
            <div className="card-body bg-dark text-white">
              <h5 className="card-title text-center">{book.book_name}</h5>
              <h6 className="card-title text-center">{book.description}</h6>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);
};

export default GenreCorousel;
