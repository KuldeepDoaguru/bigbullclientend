import React from "react";

const CourseFAQs = () => {
  return (
    <section className="bg-white shadow-lg p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">FAQs</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg">What will I learn in this course?</h3>
          <p className="text-gray-600">
            You will learn the basics of web development including HTML, CSS,
            JavaScript, and more.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg">Do I need any prior experience?</h3>
          <p className="text-gray-600">
            No prior experience is needed. This course is suitable for
            beginners.
          </p>
        </div>
      </div>
      <button className="text-blue-600 mt-4">Show More</button>
    </section>
  );
};

export default CourseFAQs;
