import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-300 to-gray-300 bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="relative bg-white bg-opacity-90 p-8 md:p-12 lg:p-16 rounded-lg shadow-2xl max-w-4xl w-full text-gray-800">
        <h1 style={{fontFamily: "Futura-bold"}} className="text-3xl font-bold mb-6 text-center text-red-700">Refund Policy</h1>

        <section className="mb-8">
          <p className="mb-6 leading-relaxed">
            Thank you for shopping at Our Store. If you are not entirely satisfied with your purchase, we're here to help.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Returns</h2>
          <p className="mb-4 leading-relaxed">
            You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging. Your item needs to have the receipt or proof of purchase.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Refunds</h2>
          <p className="mb-4 leading-relaxed">
            Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.
          </p>
          <p className="mb-4 leading-relaxed">
            If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within a certain amount of days, depending on your card issuer's policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Shipping</h2>
          <p className="mb-4 leading-relaxed">
            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions on how to return your item to us, contact us at <a href="mailto:support@ourstore.com" className="text-blue-700 underline">support@ourstore.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;