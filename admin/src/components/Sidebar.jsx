import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
    return (
        <div className="w-[20rem] min-h-screen bg-white text-orange-700 pl-16 pt-12 flex flex-col">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex items-center p-4 cursor-pointer mt-4  border-l-2 border-y-2  border-orange-800 ${isActive ? 'bg-orange-200 text-orange-900' : ''}`
                }
            >
                <img src={assets.add_icon} alt="Add Items" className="w-8 h-8 mr-3" />
                <span>Add Items</span>
            </NavLink>
            <NavLink
                to="/listing"
                className={({ isActive }) =>
                    `flex items-center p-4 cursor-pointer border-l-2 border-y-2  mt-4   border-orange-800 ${isActive ? 'bg-orange-200 text-orange-900' : ''}`
                }
            >
                <img src={assets.parcel_icon} alt="List Items" className="w-8 h-8 mr-3" />
                <span>List Items</span>
            </NavLink>
            <NavLink
                to="/orders"
                className={({ isActive }) =>
                    `flex items-center p-4 cursor-pointer mt-4 border-l-2 border-y-2   border-orange-800 ${isActive ? 'bg-orange-200 text-orange-900' : ''}`
                }
            >
                <img src={assets.order_icon} alt="Orders" className="w-8 h-8 mr-3" />
                <span>Orders</span>
            </NavLink>
        </div>
    );
};

export default Sidebar;
