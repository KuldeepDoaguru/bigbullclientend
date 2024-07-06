import styled from "styled-components";
import courseThumbain from "../Assets/courseThumbnail.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { SiOpenlayers } from "react-icons/si";
import { useEffect, useRef } from "react";

const courseCardData = [
  {
    id: 1,
    imageUrl: courseThumbain,
    title: "Angular - The Complete Guide (2020 Edition)",
    description:
      "From Setup to Deployment, this course covers everything! You'll learn it all.",
    category: "Programming Language",
    level: "Beginner",
    instructor: "Mr.Ramesh",
    price: 599,
    currency: "Rs.",
    rating: 3,
    cardPosition: "left",
  },
  {
    id: 1,
    imageUrl: courseThumbain,
    title: "Angular - The Complete Guide (2020 Edition)",
    description:
      "From Setup to Deployment, this course covers everything! You'll learn it all.",
    category: "Programming Language",
    level: "Beginner",
    instructor: "Mr. sumesh",
    price: 599,
    currency: "Rs.",
    rating: 3,
    cardPosition: "center",
  },
  {
    id: 1,
    imageUrl: courseThumbain,
    title: "Angular - The Complete Guide (2020 Edition)",
    description:
      "From Setup to Deployment, this course covers everything! You'll learn it all.",
    category: "Programming Language",
    level: "Beginner",
    instructor: "Mr.rakesh",
    price: 599,
    currency: "Rs.",
    rating: 3,
    cardPosition: "right",
  },
];

const CoursesInLandingPage = ({ sectionRef }) => {
  // console.log('render');
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const handleCartClick = () => {
    navigate("/cart");
  };

  useEffect(() => {
    const card = document.querySelectorAll(".card-stretched");
    card.forEach((eachCard) => {
      if (window.innerWidth <= 530) return;
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

    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;

      // Ensure the container is fully rendered before calculating the scroll position
      setTimeout(() => {
        const scrollLeft =
          (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;

        // Scroll the container to the center position
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth", // Optional: adds a smooth scrolling effect
        });
      }, 0);
    }
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
    <>
      <Container>
        <div className="my-10 pb-10 max-sm:mb-0 sm:mb-10 lg:mb-44 lg:p-0">
          <h1
            style={{ fontFamily: "Futura-bold" }}
            className="text-5xl sm:text-8xl text-center sm:my-10 md:pb-10 lg:pb-20 font-semibold"
          >
            Course
          </h1>
          {/* container */}
          <div ref={scrollRef} className="makeScrollable">
            <div
              ref={sectionRef}
              className="course-card-scroll md:p-8 lg:p-0 py-10 gap-2.5 lg:max-xl:gap-0 sm:grid flex grid-cols-1 sm:max-lg:gap-8 lg:grid-cols-3 xl:flex flex-wrap justify-center m-auto xl:max-w-screen-xl px-4"
            >
              {/* card */}
              {courseCardData.map((card) => (
                <>
                  <div className="course-card-container mb-10 sm:m-0 sm:max-w-[640px] md:max-w-screen lg:max-xl:max-w-[318px] sm:m-auto ">
                    <div
                      className={`course-card card-stretched course-card-${card.cardPosition} rounded-lg p-2 sm:p-4 pt-2 `}
                    >
                      {/* image */}
                      <div className="h-52 w-64 sm:w-72 md:w-80 lg:max-xl:w-[19rem]">
                        <img
                          src={card.imageUrl}
                          alt=""
                          className="h-full object-cover border-8  border-white rounded-2xl "
                        />
                      </div>
                      {/* content */}
                      <div className="">
                        <div className=" max-w-64 sm:max-w-80 py-1 sm:py-2 px-2">
                          <button className="bg-[#2495D6] text-white py-0.5 sm:py-1 px-3 rounded-md">
                            {card.level}
                          </button>
                          {/* <p className="text-[#2495D6] text-sm sm:text-base my-2 sm:my-2.5 ">
                            {card.category}
                          </p> */}
                          <p className="font-bold text-base sm:text-xl font-bold">
                            {card.title}
                          </p>
                          <p className="text-sm sm:text-sm font-semibold my-1 sm:my-2.5 ">
                            {card.description}
                          </p>
                        </div>

                        <div className="flex bg-gray-900 text-white justify-between px-2 sm:px-4 py-1.5 rounded-md  text-ms">
                          <span>Instructor</span>
                          <span>{card.instructor}</span>
                        </div>
                        <div className="p-4 flex justify-between font-semibold py-1 px-2">
                          <div>
                            <p className="mb-2 text-base sm:text-lg">
                              Price Value
                            </p>
                            <div className="flex">
                              {Array.from({ length: card.rating }).map(
                                (_, index) => (
                                  <FaStar
                                    key={index}
                                    color="#ffa41c"
                                    className=" text-lg sm:text-xl"
                                  />
                                )
                              )}
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="mb-2 text-base font-bold sm:text-xl">
                              {card.price} Rs
                            </p>
                            <button
                              onClick={handleCartClick}
                              className="text-white bg-red-700 text-sm sm:text-base py-1 px-3 rounded-xl "
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="text-center text-3xl sm:mt-6 md:mt-20">
            <span>
              <Link
                to={"/courses"}
                className=" view-all hover:scale-90 transition-all duration-500 shadow-2xl
 inline-flex gap-4 mb-16 sm:mb-0 text-white bg-red-700 hover:bg-red-600 py-2 px-6 rounded-3xl text-2xl"
              >
                <SiOpenlayers style={{ margin: "auto" }} />
                View All
              </Link>
            </span>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CoursesInLandingPage;
const Container = styled.div`
  .course-card {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .course-animation .course-card-center {
    animation: 1s slideCenter;
  }
  .course-animation .course-card-left {
    animation: 1s slideLeft;
  }
  .course-animation .course-card-right {
    animation: 1s slideRight;
  }
  .course-card-container {
    perspective: 1000px;
  }

  .card-stretched {
    overflow: hidden;
    transition: transform 0.1s ease;
    /* box-shadow: rgb(253, 9, 9) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px; */
  }

  .course-animation .course-card-center {
    animation: 1s slideCenter;
  }
  .course-animation .course-card-left {
    animation: 1s slideLeft;
  }
  .course-animation .course-card-right {
    animation: 1s slideRight;
  }

  @keyframes slideCenter {
    from {
      transform: translateY(20%);
    }
    to {
      transform: translateY(0%);
    }
  }
  @keyframes slideLeft {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0%);
    }
  }
  @keyframes slideRight {
    from {
      transform: translateX(50%);
    }
    to {
      transform: translateX(0%);
    }
  }

  @media screen and (max-width: 600px) {
    .makeScrollable {
      overflow: scroll;
      /* transform: translateX(0); */
    }
    .course-card-scroll {
      /* width: max-content; */
      overflow: scroll;
    }
    .course-card-container {
      margin: 0 50px;
    }
  }
`;
