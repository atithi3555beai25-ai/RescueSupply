import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [isSignup, setIsSignup] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // =========================
        // SIGN UP
        // =========================

        if (isSignup) {

            if (!name || !email || !password || !confirmPassword) {
                alert("Please fill all fields.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            const existingUser = localStorage.getItem("rescueSupplyUser");

            if (existingUser) {
                const user = JSON.parse(existingUser);

                if (user.email === email) {
                    alert("An account with this email already exists.");
                    return;
                }
            }

            const newUser = {
                name: name,
                email: email,
                password: password
            };

            localStorage.setItem(
                "rescueSupplyUser",
                JSON.stringify(newUser)
            );

            alert("Account created successfully! Please login.");

            // Clear form
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            // Go back to login
            setIsSignup(false);

            return;
        }

        // =========================
        // LOGIN
        // =========================

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        const savedUser = localStorage.getItem("rescueSupplyUser");

        // No account
        if (!savedUser) {
            alert("No account found. Please Sign Up first.");
            setIsSignup(true);
            return;
        }

        const user = JSON.parse(savedUser);

        // Wrong email/password
        if (
            user.email !== email ||
            user.password !== password
        ) {
            alert("Incorrect email or password.");
            return;
        }

        // Successful login
        localStorage.setItem("isLoggedIn", "true");

        alert(`Welcome back, ${user.name}!`);

        navigate("/");
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-icon">
                    {isSignup ? "🌱" : "🔐"}
                </div>

                <h1>
                    {isSignup ? "Create Account" : "Welcome Back!"}
                </h1>

                <p className="login-subtitle">
                    {isSignup
                        ? "Join RescueSupply and help reduce food waste"
                        : "Login to your RescueSupply account"}
                </p>

                <form onSubmit={handleSubmit}>

                    {/* NAME - ONLY FOR SIGN UP */}
                    {isSignup && (
                        <>
                            <label>Full Name</label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />
                        </>
                    )}

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder={
                            isSignup
                                ? "Create a password"
                                : "Enter your password"
                        }
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    {/* CONFIRM PASSWORD - ONLY FOR SIGN UP */}
                    {isSignup && (
                        <>
                            <label>Confirm Password</label>

                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </>
                    )}

                    {/* LOGIN OPTIONS */}
                    {!isSignup && (
                        <div className="login-options">

                            <label className="remember">
                                <input type="checkbox" />
                                Remember me
                            </label>

                            <a href="#">
                                Forgot Password?
                            </a>

                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        {isSignup
                            ? "Create Account"
                            : "Login"}
                    </button>

                </form>

                {/* SWITCH LOGIN / SIGN UP */}

                <div className="account-switch">

                    {isSignup ? (
                        <>
                            <span>
                                Already have an account?
                            </span>

                            <button
                                type="button"
                                onClick={() => setIsSignup(false)}
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            <span>
                                Don't have an account?
                            </span>

                            <button
                                type="button"
                                onClick={() => setIsSignup(true)}
                            >
                                Sign Up
                            </button>
                        </>
                    )}

                </div>

                <Link
                    to="/"
                    className="back-home"
                >
                    ← Back to Home
                </Link>

            </div>

        </div>
    );
}

export default Login;