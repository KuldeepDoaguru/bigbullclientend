import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./../../public/logo/logo.png";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slicer"; // Adjust the import path if necessary
import { RxCross2 } from "react-icons/rx";
import { FaShoppingCart } from "react-icons/fa";
import { HiMiniUserCircle } from "react-icons/hi2";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const [userData, setUserData] = useState([]);
  const [cartCourses, setCartCourses] = useState([]);
  const { refreshTable } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
    setIsChecked(false);
    navigate("/login");
  };

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://test.bigbulls.co.in/api/v1/auth/getUserViaId/${user.id}`
      );
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setIsChecked(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRightClick = (e) => {
    e.preventDefault();
  };

  const getCarts = async () => {
    try {
      const { data } = await axios.get(
        `https://test.bigbulls.co.in/api/v1/auth/getCartItems/${user.id}`
      );
      setCartCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarts();
  }, [refreshTable]);

  return (
    <>
      <nav
        onContextMenu={handleRightClick}
        style={{ maxWidth: "1728px" }}
        className={`border-gray-200 dark:bg-gray-900 w-full bg-white pt-3 max-sm:mb-10 mb-20 mx-auto md:px-2 lg:px-5`}
      >
        <div className={`flex flex-wrap items-center justify-between mx-auto `}>
          <Link
            to={"/"}
            className={` flex items-center space-x-3 rtl:space-x-reverse sm:max-w-32 w-24 z-50`}
          >
            <img src={logo} className="w-full" alt="Logo" />
          </Link>

          <div className="max-sm:block max-md:hidden md:hidden flex items-center">
            <div className="z-10">
              <SideBar checked={isChecked} setChecked={setIsChecked} />
            </div>
            <div className="pr-14" onClick={() => setIsChecked(!isChecked)}>
              {isChecked ? (
                <RxCross2
                  className=" max-sm:absolute max-sm:-mt-5 menu-bar z-50 text-4xl sm:text-6xl transform -translate-x-1/5"
                  color={`black`}
                />
              ) : (
                <IoMenu
                  className=" max-sm:absolute max-sm:-mt-5 menu-bar z-50 text-4xl sm:text-6xl transform -translate-x-1/5"
                  color={`black`}
                />
              )}
            </div>
          </div>

          <div
            className={`items-center justify-between md:flex md:w-auto max-sm:hidden `}
            id="navbar-cta"
          >
            <ul className="flex font-medium md:p-0 rounded-lg bg-transparent md:-space-x-2 lg:space-x-1 xl:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to={"/"}
                  className={`block ${
                    location.pathname === "/"
                      ? "underline underline-offset-8"
                      : ""
                  } hover:underline hover:underline-offset-8  md:max-lg:text-lg sm:py-2 md:px-3 sm:px-1 text-xl hover:underline hover:underline-offset-8 text-black rounded md:bg-transparent transition duration-300 ease-in-out transform hover:scale-105`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/courses"}
                  className={`block ${
                    location.pathname === "/courses"
                      ? "underline underline-offset-8"
                      : ""
                  } hover:underline hover:underline-offset-8  md:max-lg:text-lg sm:py-2 md:px-3 sm:px-1 text-xl text-black text-gray-900 rounded    md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white transition duration-300 ease-in-out transform hover:scale-105`}
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className={`block ${
                    location.pathname === "/about"
                      ? "underline underline-offset-8"
                      : ""
                  } hover:underline hover:underline-offset-8  md:max-lg:text-lg sm:py-2 md:px-3 sm:px-1 text-xl text-black md:text-gray-900 rounded    md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white transition duration-300 ease-in-out transform hover:scale-105`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/blogs"}
                  className={`block ${
                    location.pathname === "/blogs"
                      ? "underline underline-offset-8"
                      : ""
                  } hover:underline hover:underline-offset-8  md:max-lg:text-lg sm:py-2 md:px-3 sm:px-1 text-xl text-black text-gray-900 rounded    md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white transition duration-300 ease-in-out transform hover:scale-105`}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to={"/ContactUs"}
                  className={`block ${
                    location.pathname === "/ContactUs"
                      ? "underline underline-offset-8"
                      : ""
                  } hover:underline hover:underline-offset-8  md:max-lg:text-lg sm:py-2 md:px-3 sm:px-1 text-xl text-black text-gray-900 rounded    md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white transition duration-300 ease-in-out transform hover:scale-105`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            {user?.id === null ? (
              <>
                <Link
                  to={"/EnrollForm"}
                  className={`sm:max-lg:text-lg text-white ${
                    location.pathname === "/EnrollForm" ? "bg-red-900" : ""
                  } bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl sm:max-lg:py-1 lg:px-4 sm:px-2 sm:py-2 lg:py-2 text-center`}
                >
                  Enroll Now
                </Link>
                <Link
                  to={"/login"}
                  className={`${
                    location.pathname === "/login"
                      ? "underline underline-offset-8"
                      : ""
                  } hover:underline hover:underline-offset-8  sm:max-lg:text-lg block sm:py-2 md:px-3 sm:px-1 text-xl text-black text-gray-900 rounded transition duration-300 ease-in-out transform hover:scale-105`}
                >
                  Log In
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/cart"}
                  className={`text-4xl md:max-lg:text-2xl focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl md:max-lg:py-1 sm:py-2 lg:py-2 text-center`}
                >
                  <div className="relative flex items-center">
                    <FaShoppingCart
                      className={`${
                        location.pathname === "/cart"
                          ? "text-red-700 text-3xl"
                          : ""
                      } hover:text-red-700 hover:text-3xl transform transition-all duration-300 ease-in-out`}
                    />
                    <p className="text-xs absolute top-[-12px] left-4 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCourses.length}
                    </p>
                  </div>
                </Link>
                <Link
                  to={"/profile"}
                  className="hover:underline hover:underline-offset-8  md:max-lg:text-3xl block sm:py-2 sm:px-1 text-2xl text-black text-gray-900 rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                  {userData ? (
                    <>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={userData[0]?.profile_picture}
                        alt=""
                      />
                    </>
                  ) : (
                    <HiMiniUserCircle
                      className={`${
                        location.pathname === "/profile"
                          ? "text-red-700 text-3xl"
                          : ""
                      }  hover:text-red-700 hover:text-3xl transform transition-all duration-300 ease-in-out`}
                    />
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:underline hover:underline-offset-8  md:max-lg:text-lg block sm:py-2 md:px-3 sm:px-1 text-xl text-black text-gray-900 rounded   dark:hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
