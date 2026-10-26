import { useState } from "react";
import { useNavigate } from "react-router-dom";
import restaurants from "../data/Restaurant";
import { useDonations } from "../context/DonationContext";

function AddDonation() {
    const navigate = useNavigate();
    const { addDonation } = useDonations();

    const [form, setForm] = useState({
        donorName: "",
        foodName: "",
        foodCategory: "",
        quantity: "",
        pickupLocation: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });

        // Clear error as user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    // Client-side validation strategy (Lectures 55-60)
    const validateForm = () => {
        const newErrors = {};

        if (!form.donorName) {
            newErrors.donorName = "Please select a partner restaurant.";
        }

        if (!form.foodName.trim()) {
            newErrors.foodName = "Food item name is required.";
        } else if (form.foodName.trim().length < 3) {
            newErrors.foodName = "Food name must be at least 3 characters long.";
        }

        if (!form.foodCategory) {
            newErrors.foodCategory = "Please select a food category.";
        }

        const qtyNum = parseInt(form.quantity, 10);
        if (!form.quantity || isNaN(qtyNum) || qtyNum <= 0) {
            newErrors.quantity = "Please enter a valid positive number of meals/servings.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Find selected restaurant
        const selectedRestaurant = restaurants.find(
            (restaurant) => restaurant.name === form.donorName
        );

        if (!selectedRestaurant) {
            setErrors((prev) => ({
                ...prev,
                donorName: "Please select a valid partner restaurant."
            }));
            setIsSubmitting(false);
            return;
        }

        // Add donation via global Context API
        addDonation({
            name: selectedRestaurant.name,
            city: selectedRestaurant.city,
            address: selectedRestaurant.address,
            lat: selectedRestaurant.lat,
            lng: selectedRestaurant.lng,
            image: selectedRestaurant.image,
            meals: parseInt(form.quantity, 10),
            food: form.foodName.trim(),
            category: form.foodCategory,
            description: selectedRestaurant.description,
            pickupLocation: selectedRestaurant.address
        });

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
                noValidate
            >

                <div className="form-intro">
                    <h2>Donation details</h2>

                    <p>
                        Select your restaurant and provide the food details.
                    </p>
                </div>


                {/* DONOR NAME */}
                <label htmlFor="donor-name">
                    Donor Name
                </label>

                <select
                    id="donor-name"
                    name="donorName"
                    value={form.donorName}
                    onChange={handleChange}
                    className={errors.donorName ? "input-error" : ""}
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
                            {restaurant.name} ({restaurant.city})
                        </option>
                    ))}
                </select>
                {errors.donorName && (
                    <span className="form-error-msg">{errors.donorName}</span>
                )}


                {/* FOOD NAME */}
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
                    className={errors.foodName ? "input-error" : ""}
                    required
                />
                {errors.foodName && (
                    <span className="form-error-msg">{errors.foodName}</span>
                )}


                {/* FOOD CATEGORY */}
                <label htmlFor="food-category">
                    Food Category
                </label>

                <select
                    id="food-category"
                    name="foodCategory"
                    value={form.foodCategory}
                    onChange={handleChange}
                    className={errors.foodCategory ? "input-error" : ""}
                    required
                >
                    <option value="" disabled>
                        Select a category
                    </option>

                    <option value="prepared-meals">
                        Prepared meals
                    </option>

                    <option value="bakery">
                        Bakery & Breads
                    </option>

                    <option value="produce">
                        Fresh produce
                    </option>

                    <option value="packaged-food">
                        Packaged food
                    </option>
                </select>
                {errors.foodCategory && (
                    <span className="form-error-msg">{errors.foodCategory}</span>
                )}


                {/* QUANTITY */}
                <label htmlFor="quantity">
                    Quantity (Servings / Meals)
                </label>

                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    placeholder="Example: 20"
                    value={form.quantity}
                    onChange={handleChange}
                    className={errors.quantity ? "input-error" : ""}
                    required
                />
                {errors.quantity && (
                    <span className="form-error-msg">{errors.quantity}</span>
                )}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Donate Food"}
                </button>

            </form>

        </main>
    );
}

export default AddDonation;
