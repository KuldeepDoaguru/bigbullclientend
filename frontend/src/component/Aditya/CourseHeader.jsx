import React from "react";

const CourseHeader = ({ course, onStartLearning }) => {
  console.log(course);
  return (
    <header className="bg-white shadow-lg p-6 rounded-lg mb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start">
        <div className="flex-1 mb-6 lg:mb-0">
          <div className="mb-4">
            <span className="text-blue-600 text-sm">{course[0]?.category}</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{course[0]?.title}</h1>
          <p className="text-gray-600 mb-4">{course[0]?.description}</p>
          <div className="flex flex-wrap max-sm:space-x-0 space-x-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md mb-2"
              onClick={onStartLearning}
            >
              Start learning now
            </button>
            {/* <button
              className="border border-blue-600 text-red-600 px-4 py-2 rounded-md mb-2"
              // onClick={onAddToFavorites}
            >
              Add to favorites
            </button> */}
          </div>
          <div className="mt-4 rounded ">
            <h4 className="text-lg font-bold mb-2">Check Demo Video</h4>

            <iframe
              src="https://www.youtube.com/embed/8l691BQ-RGc?si=GXm6jgxrLb_bgGgl"
              title="Course Video"
              frameBorder="0"
              className="rounded lg:w-11/12 md:w-[640px] h-96"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <img
              src={course[0]?.thumbnails}
              alt="Course Image"
              className="w-full h-[19rem] rounded-lg mb-4"
            />
            <div className="flex flex-col space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500 col-span-1">Duration</span>
                <span className="col-span-2">8h 40m</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500 col-span-1">Category</span>
                <span className="col-span-2">{course[0]?.category}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500 col-span-1">Description</span>
                <span className="col-span-2">{course[0]?.description}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500 col-span-1">Price</span>
                <span className="col-span-2">{course[0]?.price} INR</span>
              </div>
            </div>
            <button
              className="bg-red-600 text-white w-full mt-4 py-2 rounded-md"
              // onClick={onAddToCart}
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
