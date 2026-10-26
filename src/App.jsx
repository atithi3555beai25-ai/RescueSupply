import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import AddDonation from "./pages/AddDonation";
import NotFound from "./pages/NotFound";
import Login from "./Login";
import Contact from "./pages/Contact";

import { DonationProvider } from "./context/DonationContext";
import "./App.css";

function App() {
    return (
        <DonationProvider>
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
        </DonationProvider>
    );
}

export default App;
