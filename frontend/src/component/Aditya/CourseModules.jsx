import React from "react";

const CourseModules = ({ course }) => {
  console.log(course);
  return (
    <section className="bg-white shadow-lg p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Course Chapters</h2>
      <div>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          {course?.map((item) => (
            <>
              <li>{item.ch_name}</li>
            </>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CourseModules;
