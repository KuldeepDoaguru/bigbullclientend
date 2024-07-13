import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slicer";
import axios from "axios";

const SideBar = ({ checked, setChecked }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [cartCourses, setCartCourses] = useState([]);
  const { refreshTable } = useSelector((state) => state.user);

  const handleClick = (e) => {
    if (setChecked) setChecked(!checked);
    console.log("heere");
  };

  const handleLogout = () => {
    dispatch(clearUser());
    if (setChecked) setChecked(false);
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
      <Contaienr>
        {checked && (
          <div className="backdrop fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[20]" />
        )}
        <div
          className={`wrapper ${
            checked ? "sidebar-active" : ""
          } z-30 pt-16 sm:p-0 transition-[right,clip-path] duration-700 top-0 ease-in-out fixed right-0 w-full md:w-[40vw] bg-white text-black h-screen sm:h-full `}
        >
          <div className="h-full flex justify-center items-center ">
            <ol className="list-none">
              <li
                onClick={handleClick}
                className="sm:my-10 xl:my-8 text-2xl my-9 sm:text-4xl md:text-[2vw] leading-7 lg:leading-5 xl:leading-6 font-medium text-black font-serif md:hover:scale-125 transition-all duration-300 ease-in-out"
              >
                <Link to="/">Home</Link>
              </li>
              <li
                onClick={handleClick}
                className="sm:my-10 xl:my-8 text-2xl my-9 sm:text-4xl md:text-[2vw] leading-7 lg:leading-5 xl:leading-6 font-medium text-black font-serif md:hover:scale-125 transition-all duration-300 ease-in-out"
              >
                <Link to="/courses">Courses</Link>
              </li>
              <li
                onClick={handleClick}
                className="sm:my-10 xl:my-8 text-2xl my-9 sm:text-4xl md:text-[2vw] leading-7 lg:leading-5 xl:leading-6 font-medium text-black font-serif md:hover:scale-125 transition-all duration-300 ease-in-out"
              >
                <Link to="/about">About</Link>
              </li>
              <li
                onClick={handleClick}
                className="sm:my-10 xl:my-8 text-2xl my-9 sm:text-4xl md:text-[2vw] leading-7 lg:leading-5 xl:leading-6 font-medium text-black font-serif md:hover:scale-125 transition-all duration-300 ease-in-out"
              >
                <Link to="/blogs">Blogs</Link>
              </li>
              <li
                onClick={handleClick}
                className="sm:my-10 xl:my-8 text-2xl my-9 sm:text-4xl md:text-[2vw] leading-7 lg:leading-5 xl:leading-6 font-medium text-black font-serif md:hover:scale-125 transition-all duration-300 ease-in-out"
              >
                <Link to="/ContactUs">Contact Us</Link>
              </li>
              {user?.id === null ? (
                <>
                  <li
                    onClick={handleClick}
                    className="sm:my-10 xl:my-8 text-2xl my-9 sm:text-4xl md:text-[2vw] leading-7 lg:leading-5 xl:leading-6 font-medium text-black font-serif md:hover:scale-125 transition-all duration-300 ease-in-out"
                  >
                    <Link to="/EnrollForm">Enroll Now</Link>
                  </li>
                  <li
                    onClick={handleClick}
                    className="sm:my-10 xl:my-8 text-2xl my-9 sm:text-4xl md:text-[2vw] leading-7 lg:leading-5 xl:leading-6 font-medium text-black font-serif md:hover:scale-125 transition-all duration-300 ease-in-out"
                  >
                    <Link to="/login">Log In</Link>
                  </li>
                </>
              ) : (
                <>
                  <li
                    onClick={handleClick}
                    className="sm:my-10 xl:my-8 text-2xl my-9 sm:text-4xl md:text-[2vw] leading-7 lg:leading-5 xl:leading-6 font-medium text-black font-serif md:hover:scale-125 transition-all duration-300 ease-in-out"
                  >
                    <Link to="/Cart">
                      <div className="flex align-items-center">
                        {" "}
                        <p>Cart </p>
                        <p className="text-3xl mx-1 bg-dark text-light py-2 px-3 w-min rounded-2xl shadow">
                          {cartCourses.length}
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li
                    onClick={handleClick}
                    className="sm:my-10 xl:my-8 text-2xl my-9 sm:text-4xl md:text-[2vw] leading-7 lg:leading-5 xl:leading-6 font-medium text-black font-serif md:hover:scale-125 transition-all duration-300 ease-in-out"
                  >
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="sm:my-10 xl:my-8 text-2xl my-9 sm:text-4xl md:text-[2vw] leading-7 lg:leading-5 xl:leading-6 font-medium text-black font-serif md:hover:scale-125 transition-all duration-300 ease-in-out"
                  >
                    <span>Log Out</span>
                  </li>
                </>
              )}
            </ol>
          </div>
        </div>
      </Contaienr>
    </>
  );
};

export default SideBar;

const Contaienr = styled.div`
  .wrapper {
    clip-path: inset(0 0 0 100%);
  }
  .sidebar-active {
    clip-path: inset(0 0 0 0);
  }
`;
