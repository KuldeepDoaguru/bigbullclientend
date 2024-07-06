import React from "react";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard2";

const Introduction = () => {
  const { id } = useParams();

  // Assuming courses data is available here or fetched similarly
  const courses = [
    {
      id: 1,
      title: "React Basics",
      category: "React",
      modules: [
        {
          title: "Introduction to React",
          videoUrl:
            "https://res.cloudinary.com/dq5upuxm8/video/upload/v1719990295/bigbull/hero_vzz7nf.mp4",
        },
        {
          title: "React Components",
          videoUrl:
            "https://res.cloudinary.com/dq5upuxm8/video/upload/v1719990295/bigbull/hero_vzz7nf.mp4",
        },
      ],
    },
    {
      id: 2,
      title: "JavaScript Basics",
      category: "JavaScript",
      modules: [
        {
          title: "Introduction to JavaScript",
          videoUrl:
            "https://res.cloudinary.com/dq5upuxm8/video/upload/v1719990295/bigbull/hero_vzz7nf.mp4",
        },
        {
          title: "JavaScript Functions",
          videoUrl:
            "https://res.cloudinary.com/dq5upuxm8/video/upload/v1719990295/bigbull/hero_vzz7nf.mp4",
        },
      ],
    },
  ];

  const foundCourse = courses.find((course) => course.id === parseInt(id));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-xl font-bold">{foundCourse?.title}</h2>
          <nav className="mt-6">
            <ul>
              {foundCourse?.modules.map((module, index) => (
                <li key={index} className="mt-4 cursor-pointer">
                  <div>{module.title}</div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      <div className="flex-1 p-6">
        <Dashboard course={foundCourse} />
      </div>
    </div>
  );
};

export default Introduction;
