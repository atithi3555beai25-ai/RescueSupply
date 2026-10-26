/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import initialRestaurants from "../data/Restaurant";

const DonationContext = createContext();

const loadInitialDonations = () => {
    try {
        const savedCustomDonations = JSON.parse(
            localStorage.getItem("donations") || "[]"
        );

        const normalizedDefaults = initialRestaurants.map((item) => {
            let category = "prepared-meals";
            if (
                item.food.toLowerCase().includes("rice") ||
                item.food.toLowerCase().includes("thali") ||
                item.food.toLowerCase().includes("meals")
            ) {
                category = "prepared-meals";
            } else if (
                item.food.toLowerCase().includes("bread") ||
                item.food.toLowerCase().includes("roti") ||
                item.food.toLowerCase().includes("bakery")
            ) {
                category = "bakery";
            }
            return {
                ...item,
                category: item.category || category,
                donationStatus: item.donationStatus || "Available"
            };
        });

        return [...savedCustomDonations, ...normalizedDefaults];
    } catch (err) {
        console.error("Failed to load donations:", err);
        return initialRestaurants;
    }
};

export const DonationProvider = ({ children }) => {
    const [donations, setDonations] = useState(loadInitialDonations);
    const [loading] = useState(false);
    const [toast, setToast] = useState(null);

    // Toast notification handler with auto-dismiss
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => {
            setToast(null);
        }, 3500);
    };

    // Create a new donation
    const addDonation = (donationData) => {
        const newDonation = {
            id: Date.now(),
            donationStatus: "Available",
            createdAt: new Date().toISOString(),
            ...donationData,
            meals: Number(donationData.meals) || 0
        };

        // Update state
        setDonations((prev) => [newDonation, ...prev]);

        // Sync with localStorage
        try {
            const savedCustom = JSON.parse(localStorage.getItem("donations") || "[]");
            savedCustom.unshift(newDonation);
            localStorage.setItem("donations", JSON.stringify(savedCustom));
        } catch (err) {
            console.error("Error saving donation to localStorage:", err);
        }

        showToast("Food donation posted successfully!", "success");
        return newDonation;
    };

    // Read single donation by ID
    const getDonationById = (id) => {
        return donations.find((d) => String(d.id) === String(id));
    };

    // Update / Claim meals from a donation
    const claimMeals = (id, countToClaim) => {
        const target = getDonationById(id);
        if (!target) {
            showToast("Donation not found.", "error");
            return false;
        }

        const count = Number(countToClaim);
        if (isNaN(count) || count <= 0) {
            showToast("Please enter a valid number of meals to claim.", "error");
            return false;
        }

        const currentMeals = Number(target.meals) || 0;
        if (count > currentMeals) {
            showToast(`Only ${currentMeals} meals available to claim.`, "error");
            return false;
        }

        const remainingMeals = currentMeals - count;
        const newStatus = remainingMeals === 0 ? "Claimed" : "Available";

        // Update in-memory state
        setDonations((prev) =>
            prev.map((item) =>
                String(item.id) === String(id)
                    ? { ...item, meals: remainingMeals, donationStatus: newStatus }
                    : item
            )
        );

        // Update localStorage
        try {
            const savedCustom = JSON.parse(localStorage.getItem("donations") || "[]");
            const updatedCustom = savedCustom.map((item) =>
                String(item.id) === String(id)
                    ? { ...item, meals: remainingMeals, donationStatus: newStatus }
                    : item
            );
            localStorage.setItem("donations", JSON.stringify(updatedCustom));
        } catch (err) {
            console.error("Error persisting claim to localStorage:", err);
        }

        if (remainingMeals === 0) {
            showToast("All meals have been claimed for this donation!", "success");
        } else {
            showToast(`Successfully claimed ${count} meal(s)! (${remainingMeals} remaining)`, "success");
        }
        return true;
    };

    // Delete a donation listing
    const deleteDonation = (id) => {
        setDonations((prev) => prev.filter((item) => String(item.id) !== String(id)));

        try {
            const savedCustom = JSON.parse(localStorage.getItem("donations") || "[]");
            const updatedCustom = savedCustom.filter((item) => String(item.id) !== String(id));
            localStorage.setItem("donations", JSON.stringify(updatedCustom));
        } catch (err) {
            console.error("Error deleting donation from localStorage:", err);
        }

        showToast("Donation listing removed.", "info");
    };

    return (
        <DonationContext.Provider
            value={{
                donations,
                loading,
                toast,
                showToast,
                addDonation,
                getDonationById,
                claimMeals,
                deleteDonation
            }}
        >
            {children}

            {/* Accessible Toast Notification Banner */}
            {toast && (
                <div className={`toast-notification toast-${toast.type}`} role="status">
                    <span className="toast-icon">
                        {toast.type === "success" ? "✓" : toast.type === "error" ? "⚠" : "ℹ"}
                    </span>
                    <p className="toast-message">{toast.message}</p>
                </div>
            )}
        </DonationContext.Provider>
    );
};

export const useDonations = () => {
    const context = useContext(DonationContext);
    if (!context) {
        throw new Error("useDonations must be used within a DonationProvider");
    }
    return context;
};

export default DonationContext;
