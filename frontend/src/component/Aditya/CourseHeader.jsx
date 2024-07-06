import React from "react";

const CourseHeader = ({ course, onStartLearning, onAddToFavorites, onAddToCart }) => {
  return (
    <header className="bg-white shadow-lg p-6 rounded-lg mb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start">
        <div className="flex-1 mb-6 lg:mb-0">
          <div className="mb-4">
            <span className="text-blue-600 text-sm">{course.category}</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex flex-wrap max-sm:space-x-0 space-x-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md mb-2"
              onClick={onStartLearning}
            >
              Start learning now
            </button>
            <button
              className="border border-blue-600 text-red-600 px-4 py-2 rounded-md mb-2"
              onClick={onAddToFavorites}
            >
              Add to favorites
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <img
              src={course.instructor.image}
              alt="Course Image"
              className="w-full rounded-lg mb-4"
            />
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span>8h 40m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <span>{course.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Description</span>
                <span>{course.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Price</span>
                <span>{course.price}</span>
              </div>
            </div>
            <button
              className="bg-red-600 text-white w-full mt-4 py-2 rounded-md"
              onClick={onAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CourseHeader;
