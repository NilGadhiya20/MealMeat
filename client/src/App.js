import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import RestaurantDetail from './pages/RestaurantDetail';
import OrderDetail from './pages/OrderDetail';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/"                  element={<Home />} />
            <Route path="/about"             element={<About />} />
            <Route path="/contact"           element={<Contact />} />
            <Route path="/login"             element={<Login />} />
            <Route path="/register"          element={<Register />} />
            <Route path="/cart"              element={<Cart />} />
            <Route path="/restaurant/:id"   element={<RestaurantDetail />} />
            <Route path="/order/:id"        element={<OrderDetail />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
