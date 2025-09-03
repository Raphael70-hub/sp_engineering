import { useState } from "react";
import { X } from "lucide-react";

export default function AddProductModal({ onClose, onSave }) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Electronics");
    const [price, setPrice] = useState("");
    const [details, setDetails] = useState([]);
    const [deliveryInfo, setDeliveryInfo] = useState([]);
    const [detailInput, setDetailInput] = useState("");
    const [deliveryInput, setDeliveryInput] = useState("");

    const addDetail = () => {
        if (detailInput.trim()) {
            setDetails([...details, detailInput]);
            setDetailInput("");
        }
    };

    const addDeliveryInfo = () => {
        if (deliveryInput.trim()) {
            setDeliveryInfo([...deliveryInfo, deliveryInput]);
            setDeliveryInput("");
        }
    };

    const handleSubmit = () => {
        onSave({
            name,
            category,
            price: parseFloat(price),
            details,
            deliveryInfo,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add Product</h2>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                {/* Name */}
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-lg p-2 w-full mb-3"
                />

                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-lg p-2 w-full mb-3"
                >
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Appliances</option>
                </select>

                {/* Price */}
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border rounded-lg p-2 w-full mb-3"
                />

                {/* Details */}
                <div className="mb-3">
                    <label className="font-semibold">Product Details</label>
                    <div className="flex gap-2 mt-1">
                        <input
                            type="text"
                            value={detailInput}
                            onChange={(e) => setDetailInput(e.target.value)}
                            placeholder="Add detail..."
                            className="border rounded-lg p-2 flex-1"
                        />
                        <button
                            onClick={addDetail}
                            className="px-3 py-1 bg-orange-500 text-white rounded-lg"
                        >
                            Add
                        </button>
                    </div>
                    <ul className="mt-2 list-disc list-inside text-gray-700">
                        {details.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}
                    </ul>
                </div>

                {/* Delivery Info */}
                <div className="mb-3">
                    <label className="font-semibold">Delivery Information</label>
                    <div className="flex gap-2 mt-1">
                        <input
                            type="text"
                            value={deliveryInput}
                            onChange={(e) => setDeliveryInput(e.target.value)}
                            placeholder="Add delivery info..."
                            className="border rounded-lg p-2 flex-1"
                        />
                        <button
                            onClick={addDeliveryInfo}
                            className="px-3 py-1 bg-orange-500 text-white rounded-lg"
                        >
                            Add
                        </button>
                    </div>
                    <ul className="mt-2 list-disc list-inside text-gray-700">
                        {deliveryInfo.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}
                    </ul>
                </div>

                {/* Save */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
                >
                    Save Product
                </button>
            </div>
        </div>
    );
}
