import { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/food/list');
                setItems(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error fetching items: {error.message}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 text-white mt-10 ">
            <h1 className="text-3xl font-bold text-orange-800 text-center mb-8">All Food Items</h1>
            <div className="space-y-6">
                {items.map((item, index) => (
                    <div key={index + 1} className="flex flex-col md:flex-row  bg-black rounded-lg border-2 border-orange-800 shadow-md p-6">
                        <div className="flex-shrink-0 mb-4 md:mb-0">
                            <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
                        </div>
                        <div className="flex flex-col justify-between flex-grow md:ml-6">
                            <div className="flex justify-between mb-4">
                                <div className="flex flex-col gap-y-2">
                                    <h2 className="text-2xl font-semibold ">{item.name}</h2>
                                    <span className="px-2 py-1 text-sm font-semibold bg-orange-500 text-white rounded-md self-start">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xl font-semibold text-blue-800">${item.price.toFixed(2)}</h3>
                                </div>
                            </div>
                            <p className="text-blue-800 mb-4">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
