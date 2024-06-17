import { useState, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

// Lazy load components
const Home = lazy(() => import('./pages/Home/Home'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Verify = lazy(() => import('./pages/Verify/Verify'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder/PlaceOrder'));
const MyOrders = lazy(() => import('./pages/MyOrders/MyOrders'));

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/myOrders' element={<MyOrders />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default App;
