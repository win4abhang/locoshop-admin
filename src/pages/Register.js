import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL='https://locoshop-backend.onrender.com/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    usp: '',
    address: '',
    tags: '',
    longitude: '',
    latitude: '',
  });

  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validation
    if (!formData.name || !formData.phone || !formData.address || !formData.tags) {
      setAlertType('error');
      setMessage('Please fill all required fields.');
      return;
    }

    if (
      !formData.longitude ||
      !formData.latitude ||
      isNaN(parseFloat(formData.longitude)) ||
      isNaN(parseFloat(formData.latitude))
    ) {
      setAlertType('error');
      setMessage('Please provide valid latitude and longitude or use current location.');
      return;
    }

    // Load Razorpay script
    const razorpayLoaded = await loadRazorpayScript();
    if (!razorpayLoaded) {
      setAlertType('error');
      setMessage('Razorpay SDK failed to load. Check your internet connection.');
      return;
    }

    try {
      // Step 1: Create order on backend
      const orderRes = await axios.post(`${BACKEND_URL}/payment/create-order`, {
        amount: 36500, // ₹365 in paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      });

      const { order_id, razorpayKey } = orderRes.data;

      // Step 2: Open Razorpay checkout
      const options = {
        key: razorpayKey,
        amount: 36500,
        currency: 'INR',
        name: 'Localz.online',
        description: 'Store Registration',
        order_id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          const tagsArray = formData.tags.split(',').map((t) => t.trim());

          const userData = {
            name: formData.name,
            phone: formData.phone,
            usp: formData.usp || 'Premium user',
            address: formData.address,
            tags: tagsArray,
            location: {
              type: 'Point',
              coordinates: [
                parseFloat(formData.longitude),
                parseFloat(formData.latitude),
              ],
            },
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          };

          // Step 3: Verify payment and save user
          try {
            const res = await axios.post(`${BACKEND_URL}/payment/verify-and-register`, userData);
            if (res.data.success) {
              setAlertType('success');
              setMessage('🎉 Registration complete! Thank you for your payment.');
              setFormData({
                name: '',
                phone: '',
                usp: '',
                address: '',
                tags: '',
                longitude: '',
                latitude: '',
              });
            } else {
              setAlertType('error');
              setMessage('❌ Payment verification failed.');
            }
          } catch (err) {
            console.error(err);
            setAlertType('error');
            setMessage('❌ Payment verification failed.');
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      setAlertType('error');
      setMessage('❌ Payment initiation failed.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Premium Store Registration</h2>

      {message && (
        <div className={`mb-4 p-3 rounded ${alertType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'phone', 'usp', 'address', 'tags', 'longitude', 'latitude'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required={['name', 'phone', 'address', 'tags'].includes(field)}
          />
        ))}

        <button type="button" onClick={handleLocation} className="bg-blue-100 px-3 py-2 rounded text-sm">
          📍 Use Current Location
        </button>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Pay ₹365 & Register
        </button>
      </form>
    </div>
  );
};

export default Register;
