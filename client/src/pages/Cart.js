import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../api';

const Cart = () => {
  const { cartItems, restaurantId, removeFromCart, addToCart, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Local state
  const [instructions, setInstructions] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [studentMode, setStudentMode] = useState(user?.isStudent || false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="text-center">
          <span className="text-6xl block mb-4">🛒</span>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Your cart is empty</h2>
          <p className="text-stone-500 mb-6">Looks like you haven't added anything yet.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  // Derived info (in a real app, restaurant info would be populated in the cart items/state)
  const restName = cartItems[0]?.restaurant?.name || 'Your Selected Restaurant'; 

  // Calculations
  const deliveryFee = 30;
  const platformFee = 5;
  const subtotal = totalPrice;
  const gst = subtotal * 0.05;
  
  // Student discount: 10% off subtotal if active
  const discount = studentMode ? (subtotal * 0.10) : 0;
  
  const finalTotal = subtotal + deliveryFee + platformFee + gst - discount;

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setError('');
    setPlacing(true);
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          dish: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        total: finalTotal,
        status: 'pending',
      };
      // Send the order via our API
      const { data } = await placeOrder(orderData);
      clearCart();
      // Navigate to order confirmation
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-stone-800 mb-8">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ── LEFT: Your Cart section (2 cols) ───────────────── */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Restaurant Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors">
                ←
              </button>
              <div>
                <h2 className="text-xl font-bold text-stone-800">{restName}</h2>
                <p className="text-sm text-stone-500 font-medium tracking-wide">
                  🕒 Delivery in 25-35 min
                </p>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 divide-y divide-stone-100">
              <h3 className="text-lg font-bold text-stone-800 mb-4">Your Items</h3>
              
              <div className="space-y-4 pt-2">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    {/* Item Image */}
                    <div className="w-16 h-16 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">🍽️</div>
                      )}
                    </div>
                    
                    {/* Item Info */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-stone-800">{item.name}</h4>
                      <p className="text-orange-500 font-bold text-sm">₹{item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-lg p-1">
                      <button onClick={() => removeFromCart(item._id)} className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-800 bg-white rounded shadow-sm font-bold">
                        −
                      </button>
                      <span className="font-semibold text-stone-800 w-4 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => addToCart(item, restaurantId)} className="w-7 h-7 flex items-center justify-center text-orange-500 hover:text-orange-600 bg-white rounded shadow-sm font-bold">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Items */}
              <div className="pt-6 mt-2">
                <button
                  onClick={() => navigate('/')}
                  className="w-full border-2 border-dashed border-stone-300 text-stone-500 font-semibold py-3 rounded-xl hover:bg-stone-50 hover:border-orange-300 hover:text-orange-500 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-xl">+</span> Add more items
                </button>
              </div>
            </div>

            {/* Cooking Instructions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <label htmlFor="instructions" className="block font-bold text-stone-800 mb-2">
                Cooking Instructions <span className="text-stone-400 font-normal text-sm">(Optional)</span>
              </label>
              <textarea
                id="instructions"
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="E.g. Make it spicy, no onions..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-colors resize-none"
              />
            </div>

          </div>

          {/* ── RIGHT: Price Details ───────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sticky top-24">
              
              <h3 className="text-lg font-bold text-stone-800 mb-4">Price Details</h3>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white uppercase tracking-wider"
                />
                <button className="bg-stone-800 text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-stone-700 transition-colors">
                  Apply
                </button>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-sm text-stone-600 mb-6">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-stone-800">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-stone-800">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="font-semibold text-stone-800">₹{platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-stone-800">₹{gst.toFixed(2)}</span>
                </div>

                {/* Student Mode Toggle inside bill */}
                <div className="pt-3 pb-1 border-t border-dashed border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-orange-500">🎓 Student Mode</span>
                    <p className="text-xs text-stone-400 leading-tight mt-0.5">Applies 10% discount</p>
                  </div>
                  <button
                    onClick={() => setStudentMode(!studentMode)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${studentMode ? 'bg-orange-500' : 'bg-stone-300'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${studentMode ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Discount Row */}
                {studentMode && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Student Discount (10%)</span>
                    <span>−₹{discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-stone-200 pt-4 mb-6 flex justify-between items-center">
                <span className="text-lg font-bold text-stone-800">Total Pay</span>
                <span className="text-2xl font-extrabold text-orange-500">₹{finalTotal.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={placing}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-sm shadow-orange-200 flex justify-center items-center gap-2"
              >
                {placing ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
