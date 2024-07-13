import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import courseImage from "./adiAssets/table.jpg";
// import instructorImage from './adiAssets/striver.jpg';
// import instructorImage2 from './adiAssets/babbar.jpeg';
// import { addToCart,removeFromCart } from '../../redux/cartSlice';
// import { useDispatch } from 'react-redux';
import axios from "axios";
import toast from "react-hot-toast";
const CourseDetail = () => {
  const { id } = useParams();
  //    const dispatch=useDispatch();
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
        image: "https://example.com/john_doe.jpg",
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
        image: "https://example.com/jane_smith.jpg",
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
    {
      id: 2,
      title: "React Advanced",
      category: "React",
      description: "Learn the Advanced  React.",
      price: "10,000",
      instructor: {
        name: "John Doe",
        bio: "Experienced React developer with a passion for teaching.",
        image: "https://example.com/john_doe.jpg",
      },
      modules: [
        {
          title: "Advanced React",
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
  ];
  const requirements = [
    "Basic understanding of HTML, CSS, and JavaScript",
    "Access to a computer with internet connection",
    "Desire to learn and explore new concepts",
  ];

  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      review:
        "This course exceeded my expectations. The instructor explained complex concepts in a simple and easy-to-understand manner. Highly recommended!",
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      review:
        "I enjoyed the course content and found it very informative. However, some of the videos could be more engaging.",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Is this course suitable for beginners?",
      answer:
        "Yes, this course is designed for beginners who want to learn web development.",
    },
    {
      id: 2,
      question: "How long do I have access to the course?",
      answer:
        "Once you enroll in the course, you will have lifetime access to the course materials.",
    },
    {
      id: 3,
      question: "Can I get a refund if I am not satisfied with the course?",
      answer:
        "Yes, we offer a 30-day money-back guarantee if you are not satisfied with the course.",
    },
  ];

  const course = courses.find((course) => course.id === parseInt(id));
  const [activeModuleIndex, setActiveModuleIndex] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [showMore, setShowMore] = useState(false);

  if (!course) {
    return (
      <div className="container p-4 mx-auto text-center text-red-600">
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

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  function cartHandler(course) {
    navigate(`/Cart/${id}`);

    let user = localStorage.getItem("user");
    user = JSON.parse(user);

    axios
      .get(
        `https://test.bigbulls.co.in/api/v1/auth/addToWishlist/${user.id}/${id}`
      )
      .then((response) => {
        // Handle successful response
        toast.success("Item add successfully");
        console.log("Item added to wishlist:", response.data);
        // You can dispatch an action or update state here if needed
      })
      .catch((error) => {
        // Handle error
        toast.error("Something went wrong");
        console.error("Error adding item to wishlist:", error);
        // You can display an error message or handle the error in another way
      });
  }

  return (
    <div className="p-6 bg-gray-100">
      {/* Header Section */}
      <header className="p-6 mb-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-start justify-between lg:flex-row">
          <div className="flex-1 mb-6 lg:mb-0">
            <div className="mb-4">
              <span className="text-sm text-red-600">Course Section</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold">
              Masterclass: A Complete Guide For Upskilling Your Growth
            </h1>
            <p className="mb-4 text-gray-600">
              Develop the foundations of a digital technology career, from Agile
              project management to HTML, basics to basicsbasicsbasics.
            </p>
            <div className="flex flex-wrap space-x-4">
              <button className="px-4 py-2 mb-2 text-white bg-red-600 rounded-md">
                Start learning now
              </button>
              <button className="px-4 py-2 mb-2 text-red-600 border border-red-600 rounded-md">
                Add to favorites
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/3 md:w-1/2 md:h-auto">
            <div className="p-4 rounded-lg shadow-md bg-red-50">
              <img
                src={courseImage}
                alt="Course Image"
                className="w-full mb-4 rounded-lg md:w-1/2 md:mx-auto"
              />
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span>8h 40m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Language</span>
                  <span>{course.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Level</span>
                  <span>Beginner level</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Students</span>
                  <span>From 12 years old</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span>{course.price}</span>
                </div>
              </div>
              <button
                className="w-full py-2 mt-4 text-white bg-red-600 rounded-md"
                onClick={cartHandler}
              >
                Add To Wishlist
              </button>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          <ul className="flex flex-wrap space-x-6">
            <li>
              <button onClick={() => scrollToSection("about")}>
                About Course
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("obj")}>
                Course Objective
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("requirements")}>
                Requirements
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("review")}>
                Course Review
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("faqs")}>FAQs</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* About Course Section */}
      <section className="p-6 mb-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">About Course</h2>
        <p className="mb-4 text-gray-600">
          If you would like to get started as a front end web developer, you are
          going to LOVE this course! Work on projects ranging from a simple HTML
          page to a complete Javascript based Google Chrome extension. We will
          cover the following technologies in this course:
        </p>
        <ul className="mb-4 text-gray-600 list-disc list-inside">
          <li>Web development basics with HTML</li>
          <li>Cascading Style Sheets (CSS)</li>
          <li>JavaScript programming</li>
          <li>Creating interactive web pages</li>
          <li>JavaScript based browser extensions</li>
        </ul>
        <button className="mb-5 text-red-600" onClick={toggleShowMore}>
          {showMore ? "Show less" : "Show more"}
        </button>
        {showMore && (
          <div
            className="p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-2xl delay-50"
            id="obj"
          >
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Course Objective
            </h2>
            <p className="mb-2 text-gray-700">
              By the end of this course, you will be able to:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Understand the fundamental concepts of React.</li>
              <li>
                Build and manage state in functional components using hooks.
              </li>
              <li>Implement routing in your React applications.</li>
              <li>
                Create reusable components and manage component hierarchy.
              </li>
              <li>Utilize Redux for state management in large applications.</li>
              <li>
                Style your applications using Material-UI and Tailwind CSS.
              </li>
            </ul>
          </div>
        )}
      </section>

      {/* Intended Learning Objectives Section */}
      <section className="p-6 mb-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          Intended Learning Objectives
        </h2>
        <ul className="space-y-4 list-none">
          <li className="flex items-start">
            <span className="flex items-center justify-center w-6 h-6 mr-4 text-white bg-red-600 rounded-full">
              ✔️
            </span>
            <span>Identify ways that communication can happen.</span>
          </li>
          <li className="flex items-start">
            <span className="flex items-center justify-center w-6 h-6 mr-4 text-white bg-red-600 rounded-full">
              ✔️
            </span>
            <span>Describe the different styles of communication.</span>
          </li>
          <li className="flex items-start">
            <span className="flex items-center justify-center w-6 h-6 mr-4 text-white bg-red-600 rounded-full">
              ✔️
            </span>
            <span>Explain the importance of tone in communication.</span>
          </li>
        </ul>
      </section>

      {/* Course Content Section */}
      <section className="p-6 mb-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Course Content</h2>
        <div className="divide-y divide-gray-200">
          {course.modules.map((module, index) => (
            <div key={index}>
              <button
                className="flex justify-between w-full py-4 text-left"
                onClick={() => toggleModule(index)}
              >
                <span>{module.title}</span>
                <span>{activeModuleIndex === index ? "▲" : "▼"}</span>
              </button>
              {activeModuleIndex === index && (
                <div className="pl-4">
                  {module.submodules.map((submodule, subIndex) => (
                    <div key={subIndex} className="flex items-center py-2">
                      <span>{submodule.title}</span>
                      <button
                        className="ml-auto text-red-600"
                        onClick={() => playVideo(submodule.videoUrl)}
                      >
                        Watch Video
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Instructor Section */}
      <section className="p-6 mb-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Instructor</h2>
        <div className="flex items-center">
          <img
            src={course.instructor.image}
            alt={course.instructor.name}
            className="w-16 h-16 mr-4 rounded-full"
          />
          <div>
            <h3 className="text-lg font-bold">{course.instructor.name}</h3>
            <p className="text-gray-600">{course.instructor.bio}</p>
          </div>
        </div>
      </section>

      {/* Video Player Section */}
      {activeVideoUrl && (
        <section className="p-6 mb-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Course Video</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="100%"
              height="100%"
              src={activeVideoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Course Video"
            ></iframe>
          </div>
        </section>
      )}

      {/* FAQ and Reviews */}
      <div className="w-full p-4 bg-gray-100">
        {/* Requirements Section */}
        <section
          id="requirements"
          className="p-6 mb-6 bg-white rounded-lg shadow-lg"
        >
          <h2 className="mb-4 text-2xl font-bold">Requirements</h2>
          <ul className="mb-4 text-gray-600 list-disc list-inside">
            {requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </section>

        {/* Course Review Section */}
        <section id="review" className="p-6 mb-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Course Review</h2>
          {reviews.map((review) => (
            <div key={review.id} className="pb-4 mb-4 border-b border-gray-200">
              <h3 className="mb-2 text-lg font-semibold">{review.user}</h3>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <p className="text-gray-600">{review.review}</p>
            </div>
          ))}
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="p-6 mb-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">FAQs</h2>
          {faqs.map((faq) => (
            <div key={faq.id} className="pb-4 mb-4 border-b border-gray-200">
              <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CourseDetail;
