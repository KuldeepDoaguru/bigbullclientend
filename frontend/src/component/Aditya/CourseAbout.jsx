import React from "react";

const CourseAbout = ({ course }) => {
  return (
    <section className="bg-white shadow-lg p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">About Course</h2>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Web development basics with HTML</li>
        <li>Cascading Style Sheets (CSS)</li>
        <li>JavaScript programming</li>
        <li>Creating interactive web pages</li>
        <li>JavaScript based browser extensions</li>
      </ul>
      <button className="text-blue-600">Show More</button>
    </section>
  );
};

export default CourseAbout;
