import React from "react";

const CourseInstructor = ({ instructor }) => {
  return (
    <section className="bg-white shadow-lg p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Instructor</h2>
      <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4">
        <div className="flex-1 mb-6 lg:mb-0 max-w-sm">
          <img
            src={instructor.image}
            alt="Instructor"
            className="w-full rounded-lg mb-4"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{instructor.name}</h3>
          <p className="text-gray-600">{instructor.bio}</p>
        </div>
      </div>
    </section>
  );
};

export default CourseInstructor;
