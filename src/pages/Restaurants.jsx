import { useState, useMemo } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { useDonations } from "../context/DonationContext";

function Restaurants() {
    const { donations, loading } = useDonations();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    const categories = [
        { id: "all", label: "All Items" },
        { id: "prepared-meals", label: "🍲 Prepared Meals" },
        { id: "bakery", label: "🥖 Bakery & Breads" },
        { id: "produce", label: "🥦 Fresh Produce" },
        { id: "packaged-food", label: "📦 Packaged Food" }
    ];

    // Search, Filter and Sort pattern (Lectures 61-66)
    const filteredRestaurants = useMemo(() => {
        return donations
            .filter((restaurant) => {
                const matchesSearch =
                    restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
                    restaurant.city.toLowerCase().includes(search.toLowerCase()) ||
                    (restaurant.food && restaurant.food.toLowerCase().includes(search.toLowerCase()));

                const matchesCategory =
                    category === "all" ||
                    (restaurant.category && restaurant.category.toLowerCase() === category.toLowerCase());

                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                if (sortBy === "meals-desc") {
                    return (Number(b.meals) || 0) - (Number(a.meals) || 0);
                }
                if (sortBy === "meals-asc") {
                    return (Number(a.meals) || 0) - (Number(b.meals) || 0);
                }
                if (sortBy === "name-asc") {
                    return a.name.localeCompare(b.name);
                }
                return 0;
            });
    }, [donations, search, category, sortBy]);

    return (
        <main className="page">

            <h1>Available Food Donations</h1>

            <p className="subtitle">
                Find surplus food available near you and help reduce food waste.
            </p>

            {/* Search Box */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search by restaurant, food, or city..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button className="search-btn" type="button">
                    🔍 Search
                </button>
            </div>

            {/* Filter and Sort Toolbar (Lectures 61-66) */}
            <div className="filter-sort-toolbar">
                <div className="category-tabs" role="tablist" aria-label="Donation categories">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`category-pill ${category === cat.id ? "active" : ""}`}
                            onClick={() => setCategory(cat.id)}
                            role="tab"
                            aria-selected={category === cat.id}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="sort-wrapper">
                    <label htmlFor="sort-select">Sort by:</label>
                    <select
                        id="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="default">Default</option>
                        <option value="meals-desc">Most Meals Available</option>
                        <option value="meals-asc">Fewest Meals Available</option>
                        <option value="name-asc">Alphabetical (A - Z)</option>
                    </select>
                </div>
            </div>

            {/* Async Loading State (Lectures 49-54) */}
            {loading ? (
                <div className="loading-state">
                    <p>Loading available food donations...</p>
                </div>
            ) : (
                <div className="restaurant-grid">
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                restaurant={restaurant}
                            />
                        ))
                    ) : (
                        <div className="no-results-box">
                            <p>No food donations found matching your search and filter criteria.</p>
                            {(search || category !== "all" || sortBy !== "default") && (
                                <button
                                    type="button"
                                    className="reset-filter-btn"
                                    onClick={() => {
                                        setSearch("");
                                        setCategory("all");
                                        setSortBy("default");
                                    }}
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}

        </main>
    );
}

export default Restaurants;
