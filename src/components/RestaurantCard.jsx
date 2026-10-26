import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
    const isClaimed = Number(restaurant.meals) <= 0 || restaurant.donationStatus === "Claimed";

    return (
        <div className={`card ${isClaimed ? "card-claimed" : ""}`}>

            <div className="food-icon">
                <img src={restaurant.image} alt={restaurant.food} />
            </div>

            <h3>{restaurant.name}</h3>

            <p>📍 {restaurant.city}</p>

            <p>🍽️ {restaurant.food}</p>

            <h4>
                {isClaimed ? "✓ All meals claimed" : `${restaurant.meals} meals available`}
            </h4>

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
