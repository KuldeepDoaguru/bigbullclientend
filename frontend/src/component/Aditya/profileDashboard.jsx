import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Babbar from "../../Assets/Astha/babbar.jpg"

const ProfileComponent = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [userData, setUserData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [allCourse, setAllCourse] = useState([]);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:6060/api/v1/auth/getUserViaId/${user.id}`
      );
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const courseDetailsById = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:6060/api/v1/auth/getBoughtCourseViaId/${user.id}`
      );
      setCourseData(data);
    } catch (error) {
      console.log(error);
    }
  };

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
    getUserDetails();
    courseDetailsById();
    getCourses();
  }, []);

  const courseFilter = courseData
    ?.filter((item) => item.course_name)
    .map((item) => item.course_name);

  console.log(courseFilter);

  const filterEachCourse = courseFilter
    ?.filter((item) => item)
    ?.flatMap((item) => item.split(", "));

  console.log(filterEachCourse);
  console.log(allCourse);
  const fetchedCourseFil = allCourse?.filter((item) =>
    filterEachCourse?.some((crse) => crse === item.course_name)
  );

  console.log(fetchedCourseFil);

  return (
    <div className="bg-gradient-to-br from-red-700 via-red-800 to-black text-white min-h-screen">
      <div className="container mx-auto py-6 md:px-4 md:max-xl:px-1">
        <div className="md:flex no-wrap md:-mx-2">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white max-md:p-4 md:p-1 lg:p-4 rounded-lg shadow-lg border-t-4 border-red-900">
              <div className="flex flex-col items-center justify-center mb-6">
                <img
                  className="rounded-full h-32 w-32 border-4 border-red-900 object-cover"
                  src="https://i.ytimg.com/vi/W43v7ePnjAA/maxresdefault.jpg"
                  alt="Profile Image"
                />

                <div className="text-center mt-2">
                  <h1 className="text-gray-900 font-bold text-xl leading-8">
                    {userData[0]?.firstname} {userData[0]?.lastname}
                  </h1>
                  <p className="text-gray-600 font-semibold"></p>
                  <p className="text-sm text-gray-500 leading-6">
                    {userData[0]?.user_bio}
                  </p>
                </div>
              </div>

              <ul className="text-sm text-gray-600 hover:text-gray-700 py-2 px-3 mt-3 divide-y">
                <li className="flex items-center py-1">
                  <span className="font-semibold">City:</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white">
                      {userData[0]?.city}
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-1">
                  <span className="font-semibold">Member since:</span>
                  <span className="ml-auto">
                    {moment(userData[0]?.time).format("DD-MM-YYYY")}
                  </span>
                </li>
              </ul>

              <div className="text-center mt-4">
                <Link
                  to={"/editProfile"}
                  className="block bg-gray-100 hover:bg-gray-200 text-red-900 py-2 px-4 rounded-lg font-semibold text-sm focus:outline-none focus:shadow-outline"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full md:w-9/12 md:mx-2 max-sm:mt-8">
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
              <div className="flex items-center mb-4">
                <span className="bg-red-900 text-white py-1 px-3 rounded-lg text-sm font-semibold">
                  Bought Courses
                </span>
              </div>
              <div className="max-h-60 overflow-auto">
                <ul className="space-y-3">
                  {fetchedCourseFil?.map((course) => (
                    <>
                      <li className="grid grid-cols-4 gap-4 py-2 mr-2 border-b border-gray-200">
                        <div className="text-lg font-semibold text-gray-900 col-span-3 hover:text-red-700 hover:text-xl transform transition-all duration-300 ease-in-out">
                          <Link to={`/Cdetail/${course.course_id}`}>
                            {course.course_name}
                          </Link>
                          {course.course_name}
                        </div>
                        <div className="text-sm col-span-1 text-gray-600">
                          Category: {course.category}
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center mb-4">
                <span className="bg-red-900 text-white py-1 px-3 rounded-lg text-sm font-semibold">
                  User Information
                </span>
              </div>

              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">First Name:</span>{" "}
                    {userData[0]?.firstname}
                  </div>
                  <div>
                    <span className="font-semibold">Last Name:</span>{" "}
                    {userData[0]?.lastname}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    <a href={`mailto:${user.email}`} className="text-blue-800">
                      {user.email}
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold">Phone Number:</span>{" "}
                    {userData[0]?.phone}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold">Address:</span>{" "}
                    {userData[0]?.address}
                  </div>
                </div>
              </div>

              <div className="text-center mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
