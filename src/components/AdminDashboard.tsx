/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, Order, DiscountCoupon } from '../types';
import { 
  Package, TrendingUp, AlertTriangle, Tag, Plus, Trash2, 
  RefreshCw, CheckCircle, Truck, RefreshCcw, Landmark, Users
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  coupons: DiscountCoupon[];
  setCoupons: React.Dispatch<React.SetStateAction<DiscountCoupon[]>>;
}

export default function AdminDashboard({
  products,
  setProducts,
  orders,
  setOrders,
  coupons,
  setCoupons
}: AdminDashboardProps) {
  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'orders' | 'promotions'>('overview');
  
  // States for Adding a Product
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'Men' | 'Women' | 'Accessories' | 'Unisex'>('Unisex');
  const [newProdSubcategory, setNewProdSubcategory] = useState('');
  const [newProdDescription, setNewProdDescription] = useState('');
  const [newProdStock, setNewProdStock] = useState('20');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=700');

  // States for Adding a Coupon
  const [newCode, setNewCode] = useState('');
  const [newType, setNewType] = useState<'percentage' | 'fixed_value' | 'free_shipping'>('percentage');
  const [newValue, setNewValue] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Total sales calculation
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const lowStockProducts = products.filter(p => p.inventory < 15);

  // Handle adding new product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const newProduct: Product = {
      id: `ok-${Date.now().toString().slice(-4)}`,
      name: newProdName,
      price: parseFloat(newProdPrice),
      category: newProdCategory,
      subcategory: newProdSubcategory || "Apparel",
      description: newProdDescription || "A Koth Challenges exclusive fashion item designed with premium Oklahoma standards.",
      details: ["Premium fabric construction", "Original state-themed fashion", "Designed in Oklahoma"],
      images: [newProdImage],
      sizes: ["S", "M", "L", "XL"],
      colors: [{ name: "Prairie Black", value: "#121212" }],
      inventory: parseInt(newProdStock) || 15,
      rating: 5.0,
      reviewsCount: 1,
      isNewArrival: true
    };

    setProducts(prev => [newProduct, ...prev]);
    setShowAddModal(false);
    
    // Reset fields
    setNewProdName('');
    setNewProdPrice('');
    setNewProdSubcategory('');
    setNewProdDescription('');
  };

  // Handle adding a coupon
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newValue) return;

    const newCoupon: DiscountCoupon = {
      code: newCode.toUpperCase(),
      type: newType,
      value: parseFloat(newValue),
      description: newDesc || `${newValue}% coupon discount`
    };

    setCoupons(prev => [...prev, newCoupon]);
    setNewCode('');
    setNewValue('');
    setNewDesc('');
  };

  // Delete product handler
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Restock handler
  const handleRestockProduct = (id: string, amount = 25) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, inventory: p.inventory + amount };
      }
      return p;
    }));
  };

  // Update order status dropdown handler
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status };
      }
      return o;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left" id="admin-panel-views">
      {/* Page header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 mb-10">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-white/45 uppercase block">
            Internal Operations
          </span>
          <h1 className="serif text-3xl font-light text-white uppercase mt-1">
            Koth Challenges Manager
          </h1>
        </div>
        
        {/* Tab triggers */}
        <div className="flex bg-white/5 border border-white/5 p-1">
          {(['overview', 'products', 'orders', 'promotions'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setAdminTab(tab)}
              className={`px-4.5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                adminTab === tab
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 1. OVERVIEW VIEW */}
      {adminTab === 'overview' && (
        <div className="space-y-10" id="admin-overview-view">
          {/* KPI grid row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-850 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-zinc-400 block mb-1 uppercase tracking-wider">Gross revenue</span>
                <span className="text-2xl font-bold text-zinc-950 dark:text-white">${totalRevenue.toFixed(2)}</span>
                <span className="text-[10px] text-emerald-500 font-semibold block mt-1">+14.2% since yesterday</span>
              </div>
              <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-900 dark:text-white">
                <Landmark size={24} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-850 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-zinc-400 block mb-1 uppercase tracking-wider">Total orders</span>
                <span className="text-2xl font-bold text-zinc-950 dark:text-white">{orders.length} orders</span>
                <span className="text-[10px] text-emerald-500 font-semibold block mt-1">+2.4% order volume</span>
              </div>
              <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-900 dark:text-white">
                <TrendingUp size={24} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-850 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-zinc-400 block mb-1 uppercase tracking-wider">Low stock items</span>
                <span className="text-2xl font-bold text-zinc-950 dark:text-white">{lowStockProducts.length} items</span>
                <span className={`text-[10px] font-semibold block mt-1 ${lowStockProducts.length > 0 ? 'text-amber-500' : 'text-zinc-500'}`}>
                  {lowStockProducts.length > 0 ? 'Requires attention soon' : 'All stock is optimal'}
                </span>
              </div>
              <div className={`p-3 rounded-xl ${lowStockProducts.length > 0 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'}`}>
                <AlertTriangle size={24} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-850 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-zinc-400 block mb-1 uppercase tracking-wider">Active coupons</span>
                <span className="text-2xl font-bold text-zinc-950 dark:text-white">{coupons.length} codes</span>
                <span className="text-[10px] text-zinc-500 block mt-1">Ready for checkout use</span>
              </div>
              <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-900 dark:text-white">
                <Tag size={24} />
              </div>
            </div>
          </div>

          {/* Graphical Analytics (Custom SVG Drawing) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sales Chart */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-zinc-850 border border-gray-100 dark:border-zinc-800 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Oklahoma City & Tulsa Sales Volume</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Historical analytics for the current seasonal calendar</p>
                </div>
                <div className="text-xs font-bold py-1 px-2.5 bg-gray-100 dark:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300">
                  Weekly Tracking
                </div>
              </div>

              {/* Graphical representation */}
              <div className="h-64 flex items-end justify-between px-2 pt-6 border-b border-gray-250 dark:border-zinc-800 relative">
                {/* Horizontal grid guide lines */}
                <span className="absolute top-6 left-0 right-0 h-[1px] bg-gray-100 dark:bg-zinc-800/60" />
                <span className="absolute top-24 left-0 right-0 h-[1px] bg-gray-100 dark:bg-zinc-800/60" />
                <span className="absolute top-44 left-0 right-0 h-[1px] bg-gray-100 dark:bg-zinc-800/60" />

                <div className="flex flex-col items-center flex-1 h-full justify-end group">
                  <div className="w-10 bg-zinc-950 dark:bg-white rounded-t-md h-[40%] transition-all duration-500 transform group-hover:scale-y-105 relative">
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">$1,200</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-2.5">Wk 1</span>
                </div>

                <div className="flex flex-col items-center flex-1 h-full justify-end group">
                  <div className="w-10 bg-zinc-950 dark:bg-white rounded-t-md h-[65%] transition-all duration-500 transform group-hover:scale-y-105 relative">
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">$1,950</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-2.5">Wk 2</span>
                </div>

                <div className="flex flex-col items-center flex-1 h-full justify-end group">
                  <div className="w-10 bg-zinc-950 dark:bg-white rounded-t-md h-[50%] transition-all duration-500 transform group-hover:scale-y-105 relative">
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">$1,500</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-2.5">Wk 3</span>
                </div>

                <div className="flex flex-col items-center flex-1 h-full justify-end group">
                  <div className="w-10 bg-zinc-950 dark:bg-white rounded-t-md h-[88%] transition-all duration-500 transform group-hover:scale-y-105 relative">
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">$2,640</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-2.5">Wk 4</span>
                </div>

                <div className="flex flex-col items-center flex-1 h-full justify-end group">
                  <div className="w-10 bg-zinc-400 dark:bg-zinc-600 rounded-t-md h-[78%] transition-all duration-500 transform group-hover:scale-y-105 relative">
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">$2,340</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-2.5">Today</span>
                </div>
              </div>
            </div>

            {/* Demographics Category Ratio */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-850 border border-gray-100 dark:border-zinc-800 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-6">Inventory Shares</h3>
              
              <div className="space-y-5.5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-600 dark:text-zinc-300">Women (Prairie styles)</span>
                    <span>42%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
                    <div className="bg-zinc-950 dark:bg-white h-2 rounded-full w-[42%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-600 dark:text-zinc-300">Men (Linen & denim)</span>
                    <span>35%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
                    <div className="bg-zinc-850 dark:bg-zinc-300 h-2 rounded-full w-[35%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-600 dark:text-zinc-300">Unisex (Organic fleece)</span>
                    <span>18%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
                    <div className="bg-zinc-600 h-2 rounded-full w-[18%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-600 dark:text-zinc-300">Accessories Scarf line</span>
                    <span>5%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
                    <div className="bg-zinc-350 h-2 rounded-full w-[5%]" />
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-150 dark:border-zinc-800 mt-6 pt-5 flex items-center justify-between text-xs text-zinc-500">
                <span>Total Active catalog shares</span>
                <span className="font-bold text-zinc-700 dark:text-zinc-300">{products.length} products</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS VIEW */}
      {adminTab === 'products' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden" id="admin-products-view">
          
          {/* Section banner */}
          <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50 dark:bg-zinc-850">
            <div>
              <h3 className="font-bold text-zinc-950 dark:text-white uppercase text-sm tracking-widest col-title">Active Apparel Catalog</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Manage details, values, levels and delete products</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4.5 py-2.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold uppercase rounded-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              id="open-add-product-modal-btn"
            >
              <Plus size={14} /> Add apparel item
            </button>
          </div>

          {/* Products table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-500 bg-gray-50/50 dark:bg-zinc-850/40">
                  <th className="p-4 px-6">Product details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Costing size</th>
                  <th className="p-4">Stocks Left</th>
                  <th className="p-4 text-right">Inventory control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {products.map((p) => (
                  <tr key={p.id} className="text-sm text-zinc-700 dark:text-zinc-300 hover:bg-gray-50/50 dark:hover:bg-zinc-850/20">
                    <td className="p-4 px-6 flex items-center gap-3.5">
                      <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded bg-gray-100 object-cover shrink-0" />
                      <div>
                        <span className="font-semibold text-zinc-900 dark:text-white block">{p.name}</span>
                        <span className="text-xs text-zinc-400 font-bold block mt-0.5">${p.price.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold tracking-wide uppercase">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-bold tracking-wide text-zinc-500">
                      {p.sizes.join(', ')}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${p.inventory < 15 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">{p.inventory} in stock</span>
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleRestockProduct(p.id, 25)}
                        className="p-2 bg-gray-100 dark:bg-zinc-800 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-colors text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer"
                        title="Restock adding +25 pieces"
                      >
                        Restock (+25)
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ORDERS VIEW */}
      {adminTab === 'orders' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden" id="admin-orders-view">
          <div className="p-6 border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-850">
            <h3 className="font-bold text-zinc-950 dark:text-white uppercase text-sm tracking-widest col-title">Customer Order Fullfillments</h3>
            <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Control order status, view totals and monitor Oklahoma regional deliveries</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-500 bg-gray-50/50 dark:bg-zinc-850/40">
                  <th className="p-4 px-6">Order Identification</th>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Receipt Items</th>
                  <th className="p-4">Paid Total</th>
                  <th className="p-4">Logistics status</th>
                  <th className="p-4 text-right">Fulfillment update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {orders.map((o) => (
                  <tr key={o.id} className="text-sm text-zinc-700 dark:text-zinc-300 hover:bg-gray-50/50 dark:hover:bg-zinc-850/20">
                    <td className="p-4 px-6">
                      <span className="font-mono font-bold text-zinc-900 dark:text-white">#{o.id}</span>
                      <span className="text-[11px] text-zinc-400 block mt-0.5 font-semibold">{o.date}</span>
                    </td>
                    <td className="p-4 mt-0.5 shrink-0">
                      <span className="font-semibold block text-zinc-900 dark:text-white">{o.shippingAddress.fullName}</span>
                      <span className="text-xs text-zinc-400 font-semibold block">{o.shippingAddress.city}, {o.shippingAddress.state}</span>
                    </td>
                    <td className="p-4">
                      <ul className="text-xs text-zinc-500 list-disc list-inside">
                        {o.items.map((it, idx) => (
                          <li key={idx}>
                            {it.name} ({it.size}/{it.color}) x{it.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 font-bold tracking-tight text-zinc-900 dark:text-white">
                      ${o.total.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold tracking-widest uppercase ${
                        o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' :
                        o.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400' :
                        o.status === 'Cancelled' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as Order['status'])}
                        className="py-1 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold uppercase focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-all cursor-pointer text-center"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. PROMOTIONS VIEW */}
      {adminTab === 'promotions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="admin-coupons-view">
          
          {/* Coupon creation form */}
          <div className="p-6 bg-white dark:bg-zinc-850 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm h-max">
            <h3 className="font-bold text-zinc-900 dark:text-white uppercase text-sm tracking-widest mb-4">Create Promo Code</h3>
            
            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase block mb-1.5">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g. KOTHTREATS"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 focus:border-zinc-950 dark:focus:border-white focus:outline-none rounded-xl text-sm bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white placeholder-zinc-400 uppercase font-mono font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase block mb-1.5">Coupon Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 focus:border-zinc-950 dark:focus:border-white focus:outline-none rounded-xl text-sm bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed_value">Fixed Cash ($)</option>
                    <option value="free_shipping">Free Shipping</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase block mb-1.5">Discount Value</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 focus:border-zinc-950 dark:focus:border-white focus:outline-none rounded-xl text-sm bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white placeholder-zinc-400"
                    disabled={newType === 'free_shipping'}
                    required={newType !== 'free_shipping'}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase block mb-1.5">Brief description</label>
                <input
                  type="text"
                  placeholder="e.g. Seasonal 15% discount code"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 focus:border-zinc-950 dark:focus:border-white focus:outline-none rounded-xl text-sm bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white placeholder-zinc-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold uppercase rounded-xl hover:opacity-90 active:scale-95 transition-all text-center mt-3 cursor-pointer"
              >
                Create Promotion
              </button>
            </form>
          </div>

          {/* Table display listing all current discount codes */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden h-max">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-950 dark:text-white uppercase text-sm tracking-widest col-title">Active Promotion codes</h3>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
              {coupons.map((c) => (
                <div key={c.code} className="p-5 flex items-center justify-between text-sm hover:bg-gray-50/50 dark:hover:bg-zinc-850/20">
                  <div>
                    <span className="font-mono font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg text-sm inline-block">
                      {c.code}
                    </span>
                    <span className="text-xs text-zinc-500 block mt-1.5 font-medium">{c.description}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-zinc-900 dark:text-white uppercase block text-xs tracking-wider">
                      {c.type === 'free_shipping' ? 'Free Post' : c.type === 'percentage' ? `${c.value}% off` : `$${c.value} reduction`}
                    </span>
                    <button
                      onClick={() => setCoupons(prev => prev.filter(coup => coup.code !== c.code))}
                      className="text-xs font-black text-rose-500 mt-2 block hover:underline"
                    >
                      Disable code
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. ADD PRODUCT MODAL DIALOG */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <h3 className="font-bold text-zinc-900 dark:text-white uppercase text-base tracking-widest mb-4">Add apparel catalog item</h3>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Product name *</label>
                  <input
                    type="text"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Prairie Canvas Shirt"
                    className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:border-zinc-950 dark:focus:border-white focus:outline-none text-xs sm:text-sm bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="e.g. 59.00"
                    className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:border-zinc-950 dark:focus:border-white focus:outline-none text-xs sm:text-sm bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Collection</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:border-zinc-950 dark:focus:border-white focus:outline-none text-xs bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={newProdSubcategory}
                    onChange={(e) => setNewProdSubcategory(e.target.value)}
                    placeholder="e.g. Shirts"
                    className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:border-zinc-950 dark:focus:border-white focus:outline-none text-xs sm:text-sm bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Initial stock level</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    placeholder="20"
                    className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:border-zinc-950 dark:focus:border-white focus:outline-none text-xs sm:text-sm bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:border-zinc-950 dark:focus:border-white focus:outline-none text-[11px] bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Description</label>
                <textarea
                  value={newProdDescription}
                  onChange={(e) => setNewProdDescription(e.target.value)}
                  placeholder="Tell our customers about the fabrics and styling elements..."
                  rows={3}
                  className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:border-zinc-950 dark:focus:border-white focus:outline-none text-xs sm:text-sm bg-gray-50 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4.5 py-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-xl hover:opacity-90 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Confirm Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
