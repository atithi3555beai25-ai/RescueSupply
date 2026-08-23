import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {

    return (
        <div className="card">

            <div className="food-icon">
                <img src={restaurant.image} alt={restaurant.food} />
            </div>

            <h3>{restaurant.name}</h3>

            <p>📍 {restaurant.city}</p>

            <p>🍽️ {restaurant.food}</p>

            <h4>{restaurant.meals} meals available</h4>

            <Link
                className="details-btn"
                to={`/restaurant/${restaurant.id}`}
            >
                View Details
            </Link>

        </div>
    );
}

export default RestaurantCard;