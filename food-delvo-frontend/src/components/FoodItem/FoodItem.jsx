/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './FoodItem.css';

const FoodItem = ({ itemId, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  console.log('====================================');
  console.log(itemId);
  console.log('====================================');
  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img className='food-item-image' src={"http://localhost:4000/images/" + image} alt="" />
        {itemId && !cartItems[itemId]
          ?
          <button onClick={() => addToCart(itemId)}>
            <img className='add' src={assets.add_icon_white} alt="" />
          </button>
          : <div className='food-item-counter'>
            <button onClick={() => removeFromCart(itemId)}>
              <img className='remove' src={assets.remove_icon_red} alt="remove icon" />
            </button>
            <p>{cartItems[itemId]}</p>
            <img src={assets.add_icon_green} onClick={() => addToCart(itemId)} alt="" />
          </div>
        }
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_stars} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
