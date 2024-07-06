import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import dummyVideo from '../../video/Jaguar_Feat_Bohemia_h.mp4';

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: "React Basics",
      category: "React",
      description: "Learn the basics of React.",
      price: "10,000",
      instructor: {
        name: "John Doe",
        bio: "Experienced React developer with a passion for teaching.",
        image:
          "https://wallpaperbat.com/img/7200619-anime-man-in-lofi-desktop-room-wallpaper.png",
      },
      modules: [
        {
          title: "Introduction to React",
          submodules: [
            {
              title: "What is React?",
              videoUrl: dummyVideo,
            },
            {
              title: "Getting Started with React",
              videoUrl: dummyVideo,
            },
          ],
        },
        {
          title: "React Components",
          submodules: [
            {
              title: "Functional Components",
              videoUrl: dummyVideo,
            },
            {
              title: "Class Components",
              videoUrl: dummyVideo,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "JavaScript Basics",
      category: "JavaScript",
      description: "Learn the basics of JavaScript.",
      price: "4500",
      instructor: {
        name: "Jane Smith",
        bio: "JavaScript enthusiast with a knack for simplifying complex concepts.",
        image:
          "https://wallpaperbat.com/img/7200619-anime-man-in-lofi-desktop-room-wallpaper.png",
      },
      modules: [
        {
          title: "Introduction to JavaScript",
          submodules: [
            {
              title: "JavaScript Fundamentals",
              videoUrl: dummyVideo,
            },
            {
              title: "Variables and Data Types",
              videoUrl: dummyVideo,
            },
          ],
        },
        {
          title: "JavaScript Functions",
          submodules: [
            {
              title: "Defining Functions",
              videoUrl: dummyVideo,
            },
            {
              title: "Function Expressions",
              videoUrl: dummyVideo,
            },
          ],
        },
      ],
    },
  ];

  const course = courses.find((course) => course.id === parseInt(id));
  const [activeModuleIndex, setActiveModuleIndex] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  if (!course) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        Course not found
      </div>
    );
  }

  const toggleModule = (index) => {
    setActiveModuleIndex(activeModuleIndex === index ? null : index);
  };

  const playVideo = (videoUrl) => {
    setActiveVideoUrl(videoUrl);
  };

  return (
    <div className="bg-gray-100 p-6 flex">
      {/* Course Modules Section */}
      <section className="bg-white shadow-lg p-6 rounded-lg mb-6 w-1/2">
        <h2 className="text-2xl font-bold mb-4">Course Modules</h2>
        {course.modules.map((module, index) => (
          <div key={index} className="mb-4">
            <div
              className="bg-gray-200 p-4 rounded-lg cursor-pointer"
              onClick={() => toggleModule(index)}
            >
              <h3 className="text-xl font-bold">{module.title}</h3>
            </div>
            {activeModuleIndex === index && (
              <div className="mt-4 ml-4 space-y-2">
                {module.submodules.map((submodule, subIndex) => (
                  <div
                    key={subIndex}
                    className="bg-gray-100 p-4 rounded-lg cursor-pointer"
                    onClick={() => playVideo(submodule.videoUrl)}
                  >
                    <h4 className="text-lg">{submodule.title}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Video Player Section */}
      {activeVideoUrl && (
        <section className="bg-white shadow-lg p-6 rounded-lg mb-6 w-1/2 ml-4">
          <h2 className="text-2xl font-bold mb-4">Video Player</h2>
          <div className="relative pb-9/16">
            <video
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              controls
              src={activeVideoUrl}
              title="Video Player"
            ></video>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
