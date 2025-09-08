import { ShoppingCart, Trash2, Plus, Minus, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "../sections/Footer.jsx";
import { useCart } from "../context/CartContext";

function CartPage() {
    const {
        productsCart,
        rentalCart,
        removeProductFromCart,
        removeRentalFromCart,
        updateProductQuantity,
        addRentalToCart, // we’ll reuse this to update rental quantity
    } = useCart();

    // Helper to calculate days between rental dates
    const getRentalDays = (start, end) => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate - startDate;
        if (diffTime < 0) return 0;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive
    };

    // Products subtotal
    const productsSubtotal = productsCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const productsShipping = productsCart.reduce(
        (acc, item) => acc + (item.shipping_fee * 1.0 || 0),
        0
    );

    const productsTotal = productsSubtotal + productsShipping;

    // Rental total
    let rentalSubtotal = 0;
    let rentalTotal = 0;
    if (rentalCart) {
        const days = getRentalDays(rentalCart.start_date, rentalCart.end_date);
        rentalSubtotal =
            rentalCart.rental_price_per_day * days * rentalCart.quantity;
        rentalTotal = rentalSubtotal + (rentalCart.shipping_fee * 1.0 || 0);
    }

    //  Update rental quantity
    const updateRentalQuantity = (type) => {
        if (!rentalCart) return;
        const newQuantity =
            type === "increase"
                ? rentalCart.quantity + 1
                : Math.max(1, rentalCart.quantity - 1);
        addRentalToCart({ ...rentalCart, quantity: newQuantity });
    };

    return (
        <>
            <PlainNavBar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                    Cart
                </h2>

                {/* PRODUCTS CART */}
                <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4">Products</h3>

                    {productsCart.length === 0 ? (
                        <p className="text-gray-500">No products in your cart.</p>
                    ) : (
                        <>
                            {productsCart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b py-4 gap-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div>
                                            <h4 className="font-semibold">{item.name}</h4>
                                            <p className="text-gray-600">₦{item.price}</p>
                                            {item.shipping_fee > 0 && (
                                                <p className="text-sm text-gray-500">
                                                    Shipping: ₦
                                                    {item.shipping_fee.toLocaleString()}
                                                </p>
                                            )}
                                            <p className="text-orange-600 font-semibold">
                                                Total: ₦
                                                {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() =>
                                                updateProductQuantity(item.id, "decrease")
                                            }
                                            className="p-2 border rounded hover:bg-gray-100"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateProductQuantity(item.id, "increase")
                                            }
                                            className="p-2 border rounded hover:bg-gray-100"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeProductFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 self-start sm:self-auto"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            ))}

                            {/* Products Summary */}
                            <div className="mt-6 border-t pt-4">
                                <p className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>₦{productsSubtotal.toFixed(2)}</span>
                                </p>
                                <p className="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span>₦{productsShipping.toFixed(2)}</span>
                                </p>
                                <p className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₦{productsTotal.toFixed(2)}</span>
                                </p>
                                <Link
                                    to="/checkout/products"
                                    className="block mt-4 bg-orange-600 text-white text-center py-2 rounded-lg hover:bg-orange-700"
                                >
                                    Checkout Products
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* RENTAL CART */}
                <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-1">Rental</h3>
                    <span className="text-sm font-semibold text-orange-500 mb-4">(Note: Only one item can be added to the cart at a time)</span>

                    {!rentalCart ? (
                        <p className="text-gray-500">No rental in your cart.</p>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b py-4 gap-4">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={rentalCart.image}
                                        alt={rentalCart.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{rentalCart.name}</h4>
                                        <p className="text-gray-600">
                                            ₦{rentalCart.rental_price_per_day}/day ×{" "}
                                            {getRentalDays(
                                                rentalCart.start_date,
                                                rentalCart.end_date
                                            )}{" "}
                                            days
                                        </p>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar size={14} /> {rentalCart.start_date} →{" "}
                                            {rentalCart.end_date}
                                        </p>
                                        {rentalCart.shipping_fee > 0 && (
                                            <p className="text-sm text-gray-500">
                                                Shipping: ₦
                                                {rentalCart.shipping_fee.toLocaleString()}
                                            </p>
                                        )}
                                        <p className="text-orange-600 font-semibold">
                                            Total: ₦{rentalTotal.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                {/* Rental Quantity Controls */}
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => updateRentalQuantity("decrease")}
                                        className="p-2 border rounded hover:bg-gray-100"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span>{rentalCart.quantity}</span>
                                    <button
                                        onClick={() => updateRentalQuantity("increase")}
                                        className="p-2 border rounded hover:bg-gray-100"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    onClick={removeRentalFromCart}
                                    className="text-red-500 hover:text-red-700 self-start sm:self-auto"
                                >
                                    <Trash2 />
                                </button>
                            </div>

                            {/* Rental Summary */}
                            <div className="mt-6 border-t pt-4">
                                <p className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>₦{rentalSubtotal.toFixed(2)}</span>
                                </p>
                                <p className="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span>₦{(rentalCart.shipping_fee || 0)}</span>
                                </p>
                                <p className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₦{rentalTotal.toFixed(2)}</span>
                                </p>
                                <Link
                                    to="/checkout/rental"
                                    className="block mt-4 bg-orange-600 text-white text-center py-2 rounded-lg hover:bg-orange-700"
                                >
                                    Checkout Rental
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default CartPage;
