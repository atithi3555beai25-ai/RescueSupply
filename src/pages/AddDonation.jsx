import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const savedDonations = JSON.parse(
            localStorage.getItem("donations") || "[]"
        );

        savedDonations.push({
            id: Date.now(),
            name: form.donorName,
            city: form.pickupLocation,
            meals: form.quantity,
            food: form.foodName,
            description: `${form.foodCategory} donation available for pickup.`,
            address: form.pickupLocation,
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
        });

        localStorage.setItem("donations", JSON.stringify(savedDonations));
        navigate("/restaurants");
    };

    return (
        <main className="page donation-page">
            <style>{`
                .donation-page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: clamp(40px, 8vw, 80px) 20px;
                    background: linear-gradient(135deg, #f7faf7 0%, #e9f7ed 100%);
                }

                .donation-page .page-header {
                    width: 100%;
                    max-width: 680px;
                    text-align: center;
                }

                .donation-page h1 {
                    font-size: clamp(32px, 5vw, 48px);
                    line-height: 1.15;
                    margin-bottom: 14px;
                }

                .donation-page .subtitle {
                    max-width: 560px;
                    margin: 0 auto 32px;
                    font-size: 17px;
                }

                .donation-page .donation-form {
                    width: 100%;
                    max-width: 720px;
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 8px 20px;
                    margin: 0;
                    padding: clamp(24px, 5vw, 40px);
                    border: 1px solid #dcebe0;
                    border-radius: 16px;
                    box-shadow: 0 12px 30px rgba(38, 115, 77, 0.12);
                }

                .donation-page .donation-form label {
                    margin-top: 8px;
                    margin-bottom: 5px;
                    color: #68736c;
                    font-size: 14px;
                }

                .donation-page .donation-form input,
                .donation-page .donation-form select {
                    width: 100%;
                    min-height: 48px;
                    padding: 12px 14px;
                    border: 1px solid #cbdccf;
                    border-radius: 8px;
                    outline: none;
                    background: #fbfefb;
                    color: #26352b;
                    font: inherit;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }

                .donation-page .donation-form input:focus,
                .donation-page .donation-form select:focus {
                    border-color: #26734d;
                    box-shadow: 0 0 0 3px rgba(38, 115, 77, 0.14);
                }

                .donation-page .donation-form label:nth-of-type(5),
                .donation-page .donation-form input:nth-of-type(3),
                .donation-page .donation-form button {
                    grid-column: 1 / -1;
                }

                .donation-page .donation-form button {
                    min-height: 50px;
                    margin-top: 18px;
                    border-radius: 8px;
                    font-weight: 700;
                    letter-spacing: 0.2px;
                    transition: background 0.2s ease, transform 0.2s ease;
                }

                .donation-page .donation-form button:hover {
                    transform: translateY(-1px);
                }

                @media (max-width: 640px) {
                    .donation-page .donation-form {
                        grid-template-columns: 1fr;
                        gap: 8px;
                    }

                    .donation-page .donation-form label:nth-of-type(5),
                    .donation-page .donation-form input:nth-of-type(3),
                    .donation-page .donation-form button {
                        grid-column: 1 / -1;
                    }
                }
            `}</style>

            <header className="page-header">
                <h1>Donate Food</h1>

                <p className="subtitle">
                    Share surplus food with people in need and help prevent
                    good food from going to waste.
                </p>
            </header>

            <form className="donation-form" onSubmit={handleSubmit}>

                <label htmlFor="donor-name">Donor Name</label>

                <input
                    type="text"
                    id="donor-name"
                    name="donorName"
                    placeholder="Enter your name"
                    value={form.donorName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="food-name">Food Name</label>

                <input
                    type="text"
                    id="food-name"
                    name="foodName"
                    placeholder="Example: Vegetable rice"
                    value={form.foodName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="food-category">Food Category</label>

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
                    <option value="prepared-meals">Prepared meals</option>
                    <option value="bakery">Bakery</option>
                    <option value="produce">Fresh produce</option>
                    <option value="packaged-food">Packaged food</option>
                </select>

                <label htmlFor="quantity">Quantity</label>

                <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    placeholder="Example: 20 servings"
                    value={form.quantity}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="pickup-location">Pickup Location</label>

                <input
                    type="text"
                    id="pickup-location"
                    name="pickupLocation"
                    placeholder="Enter the pickup address"
                    value={form.pickupLocation}
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