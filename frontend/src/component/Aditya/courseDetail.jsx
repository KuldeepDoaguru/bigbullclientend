import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseHeader from "./CourseHeader";
import CourseAbout from "./CourseAbout";
import CourseInstructor from "./CourseInstructor";
import CourseReviews from "./CourseReviews";
import CourseFAQs from "./CourseFAQs";
import CourseModules from "./CourseModules";
import { useSelector } from "react-redux";

const CourseDetail = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const { id } = useParams();
  const history = useNavigate();
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
              videoUrl: "https://www.youtube.com/embed/vz1RlUyrc3w",
            },
            {
              title: "Getting Started with React",
              videoUrl: "https://www.youtube.com/embed/vz1RlUyrc3w",
            },
          ],
        },
        {
          title: "React Components",
          submodules: [
            {
              title: "Functional Components",
              videoUrl: "https://www.youtube.com/embed/vz1RlUyrc3w",
            },
            {
              title: "Class Components",
              videoUrl: "https://www.youtube.com/embed/vz1RlUyrc3w",
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
              videoUrl: "https://www.youtube.com/embed/ajdRvxDWH4w",
            },
            {
              title: "Variables and Data Types",
              videoUrl: "https://www.youtube.com/embed/ajdRvxDWH4w",
            },
          ],
        },
        {
          title: "JavaScript Functions",
          submodules: [
            {
              title: "Defining Functions",
              videoUrl: "https://www.youtube.com/embed/ajdRvxDWH4w",
            },
            {
              title: "Function Expressions",
              videoUrl: "https://www.youtube.com/embed/ajdRvxDWH4w",
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

  const handleStartLearning = () => {
    history(`/course-dashboard/${id}`);
  };

  const handleAddToFavorites = () => {
    // Add to favorites logic here
  };

  const handleAddToCart = () => {
    // Add to cart logic here
  };

  return (
    <div className="bg-gray-100 p-6">
      <CourseHeader
        course={course}
        onStartLearning={handleStartLearning}
        onAddToFavorites={handleAddToFavorites}
        onAddToCart={handleAddToCart}
      />
      <CourseAbout course={course} />
      <CourseModules
        course={course}
        activeModuleIndex={activeModuleIndex}
        setActiveModuleIndex={setActiveModuleIndex}
        activeVideoUrl={activeVideoUrl}
        setActiveVideoUrl={setActiveVideoUrl}
      />
      <CourseInstructor instructor={course.instructor} />
      <CourseReviews />
      <CourseFAQs />
    </div>
  );
};

export default CourseDetail;
