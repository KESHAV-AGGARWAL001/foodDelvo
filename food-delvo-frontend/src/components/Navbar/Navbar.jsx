/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };
    return (
        <div className='navbar'>
            <Link to='/' className='projectName'>Food Delvo</Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ?
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                    :
                    <div className="profile-section" onClick={handleProfileClick}>
                        <img src={assets.profile_icon} alt="profileIcon" className="profileIcon" />
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/myOrders" className="dropdown-item">
                                    <img src={assets.bag_icon} alt="Orders" className="dropdown-icon" />
                                    Orders
                                </Link>
                                <div className="dropdown-item" onClick={handleLogout}>
                                    <img src={assets.logout_icon} alt="Logout" className="dropdown-icon" />
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
