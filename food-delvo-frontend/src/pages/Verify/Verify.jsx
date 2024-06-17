/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom"
import "./Verify.css"
import { StoreContext } from "../../context/StoreContext";
import { useContext, useEffect } from "react";
import axios from "axios";


const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const { url } = useContext(StoreContext);
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyOrder = async () => {
      const response = await axios.post(url + "/api/order/verify", { success, orderId });
      if (response.data.success) {
        navigate("/myOrders");
      }
      else {
        navigate("/home");
      }
    }
    verifyOrder();
  }, []);


  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
