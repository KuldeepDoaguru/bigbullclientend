import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Importing star icons
import { useSelector } from "react-redux";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import cogoToast from "cogo-toast";
import moment from "moment";

const CourseComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [allCourse, setAllCourse] = useState([]);
  const [selectedDate, setSelectedDate] = useState("All");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:6060/api/v1/auth/getAllCourses"
      );
      setAllCourse(data.result);
    } catch (error) {
      console.log("Error getting courses ", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  console.log(allCourse);

  const addCart = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:6060/api/v1/auth/add-to-cart/${user.id}/${id}`
      );
      cogoToast.success("Course added to cart successfully");
    } catch (error) {
      console.log(error);
      cogoToast.error(error?.response.data?.message);
    }
  };

  const filterByPrice = (course) => {
    switch (selectedPrice) {
      case "Under Rs 1000":
        return course.price < 1000;
      case "Rs 1000 - Rs 5000":
        return course.price >= 1000 && course.price <= 5000;
      case "Above Rs 100":
        return course.price > 5000;
      default:
        return true;
    }
  };

  const filterByDate = (course) => {
    const currentDate = moment();
    const courseDate = moment(course.created_at);
    console.log(currentDate, courseDate);
    const differenceInDays = currentDate.diff(courseDate, "days");
    console.log(differenceInDays);

    switch (selectedDate) {
      case "Last 30 Days":
        return differenceInDays <= 30;
      case "Last 6 Months":
        return differenceInDays <= 180;
      case "Last Year":
        return differenceInDays <= 365;
      default:
        return true;
    }
  };

  const filteredCourses = allCourse?.filter((course) => {
    return (
      (selectedCategory === "All" || course.category === selectedCategory) &&
      filterByPrice(course) &&
      filterByDate(course)
    );
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    Math.min(indexOfLastCourse, filteredCourses.length)
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const categories = allCourse.reduce((acc, course) => {
    if (course.category && !acc.includes(course.category)) {
      acc.push(course.category);
    }
    return acc;
  }, []);

  console.log(categories);

  const priceRanges = [
    "All",
    "Under Rs 1000",
    "Rs 1000 - Rs 5000",
    "Above Rs 5000",
  ];
  const dates = ["All", "Last 30 Days", "Last 6 Months", "Last Year"];

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };

  const handleCourseClick = (id) => {
    navigate(`/Cdetail/${id}`);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    // console.log('child');
    navigate("/cart");
  };

  useEffect(() => {
    const card = document.querySelectorAll(".card");
    card.forEach((eachCard) => {
      eachCard.addEventListener("mousemove", (e) => {
        const rect = eachCard.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top; // y position within the element.

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * -5;

        eachCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });

    return () => {
      card.forEach((eachCard) => {
        eachCard.addEventListener("mouseleave", () => {
          eachCard.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";
        });
      });
    };
  }, []);

  return (
    <CoursePage>
      <div className="container mx-auto md:p-4 pt-0">
        <div className="text-center md:mb-4">
          <h1
            style={{ fontFamily: "Futura-bold" }}
            className="text-5xl sm:text-8xl font-bold text-gray-800 card border-0 mb-10"
          >
            Courses
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-around items-center mb-6 gap-y-8 sm:gap-0 max-md:mt-16">
          <div className="flex flex-wrap gap-2 sm:mb-0 justify-center sm:justify-start sm:max-lg:max-w-sm ">
            <button
              onClick={() => handleFilterClick("All")}
              className={`px-4 py-1 border-1 border-rose-500 rounded-2xl transition-colors duration-300 ${
                selectedCategory === "All"
                  ? "bg-red-600 text-white"
                  : "bg-red text-gray-800 hover:bg-red-600 hover:text-white"
              }`}
            >
              All
            </button>
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterClick(category)}
                className={`px-4 py-1 border-1 border-rose-500 rounded-2xl transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-red-600 text-white"
                    : "bg-red text-gray-800 hover:bg-red-600 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 sm:max-lg:-mt-16 lg:-mt-6 min-w-80 max-lg:-mr-8">
            <div className="flex flex-col items-start ">
              <label htmlFor="priceRange" className="mb-1 text-gray-700">
                Price Range
              </label>
              <select
                id="priceRange"
                onChange={handlePriceChange}
                className="p-2 border-1 border-rose-500 rounded-lg bg-white text-gray-800"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start ">
              <label htmlFor="dateRange" className="mb-1 text-gray-700">
                Date
              </label>
              <select
                id="dateRange"
                onChange={handleDateChange}
                className="p-2  rounded-lg border-1 border-rose-500 bg-white text-gray-800"
              >
                {dates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="container mx-auto min-h-[50vh] max-sm:min-h-[1400px] md:max-lg:min-h-[948px]">
          <div className="px-4.5 py-4.5 flex justify-center">
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3   max-w-5xl w-ful gap-5">
              {/* <label>Categories by Dater</label> */}
              {currentCourses.map((course) => (
                <>
                  <div className="card-container min-w-72 max-sm:max-w-[17rem]">
                    <div
                      key={course.course_id}
                      className="bg-white card border  p-3.5  rounded-lg shadow-lg text-black transition-transform transform hover:scale-105"
                    >
                      <div className="w-full h-48 mb-2 overflow-hidden rounded-lg">
                        <img
                          src={course.pic}
                          alt={course.title}
                          onClick={() => handleCourseClick(course.course_id)}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      {/* content */}
                      <div>
                        <div className="max-w-64 sm:max-w-80 py-1 sm:py-2 ">
                          <button className="bg-[#2495D6] text-white py-0.5 sm:py-1 px-3 rounded-md">
                            {course.category || "Beginner"}
                          </button>
                          {/* <p className="text-[#2495D6] text-sm sm:text-base my-2 sm:my-2.5">
                {course.category || ""}
              </p> */}
                          <p
                            className="font-bold text-base sm:text-xl h-20 hover:text-red-700 hover:text-xl transform transition-all duration-300 ease-in-out"
                            onClick={() => handleCourseClick(course.course_id)}
                          >
                            {course.course_name || ""}
                          </p>
                          <p className="text-sm sm:text-sm font-semibold my-1 sm:my-2.5 h-10">
                            {course.description || ""}
                          </p>
                        </div>
                        <div className="flex bg-gray-900 text-white justify-between px-2 sm:px-4 py-1.5 rounded-md text-md">
                          <span>Instructor</span>
                          <span>{course.instructor || ""}</span>
                        </div>
                        <div className="flex justify-between font-semibold py-1">
                          <div>
                            <p className="mb-2 text-base sm:text-md">
                              Price Value
                            </p>
                            <div className="flex">
                              {Array.from({ length: course.rating }).map(
                                (_, index) => (
                                  <FaStar
                                    key={index}
                                    color="#ffa41c"
                                    className="text-lg sm:text-md"
                                  />
                                )
                              )}
                            </div>
                          </div>
                          <div className="text-center">
                            <p
                              className={` mb-2 text-base font-bold sm:text-md`}
                            >
                              {course.price ? `${course.price} Rs` : ""}
                            </p>
                            {user?.id === null ? (
                              <>
                                {" "}
                                <button
                                  disabled
                                  className={`text-white bg-red-300 text-sm sm:text-md py-1 px-3 rounded-xl`}
                                >
                                  Add to cart
                                </button>
                              </>
                            ) : (
                              <>
                                {" "}
                                <button
                                  onClick={() => addCart(course.course_id)}
                                  className={`text-white bg-red-700 text-sm sm:text-md py-1 px-3 rounded-xl`}
                                >
                                  Add to cart
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <div className="px-2 sm:px-4 py-1.5 text-gray-600">
              <p>Date: {course.date ? new Date(course.date).toLocaleDateString() : ""}</p>
            </div> */}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div>
          <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
            {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
            <div className="w-full max-w-screen-xl flex items-center justify-between border-t border-gray-200">
              <div
                onClick={previousPage}
                disabled={currentPage === 1}
                className={`flex items-center pt-3 ${
                  currentPage === 1
                    ? "text-gray-600"
                    : "text-blue-600 hover:text-indigo-700 cursor-pointer"
                } `}
              >
                <span>
                  <FaArrowLeftLong />
                </span>
                <p className="text-xl ml-3 font-medium leading-none ">
                  Previous
                </p>
              </div>
              <div className="sm:flex hidden">
                {Array.from({ length: totalPages }, (_, index) => (
                  <p
                    className={`text-xl font-medium leading-none cursor-pointer ${
                      currentPage === index + 1
                        ? "text-blue-600 border-blue-900"
                        : "text-gray-600"
                    } hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2`}
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </p>
                ))}
              </div>
              <div
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center pt-3 ${
                  currentPage === totalPages
                    ? "text-gray-600 "
                    : "text-blue-600 text-indigo-700 cursor-pointer"
                } `}
              >
                <p className="text-xl font-medium leading-none mr-3">Next</p>
                <span>
                  <FaArrowRightLong />{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CoursePage>
  );
};

export default CourseComponent;
const CoursePage = styled.div`
  .card-container {
    perspective: 1000px;
  }
  .course-container {
    height: 70vh;
  }
`;
