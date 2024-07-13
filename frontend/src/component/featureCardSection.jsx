import styled from "styled-components";
import courseFeatureBackground from "../Assets/courseFeatureBackground.jpg";
import blanckBackground from "../Assets/blanckBackground.png";
import { useEffect, useRef, useState } from "react";
// import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from "cogo-toast";
import { toggleTableRefresh } from "../redux/slicer";
import { Link } from "react-router-dom";

const FeatureCardSection = () => {
  const [allCourse, setAllCourse] = useState([]);
  const scrollRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      setTimeout(() => {
        const scrollLeft =
          (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }, 0);
    }
  }, []);

  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        "https://test.bigbulls.co.in/api/v1/auth/getAllCourses"
      );
      setAllCourse(data.result);
    } catch (error) {
      console.log("Error getting courses ", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const addCart = async (id) => {
    try {
      const res = await axios.post(
        `https://test.bigbulls.co.in/api/v1/auth/add-to-cart/${user.id}/${id}`
      );
      cogoToast.success("Course added to cart successfully");
      dispatch(toggleTableRefresh());
    } catch (error) {
      console.log(error);
      cogoToast.error(error?.response.data?.message);
    }
  };

  return (
    <>
      <Container>
        <div className="mb-10 sm:mb-44 md:max-lg:mb-28 ">
          <div className="my-10">
            <h1
              style={{ fontFamily: "Alegreya" }}
              className="text-5xl sm:text-8xl text-center sm:my-6 font-semibold sm:pb-20"
            >
              Our Feature Course
            </h1>
            {/* container */}
            <div
              ref={scrollRef}
              className="makeScrollable lg:flex justify-center"
            >
              <div className="feature-container gap-x-20 sm:gap-16 md:gap-2 grow flex justify-center 2xl:max-w-screen-xl flex-wrap xl:grid-cols-3 md:max-lg:grid md:grid-cols-1 lg:grid-cols-3 justify-items-center items-center md:w-full md:gap-y-8 2xl:grid 2xl:grid-cols-3 ">
                {allCourse.slice(0, 3).map((card) => (
                  <>
                    <CardContainer className="h-[600px] sm:w-[640px] px-4 sm:px-6">
                      <CardBody className="bg-neutral-100 relative lg:w-11/12 lg:max-w-[23rem] md:w-10/12 w-[90vw] xl:max-w-[25rem] h-100 rounded-xl px-[4vw] sm:px-6 py-[2vw] sm:py-10 ">
                        <CardItem
                          translateZ={50}
                          className="text-2xl font-bold text-neutral-600 text-black h-20 hover:text-red-900"
                        >
                          {/* Make things float in air */}
                          <Link to={`/Cdetail/${card.course_id}`}>
                            {" "}
                            <h2 className="hover:text-red-900">
                              {card.course_name}
                            </h2>
                          </Link>
                        </CardItem>
                        <CardItem
                          translateZ={150}
                          className="w-100 mt-4 sm:my-10"
                        >
                          <img
                            src="https://www.ringcentral.com/gb/en/blog/wp-content/uploads/2021/05/happy-manager-leads-a-meeting-in-the-office-640x427.jpg"
                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl "
                            alt="thumbnail"
                          />
                        </CardItem>
                        <div className="flex justify-between items-center mt-5">
                          <CardItem
                            translateZ={20}
                            to="https://twitter.com/mannupaaji"
                            target="__blank"
                            className="px-4 rounded-xl text-xl h-16 font-semibold text-black"
                          >
                            {card.description}
                          </CardItem>
                        </div>
                        <div className="flex justify-between items-center mt-5">
                          <CardItem
                            translateZ={20}
                            to="https://twitter.com/mannupaaji"
                            target="__blank"
                            className="px-2 rounded-xl text-lg font-semibold text-black"
                          >
                            <p className="text-red-700">
                              Price - {card.price} INR
                            </p>
                          </CardItem>
                          <CardItem
                            translateZ={20}
                            to="https://twitter.com/mannupaaji"
                            target="__blank"
                            className="px-4 rounded-xl text-xl font-semibold text-black"
                          >
                            {user?.id === null ? (
                              <>
                                {" "}
                                <button
                                  disabled
                                  className="text-white bg-red-300 text-sm sm:text-base py-1 px-3 rounded-xl "
                                >
                                  Add to cart
                                </button>
                              </>
                            ) : (
                              <>
                                {" "}
                                <button
                                  onClick={() => addCart(card.course_id)}
                                  className="text-white bg-red-700 text-sm sm:text-base py-1 px-3 rounded-xl "
                                >
                                  Add to cart
                                </button>
                              </>
                            )}
                          </CardItem>
                        </div>
                      </CardBody>
                    </CardContainer>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default FeatureCardSection;

const Container = styled.div`
  .feature-course-page {
    background-image: url(${courseFeatureBackground}); /* Placeholder URL */
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    flex-wrap: wrap;
  }
  .feature-course-page > div {
    background-image: url(${blanckBackground}); /* Placeholder URL */
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 1000px;
    animation: slideGradient 15s forwards;
  }
  @keyframes slideGradient {
    0% {
      background-position: 0px;
    }
    100% {
      background-position: 15000px;
    }
  }

  .feature-container > div > div:nth-child(1),
  .course-page {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .feature-container .course-feature {
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 0px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 2px;
    animation: 1.5s fadeInUp;
    /* width: 24rem; */
  }
  @keyframes fadeInUp {
    0% {
      transform: translateY(40%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }
  .course-feature:hover {
    scale: 1.01;
    box-shadow: rgba(0, 0, 0, 0.12) 8px 9px 14px,
      rgba(0, 0, 0, 0.24) 0px 7px 9px;
    transition: all 0.6s;
  }

  @media screen and (max-width: 855px) {
    .feature-container .course-feature {
      /* width: 20rem; */
      gap: 0;
    }
  }
  @media screen and (max-width: 600px) {
    .makeScrollable {
      overflow: scroll;
      /* transform: translateX(0); */
    }
    .feature-container .course-feature {
      width: 18rem;
      gap: 0;
    }
    .feature-course-page {
      background-image: none;
    }
    .feature-container .course-feature > div:nth-child(1) {
      height: 18rem;
    }
    .feature-container {
      /* flex-wrap: nowrap; */
      width: max-content;
      overflow: scroll;
    }
    .course-feature {
      margin: 0 50px;
    }
  }
`;
