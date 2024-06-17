// src/components/AddFoodItem.js

import { useState } from 'react';
import axios from 'axios';

const AddFoodItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemImage, setItemImage] = useState(null);

    const categories = [
        'Salad',
        'Pasta',
        'Pizza',
        'Noodles',
        'Burger',
        'Roll',
        'Cake',
        'Desserts',
        'Sandwich',
        'Tikka Masala'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", itemName);
        formData.append("description", itemDescription);
        formData.append("price", +itemPrice);
        formData.append("category", itemCategory);
        formData.append("image", itemImage);

        try {
            const response = await axios.post("http://localhost:4000/api/food/add", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setItemCategory("");
            setItemDescription("");
            setItemPrice("");
            setItemName('')
            setItemImage(null);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-orange-800 text-center mb-8">Add New Item</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                        type="text"
                        id="itemName"
                        name="itemName"
                        placeholder="Enter item name"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="itemPrice" className="block text-sm font-medium text-gray-700">Item Price</label>
                    <input
                        type="number"
                        id="itemPrice"
                        name="itemPrice"
                        placeholder="Enter item price"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="itemCategory" className="block text-sm font-medium text-gray-700">Item Category</label>
                    <select
                        id="itemCategory"
                        name="itemCategory"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700">Item Description</label>
                    <textarea
                        id="itemDescription"
                        name="itemDescription"
                        rows="4"
                        placeholder="Enter item description"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="itemImage" className="block text-sm font-medium text-gray-700">Item Image</label>
                    <input
                        type="file"
                        id="itemImage"
                        name="itemImage"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        onChange={(e) => setItemImage(e.target.files[0])}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-700 transition duration-200"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default AddFoodItem;
