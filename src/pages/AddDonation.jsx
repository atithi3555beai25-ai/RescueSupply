import { useState } from "react";
import { useNavigate } from "react-router-dom";
import restaurants from "../data/Restaurant";

function AddDonation() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        donorName: "",
        foodName: "",
        foodCategory: "",
        quantity: "",
        pickupLocation: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Find selected restaurant
        const selectedRestaurant = restaurants.find(
            (restaurant) => restaurant.name === form.donorName
        );

        if (!selectedRestaurant) {
            alert("Please select a restaurant.");
            return;
        }

        const savedDonations = JSON.parse(
            localStorage.getItem("donations") || "[]"
        );

        // Save donation with restaurant details
        savedDonations.push({
            id: Date.now(),

            // Restaurant details
            name: selectedRestaurant.name,
            city: selectedRestaurant.city,
            address: selectedRestaurant.address,
            lat: selectedRestaurant.lat,
            lng: selectedRestaurant.lng,
            image: selectedRestaurant.image,

            // Donation details
            meals: form.quantity,
            food: form.foodName,
            category: form.foodCategory,

            description:
                selectedRestaurant.description,

            pickupLocation: selectedRestaurant.address,

            donationStatus: "Available"
        });

        localStorage.setItem(
            "donations",
            JSON.stringify(savedDonations)
        );

        navigate("/restaurants");
    };

    return (
        <main className="page donation-page">

            <header className="page-header">
                <span className="eyebrow">
                    Make a difference
                </span>

                <h1>Donate Food</h1>

                <p className="subtitle">
                    Share surplus food with people in need and help prevent
                    good food from going to waste.
                </p>
            </header>

            <form
                className="donation-form"
                onSubmit={handleSubmit}
            >

                <div className="form-intro">
                    <h2>Donation details</h2>

                    <p>
                        Select your restaurant and provide the food details.
                    </p>
                </div>


                <label htmlFor="donor-name">
                    Donor Name
                </label>

                <select
                    id="donor-name"
                    name="donorName"
                    value={form.donorName}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>
                        Select a restaurant
                    </option>

                    {restaurants.map((restaurant) => (
                        <option
                            key={restaurant.id}
                            value={restaurant.name}
                        >
                            {restaurant.name}
                        </option>
                    ))}
                </select>


                <label htmlFor="food-name">
                    Food Name
                </label>

                <input
                    type="text"
                    id="food-name"
                    name="foodName"
                    placeholder="Example: Vegetable rice"
                    value={form.foodName}
                    onChange={handleChange}
                    required
                />


                {/* FOOD CATEGORY */}

                <label htmlFor="food-category">
                    Food Category
                </label>

                <select
                    id="food-category"
                    name="foodCategory"
                    value={form.foodCategory}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>
                        Select a category
                    </option>

                    <option value="prepared-meals">
                        Prepared meals
                    </option>

                    <option value="bakery">
                        Bakery
                    </option>

                    <option value="produce">
                        Fresh produce
                    </option>

                    <option value="packaged-food">
                        Packaged food
                    </option>
                </select>


                {/* QUANTITY */}

                <label htmlFor="quantity">
                    Quantity
                </label>

                <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    placeholder="Example: 20 servings"
                    value={form.quantity}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Donate Food
                </button>

            </form>

        </main>
    );
}

export default AddDonation;