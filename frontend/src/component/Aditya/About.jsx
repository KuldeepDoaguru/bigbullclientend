import WobbleCard from "../WobbleCard.jsx";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const About = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  const aboutPost = [
    {
      title: "Our Vision",
      subtitle: "Empowering Investors Globally",
      description:
        "Our vision is to create a world where every individual has the power to make informed investment decisions. We aim to provide accurate, timely, and comprehensive stock market data to investors around the globe, enabling them to achieve financial independence and success.",
      imgSrc:
        "https://static.vecteezy.com/system/resources/previews/016/558/427/non_2x/data-analysis-vision-for-stock-market-investment-predictions-businessman-looking-through-binoculars-to-see-stock-price-illustration-vector.jpg",
    },
    {
      title: "Our Goal",
      subtitle: "Achieving Excellence in Stock Market Analysis",
      description:
        "Our goal is to be the leading platform for stock market analysis and insights. We are dedicated to offering in-depth market analysis, expert advice, and innovative tools that help investors navigate the complexities of the stock market with confidence. Our commitment is to continuously improve and innovate, ensuring our users have the best resources at their fingertips.",
      imgSrc:
        "https://static.vecteezy.com/system/resources/previews/019/857/839/non_2x/business-vision-concepts-global-economic-recession-or-stagnation-stock-market-or-asset-slump-economic-growth-flat-illustrations-vector.jpg",
    },
  ];

  return (
    <AboutSection>
      <div className="container mx-auto relative lg:mt-5">
        {/* Bg Video */}
        {/* <video src={bgvdo} autoPlay muted loop className='bg-video absolute inset-0 w-full h-full object-cover'></video> */}
        <h1
          style={{ fontFamily: "Futura-bold" }}
          className={`text-black flex items-center justify-center text-5xl sm:text-8xl  py-4 transform transition-transform duration-1000 font-bold`}
        >
          About Us
        </h1>
        <div className="max-sm:mt-0 mt-8 rounded-lg relative z-0 ">
          <div className="container mx-auto max-w-screen-xl">
            <div
              key={0}
              className={`flex flex-col md:flex-row items-center gap-10 max-sm:mt-0 my-10 blog-left `}
            >
              <div className="md:ml-6 md:mr-6 mt-4 md:mt-0">
                <h2 className="text-md text-4xl text-red-700 font-bold max-sm:text-center">
                  {aboutPost[0].title}
                </h2>
                {/* <h2 className="text-xxl text-2xl font-bold my-3">{aboutPost[0].subtitle}</h2> */}
                <p className="mt-2 text-gray-600 text-1xl leading-loose ">
                  {aboutPost[0].description}
                </p>
              </div>
              <img
                src={aboutPost[0].imgSrc}
                alt="Blog Post"
                className="w-full md:w-1/4 rounded-md"
              />
            </div>
            <div
              key={1}
              className={`flex flex-col md:flex-row items-center gap-10 my-10 sm:my-20 blog-right`}
            >
              <div className="md:ml-6 md:mr-6 mt-4 md:mt-0 md:order-2">
                <h2 className="text-md text-4xl text-red-700 font-bold max-sm:text-center">
                  {aboutPost[1].title}
                </h2>
                <p className="mt-2 text-gray-600 text-1xl leading-loose ">
                  {aboutPost[1].description}
                </p>
              </div>
              <img
                src={aboutPost[1].imgSrc}
                alt="Blog Post"
                className="w-full md:w-1/4 rounded-md md:order-1"
              />
            </div>
          </div>
          <h2 className="text-5xl font-bold mb-16 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center items-center">
            {Array.from({ length: 3 }).map(() => (
              <>
                <WobbleCard className="team-card bg-white rounded-lg shadow-lg max-w-sm ">
                  <img
                    className="w-28 h-28 rounded-full mx-auto"
                    src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
                    alt="Joshua Woods"
                  />
                  <div className="text-center mt-4 person-info">
                    <h2 className="text-xl font-medium mb-3">Joshua Woods</h2>
                    <p className="text-gray-500 border-1 border-slate-400  p-2 max-w-48 desgination">
                      Senior Designer
                    </p>
                    <p className="text-gray-600 mt-2 mt-3 m-auto desc">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="flex justify-center mt-2 gap-4">
                      <div className="social-media-icon">
                        <Link className="text-gray-500 mx-2 text-3xl">
                          <FaFacebook />
                        </Link>
                      </div>
                      <div>
                        <Link className="text-gray-500 mx-2 text-3xl">
                          <FaLinkedin />
                        </Link>
                      </div>
                      <div>
                        <Link className="text-gray-500 mx-2 text-3xl">
                          <FaTwitter />
                        </Link>
                      </div>
                    </div>
                  </div>
                </WobbleCard>
              </>
            ))}
          </div>
        </div>
      </div>
    </AboutSection>
  );
};

export default About;
const AboutSection = styled.div`
  /* .social-media-icon a {
    border: 1px solid red;
    border-radius: 100%;
 } */

  .desc {
    width: 100%;
    max-width: 22rem;
    min-width: 18rem;
  }
  .desgination {
    margin: 25px auto;
  }
`;
