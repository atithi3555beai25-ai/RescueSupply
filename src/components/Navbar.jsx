import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo */}
                <Link to="/" className="logo">
                    <div className="logo-circle">
                        🍴
                    </div>

                    <div className="logo-name">
                        <span>Rescue</span>
                        <strong>Supply</strong>
                    </div>
                </Link>

                {/* Navigation */}
                <div className="nav-links">

                    <Link
                        to="/"
                        className={`nav-item ${
                            location.pathname === "/" ? "active" : ""
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/restaurants"
                        className={`nav-item ${
                            location.pathname === "/restaurants" ? "active" : ""
                        }`}
                    >
                        🍽️ Donations
                    </Link>
                     <Link
    to="/contact"
    className="contact-link"
>
    Contact
</Link>
                    <Link
                        to="/add-donation"
                        className="donate-link"
                    >
                        <span>＋</span>
                        Donate Food
                    </Link>
                   
                    <Link
                        to="/login"
                        className={`login-link ${
                            location.pathname === "/login" ? "login-active" : ""
                        }`}
                    >
                        👤 Login
                    </Link>
                    
                </div>
            </div>
        </nav>
    );
}

export default Navbar;