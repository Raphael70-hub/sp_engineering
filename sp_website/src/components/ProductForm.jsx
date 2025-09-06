import { useState, useEffect } from "react";
import { Trash2, Upload, X } from "lucide-react";
import { API_BASE_URL } from "../constants/index.js";
import axios from "axios";

export default function ProductForm({ product, onSave }) {
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [categoryId, setCategoryId] = useState(product?.category_id || "");
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState(product?.price || "");
    const [stock, setStock] = useState(product?.stock || "");
    const [productType, setProductType] = useState(product?.product_type || "product");
    const [rentalPrice, setRentalPrice] = useState(product?.rental_price_per_day || "");
    const [image, setImage] = useState(product?.image_url || null);
    const [productDetails, setProductDetails] = useState(
        Array.isArray(product?.product_details) ? product.product_details : []
    );
    const [deliveryInfo, setDeliveryInfo] = useState(
        Array.isArray(product?.delivery_info) ? product.delivery_info : []
    );
    const [otherImages, setOtherImages] = useState(
        Array.isArray(product?.other_images) ? product.other_images : []
    );

    console.log(product);

    const [detailInput, setDetailInput] = useState("");
    const [deliveryInput, setDeliveryInput] = useState("");

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/categories`);
                setCategories(res.data.categories || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    // Load product data when editing
    // useEffect(() => {
    //     if (!product) return;
    //
    //     setImage(product.image_url || null);
    //     setOtherImages(
    //         Array.isArray(product.other_images)
    //             ? product.other_images
    //             : product.other_images
    //                 ? [product.other_images]
    //                 : []
    //     );
    //     setProductDetails(Array.isArray(product.product_details) ? product.product_details : []);
    //     setDeliveryInfo(Array.isArray(product.delivery_info) ? product.delivery_info : []);
    //     setName(product.name || "");
    //     setDescription(product.description || "");
    //     setCategoryId(product.category_id || "");
    //     setPrice(product.price || 0);
    //     setStock(product.stock || 0);
    //     setProductType(product.product_type || "product");
    //     setRentalPrice(product.rental_price_per_day || 0);
    // }, [product]);

    const addDetail = () => {
        if (detailInput.trim()) {
            setProductDetails([...productDetails, detailInput]);
            setDetailInput("");
        }
    };

    const removeDetail = (index) => {
        setProductDetails(productDetails.filter((_, i) => i !== index));
    };

    const addDelivery = () => {
        if (deliveryInput.trim()) {
            setDeliveryInfo([...deliveryInfo, deliveryInput]);
            setDeliveryInput("");
        }
    };

    const removeDelivery = (index) => {
        setDeliveryInfo(deliveryInfo.filter((_, i) => i !== index));
    };

    const handleOtherImages = (files) => {
        const newImages = Array.from(files);
        setOtherImages(prevImages => [...prevImages, ...newImages]);
    };


    const removeOtherImage = (index) => {
        setOtherImages(otherImages.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append(
            "product",
            JSON.stringify({
                name,
                description,
                price: productType !== "rental" ? parseFloat(price) : 0,
                stock: parseInt(stock),
                category_id: parseInt(categoryId),
                product_type: productType,
                rental_price_per_day: productType === "rental" ? parseFloat(rentalPrice) : 0,
                product_details: productDetails,
                delivery_info: deliveryInfo,
                created_by: product?.created_by || 1,
            })
        );

        // Main image
        if (image instanceof File) {
            formData.append("image_url", image);
        } else if (typeof image === "string") {
            formData.append("existing_image_url", image);
        }

        // Other images
        otherImages.forEach((img) => {
            if (img instanceof File) formData.append("other_images", img);
        });

        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium">Product Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Enter product name"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Product description"
                    required
                />
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
                    required
                >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Product Type */}
            <div>
                <label className="block text-sm font-medium">Product Type</label>
                <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
                >
                    <option value="product">Product</option>
                    <option value="rental">Rental</option>
                </select>
            </div>

            {/* Price / Rental Price */}
            {productType !== "rental" && (
                <div>
                    <label className="block text-sm font-medium">Price (₦)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Enter product price"
                        required
                    />
                </div>
            )}

            {productType === "rental" && (
                <div>
                    <label className="block text-sm font-medium">Rental Price per Day (₦)</label>
                    <input
                        type="number"
                        value={rentalPrice}
                        onChange={(e) => setRentalPrice(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Enter rental price per day"
                        required
                    />
                </div>
            )}

            {/* Stock */}
            <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Enter stock quantity"
                    required
                />
            </div>

            {/* Main Image */}
            <div>
                <label className="block text-sm font-medium">Main Image</label>
                <div className="flex items-center space-x-3 mt-1">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="hidden"
                        id="main-upload"
                    />
                    <label
                        htmlFor="main-upload"
                        className="cursor-pointer px-3 py-2 border rounded-lg flex items-center space-x-2 hover:bg-gray-100"
                    >
                        <Upload className="w-4 h-4 text-gray-500" />
                        <span>Upload</span>
                    </label>
                    {image && (
                        <img
                            src={
                                image instanceof File
                                    ? URL.createObjectURL(image)
                                    : `${API_BASE_URL}/${image.replace(/^\/+/, '')}`
                            }
                            alt="Preview"
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                    )}
                </div>
            </div>

            {/* Other Images */}
            <div>
                <label className="block text-sm font-medium">Other Images</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleOtherImages(e.target.files)}
                    className="mt-1 border rounded-lg p-3"
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                    {otherImages.map((img, i) => (
                        <div key={i} className="relative">
                            <img
                                src={
                                    img instanceof File
                                        ? URL.createObjectURL(img)
                                        : `${API_BASE_URL}/${img.replace(/^\/+/, '')}`
                                }
                                alt={`other ${i}`}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => removeOtherImage(i)}
                                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Details */}
            <div>
                <label className="block text-sm font-medium">Product Details</label>
                <div className="flex gap-2 mt-1">
                    <input
                        type="text"
                        value={detailInput}
                        onChange={(e) => setDetailInput(e.target.value)}
                        placeholder="Add detail..."
                        className="border rounded-lg p-2 flex-1"
                    />
                    <button
                        type="button"
                        onClick={addDetail}
                        className="px-3 py-1 bg-orange-500 text-white rounded-lg"
                    >
                        Add
                    </button>
                </div>
                <ul className="mt-2 space-y-1">
                    {productDetails.map((d, i) => (
                        <li
                            key={i}
                            className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded"
                        >
                            <span>{d}</span>
                            <button
                                type="button"
                                onClick={() => removeDetail(i)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <Trash2 size={12} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Delivery Info */}
            <div>
                <label className="block text-sm font-medium">Delivery Info</label>
                <div className="flex gap-2 mt-1">
                    <input
                        type="text"
                        value={deliveryInput}
                        onChange={(e) => setDeliveryInput(e.target.value)}
                        placeholder="Add delivery info..."
                        className="border rounded-lg p-2 flex-1"
                    />
                    <button
                        type="button"
                        onClick={addDelivery}
                        className="px-3 py-1 bg-orange-500 text-white rounded-lg"
                    >
                        Add
                    </button>
                </div>
                <ul className="mt-2 space-y-1">
                    {deliveryInfo.map((d, i) => (
                        <li
                            key={i}
                            className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded"
                        >
                            <span>{d}</span>
                            <button
                                type="button"
                                onClick={() => removeDelivery(i)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <Trash2 size={12} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
            >
                Save Product
            </button>
        </form>
    );
}
