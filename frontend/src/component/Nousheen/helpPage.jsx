import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaGift, FaExchangeAlt, FaBan, FaFileInvoice, FaMoneyBillWave, FaEnvelope, FaHeadset, FaChalkboardTeacher, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const faqData = [
  {
    question: "Is there a free trial available?",
    answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free 30-minute onboarding call to get you up and running. Book a call here.",
    icon: <FaGift />
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time.",
    icon: <FaExchangeAlt />
  },
  {
    question: "What is your cancellation policy?",
    answer: "You can cancel your subscription at any time from your account settings.",
    icon: <FaBan />
  },
  {
    question: "Can other info be added to an invoice?",
    answer: "Yes, you can add additional information to your invoices in your account settings.",
    icon: <FaFileInvoice />
  },
  {
    question: "How does billing work?",
    answer: "Billing is done on a monthly basis. You will be charged at the beginning of each billing cycle.",
    icon: <FaMoneyBillWave />
  },
  {
    question: "How do I change my account email?",
    answer: "You can change your account email in your account settings.",
    icon: <FaEnvelope />
  },
  {
    question: "How does support work?",
    answer: "Support is available 24/7 via chat and email.",
    icon: <FaHeadset />
  },
  {
    question: "Do you provide tutorials?",
    answer: "Yes, we provide detailed tutorials on how to use our services.",
    icon: <FaChalkboardTeacher />
  }
];

const FAQItem = ({ faq, index, toggleFAQ }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="w-full text-left flex justify-between items-center" 
        onClick={() => toggleFAQ(index)}
      >
        <span className="flex items-center text-xl font-medium">
          {faq.icon}
          <span className="ml-2 text-lg">{faq.question}</span>
        </span>
        <span className='text-xl'>{faq.open ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>
      {faq.open && <p className="mt-2 text-gray-700">{faq.answer}</p>}
    </div>
  );
};

const HelpPage = () => {
  const [faqs, setFaqs] = useState(faqData.map(faq => ({ ...faq, open: false })));
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleFAQ = index => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open;
      } else {
        faq.open = false;
      }
      return faq;
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-4 md:px-0">
      <main className="w-full max-w-4xl bg-white rounded-lg shadow max-sm:p-2.5 p-8 mt-8">
        <h1 style={{fontFamily: "Futura-bold"}} className="text-3xl font-bold text-center">Frequently asked questions</h1>
        <p className="text-gray-600 text-center mt-2">
          These are the most commonly asked questions about Untitled UI and billing.
          Can’t find what you’re looking for? <Link className="text-blue-600">Chat to our friendly team!</Link>
        </p>
        <div className="mt-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} index={index} faq={faq} toggleFAQ={toggleFAQ} className="" />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HelpPage;