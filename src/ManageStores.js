import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditStore({ storeId }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    lat: '',
    lng: '',
    tags: [],
  });
  const [message, setMessage] = useState('');
  const [tagsArray, setTagsArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch store data from backend
    const fetchStoreData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://locoshop-backend.onrender.com/api/stores/${storeId}`
        );
        setFormData(response.data);
        setTagsArray(response.data.tags || []);
      } catch (err) {
        console.error('Error fetching store data:', err);
        setMessage('❌ Failed to load store data.');
      } finally {
        setLoading(false);
      }
    };

    if (storeId) fetchStoreData();
  }, [storeId]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle tags input change
  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim());
    setTagsArray(tags);
  };

  // Validate coordinates
  const isValidCoordinates = (lat, lng) => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate coordinates before submitting
    const lat = parseFloat(formData.lat);
    const lng = parseFloat(formData.lng);
    if (!isValidCoordinates(lat, lng)) {
      setMessage('❌ Invalid coordinates.');
      return;
    }

    const updatedData = {
      ...formData,
      lat,
      lng,
      tags: tagsArray,
    };

    try {
      setLoading(true);
      await axios.put(
        `https://locoshop-backend.onrender.com/api/stores/${storeId}`,
        updatedData
      );
      setMessage('✅ Store updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      setMessage('❌ Error updating store.');
    } finally {
      setLoading(false);
    }
  };

  // Get current geolocation
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setMessage('❌ Unable to retrieve your location.');
        }
      );
    } else {
      setMessage('❌ Geolocation not supported by your browser.');
    }
  };

  if (loading) {
    return <div>Loading store data...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Store</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Store name"
          />
        </div>

        <div>
          <label>Address: </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Store address"
          />
        </div>

        <div>
          <label>Latitude: </label>
          <input
            type="text"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            required
            placeholder="Latitude"
          />
        </div>

        <div>
          <label>Longitude: </label>
          <input
            type="text"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            required
            placeholder="Longitude"
          />
        </div>

        <div>
          <label>Tags: </label>
          <input
            type="text"
            value={tagsArray.join(', ')}
            onChange={handleTagsChange}
            placeholder="Comma-separated tags"
          />
        </div>

        <button type="button" onClick={getCurrentLocation}>
          Use Current Location
        </button>

        <div style={{ marginTop: '10px' }}>
          <button type="submit">Update Store</button>
        </div>
      </form>
    </div>
  );
}

export default EditStore;
