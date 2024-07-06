import React from "react";

const CourseReviews = () => {
  return (
    <section className="bg-white shadow-lg p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg">John Doe</h3>
          <p className="text-gray-600">
            This course was very informative and well-structured. Highly
            recommend!
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg">Jane Smith</h3>
          <p className="text-gray-600">
            Great course for beginners. The instructor was very clear and
            engaging.
          </p>
        </div>
      </div>
      <button className="text-blue-600 mt-4">Show More</button>
    </section>
  );
};

export default CourseReviews;
