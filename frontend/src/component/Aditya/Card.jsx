import React from 'react';
import certificate from './adiAssets/c1.jpg'

const Card = ({ award, date, image }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-5 transform transition-transform duration-300 hover:scale-112 hover:translate-x-4">
      <img src={certificate} alt='certificate'/>
      <h3 className="text-xl font-semibold mb-2">{award}</h3>
      <p className="text-gray-700">{date}</p>
    </div>
  );
};

export default Card;
