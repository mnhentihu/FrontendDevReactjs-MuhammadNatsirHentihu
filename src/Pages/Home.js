import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [visibleRestaurants, setVisibleRestaurants] = useState(8);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = category
          ? `https://my-json-server.typicode.com/mnhentihu/restaurant-api/db?category=${category}`
          : "https://my-json-server.typicode.com/mnhentihu/restaurant-api/db";

        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setRestaurants(data.restaurants);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [category]);

  function handleLoadMore() {
    setVisibleRestaurants((visibleRestaurants) => visibleRestaurants + 4);
  }

  function clearFilters() {
    setIsOpenNow(false);
    setMinPrice("");
    setCategory("");
  }

  const filteredRestaurants = restaurants
    .filter(
      (restaurant) =>
        !isOpenNow ||
        (parseInt(restaurant.open.split(":")[0]) <= new Date().getHours() &&
          parseInt(restaurant.close.split(":")[0]) > new Date().getHours())
    )
    .filter(
      (restaurant) =>
        minPrice === "" || parseInt(restaurant.min_price) >= parseInt(minPrice)
    )
    .filter(
      (restaurant) =>
        category === "" ||
        restaurant.cat.toLowerCase() === category.toLowerCase()
    );

  return (
    <div className="container">
      <Header />
      <hr />
      <FilterNavigation
        isOpenNow={isOpenNow}
        setIsOpenNow={setIsOpenNow}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        category={category}
        setCategory={setCategory}
        clearFilters={clearFilters}
      />
      <hr />
      <RestaurantList
        restaurants={filteredRestaurants.slice(0, visibleRestaurants)}
      />
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

function FilterNavigation({
  isOpenNow,
  setIsOpenNow,
  minPrice,
  setMinPrice,
  category,
  setCategory,
  clearFilters,
}) {
  return (
    <div className="filter-container">
      <div className="filter-nav">
        <span>Filter By:</span>
        <div className="filter-open">
          <input
            type="checkbox"
            checked={isOpenNow}
            onChange={(e) => setIsOpenNow(e.target.checked)}
          />
          <label>Open Now</label>
        </div>
        <div className="filter-price">
          <select
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          >
            <option value="">Price</option>
            <option value="0">IDR 0+</option>
            <option value="50000">IDR 50.000+</option>
            <option value="100000">IDR 100.000+</option>
            <option value="200000">IDR 200.000+</option>
            <option value="300000">IDR 300.000+</option>
          </select>
        </div>
        <div className="filter-cat">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Categories</option>
            <option value="cafe">Cafe</option>
            <option value="indonesian">Indonesian Food</option>
            <option value="japanese">Japanese Food</option>
            <option value="mexican">Mexican Food</option>
            <option value="arabian">Arabian Food</option>
            <option value="ayce">All You Can Eat</option>
          </select>
        </div>
      </div>
      <button onClick={clearFilters}>CLEAR ALL</button>
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
