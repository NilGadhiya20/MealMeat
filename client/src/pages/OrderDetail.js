import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchOrder } from '../api';

const statusSteps = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder(id)
      .then(({ data }) => setOrder(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!order) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="text-center font-black">
        <h2 className="text-2xl text-stone-800 mb-4 uppercase tracking-tighter">Transmission Lost</h2>
        <Link to="/" className="text-orange-500 hover:underline text-xs tracking-widest uppercase">Back to Hub</Link>
      </div>
    </div>
  );

  const stepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-10 px-4 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* SUCCESS BANNER */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-stone-900 rounded-[3rem] p-10 lg:p-16 text-white text-center shadow-3xl mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, delay: 0.2 }}
            className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-orange-500/40"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4">Sync Successful!</h1>
          <p className="text-stone-400 font-bold uppercase text-[10px] tracking-[0.3em]">Order Node: #{order._id.slice(-8).toUpperCase()}</p>
        </motion.div>

        {/* PROGRESS TRACKER */}
        <div className="glass-card rounded-[3rem] p-8 lg:p-12 mb-12 shadow-2xl">
          <h3 className="text-center text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-12">Transmission Status</h3>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-100 -translate-y-1/2 hidden md:block" />
            
            {statusSteps.map((step, i) => (
              <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                <motion.div 
                  initial={false}
                  animate={{ 
                    scale: i === stepIndex ? 1.2 : 1,
                    backgroundColor: i <= stepIndex ? '#f97316' : '#e7e5e4'
                  }}
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  {i < stepIndex ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    <div className={`w-2 h-2 rounded-full ${i === stepIndex ? 'bg-white animate-pulse' : 'bg-transparent'}`} />
                  )}
                </motion.div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${i <= stepIndex ? 'text-stone-800' : 'text-stone-300'}`}>
                  {step.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-card rounded-[2.5rem] p-8 shadow-xl">
            <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-4">Origin Kitchen</p>
            <h4 className="text-xl font-black text-stone-800 mb-1">{order.restaurant?.name}</h4>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">Verified Partner</p>
          </div>
          <div className="glass-card rounded-[2.5rem] p-8 shadow-xl">
            <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-4">Destination Node</p>
            <h4 className="text-base font-black text-stone-800 leading-tight mb-2">{order.deliveryAddress}</h4>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">Verified Protocol</p>
          </div>
        </div>

        {/* ITEMS LIST */}
        <div className="glass-card rounded-[3rem] p-8 lg:p-12 shadow-2xl mb-12">
          <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-10 pb-4 border-b border-stone-50">Payload Contents</h3>
          <div className="space-y-6 mb-10">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-stone-800 uppercase tracking-tight">{item.name}</span>
                  <span className="text-[9px] font-black text-stone-400 uppercase">Qty: {item.quantity}</span>
                </div>
                <span className="font-black text-orange-500 text-sm">₹{(item.price * item.quantity).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-8 border-t-2 border-stone-900/5">
            <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Total Payload Value</span>
            <span className="text-3xl font-black text-stone-800 tracking-tighter">₹{order.totalAmount?.toFixed(0)}</span>
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/" 
            className="inline-block bg-stone-900 text-white font-black uppercase text-xs tracking-[0.2em] px-10 py-5 rounded-[2rem] hover:bg-orange-500 transition-all shadow-2xl active:scale-95"
          >
            Return to Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
