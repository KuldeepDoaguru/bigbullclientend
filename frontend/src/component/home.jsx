import styled from "styled-components";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { SiOpenlayers } from "react-icons/si";
import logo from "../../public/logo/logo.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import tableFrame from "../Assets/tableFrame.png";
import mobileFrame from "../Assets/mobileFrame.png";
import bullImage from "../Assets/BULL.png";
import { useRef, useEffect, useState } from "react";
import Contact from "./Priyanshu2/contactUs";
import Carousel from "./Priyanshu2/carousel";
import SideBar from "./sidebar";
import LatestPage from "./Nousheen/latestPage";
import FeatureCardSection from "./featureCardSection.jsx";
import CoursesInLandingPage from "./courseInLandingPage.jsx";
import videoPoster from "./../Assets/videPoster.png";
import axios from "axios";
// import { useSelector } from "react-redux";

const createObserver = ({ ref, className }) => {
  const isMobile = window.innerWidth <= 530;
  if (isMobile) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
      } else {
        entry.target.classList.remove(className);
      }
    },
    { threshold: 0.1 }
  );

  if (ref?.current) {
    observer.observe(ref.current);
  }

  return observer;
};

const closeObserver = (ref, observer) => {
  const isMobile = window.innerWidth <= 530;
  if (isMobile) return;
  if (ref.current) {
    observer.unobserve(ref.current);
  }
};
const Home = () => {
  const [navbar, setNavbar] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);
  const sectionRef4 = useRef(null);
  const sectionRef5 = useRef(null);
  const sectionRef6 = useRef(null);
  const trainingGuideRef = useRef(null);

  const handleClickOutside = (event) => {
    let target = event.target;
    if (target.classList[0] == "backdrop") setIsChecked(false);
  };

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const getCourses = () => {
    try {
      axios.get("http://localhost:6060/api/v1/auth/");
    } catch (error) {
      console.log("Error getting courses ", error);
    }
    axios.get("");
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 530;

    const observer1 = createObserver(sectionRef1, "feature-course-page");
    const observer2 = createObserver(sectionRef2, "schematic");
    const observer3 = createObserver(sectionRef3, "course-animation");
    const observer4 = createObserver(sectionRef4, "header-static");
    const observer5 = createObserver(sectionRef5, "callToAction-animation");
    const observer6 = createObserver(sectionRef6, "latest-blog");

    window.addEventListener("scroll", changeBackground);
    window.addEventListener("mousedown", handleClickOutside);

    const card = document.querySelectorAll(".card");
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

    const scrollContainer = document.querySelector(
      ".subscription-card-scroll-wrapper"
    );

    setTimeout(() => {
      if (scrollContainer) {
        console.log("here");
        const scrollLeft =
          (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }, 0);

    return () => {
      if (!isMobile) {
        closeObserver(sectionRef1, observer1);
        closeObserver(sectionRef2, observer2);
        closeObserver(sectionRef3, observer3);
        closeObserver(sectionRef4, observer4);
        closeObserver(sectionRef5, observer5);
        closeObserver(sectionRef6, observer6);
      }

      window.removeEventListener("scroll", changeBackground);
      window.removeEventListener("mousedown", handleClickOutside);

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
      <LandingPage>
        <div className="landingPage-container overflow-hidden m-auto">
          {/* Hero Section */}
          <div>
            <div>
              <SideBar checked={isChecked} setChecked={setIsChecked} />
            </div>
            <header
              ref={sectionRef4}
              className={`${
                navbar ? "bg-white" : ""
              } z-50 w-full fixed py-1 sm:py-3 transition-all sm:ps-0 sm:px-16 sm:pr-0 duration-1000 ease-in `}
            >
              <nav className="flex justify-between w-full m-auto px-8 max-sm:ps-1.5">
                <div className="w-24 sm:w-32">
                  <img src={logo} alt="Logo" width="100%" />
                </div>
                <div onClick={() => setIsChecked(!isChecked)}>
                  {isChecked ? (
                    <RxCross2
                      className="menu-bar max-sm:text-[40px] text-5xl sm:text-7xl transform -translate-x-1/5 "
                      color={`${navbar || isChecked ? "black" : "white"}`}
                    />
                  ) : (
                    <IoMenu
                      className="menu-bar max-sm:text-[42px] text-4xl sm:text-6xl transform -translate-x-1/5 "
                      color={`${navbar || isChecked ? "black" : "white"}`}
                    />
                  )}
                </div>
              </nav>
            </header>
            {/* hero main part */}
            <div
              className={`hero ${
                !isChecked || "brightness-50"
              } transition-all sm:px-10 duration-1000 ease-in`}
            >
              <div className="h-screen">
                <video
                  src="https://res.cloudinary.com/dq5upuxm8/video/upload/v1719990295/bigbull/hero_vzz7nf.mp4"
                  poster={videoPoster}
                  autoPlay
                  loop
                  muted
                  className="h-full w-full object-cover brightness-50 absolute w-full left-1/2 transform -translate-x-1/2 -z-[999]	"
                ></video>
                <div
                  style={{ fontFamily: "Futura-bold" }}
                  className="absolute top-0 text-white h-full flex flex-col justify-center lg:w-4/5 px-2.5 sm:px-5  "
                >
                  <h1 className=" text-wrap	font-semibold leading-tight sm:max-lg:text-[10vw] text-[14vw] lg:text-7xl xl:text-8xl 2xl:text-8xl">
                    Master the Stock Market with Our Expert-Led Courses
                  </h1>
                  <p className="text-wrap text-5xl font-normal mt-10 text-[6vw] sm:text-[4vw] lg:max-xl:text-4xl xl:text-5xl">
                    Learn the secrets of stock market investing from industry
                    professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* feature Course Page */}
          <FeatureCardSection sectionRef={sectionRef1} />
          {/* schematic */}
          <div
            ref={sectionRef2}
            className="grid lg:grid-cols-2 sm:grid-cols-1 grid gap-10 px-4 sm:px-5 schematic-container mx-auto md:mb-28 lg:mb-44"
          >
            {/* left */}
            <div className="flex flex-col schematic-left flex-wrap">
              <div className="self-center">
                <h2
                  style={{ fontFamily: "Futura-bold" }}
                  className="text-5xl sm:text-7xl	mb-10 "
                >
                  Schematic
                </h2>
                <button className="text-xl border-2 rounded-3xl border-black py-2 px-7">
                  Brand Identity
                </button>
              </div>
              {/* content */}
              <div className="gap-y-14 mt-14 max-w-xl lg:self-end self-center">
                <div className="flex sm:gap-11 mb-12">
                  {/* numberr */}
                  <div className="text-5xl me-10 sm:m-0 sm:text-7xl">01</div>
                  {/* paragraph */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-semibold">
                      Background
                    </h3>
                    <p className="text-xl sm:text-2xl leading-10 mt-3">
                      Give a brief overview of your project here. You may talk
                      about the client brand and the main project challenge.
                    </p>
                  </div>
                </div>
                <div className="flex sm:gap-11">
                  {/* numberr */}
                  <div className="text-5xl me-10 sm:m-0 sm:text-7xl">02</div>
                  {/* paragraph */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-semibold">
                      Solution
                    </h3>
                    <p className="text-xl sm:text-2xl leading-10 mt-3">
                      Talk about your idea here. Expound a bit on how you solved
                      the challenge and how your work helped your..
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="max-w-4xl absolute bull-animation hidden">
                  <img src={bullImage} alt="" width="100%" />
                </div>
              </div>
            </div>
            {/* right */}
            <div className="content-center schematic-right relative test-tablet bg-no-repeat bg-contain bg-center">
              <div className="max-w-4xl table">
                <video
                  src="https://res.cloudinary.com/dq5upuxm8/video/upload/v1719989358/bigbull/videoInTabletForm_znfp7p.mp4"
                  autoPlay
                  loop
                  muted
                  className="h-full w-full object-cover"
                ></video>
              </div>
              <div className="mobile absolute bg-center bg-no-repeat bg-contain w-1/4 top-1/2 right-[7%] p-10">
                <video
                  src="https://res.cloudinary.com/dq5upuxm8/video/upload/v1719989359/bigbull/videoInMobileFrame_jf8k4x.mp4"
                  autoPlay
                  loop
                  muted
                  className="h-full w-full object-cover"
                ></video>
              </div>
            </div>
          </div>
          {/* Courses */}
          <CoursesInLandingPage sectionRef={sectionRef3} />
          {/* Subscription */}
          <div className="text-center bg-white subscription lg:mb-44">
            <div
              style={{ fontFamily: "Futura-bold" }}
              className="text-xl sm:text-5xl max-w-2xl my-6 m-auto leading-tight "
            >
              <h1 className="sm:mb-4 text-[9vw] sm:text-6xl mb-2">
                Choice your best{" "}
              </h1>
              <span className="font-bold text-3xl md:text-4xl me-2">
                <span className="sm:ps-4 pe-2">SUBSCRIPTION</span>PLAN
              </span>
            </div>
            <div className="subscription-card-scroll-wrapper w-full max-sm:overflow-scroll lg:overflow-hidden mt-24">
              <div
                style={{ maxWidth: "1920px" }}
                className="subscription-card-scroll-container sm:p-8 gap-y-5 sm:gap-y-2 md:gap-y-8 justify-center grid-cols-1 sm:grid-cols-1 flex sm:grid md:py-2.5 lg:grid-cols-3 md:max-lg:px-10 lg:max-xl:px-2.5 m-auto max-sm:overflow-scroll sm:overflow-hidden w-max lg:w-auto xl:px-[8%]"
              >
                {/* card */}
                {Array.from({ length: 3 }).map((_, index) => (
                  <Link
                    to="/SubscriptionPlans"
                    key={index}
                    className="lg:max-xl:flex"
                  >
                    <div className="card-container sm:m-0 px-6 sm:px-1 min-w-80 sm:min-72 max-w-80 lg:max-w-96 sm:m-auto mb-10 left-0">
                      <div className="rounded-3xl transform transition duration-100 hover:scale-110 group border-8 card overflow-hidden">
                        <div className="px-6 md:px-5 py-4 sm:px-2 sm:py-6 rounded-2xl md:group-hover:text-white transition-all duration-1000 ease-in md:group-hover:bg-red-700">
                          <h2 className="text-2xl py-1.5 px-1.5 sm:px-10 sm:py-3 bg-red-700 rounded-full font-semibold transition-all duration-1000 ease-in text-slate-50 md:group-hover:text-black md:group-hover:bg-white sm:max-xl:text-3xl">
                            Monthly
                          </h2>
                          <div className="flex flex-col">
                            <div className="font-semibold my-3 sm:my-7">
                              <p className="text-3xl sm:text-5xl">25 Rs</p>
                              <p className="text-2xl">Per Month</p>
                            </div>
                            <div className="self-center mb-4 sm:mb-5">
                              <ul className="text-lg sm:max-md:text-1xl md:text-2xl list-disc text-start">
                                <li>Data Analyst</li>
                                <li>Up to 5 Member</li>
                                <li>Get 5 GB Storage</li>
                                <li>Monthly Report</li>
                              </ul>
                            </div>
                            <button className="py-1.5 sm:py-2.5 bg-red-700 rounded-full transition-all duration-1000 ease group-hover:bg-white">
                              <span className="bg-transparent font-bold text-xl sm:text-2xl text-slate-50 transition-all duration-1000 ease md:group-hover:text-black">
                                Join
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Blogs */}
          <div
            ref={sectionRef6}
            className="flex justify-center flex-col pt-10 lg:p-0 sm:pt-24 lg:mb-44"
          >
            <h1
              style={{ fontFamily: "Futura-bold" }}
              className="text-5xl sm:text-8xl text-center font-semibold"
            >
              Latest Blogs
            </h1>
            <LatestPage />
            <div className="text-center text-3xl">
              <span>
                <Link
                  to={"/blogs"}
                  className="view-all hover:scale-90 transition-all duration-500 shadow-2xl
 inline-flex gap-4 mb-16 sm:mb-20 lg:mb-0 text-white bg-red-700 py-2 px-6 rounded-3xl text-2xl"
                >
                  <SiOpenlayers style={{ margin: "auto" }} />
                  View All
                </Link>
              </span>
            </div>
          </div>
          {/* Call to Actions */}
          <div
            ref={sectionRef5}
            className="sm:px-40 lg:px-20 sm:py-10 pb-0 call-to-action max-sm:text-center text-start p-6 "
          >
            <div className="mb-10 sm:mb-20 md:max-lg:px-10">
              <h1
                style={{ fontFamily: "Futura-bold" }}
                className="text-5xl sm:text-7xl mb-10 md:max-lg:text-6xl"
              >
                Call to Action
              </h1>
              <p className="text-xl sm:text-4xl md:max-lg:text-3xl md:max-lg:px-2">
                Join Now and Start Your Journey to Financial Mastery!
              </p>
            </div>
            <div>
              <h1
                style={{ fontFamily: "Futura-bold" }}
                className="text-5xl sm:text-7xl mb-3 sm:mb-10 md:max-lg:text-6xl md:max-lg:px-10 "
              >
                What we do
              </h1>
              <p className="text-xl sm:text-4xl md:max-lg:text-3xl md:max-lg:px-10">
                Elevate your brand and make your mark in history.
              </p>
            </div>
            <div
              ref={trainingGuideRef}
              className="training-guide training-guide-wrapper w-max sm:w-auto sm:max-lg:overflow-auto m-auto pt-20"
            >
              <div className="training-guide-container flex sm:max-md:block justify-center guideLeft mt-10 slider justify-center sm:max-lg:overflow-auto max-lg:pb-10 md:max-lg:pb-0  max-md:w-max m-auto max-sm:pt-10">
                <div className="slide-track grid 2xl:grid-cols-3 lg:grid-cols-3 gap-10 items-center sm:max-lg:overflow-auto relative max-lg:pb-10 max-md:w-max w-full ">
                  {Array.from({ length: 3 }).map(() => (
                    <>
                      <div className="rounded-3xl border-2 border-black flex w-80 lg:w-72 2xl:w-96 py-3 slide min-w-52 md:max-lg:m-auto">
                        <div className="flex items-center m-auto text-xl gap-3 sm:gap-5">
                          <button>Trading Guide</button>
                          <FaArrowRightLong />
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div className="training-guide-container flex sm:max-md:block justify-center guideRight lg:pt-5 slider justify-center sm:max-lg:overflow-auto max-lg:pb-10  max-md:w-max m-auto ">
                <div className="slide-track grid 2xl:grid-cols-3 lg:grid-cols-3 gap-10 items-center sm:max-lg:overflow-auto relative max-lg:pb-10 max-md:w-max w-full">
                  {Array.from({ length: 3 }).map(() => (
                    <>
                      <div className="rounded-3xl border-2 border-black flex w-80 lg:w-72 2xl:w-96 py-3 slide min-w-52 md:max-lg:m-auto">
                        <div className="flex items-center m-auto text-xl gap-3 sm:gap-5">
                          <button>Trading Guide</button>
                          <FaArrowRightLong />
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className=" sm:h-auto testimonial">
              <Carousel />
            </div>
            <Contact />
          </div>
        </div>
      </LandingPage>
    </>
  );
};
export default Home;
const LandingPage = styled.div`
  .landingPage-container,
  nav {
    max-width: 1920px;
  }

  /* Scematic section */
  .schematic .schematic-left {
    animation: 1.5s fadeleft;
  }

  @keyframes fadeleft {
    0% {
      transform: translateX(-40%);
      opacity: 0;
    }
    100% {
      transform: translateX(0%);
      opacity: 1;
    }
  }

  .schematic .schematic-right {
    animation: 1.5s faderight;
  }

  @keyframes faderight {
    0% {
      transform: translateX(40%);
      opacity: 0;
    }
    100% {
      transform: translateX(0%);
      opacity: 1;
    }
  }

  .schematic .bull-animation {
    display: block;
    animation: 1s bullAni ease-in;
    z-index: -20;
    top: -331px;
  }

  @keyframes bullAni {
    from {
      transform: translate(-20%, 50%);
    }
    to {
      transform: translate(0%);
    }
  }
  .test-tablet {
    background-image: url(${tableFrame});
  }
  .test-tablet > .table {
    padding: 6%;
  }

  .test-tablet .mobile {
    background-image: url(${mobileFrame});
  }

  /* Subscription Card Section */
  .subscription-card {
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  }

  /* Latest blog section Animation  */
  .latest-blog .blog-left {
    animation: 1.5s blogfromleft ease-in;
  }

  @keyframes blogfromleft {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0%);
    }
  }
  .latest-blog .blog-right {
    animation: 1.5s blogfromright ease-in;
  }
  @keyframes blogfromright {
    from {
      transform: translateX(50%);
    }
    to {
      transform: translateX(0%);
    }
  }

  /* Call to Action Section*/
  .callToAction-animation {
    animation: 2s callToActionRL;
  }

  @keyframes callToActionRL {
    from {
      transform: translateX(-20%);
    }
    to {
      transform: translateX(0%);
    }
  }
  .callToAction-animation .guideRight {
    animation: 2s callToActionRLguidRight;
  }
  @keyframes callToActionRLguidRight {
    from {
      transform: translateX(40%);
    }
    to {
      transform: translateX(0%);
    }
  }
  /* Card Corner Animation */
  .card-container {
    perspective: 1000px;
  }

  @media screen and (max-width: 530px) {
    .test-tablet .mobile {
      padding: 15px;
    }

    .slider {
      /* background: white; */
      width: 665px;
    }

    .slider::before,
    .slider::after {
      content: "";
      position: absolute;
      width: 600px;
      z-index: 2;
    }

    .slider::after {
      right: 0;
      top: 0;
      transform: rotateZ(180deg);
    }

    .slider::before {
      left: 0;
      top: 0;
    }

    .slider .slide-track {
      -webkit-animation: scroll 4s linear infinite;
      animation: scroll 4s linear infinite;
      display: flex;
      width: calc(300px * 3);
    }
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-300px * 1));
      }
    }

    .slide {
      margin: 0 25px;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 1024px) {
    .call-to-action {
      padding-left: 10px;
      padding-right: 10px;
    }
    /* .slide-track {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    } */
  }
`;
