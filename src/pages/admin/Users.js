import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', userType: 'staff' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 20;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/users`, {
        headers: { 'x-api-key': API_KEY },
        params: { page, limit, search }
      });
      setUsers(res.data.users);
      setTotalUsers(res.data.total);
    } catch (err) {
      console.error(err);
      setError('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const config = { headers: { 'x-api-key': API_KEY } };
      if (editingUserId) {
        await axios.put(`${BACKEND_URL}/users/${editingUserId}`, form, config);
      } else {
        await axios.post(`${BACKEND_URL}/users`, form, config);
      }
      setForm({ username: '', password: '', userType: 'staff' });
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setForm({
      username: user.username,
      password: '',
      userType: user.userType,
    });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setForm({ username: '', password: '', userType: 'staff' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const config = { headers: { 'x-api-key': API_KEY } };
      await axios.delete(`${BACKEND_URL}/users/${id}`, config);
      fetchUsers();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <div style={{ padding: '1rem', maxWidth: '100%', margin: 'auto' }}>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        placeholder="Search by name or mobile..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{ marginBottom: '1rem', width: '100%', padding: '8px' }}
      />

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} required style={{ marginRight: '1rem' }} />
        <input name="password" type="password" placeholder={editingUserId ? 'New Password (optional)' : 'Password'} value={form.password} onChange={handleChange} style={{ marginRight: '1rem' }} />
        <select name="userType" value={form.userType} onChange={handleChange} style={{ marginRight: '1rem' }}>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="store_owner">Store Owner</option>
          <option value="local_partner">Local Partner</option>
          <option value="consumer">Consumer</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? (editingUserId ? 'Updating...' : 'Creating...') : editingUserId ? 'Update User' : 'Add User'}
        </button>
        {editingUserId && (
          <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '1rem' }}>
            Cancel
          </button>
        )}
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ padding: '8px' }}>Username</th>
            <th style={{ padding: '8px' }}>Name</th>
            <th style={{ padding: '8px' }}>Phone</th>
            <th style={{ padding: '8px' }}>Email</th>
            <th style={{ padding: '8px' }}>PAN</th>
            <th style={{ padding: '8px' }}>Aadhar</th>
            <th style={{ padding: '8px' }}>Address</th>
            <th style={{ padding: '8px' }}>User Type</th>
            <th style={{ padding: '8px' }}>Created</th>
            <th style={{ padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ padding: '8px', textAlign: 'center' }}>No users found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{user.username}</td>
                <td style={{ padding: '8px' }}>{user.name || '-'}</td>
                <td style={{ padding: '8px' }}>{user.phone || '-'}</td>
                <td style={{ padding: '8px' }}>{user.email || '-'}</td>
                <td style={{ padding: '8px' }}>{user.pan_number || '-'}</td>
                <td style={{ padding: '8px' }}>{user.addhar_number || '-'}</td>
                <td style={{ padding: '8px' }}>{user.address || '-'}</td>
                <td style={{ padding: '8px' }}>{user.userType}</td>
                <td style={{ padding: '8px' }}>{new Date(user.createdAt).toLocaleString()}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <button onClick={() => handleEdit(user)} style={{ marginRight: '0.5rem' }}>Edit</button>
                  <button onClick={() => handleDelete(user._id)} style={{
                    backgroundColor: 'red', color: 'white',
                    padding: '6px 10px', border: 'none', borderRadius: '4px',
                    fontWeight: 'bold', cursor: 'pointer'
                  }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Prev</button>
          <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Users;
