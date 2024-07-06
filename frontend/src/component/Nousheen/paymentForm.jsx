import mastercard from '../../Assets/Nousheen/mastercard.png'
import visa from '../../Assets/Nousheen/visa.png'
import { useState } from 'react';


const PaymentForm = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ name, cardNumber, expiryDate, cvc });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">

      {/* merchant details */}
    <div>
     <div className="  flex justify-end items-end flex-col">
      <div className='flex gap-4'>
      <h2 className="text-xs font-light text-gray-500">Merchant</h2>
      <h2 className="text-xs font-bold text-blue-800">Name:-John alex</h2>
      </div>
      <div className='flex mr-10 gap-5'>
      <h2 className="text-xs font-light text-gray-500">Order#</h2>
      <h2 className="text-xs font-bold text-blue-800">98346653</h2>
      </div>
      <div className='flex mr-10 gap-5'>
      <h2 className="text-xs font-light text-gray-500">Amount</h2>
      <h2 className="text-xs font-bold text-blue-800">EUR 20.00</h2>
      </div>
      </div>
    </div>
    <div className="flex mt-8 mb-8 gap-5">
    <div className='w-16' >
           <img src={mastercard} alt="mastercard" width='100%' />
      </div>
      <div className='w-16' >
           <img src={visa} alt="visa" width='100%' />
      </div>
    </div>
    <div></div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Card holder
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            placeholder="1234 5678 9123 4567"
            required
          />
        </div>
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="expiryDate">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="cvc">
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              placeholder="123"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;