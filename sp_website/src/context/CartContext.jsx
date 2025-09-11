import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [productsCart, setProductsCart] = useState(() => {
        const stored = localStorage.getItem("productsCart");
        return stored ? JSON.parse(stored) : [];
    });

    const [rentalsCart, setRentalsCart] = useState(() => {
        const stored = localStorage.getItem("rentalsCart");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("productsCart", JSON.stringify(productsCart));
    }, [productsCart]);

    useEffect(() => {
        localStorage.setItem("rentalsCart", JSON.stringify(rentalsCart));
    }, [rentalsCart]);

    // Add product
    const addProductToCart = (newItem) => {
        setProductsCart((prev) => {
            const existsIndex = prev.findIndex((item) => item.id === newItem.id);

            if (existsIndex >= 0) {
                return prev.map((item, idx) =>
                    idx === existsIndex
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            } else {
                return [...prev, { ...newItem }];
            }
        });
    };

    // Add rental (only one allowed)
    const addRentalToCart = (newRental) => {
        // setRentalCart(newRental); // overwrites previous rental
        setRentalsCart((prev) => {
            const existsIndex = prev.findIndex((item) => item.id === newRental.id);

            if (existsIndex >= 0) {
                return prev.map((item, idx) =>
                    idx === existsIndex
                        ? { ...item, quantity: item.quantity + newRental.quantity }
                        : item
                );
            } else {
                return [...prev, { ...newRental }];
            }
        });
    };

    //  Remove product
    const removeProductFromCart = (id) => {
        setProductsCart((prev) => prev.filter((i) => i.id !== id));
    };

    //  Remove rental
    const removeRentalFromCart = (id) => {
        // setRentalCart(null);
        setRentalsCart((prev) => prev.filter((i) => i.id !== id));
    };

    //  Update product quantity
    const updateProductQuantity = (id, type) => {
        setProductsCart((prev) =>
            prev.map((i) =>
                i.id === id
                    ? {
                        ...i,
                        quantity:
                            type === "increase"
                                ? i.quantity + 1
                                : Math.max(1, i.quantity - 1),
                    }
                    : i
            )
        );
    };

    const updateRentalQuantity = (id, type) => {
        setRentalsCart((prev) =>
            prev.map((i) =>
                i.id === id
                    ? {
                        ...i,
                        quantity:
                            type === "increase"
                                ? i.quantity + 1
                                : Math.max(1, i.quantity - 1),
                    }
                    : i
            )
        );
    };

    const clearProductsCart = () => setProductsCart([]);

// Clear rental
    const clearRentalCart = () => setRentalsCart([]);

// Clear everything
    const clearAllCart = () => {
        setProductsCart([]);
        setRentalsCart([]);
    };


    return (
        <CartContext.Provider
            value={{
                productsCart,
                rentalsCart,
                addProductToCart,
                addRentalToCart,
                removeProductFromCart,
                removeRentalFromCart,
                updateProductQuantity,
                updateRentalQuantity,
                clearProductsCart,
                clearRentalCart,
                clearAllCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
