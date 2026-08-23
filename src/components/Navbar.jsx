import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>🍽️ RescueSupply</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/restaurants">Donations</Link>
                <Link to="/add-donation">Donate Food</Link>
            </div>
        </nav>
    );
}

export default Navbar;