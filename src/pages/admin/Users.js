import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'https://locoshop-backend.onrender.com';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: '',
    password: '',
    userType: 'staff',
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (editingUserId) {
        await axios.put(`${BACKEND_URL}/api/users/${editingUserId}`, form);
      } else {
        await axios.post(`${BACKEND_URL}/api/users`, form);
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
      await axios.delete(`${BACKEND_URL}/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Users Management</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          style={{ marginRight: '1rem' }}
        />
        <input
          name="password"
          type="password"
          placeholder={editingUserId ? 'New Password (optional)' : 'Password'}
          value={form.password}
          onChange={handleChange}
          style={{ marginRight: '1rem' }}
        />
        <select
          name="userType"
          value={form.userType}
          onChange={handleChange}
          style={{ marginRight: '1rem' }}
        >
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="store_owner">Store Owner</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading
            ? editingUserId
              ? 'Updating...'
              : 'Creating...'
            : editingUserId
            ? 'Update User'
            : 'Add User'}
        </button>
        {editingUserId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{ marginLeft: '1rem' }}
          >
            Cancel
          </button>
        )}
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Username</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>User Type</th>
            <th style={{ padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ _id, username, userType }) => (
            <tr key={_id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{username}</td>
              <td style={{ padding: '8px' }}>{userType}</td>
              <td style={{ padding: '8px', textAlign: 'center' }}>
                <button
                  onClick={() => handleEdit({ _id, username, userType })}
                  style={{ marginRight: '0.5rem' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="3" style={{ padding: '8px', textAlign: 'center' }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
