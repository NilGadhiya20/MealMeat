import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../api';

const Cart = () => {
  const { cartItems, restaurantId, removeFromCart, addToCart, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [instructions, setInstructions] = useState('');

  const [studentMode, setStudentMode] = useState(user?.isStudent || false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white rounded-[3rem] p-12 shadow-2xl border border-stone-100 max-w-sm w-full"
        >
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl grayscale opacity-50">🛒</span>
          </div>
          <h2 className="text-2xl font-black text-stone-800 mb-2 tracking-tight">Your Cart is Empty</h2>
          <p className="text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-8">Ready for your next feast?</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-stone-900 text-white font-black uppercase text-xs tracking-widest py-4 rounded-2xl hover:bg-orange-500 transition-all shadow-xl active:scale-95"
          >
            Explore Kitchens
          </button>
        </motion.div>
      </div>
    );
  }

  const subtotal = totalPrice;
  const deliveryFee = 30;
  const platformFee = 5;
  const gst = subtotal * 0.05;
  const discount = studentMode ? (subtotal * 0.10) : 0;
  const finalTotal = subtotal + deliveryFee + platformFee + gst - discount;

  const handleCheckout = async () => {
    if (!user) { navigate('/login'); return; }
    setError('');
    setPlacing(true);
    try {
      const orderData = {
        items: cartItems.map((item) => ({ dish: item._id, quantity: item.quantity, price: item.price })),
        total: finalTotal,
        status: 'pending',
      };
      const { data } = await placeOrder(orderData);
      clearCart();
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to sync with kitchen. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-10 px-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-black text-stone-800 tracking-tighter mb-2">Finalize Plate</h1>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-1">Secure Checkout & Review</p>
        </header>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl font-black uppercase text-[10px] tracking-widest">
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {/* Items List */}
            <div className="glass-card rounded-[3rem] p-8 lg:p-12 shadow-2xl">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-stone-100">
                <h3 className="text-xl font-black text-stone-800 uppercase tracking-widest">Selected Items</h3>
                <span className="bg-stone-100 px-4 py-1 rounded-full text-[10px] font-black text-stone-500 uppercase tracking-widest">{cartItems.length} Dishes</span>
              </div>

              <div className="space-y-8">
                {cartItems.map((item) => (
                  <motion.div key={item._id} layout className="flex gap-6 items-center group">
                    <div className="w-20 h-20 bg-stone-100 rounded-[1.5rem] overflow-hidden flex-shrink-0 relative">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-stone-800 lg:text-lg mb-1 truncate group-hover:text-orange-500 transition-colors uppercase tracking-tight">{item.name}</h4>
                      <p className="text-orange-500 font-black text-xs uppercase tracking-widest">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-2xl p-1 shadow-sm">
                      <button onClick={() => removeFromCart(item._id)} className="w-8 h-8 flex items-center justify-center bg-white text-stone-400 hover:text-stone-800 rounded-xl transition-all font-black shadow-sm">−</button>
                      <span className="font-black text-stone-800 w-4 text-center text-xs">{item.quantity}</span>
                      <button onClick={() => addToCart(item, restaurantId)} className="w-8 h-8 flex items-center justify-center bg-white text-orange-500 hover:text-orange-600 rounded-xl transition-all font-black shadow-sm">+</button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Add More */}
              <button 
                onClick={() => navigate('/')} 
                className="w-full mt-12 py-5 border-2 border-dashed border-stone-100 text-stone-300 rounded-[2rem] font-black uppercase text-[10px] tracking-widest hover:bg-stone-50 hover:border-stone-200 hover:text-stone-500 transition-all"
              >
                + Add More Bites
              </button>
            </div>

            {/* Special Instructions */}
            <div className="glass-card rounded-[3rem] p-8 lg:p-12 shadow-2xl">
              <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4 ml-1">Cooking Transmissions</label>
              <textarea
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="E.g. Extra heat, minimal salt..."
                className="w-full bg-stone-50 border-2 border-transparent border-stone-100 rounded-[2rem] px-8 py-5 text-sm font-bold focus:outline-none focus:border-stone-200 focus:bg-white transition-all resize-none text-stone-800"
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-4">
            <div className="glass-card rounded-[3rem] p-10 lg:p-12 shadow-2xl sticky top-28 border-white/50 backdrop-blur-xl">
              <h3 className="text-lg font-black text-stone-800 uppercase tracking-widest mb-10 text-center">Receipt Summary</h3>

              <div className="space-y-6 text-[11px] font-black uppercase tracking-widest text-stone-400 mb-10">
                <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                  <span>Plate Subtotal</span>
                  <span className="text-stone-800 text-sm">₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                  <span>Delivery Node</span>
                  <span className="text-stone-800 text-sm">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                  <span>Platform Fee</span>
                  <span className="text-stone-800 text-sm">₹{platformFee}</span>
                </div>
                
                {/* Student Mode Bill Impact */}
                <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-orange-500">Student Mode</span>
                    <button 
                      onClick={() => setStudentMode(!studentMode)}
                      className={`w-10 h-6 rounded-full p-1 transition-colors ${studentMode ? 'bg-orange-500' : 'bg-stone-200'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${studentMode ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  {studentMode && (
                    <div className="flex justify-between text-green-600 mt-2 pt-2 border-t border-green-100">
                      <span>Savvy Discount</span>
                      <span>−₹{discount.toFixed(0)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Final Total</span>
                <span className="text-3xl font-black text-stone-800">₹{finalTotal.toFixed(0)}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckout}
                disabled={placing}
                className="w-full bg-stone-900 text-white font-black uppercase text-xs tracking-widest py-5 rounded-[2rem] hover:bg-orange-500 transition-all shadow-xl shadow-stone-800/20 disabled:bg-stone-300"
              >
                {placing ? 'Syncing...' : 'Place Secure Order'}
              </motion.button>
              
              <p className="text-[9px] text-center text-stone-300 mt-6 font-bold uppercase tracking-tighter italic">End-to-end encrypted order transmission</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
