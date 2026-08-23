import { useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import restaurants from "../data/Restaurant";

function Restaurants() {

    const [search, setSearch] = useState("");

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="page">

            <h1>Available Food Donations</h1>

            <p className="subtitle">
                Find surplus food available near you.
            </p>

            {/* Search Bar */}
            <div className="search-box">

                <input
                    type="text"
                    placeholder="Search restaurant or city..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button className="search-btn">
                    🔍 Search
                </button>

            </div>

            {/* Restaurant Cards */}
            <div className="restaurant-grid">

                {filteredRestaurants.length > 0 ? (

                    filteredRestaurants.map((restaurant) => (

                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        />

                    ))

                ) : (

                    <p>No restaurants found.</p>

                )}

            </div>

        </main>
    );
}

export default Restaurants;