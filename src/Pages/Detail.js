import "./detail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Detail() {
  const location = useLocation();
  const restaurantData = location.state?.restaurantData || {};
  console.log(restaurantData);
  const navigate = useNavigate();

  return (
    <div className="body">
      <button onClick={() => navigate("/")}>
        {<MdOutlineArrowBackIos />} Back Home
      </button>
      <hr />
      <Header data={restaurantData} />
      <hr />
      <div className="restaurant-detail">
        <RestaurantImage data={restaurantData} />
        <RestaurantDetail data={restaurantData} />
      </div>
    </div>
  );
}

function Header({ data }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <Rating data={data} />
    </div>
  );
}

function RestaurantImage({ data }) {
  return (
    <div className="image-container">
      <img src={data.image} alt="restaurant" />
      <div className="open-price">
        <div className="open-close">
          <p>Open : {data.open}</p>
          <p>Close : {data.close}</p>
        </div>
        <p className="price">Price start from : IDR {data.min_price}</p>
      </div>
    </div>
  );
}

function RestaurantDetail({ data }) {
  return (
    <div className="">
      <div>
        <p>Rating : {data.rating}</p>
        <Rating data={data} />
        <p>{data.description}</p>
      </div>
    </div>
  );
}

function Rating({ data }) {
  const rating = data.rating;
  const roundedRating = Math.floor(rating); // Menggunakan Math.floor untuk menangani bintang setengah

  const stars = Array.from({ length: 5 });

  return (
    <div className="star-rating">
      {stars.map((_, index) => {
        if (index + 1 <= roundedRating) {
          // Menampilkan bintang penuh
          return <FaStar key={index} />;
        } else if (index < rating && index + 1 > roundedRating) {
          // Menampilkan setengah bintang
          return <FaStarHalfAlt key={index} />;
        } else {
          // Menampilkan bintang kosong
          return <FaRegStar key={index} />;
        }
      })}
    </div>
  );
}
