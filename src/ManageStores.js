import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageStores() {
  const [stores, setStores] = useState([]); // Raw store data from backend
  const [filteredStores, setFilteredStores] = useState([]); // Stores after filtering
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [storesPerPage, setStoresPerPage] = useState(50);
  const [loading, setLoading] = useState(false);
  const [totalStores, setTotalStores] = useState(0); // Total stores count from the backend

  useEffect(() => {
    setLoading(true);
    axios.get('https://locoshop-backend.onrender.com/api/stores', {
      params: {
        page: currentPage,
        perPage: storesPerPage,
      },
    })
      .then(response => {
        setStores(response.data.data);
        setTotalStores(response.data.total); // Total stores from backend
        setFilteredStores(response.data.data); // Set filtered stores as well
      })
      .catch(err => {
        console.error('Fetch error:', err);
        alert('There was an error fetching the stores. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [currentPage, storesPerPage]);

  useEffect(() => {
    const keyword = search.toLowerCase();
    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(keyword) ||
      store.tags.join(', ').toLowerCase().includes(keyword) ||
      (store.address || '').toLowerCase().includes(keyword)
    );
    setFilteredStores(filtered);
    setCurrentPage(1); // Reset to the first page whenever search changes
  }, [search, stores]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this store?')) {
      try {
        await axios.delete(`https://locoshop-backend.onrender.com/api/stores/${id}`);
        const updatedStores = stores.filter(store => store._id !== id);
        setStores(updatedStores);
        setFilteredStores(updatedStores); // Keep filtered stores in sync
        if (updatedStores.length === 0 && currentPage > 1) {
          setCurrentPage(prev => prev - 1); // Go to the previous page if no stores left
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting store. Please try again.');
      }
    }
  };

  const indexOfLast = currentPage * storesPerPage;
  const indexOfFirst = indexOfLast - storesPerPage;
  const currentStores = filteredStores.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStores.length / storesPerPage); // Use filteredStores for pagination

  if (loading) {
    return <div>Loading stores...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Stores</h2>

      {/* Search + Per Page Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by name, tags or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '5px', width: '300px' }}
        />

        <div>
          <label>Stores per page: </label>
          <select value={storesPerPage} onChange={(e) => {
            setStoresPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tags</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStores.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No stores found.</td>
            </tr>
          ) : (
            currentStores.map(store => (
              <tr key={store._id}>
                <td>{store.name}</td>
                <td>{store.tags?.join(', ') || 'N/A'}</td>
                <td>{store.address || 'N/A'}</td>
                <td>
                  <button onClick={() => window.location.href = `/edit?id=${store._id}`}>✏️ Edit</button>{' '}
                  <button onClick={() => handleDelete(store._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '20px' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        <span style={{ padding: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ManageStores;
