import { Link } from "react-router-dom";

function Home() {
    return (
        <main>

            {/* Hero Section */}
            <section className="hero">

                <div className="hero-content">

                    <span className="hero-tag">
                        🌱 Together for a better tomorrow
                    </span>

                    <h1>
                        Good Food Should
                        <span> Never Go to Waste.</span>
                    </h1>

                    <p>
                        FoodShare connects restaurants and people with
                        surplus food to reduce waste and help communities.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/restaurants" className="primary-btn">
                            Find Food →
                        </Link>

                        <Link to="/add-donation" className="secondary-btn">
                            Donate Food
                        </Link>
                    </div>

                </div>

                <div className="hero-food">
                    <div className="food-circle">
                        🍲
                    </div>

                    <div className="floating-card">
                        <strong>120+</strong>
                        <span>Meals Shared</span>
                    </div>
                </div>

            </section>


            {/* Statistics */}
            <section className="stats">

                <div className="stat">
                    <span>🍽️</span>
                    <h2>120+</h2>
                    <p>Meals Shared</p>
                </div>

                <div className="stat">
                    <span>🏪</span>
                    <h2>25+</h2>
                    <p>Food Partners</p>
                </div>

                <div className="stat">
                    <span>♻️</span>
                    <h2>80kg</h2>
                    <p>Food Saved</p>
                </div>

                <div className="stat">
                    <span>❤️</span>
                    <h2>50+</h2>
                    <p>Happy People</p>
                </div>

            </section>


            {/* About Section */}
            <section className="about">

                <div className="about-image">
                    🍛
                </div>

                <div className="about-content">

                    <span className="section-tag">
                        ABOUT FOODSHARE
                    </span>

                    <h2>
                        Turning Surplus Food
                        Into <span>Something Meaningful.</span>
                    </h2>

                    <p>
                        Every day, perfectly good food goes unused.
                        FoodShare provides a simple way for restaurants
                        to share their extra food with people who can
                        benefit from it.
                    </p>

                    <div className="about-points">

                        <div>
                            <span>✓</span>
                            <p>Reduce unnecessary food waste</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Help local communities</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Make food sharing simple</p>
                        </div>

                    </div>

                </div>

            </section>


            {/* Call To Action */}
            <section className="cta">

                <h2>Have Extra Food?</h2>

                <p>
                    Don't let good food go to waste.
                    Share it with someone who needs it.
                </p>

                <Link to="/add-donation" className="cta-btn">
                    Donate Food →
                </Link>

            </section>

        </main>
    );
}

export default Home;