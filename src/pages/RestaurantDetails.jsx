import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDonations } from "../context/DonationContext";

function RestaurantDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getDonationById, claimMeals, deleteDonation } = useDonations();

    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
    const [claimCount, setClaimCount] = useState(1);
    const [claimantName, setClaimantName] = useState("");

    const restaurant = getDonationById(id);

    if (!restaurant) {
        return (
            <main className="page">
                <h1>Donation Not Found</h1>
                <p>The requested food donation could not be found or has been removed.</p>
                <Link to="/restaurants" className="back-btn" style={{ marginTop: "20px", display: "inline-block" }}>
                    ← Back to Donations
                </Link>
            </main>
        );
    }

    const availableMeals = Number(restaurant.meals) || 0;
    const isAvailable = availableMeals > 0 && restaurant.donationStatus !== "Claimed";

    const handleClaimSubmit = (e) => {
        e.preventDefault();
        const success = claimMeals(restaurant.id, claimCount);
        if (success) {
            setIsClaimModalOpen(false);
            setClaimCount(1);
            setClaimantName("");
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to remove this donation listing?")) {
            deleteDonation(restaurant.id);
            navigate("/restaurants");
        }
    };

    return (
        <main className="details-page">

            <div className="details-card">

                {/* Restaurant Image */}
                <div className="details-image">
                    <img
                        src={
                            restaurant.image ||
                            "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
                        }
                        alt={restaurant.name}
                    />
                </div>

                <h1>{restaurant.name}</h1>

                <p className="location">
                    📍 {restaurant.city}
                </p>

                {/* Donation Status & Availability Badges */}
                <div className="badges-row">
                    <div className={`status-badge ${isAvailable ? "status-available" : "status-claimed"}`}>
                        {isAvailable ? "🟢 Available" : "🔴 Claimed"}
                    </div>

                    <div className="meals-badge">
                        🍱 {availableMeals} {availableMeals === 1 ? "Meal" : "Meals"} Available
                    </div>
                </div>

                <div className="info-section">

                    <div className="info-item">
                        <span>🍽️</span>
                        <div>
                            <strong>Food Available</strong>
                            <p>
                                {restaurant.food || "Food information not available"}
                            </p>
                        </div>
                    </div>

                    {restaurant.category && (
                        <div className="info-item">
                            <span>📦</span>
                            <div>
                                <strong>Food Category</strong>
                                <p style={{ textTransform: "capitalize" }}>
                                    {restaurant.category.replace("-", " ")}
                                </p>
                            </div>
                        </div>
                    )}

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

                {/* Action CTA: Claim Food (Lectures 61-66 Modal & Interaction) */}
                <div className="claim-action-box">
                    {isAvailable ? (
                        <button
                            type="button"
                            className="claim-btn"
                            onClick={() => setIsClaimModalOpen(true)}
                        >
                            🤝 Claim / Request Surplus Food
                        </button>
                    ) : (
                        <button type="button" className="claim-btn disabled" disabled>
                            ✓ Fully Claimed & Distributed
                        </button>
                    )}
                </div>

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
                            <strong>Meals Left</strong>
                            <p>{availableMeals} Servings</p>
                        </div>

                        <div>
                            <span>📍</span>
                            <strong>Location</strong>
                            <p>{restaurant.city}</p>
                        </div>

                    </div>

                </div>

                {restaurant.lat && restaurant.lng && (
                    <div className="coordinates-info">
                        <h2>🗺️ Location Coordinates</h2>
                        <p>Latitude: {restaurant.lat}</p>
                        <p>Longitude: {restaurant.lng}</p>
                    </div>
                )}

                <div className="details-buttons">
                    <Link
                        className="back-btn"
                        to="/restaurants"
                    >
                        ← Back to Donations
                    </Link>

                    {/* Delete listing option (Lectures 67-72 CRUD workflow) */}
                    <button
                        type="button"
                        className="delete-btn"
                        onClick={handleDelete}
                    >
                        🗑 Remove Listing
                    </button>
                </div>

            </div>

            {/* Modal for Claiming Meals (Lectures 61-66 UI Modal Component) */}
            {isClaimModalOpen && (
                <div className="modal-overlay" onClick={() => setIsClaimModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Claim Surplus Meals</h2>
                            <button
                                type="button"
                                className="modal-close"
                                onClick={() => setIsClaimModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>

                        <p className="modal-subtitle">
                            Request meals from <strong>{restaurant.name}</strong> to distribute to communities in need.
                        </p>

                        <form onSubmit={handleClaimSubmit} className="modal-form">
                            <label htmlFor="claimant-name">Your Name / Organization</label>
                            <input
                                id="claimant-name"
                                type="text"
                                placeholder="E.g., Seva Food NGO / Volunteer John"
                                value={claimantName}
                                onChange={(e) => setClaimantName(e.target.value)}
                                required
                            />

                            <label htmlFor="claim-count">
                                Number of Meals to Claim (Max: {availableMeals})
                            </label>
                            <input
                                id="claim-count"
                                type="number"
                                min="1"
                                max={availableMeals}
                                value={claimCount}
                                onChange={(e) => setClaimCount(Math.max(1, Math.min(availableMeals, Number(e.target.value))))}
                                required
                            />

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setIsClaimModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Confirm Claim
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </main>
    );
}

export default RestaurantDetails;
