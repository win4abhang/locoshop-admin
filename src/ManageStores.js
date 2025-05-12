import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';  // If you're using React Router

function ManageStores() {
  const history = useHistory();  // React Router hook, if applicable
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [storesPerPage, setStoresPerPage] = useState(50);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://locoshop-backend.onrender.com/api/stores')
      .then(response => {
        setStores(response.data);
        setFilteredStores(response.data);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        alert('There was an error fetching the stores. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();
    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(keyword) ||
      store.tags.join(', ').toLowerCase().includes(keyword) ||
      (store.address || '').toLowerCase().includes(keyword)
    );
    setFilteredStores(filtered);
    setCurrentPage(1);
  }, [search, stores]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this store?')) {
      try {
        await axios.delete(`https://locoshop-backend.onrender.com/api/stores/${id}`);
        const updatedStores = stores.filter(store => store._id !== id);
        setStores(updatedStores);
      } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting store. Please try again.');
      }
    }
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = debounce((query) => {
    setSearch(query);
  }, 500);  // Delay of 500ms after the user stops typing

  const indexOfLast = currentPage * storesPerPage;
  const indexOfFirst = indexOfLast - storesPerPage;
  const currentStores = filteredStores.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStores.length / storesPerPage);

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (loading) {
    return <div>Loading stores...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Stores</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by name, tags or address"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
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

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tags</th>
            <th>Address</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStores.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No stores found.</td>
            </tr>
          ) : (
            currentStores.map(store => (
              <tr key={store._id}>
                <td>{store.name}</td>
                <td>{store.tags?.join(', ') || 'N/A'}</td>
                <td>{store.address || 'N/A'}</td>
                <td>
                  {store.phone || store.mobile || 'N/A'}
                </td>
                <td>
                  <button onClick={() => history.push(`/edit?id=${store._id}`)}>✏️ Edit</button>{' '}
                  <button onClick={() => handleDelete(store._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange('prev')}
        >
          Previous
        </button>
        <span style={{ padding: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange('next')}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ManageStores;