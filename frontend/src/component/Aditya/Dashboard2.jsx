import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const { id } = useParams();
  const navigate = useNavigate();

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
      id: 3,
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

  const [course, setCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [hideWatchVideo, setHideWatchVideo] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const foundCourse = courses.find((course) => course.id === parseInt(id));

  const courseFoundFun = () => {
    if (foundCourse) {
      setCourse(foundCourse);
      setSelectedTopic(0);
    } else {
      console.error(`Course with ID ${id} not found`);
      navigate("/not-found");
    }
  };

  useEffect(() => {
    courseFoundFun();
  }, []);

  const handleVideoChange = (newSrc) => {
    console.log("Setting video URL to:", newSrc); // Debugging: Log the new video URL
    setVideoSrc(newSrc);
    setHideWatchVideo(true);
  };

  const handleTopicClick = (index) => {
    setSelectedTopic(index);
    setHideWatchVideo(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-white shadow-md ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">{course?.title}</h2>
          <nav className="mt-6">
            <ul>
              {course?.modules.map((module, index) => (
                <li key={index} className="mt-4 cursor-pointer">
                  <div
                    className={`text-gray-600 ${
                      selectedTopic === index ? "font-bold" : ""
                    }`}
                    onClick={() => handleTopicClick(index)}
                  >
                    {module.title}
                  </div>
                  {selectedTopic === index && !hideWatchVideo && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => handleVideoChange(module.videoUrl)}
                    >
                      Watch Video
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <button className="md:hidden text-blue-600" onClick={toggleSidebar}>
            <IoMenu className="text-5xl text-black" />
          </button>
        </div>

        <div className="mt-6">
          {selectedTopic !== null && (
            <>
              <h1 className="text-2xl font-bold">
                {course.modules[selectedTopic].title}
              </h1>
              {videoSrc && (
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <video
                    className="absolute top-0 left-0 w-full h-full"
                    controls
                    src={videoSrc}
                    controlsList="nodownload"
                    title="Video Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></video>
                </div>
              )}
            </>
          )}
          {selectedTopic === null && (
            <p className="text-lg text-gray-600">
              Click on a topic to watch its video
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
