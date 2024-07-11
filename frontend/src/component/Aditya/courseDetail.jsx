import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseHeader from "./CourseHeader";
import CourseAbout from "./CourseAbout";
import CourseInstructor from "./CourseInstructor";
import CourseReviews from "./CourseReviews";
import CourseFAQs from "./CourseFAQs";
import CourseModules from "./CourseModules";
import { useSelector } from "react-redux";
import axios from "axios";

const CourseDetail = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const { id } = useParams();
  const history = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const [courseAbout, setCourseAbout] = useState([]);
  const [courseChapter, setCourseChapter] = useState([]);

  const courseDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:6060/api/v1/auth/coursePage/${id}`
      );
      setCourseData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseAbout = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:6060/api/v1/auth/getCourseAboutData/${id}`
      );
      setCourseAbout(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseChapter = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:6060/api/v1/auth/getChapterViaId/${id}`
      );
      setCourseChapter(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    courseDetails();
    getCourseAbout();
    getCourseChapter();
  }, []);

  console.log(courseData);

  const [activeModuleIndex, setActiveModuleIndex] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  if (courseData?.length === 0) {
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

  console.log(courseAbout);

  return (
    <div className="bg-gray-100 p-6">
      <CourseHeader
        course={courseData}
        onStartLearning={handleStartLearning}
        onAddToFavorites={handleAddToFavorites}
        onAddToCart={handleAddToCart}
      />
      <CourseAbout course={courseAbout} />
      <CourseModules course={courseChapter.result} />
      <CourseReviews />
      <CourseFAQs />
    </div>
  );
};

export default CourseDetail;
