/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone: ""
  })

  useEffect(() => {
    if (!token) {
      navigate("/order");
    }
    else if (getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  }, [token])


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }




  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id]) {
        let itemInfo = item;
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })


    let orderData = {
      address: data,
      items: orderItems,
      amount: Number(getTotalCartAmount() + 2),
    }


    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token }
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.href = session_url;
    }
  }

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" onChange={changeHandler} value={data.firstName} placeholder='First Name' required />
          <input type="text" name="lastName" onChange={changeHandler} value={data.lastName} placeholder='Last Name' required />
        </div>
        <input type="email" name="email" onChange={changeHandler} value={data.address} placeholder='Email Address' required />
        <input type="text" name="street" onChange={changeHandler} value={data.street} placeholder='Street' required />
        <div className="multi-fields">
          <input type="text" name="city" onChange={changeHandler} value={data.city} placeholder='City' required />
          <input type="text" name="state" onChange={changeHandler} value={data.state} placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input type="text" name="zip_code" onChange={changeHandler} value={data.zip_code} placeholder='Zip Code' required />
          <input type="text" name="country" onChange={changeHandler} value={data.country} placeholder='Country' required />
        </div>
        <input type="text" name="phone" onChange={changeHandler} value={data.phone} placeholder='Phone' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit" onSubmit={placeOrder}>Proceed To Payment</button>
        </div>
      </div>
    </form>
  )
}


export default PlaceOrder
