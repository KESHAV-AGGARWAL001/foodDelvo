/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { StoreContext } from '../../context/StoreContext'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isChecked, setIsChecked] = useState(false)

  const { setToken } = useContext(StoreContext);

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!isChecked) {
      alert("You must agree to the terms of use & privacy policy.");
      return;
    }

    console.log({ currState, name, email, password })
    try {
      if (currState === "Sign Up") {
        const response = await axios.post("http://localhost:4000/api/user/signup", { username: name, email, password });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token)
          setShowLogin(false);
        }
        else {
          alert(response.data.message)
        }
      } else {
        const response = await axios.post('http://localhost:4000/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again later.");
    }
  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={submitHandler}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              type="text"
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            required
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
