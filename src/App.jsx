import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import AddDonation from "./pages/AddDonation";
import NotFound from "./pages/NotFound";
import Login from "./Login";

import "./App.css";
import Contact from "./pages/Contact";
function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/restaurants"
                    element={<Restaurants />}
                />

                <Route
                    path="/restaurant/:id"
                    element={<RestaurantDetails />}
                />

                <Route
                    path="/add-donation"
                    element={<AddDonation />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />
                 <Route path="/contact" element={<Contact />} />

                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>

            <Footer />
        </>
    );
}

export default App;