import { useParams, Link } from "react-router-dom";
import restaurants from "../data/Restaurant";

function RestaurantDetails() {
    const { id } = useParams();

    const restaurant = restaurants.find(
        (item) => item.id === Number(id)
    );

    if (!restaurant) {
        return (
            <main className="page">
                <h1>Restaurant Not Found</h1>
                <Link to="/restaurants">Go Back</Link>
            </main>
        );
    }

    const mapLink =
        `https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`;

    return (
        <main className="details-page">

            <div className="details-card">

                <div className="big-food-icon">
                    🍛
                </div>

                <h1>{restaurant.name}</h1>

                <p className="location">
                    📍 {restaurant.city}
                </p>

                <h3>
                    🍱 {restaurant.meals} Meals Available
                </h3>

                <p>
                    <strong>Food:</strong> {restaurant.food}
                </p>

                <p>
                    <strong>Address:</strong> {restaurant.address}
                </p>

                <p>
                    {restaurant.description}
                </p>

                {/* Food and Pickup Information */}
  


                {/* Map */}
                <div className="map-container">
                    <iframe
                        title="Restaurant Location"
                        src={`https://www.google.com/maps?q=${restaurant.lat},${restaurant.lng}&output=embed`}
                        loading="lazy"
                    >
                    </iframe>
                </div>

                {/* Directions */}
                <a
                    className="primary-btn"
                    href={mapLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    🧭 Get Directions
                </a>

                <br />

                <Link
                    className="back-btn"
                    to="/restaurants"
                >
                    ← Back to Donations
                </Link>

            </div>

        </main>
    );
}

export default RestaurantDetails;