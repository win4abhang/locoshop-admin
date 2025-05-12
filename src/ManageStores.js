import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageStores() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [storesPerPage, setStoresPerPage] = useState(50);

  useEffect(() => {
    axios.get('https://locoshop-backend.onrender.com/api/stores')
      .then(response => {
        setStores(response.data);
        setFilteredStores(response.data);
      })
      .catch(err => console.error('Fetch error:', err));
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
        alert('Error deleting store.');
      }
    }
  };

  const handlePlay = async (id) => {
    try {
      const res = await axios.get(`https://locoshop-backend.onrender.com/api/stores/${id}`);
      const updated = res.data;
      setStores(prev =>
        prev.map(s => (s._id === id ? { ...s, ...updated } : s))
      );
    } catch (err) {
      alert('Failed to load full details.');
      console.error(err);
    }
  };

  const indexOfLast = currentPage * storesPerPage;
  const indexOfFirst = indexOfLast - storesPerPage;
  const currentStores = filteredStores.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStores.length / storesPerPage);

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
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStores.map(store => (
            <tr key={store._id}>
              <td>{store.name}</td>
              <td>{store.tags?.join(', ') || 'N/A'}</td>
              <td>{store.address || 'N/A'}</td>
              <td>
                {store.phone || store.mobile || 'N/A'}
                <button
                  onClick={() => handlePlay(store._id)}
                  style={{ marginLeft: '8px', padding: '2px 6px' }}
                >
                  ▶ Play
                </button>
              </td>
              <td>
                <button onClick={() => window.location.href = `/edit?id=${store._id}`}>✏️ Edit</button>{' '}
                <button onClick={() => handleDelete(store._id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: '15px' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              marginRight: '5px',
              padding: '5px 10px',
              backgroundColor: currentPage === i + 1 ? '#007bff' : '#ccc',
              color: currentPage === i + 1 ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ManageStores;
