import React from "react";

const CourseAbout = ({ course }) => {
  console.log(course);

  const courseList = course[0]?.about?.split(",");
  console.log(courseList);
  return (
    <section className="bg-white shadow-lg p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">About Course</h2>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        {courseList?.map((course) => (
          <>
            <li>{course}</li>
          </>
        ))}
      </ul>
    </section>
  );
};

export default CourseAbout;
