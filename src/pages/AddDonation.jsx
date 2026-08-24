function AddDonation() {
    return (
        <main className="page">

            <h1>Donate Food</h1>

            <p className="subtitle">
                Share your surplus food and help make sure good meals reach
                people who need them.
            </p>

            <form className="donation-form">

                <label htmlFor="donor-name">Donor Name</label>

                <input
                    type="text"
                    id="donor-name"
                    name="donorName"
                    placeholder="Enter your name"
                    required
                />

                <label htmlFor="food-name">Food Name</label>

                <input
                    type="text"
                    id="food-name"
                    name="foodName"
                    placeholder="Example: Vegetable rice"
                    required
                />

                <label htmlFor="food-category">Food Category</label>

                <select id="food-category" name="foodCategory" defaultValue="" required>
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
                    required
                />

                <label htmlFor="pickup-location">Pickup Location</label>

                <input
                    type="text"
                    id="pickup-location"
                    name="pickupLocation"
                    placeholder="Enter the pickup address"
                    required
                />

                <button type="button">
                    Donate Food
                </button>

            </form>

        </main>
    );
}

export default AddDonation;