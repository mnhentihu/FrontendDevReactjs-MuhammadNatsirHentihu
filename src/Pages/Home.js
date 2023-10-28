import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [visibleRestaurants, setVisibleRestaurants] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://my-json-server.typicode.com/mnhentihu/restaurant-api/db"
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setRestaurants(data.restaurants);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  function handleLoadMore() {
    setVisibleRestaurants((visibleRestaurants) => visibleRestaurants + 4);
  }

  return (
    <div className="container">
      <Header />
      <hr />
      <FilterNavigation className="filter" />
      <hr />
      <RestaurantList restaurants={restaurants.slice(0, visibleRestaurants)} />
      <button className="more" onClick={handleLoadMore}>
        LOAD MORE
      </button>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>Restaurants</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        volutpat justo ac nisl sagittis mollis. Nunc mattis vehicula imperdiet.
      </p>
    </div>
  );
}

function FilterNavigation() {
  return (
    <div className="filter-container">
      <div className="filter-nav">
        <span>Filter By:</span>
        <div className="filter-open">
          <input type="radio" />
          <label>Open Now</label>
        </div>
        <div className="filter-price">
          <select defaultValue="defaultPrice">
            <option value="defaultPrice" disabled>
              Price
            </option>
            <option value="0">IDR 0+</option>
            <option value="50000">IDR 50.000+</option>
            <option value="100000">IDR 100.000+</option>
            <option value="200000">IDR 200.000+</option>
            <option value="300000">IDR 300.000+</option>
          </select>
        </div>
        <div className="filter-cat">
          <select defaultValue="defaultCategory">
            <option value="defaultCategory" disabled>
              Categories
            </option>
            <option value="cafe">Cafe</option>
            <option value="indonesian">Indonesian Food</option>
            <option value="japanese">Japanese Food</option>
            <option value="mexican">Mexican Food</option>
            <option value="arabian">Arabian Food</option>
            <option value="ayce">All You Can Eat</option>
          </select>
        </div>
      </div>
      <button>CLEAR ALL</button>
    </div>
  );
}

function RestaurantList({ restaurants, visibleRestaurants }) {
  return (
    <div className="restaurant-list">
      <h2>All Restaurants</h2>
      <div className="restaurants-container">
        {restaurants.map((restaurant) => (
          <Restaurants key={restaurant.id} data={restaurant} />
        ))}
      </div>
    </div>
  );
}

function Restaurants({ data }) {
  const navigate = useNavigate();

  const imgUrl = data.image;
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const openHour = parseInt(data.open.split(":")[0], 10);
  const closeHour = parseInt(data.close.split(":")[0], 10);

  const isOpen = currentHour >= openHour && closeHour > currentHour;

  function handleNavigateToDetail() {
    // Menggunakan useNavigate untuk berpindah halaman dan membawa informasi data
    navigate(`/detail`, { state: { restaurantData: data } });
  }

  return (
    <div className="restaurant-cards">
      <img src={imgUrl} alt="Restaurant" className="restaurant-image" />
      <div className="card-content">
        <div className="info">
          <h3>{data.name}</h3>
          <Rating data={data} />
        </div>
        <div className="category-price">
          <div className="cat-price">
            <p>{data.categories}</p>
            <p>IDR {data.min_price}</p>
          </div>
          {isOpen ? (
            <p
              className="status"
              style={{ color: "green", fontWeight: "bold" }}
            >
              Open Now
            </p>
          ) : (
            <p className="status" style={{ color: "red", fontWeight: "bold" }}>
              Closed
            </p>
          )}
        </div>
        <button onClick={handleNavigateToDetail}>LEARN MORE</button>
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
