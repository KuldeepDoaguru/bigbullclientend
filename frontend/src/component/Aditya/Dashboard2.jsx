import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [courseCheck, setCourseCheck] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const [courseChapter, setCourseChapter] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [hideWatchVideo, setHideWatchVideo] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videoList, setVideoList] = useState([]);

  const courseDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://test.bigbulls.co.in/api/v1/auth/coursePage/${id}`
      );
      setCourseData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseChapter = async () => {
    try {
      const { data } = await axios.get(
        `https://test.bigbulls.co.in/api/v1/auth/getChapterViaId/${id}`
      );
      setCourseChapter(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseVideo = async (cid) => {
    try {
      const { data } = await axios.get(
        `https://test.bigbulls.co.in/api/v1/auth/videoListViaCourseId/${id}/${cid}`
      );
      setVideoList(data);
      setSelectedTopic(cid);
      setHideWatchVideo(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    courseDetails();
    getCourseChapter();
  }, []);

  console.log(courseChapter.result);

  const handleVideoChange = (newSrc) => {
    console.log("Setting video URL to:", newSrc); // Debugging: Log the new video URL
    setVideoSrc(newSrc?.video_url);
    setHideWatchVideo(true);
    setSelectedVideo(newSrc.coursevideo_id);
  };

  console.log(videoSrc);
  const handleTopicClick = (index) => {
    setSelectedTopic(index);
    setHideWatchVideo(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  console.log(selectedTopic);
  console.log(videoList);

  const handleRightClick = (e) => {
    e.preventDefault();
  };

  const courseDetailsById = async () => {
    try {
      const { data } = await axios.get(
        `https://test.bigbulls.co.in/api/v1/auth/getBoughtCourseViaId/${user.id}`
      );
      setCourseCheck(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    courseDetailsById();
  }, []);

  console.log(courseCheck);

  const courseFilter = courseCheck
    ?.filter((item) => item.course_id)
    .map((item) => item.course_id);

  console.log(courseFilter);

  const filterEachCourse = courseFilter
    ?.filter((item) => item)
    ?.flatMap((item) => item.split(", "));

  console.log(filterEachCourse);

  const courseCheckfilter = filterEachCourse?.includes(String(id));

  console.log(courseCheckfilter);

  return (
    <>
      <div onContextMenu={handleRightClick}>
        <h2 className="font-bold mx-2 text-3xl text-red-800 mb-2">
          {courseData[0]?.course_name}
        </h2>
        {courseCheckfilter ? (
          <>
            <div className="flex min-h-screen bg-gray-100">
              {/* Sidebar */}
              <aside
                className={`w-72 bg-white shadow-md ${
                  sidebarOpen ? "block" : "hidden"
                } md:block`}
              >
                <div className="p-4">
                  <nav className="mt-6">
                    <ul>
                      {courseChapter?.result?.map((item) => (
                        <li key={item.ch_id} className="mt-4 cursor-pointer">
                          <div
                            className={`text-emerald-700 shadow p-2 rounded mb-1 ${
                              selectedTopic === item.ch_id ? "font-bold" : ""
                            }`}
                            onClick={() => getCourseVideo(item.ch_id)}
                          >
                            {item.ch_name.toUpperCase()}
                          </div>
                          {selectedTopic === item.ch_id && (
                            <>
                              <ul>
                                {videoList?.map((video) => (
                                  <>
                                    <li
                                      onClick={() => handleVideoChange(video)}
                                      className={`text-sm ${
                                        selectedVideo === video.coursevideo_id
                                          ? "text-sky-900 text-md font-bold"
                                          : "text-sky-600"
                                      }`}
                                    >
                                      {video?.title.toUpperCase()}
                                    </li>
                                  </>
                                ))}
                              </ul>
                            </>
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
                  <button
                    className="md:hidden text-blue-600"
                    onClick={toggleSidebar}
                  >
                    <IoMenu className="text-5xl text-black" />
                  </button>
                </div>

                <div className="mt-6">
                  {selectedTopic !== null && (
                    <>
                      <h1 className="text-2xl font-bold">
                        {courseChapter[selectedTopic]?.title}
                      </h1>
                      {videoSrc && (
                        <div
                          className="relative"
                          style={{ paddingTop: "56.25%" }}
                        >
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
          </>
        ) : (
          <>
            <hr />
            <div className="h-screen mx-2">
              <h2 className="mt-2 text-3xl font-bold text-emerald-800">
                Purchase this course to check course video...
              </h2>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
