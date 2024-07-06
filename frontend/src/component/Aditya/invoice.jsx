import React from 'react';
// import InvoiceItem from './InvoiceItem';

const Invoice = () => {
  const items = [
    { description: 'Product A', quantity: 2, price: 50, total: 100 },
    { description: 'Product B', quantity: 1, price: 75, total: 75 },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 style={{fontFamily: "Futura-bold"}} className="text-3xl font-semibold mb-6">Invoice</h2>
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">Invoice Number:</p>
            <p>#123456</p>
          </div>
          <div>
            <p className="font-semibold">Invoice Date:</p>
            <p>June 10, 2024</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mb-4"></div>
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">Client Name:</p>
            <p>John Doe</p>
          </div>
          <div>
            <p className="font-semibold">Due Date:</p>
            <p>June 30, 2024</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mb-4"></div>
        <table className="w-full mb-6">
          <thead>
            <tr>
              <th className="text-left">Description</th>
              <th className="text-right">Quantity</th>
              <th className="text-right">Price</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* {items.map((item, index) => (
              <InvoiceItem key={index} {...item} />
            ))} */}
          </tbody>
        </table>
        <div className="border-t border-gray-200 my-4"></div>
        <div className="flex justify-end">
          <div className="text-right">
            <p className="font-semibold">Subtotal:</p>
            <p className="font-semibold">Tax (10%):</p>
            <p className="font-semibold">Total:</p>
          </div>
          <div className="ml-4">
            <p className="text-right">Rs {subtotal.toFixed(2)}</p>
            <p className="text-right">Rs {tax.toFixed(2)}</p>
            <p className="text-right">Rs {total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;