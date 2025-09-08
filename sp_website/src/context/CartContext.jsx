import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [productsCart, setProductsCart] = useState(() => {
        const stored = localStorage.getItem("productsCart");
        return stored ? JSON.parse(stored) : [];
    });

    const [rentalCart, setRentalCart] = useState(() => {
        const stored = localStorage.getItem("rentalCart");
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        localStorage.setItem("productsCart", JSON.stringify(productsCart));
    }, [productsCart]);

    useEffect(() => {
        localStorage.setItem("rentalCart", JSON.stringify(rentalCart));
    }, [rentalCart]);

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
        setRentalCart(newRental); // overwrites previous rental
    };

    //  Remove product
    const removeProductFromCart = (id) => {
        setProductsCart((prev) => prev.filter((i) => i.id !== id));
    };

    //  Remove rental
    const removeRentalFromCart = () => {
        setRentalCart(null);
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

    const clearProductsCart = () => setProductsCart([]);

// Clear rental
    const clearRentalCart = () => setRentalCart(null);

// Clear everything
    const clearAllCart = () => {
        setProductsCart([]);
        setRentalCart(null);
    };


    return (
        <CartContext.Provider
            value={{
                productsCart,
                rentalCart,
                addProductToCart,
                addRentalToCart,
                removeProductFromCart,
                removeRentalFromCart,
                updateProductQuantity,
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
