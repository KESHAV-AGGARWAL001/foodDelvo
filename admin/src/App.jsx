import { Route, Routes } from 'react-router-dom';
import AddFoodItem from './components/AddFoodItem';
import AllOrders from './components/AllOrders';
import ItemList from './components/ItemList';
import Sidebar from './components/Sidebar';
import { useState } from 'react';

const App = () => {
  const [items, setItems] = useState([]);

  const removeItem = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="flex bg-black">
      <Sidebar />
      <div className="flex-grow bg-orange-200 border-l-2 border-orange-800">
        <Routes>
          <Route path="/" element={<AddFoodItem />} />
          <Route path="/orders" element={<AllOrders />} />
          <Route path="/listing" element={<ItemList items={items} removeItem={removeItem} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
