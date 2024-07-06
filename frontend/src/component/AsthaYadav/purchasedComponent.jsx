import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PurchasedComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const courses = [
    { id: 1, title: 'React Basics', category: 'React', pic: 'https://coursework.vschool.io/content/images/2017/08/react-banner.png'},
    { id: 2, title: 'Advanced React', category: 'React', pic: 'https://coursework.vschool.io/content/images/2017/08/react-banner.png' },
    { id: 3, title: 'JavaScript Basics', category: 'JavaScript', pic: 'https://1000logos.net/wp-content/uploads/2020/09/JavaScript-Logo-1280x800.jpg' },
    { id: 4, title: 'Node.js Fundamentals', category: 'Node.js', pic: 'https://th.bing.com/th/id/OIP.M1U-BOiIzjE8ERoPA2GqpQHaE8?w=265&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
    { id: 5, title: 'CSS Flexbox', category: 'CSS', pic: 'https://miro.medium.com/max/1400/1*_6ooq0R60ba3UT5c-QVemA.png' },
  ];

  const categories = ['All', 'React', 'JavaScript', 'Node.js', 'CSS'];

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
  };

  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="flex flex-col w-full flex-wrap">
      <div>
        <h1 className='bg-red-600 text-white flex items-center justify-center text-4xl py-4 w-full'>
          Courses
        </h1>
      </div>
      <div className="filter-buttons mt-6 flex space-x-4 flex-wrap">
        {categories.map((category) => (
          <button 
            key={category}
            onClick={() => handleFilterClick(category)}
            className={`flex flex-wrap items-center justify-center px-4 py-2 rounded-full transition-colors duration-300 w-[15%] ${
              selectedCategory === category
                ? 'bg-red-700 text-white'
                : 'bg-transparent text-black hover:bg-red-600 hover:text-white border border-gray-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="course-list mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        {filteredCourses.map((course) => (
          <div 
            key={course.id} 
            className="course-item border p-4 cursor-pointer rounded-lg shadow-md"
            onClick={() => handleCourseClick(course.id)}
          >
            <div className="w-full h-48 mb-4 overflow-hidden rounded-t-lg">
              <img 
                src={course.pic} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600">Category: {course.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedComponent;