import { useParams, Link } from "react-router-dom";
import restaurants from "../data/Restaurant";

function RestaurantDetails() {
    const { id } = useParams();

    const restaurant = restaurants.find(
        (item) => String(item.id) === String(id)
    );

    if (!restaurant) {
        return (
            <main className="page">
                <h1>Restaurant Not Found</h1>
                <Link to="/restaurants">
                    ← Go Back
                </Link>
            </main>
        );
    }

    return (
        <main className="details-page">
            <div className="details-card">

                {/* Food Icon */}
                <div className="big-food-icon">
                    🍛
                </div>

                {/* Restaurant Information */}
                <h1>{restaurant.name}</h1>

                <p className="location">
                    📍 {restaurant.city}
                </p>

                {/* Meals */}
                <div className="meals-badge">
                    🍱 {restaurant.meals} Meals Available
                </div>

                {/* Food Information */}
                <div className="info-section">

                    <div className="info-item">
                        <span>🍽️</span>
                        <div>
                            <strong>Food Available</strong>
                            <p>{restaurant.food}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span>📍</span>
                        <div>
                            <strong>Address</strong>
                            <p>{restaurant.address}</p>
                        </div>
                    </div>

                    <div className="info-item description-box">
                        <span>📝</span>
                        <div>
                            <strong>About this Donation</strong>
                            <p>{restaurant.description}</p>
                        </div>
                    </div>

                </div>

                {/* Restaurant Location */}
                <h2 className="section-title">
                    📍 Restaurant Location
                </h2>

                <div className="map-container">
                    <iframe
                        title="Restaurant Location"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            restaurant.address
                        )}&output=embed`}
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Directions */}
                <a
                    className="primary-btn"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        restaurant.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    🧭 Get Directions
                </a>

                {/* Pickup Information */}
                <div className="pickup-info">

                    <h2>🚚 Pickup Information</h2>

                    <div className="pickup-grid">

                        <div>
                            <span>⏰</span>
                            <strong>Pickup Time</strong>
                            <p>Available Today</p>
                        </div>

                        <div>
                            <span>👥</span>
                            <strong>Meals</strong>
                            <p>{restaurant.meals} People</p>
                        </div>

                        <div>
                            <span>📍</span>
                            <strong>Location</strong>
                            <p>{restaurant.city}</p>
                        </div>

                    </div>

                </div>

                {/* Back Button */}
                <div className="details-buttons">
                    <Link
                        className="back-btn"
                        to="/restaurants"
                    >
                        ← Back to Donations
                    </Link>
                </div>

            </div>
        </main>
    );
}

export default RestaurantDetails;