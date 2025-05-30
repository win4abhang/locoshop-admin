import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, password } = location.state || {};

  if (!username || !password) {
    return <div>Invalid access. Please complete registration.</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-10 text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Registration Successful!</h2>
      <p className="mb-2">Your store has been registered successfully.</p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <p><strong>Username (Store ID):</strong> {username}</p>
        <p><strong>Password (Phone No):</strong> {password}</p>
        <p className="text-sm text-red-600 mt-2">Please save these credentials. You’ll need them to log in.</p>
      </div>
      <button
        onClick={() => navigate('/login')}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Login
      </button>
    </div>
  );
};

export default SuccessPage;
