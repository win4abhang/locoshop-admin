import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'https://locoshop-backend.onrender.com'; // update if needed

const EditStoreByOwner = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
    address: '',
    tags: [],
    workingHours: {
      open: '09:00',
      close: '21:00',
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch existing store data
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/stores/${storeId}`);
        const store = res.data;

        setFormData({
          ...store,
          tags: store.tags || [],
          location: {
            type: 'Point',
            coordinates: store.location?.coordinates || [0, 0],
          },
          workingHours: {
            open: store.workingHours?.open || '09:00',
            close: store.workingHours?.close || '21:00',
          },
        });
        setLoading(false);
      } catch (err) {
        console.error('Error loading store:', err);
        setError('Failed to load store');
        setLoading(false);
      }
    };

    fetchStore();
  }, [storeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'latitude' || name === 'longitude') {
      const coords = [...formData.location.coordinates];
      const index = name === 'longitude' ? 0 : 1;
      coords[index] = parseFloat(value);
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          coordinates: coords,
        },
      });
    } else if (name === 'open' || name === 'close') {
      setFormData({
        ...formData,
        workingHours: {
          ...formData.workingHours,
          [name]: value,
        },
      });
    } else if (name === 'tags') {
      setFormData({
        ...formData,
        tags: value.split(',').map((tag) => tag.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/stores/${storeId}`, formData);
      alert('Store updated successfully!');
      navigate('/dashboard'); // or wherever you want
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update store.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Store</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Store Name"
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2 rounded"
        />
        <input
          name="latitude"
          type="number"
          value={formData.location.coordinates[1]}
          onChange={handleChange}
          placeholder="Latitude"
          className="w-full border p-2 rounded"
        />
        <input
          name="longitude"
          type="number"
          value={formData.location.coordinates[0]}
          onChange={handleChange}
          placeholder="Longitude"
          className="w-full border p-2 rounded"
        />
        <input
          name="tags"
          value={formData.tags.join(', ')}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded"
        />
        <div className="flex gap-2">
          <input
            name="open"
            type="time"
            value={formData.workingHours.open}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="close"
            type="time"
            value={formData.workingHours.close}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Store
        </button>
      </form>
    </div>
  );
};

export default EditStoreByOwner;
