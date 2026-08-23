import { useState } from "react";

function AddDonation() {

    const [form, setForm] = useState({
        name: "",
        city: "",
        meals: "",
        food: "",
        address: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };


    const handleSubmit = (e) => {

        e.preventDefault();

        const oldDonations =
            JSON.parse(localStorage.getItem("donations")) || [];

        oldDonations.push(form);

        localStorage.setItem(
            "donations",
            JSON.stringify(oldDonations)
        );

        setMessage("Food donation added successfully! 🎉");

        setForm({
            name: "",
            city: "",
            meals: "",
            food: "",
            address: ""
        });
    };


    return (

        <main className="page">

            <h1>Donate Surplus Food</h1>

            <p className="subtitle">
                Restaurants can share their available meals here.
            </p>

            <form
                className="donation-form"
                onSubmit={handleSubmit}
            >

                <label>Restaurant Name</label>

                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter restaurant name"
                    required
                />


                <label>City</label>

                <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                />


                <label>Number of Meals</label>

                <input
                    type="number"
                    name="meals"
                    value={form.meals}
                    onChange={handleChange}
                    placeholder="Example: 50"
                    required
                />


                <label>Food Available</label>

                <input
                    type="text"
                    name="food"
                    value={form.food}
                    onChange={handleChange}
                    placeholder="Example: Dal, Rice and Roti"
                    required
                />


                <label>Address</label>

                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Restaurant address"
                    required
                />


                <button type="submit">
                    Add Donation
                </button>

            </form>


            {message && (
                <p className="success">
                    {message}
                </p>
            )}

        </main>
    );
}

export default AddDonation;