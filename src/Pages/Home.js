import { useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <Header />
      <hr />
      <FilterNavigation className="filter" />
      <hr />
      <RestaurantList />
      <button className="more">LOAD MORE</button>
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
            <option value="50-100">50.000 - 100.000</option>
            <option value="100-200">100.000 - 200.000</option>
            <option value="200-300">200.000 - 300.000</option>
            <option value="300-400">300.000 - 400.000</option>
          </select>
        </div>
        <div className="filter-cat">
          <select defaultValue="defaultCategory">
            <option value="defaultCategory" disabled>
              Categories
            </option>
            <option value="seafood">Seafood</option>
            <option value="chinese">Chinese</option>
          </select>
        </div>
      </div>
      <button>CLEAR ALL</button>
    </div>
  );
}

function RestaurantList() {
  return (
    <div className="restaurant-list">
      <h2>All Restaurants</h2>
      <div className="restaurants-container">
        <Restaurants />
        <Restaurants />
        <Restaurants />
        <Restaurants />
        <Restaurants />
        <Restaurants />
        <Restaurants />
        <Restaurants />
      </div>
    </div>
  );
}

function Restaurants() {
  const navigate = useNavigate();

  return (
    <div className="restaurant-cards">
      <img src="./logo512.png" alt="Restaurant" className="restaurant-image" />
      <div className="card-content">
        <div className="info">
          <h3>Restaurant Name</h3>
          <h4>Rating</h4>
        </div>
        <div className="category-price">
          <div className="cat-price">
            <p>Category</p>
            <p>•</p>
            <p>Price</p>
          </div>
          <p className="status">Open Now</p>
        </div>
        <button onClick={() => navigate("/detail")}>LEARN MORE</button>
      </div>
    </div>
  );
}
