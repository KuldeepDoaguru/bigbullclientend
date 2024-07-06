
import React, { useState } from 'react';
// import toast from 'react-hot-toast';

const Verification = () => {
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmail = contact.includes('@');
    const isPhoneNumber = /^\d+$/.test(contact);

    // if ((isEmail || isPhoneNumber) && code === '123456') {
    //   toast.success('Verification successful');
    //   setError('');
    // } else {
    //   toast.error('Invalid contact details or verification code');
    //   setSuccess('');
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 style={{fontFamily: "Futura-bold"}} className="text-2xl font-bold text-center text-gray-900">Verify Your Account</h2>
        {error && <div className="p-2 text-sm text-red-600 bg-red-200 rounded">{error}</div>}
        {success && <div className="p-2 text-sm text-green-600 bg-green-200 rounded">{success}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Email or Phone Number
            </label>
            <input
              id="contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email or phone number"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter the verification code"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;