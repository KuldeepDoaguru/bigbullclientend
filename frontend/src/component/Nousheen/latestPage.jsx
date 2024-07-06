import React from 'react';
import styled from 'styled-components';

const LatestPage = () => {
  const aboutPost = [
    {
      title:"UI DESIGN",
      subtitle: "Card UI Examples And Best Practices For Product Owners ",
      description: "Now in 2022,more than 2.7 billion app users in the world prefer Andriod apps.We follow the google design principles and the design thinking process to create seamless user experiences and aesthetic interfaces for mobile apps for the andriod platform. We make android apps more relevant to users that users love to use and bring your business experience to the next level.",
      imgSrc: "https://fireartstudio.s3-accelerate.amazonaws.com/wp-content/uploads/2020/01/89995925f3fd323ce138bf8024cad9f1.png"
    },
    {
      title: "UI DESIGN",
      subtitle: "Card UI Examples And Best Practices For Product Owners",
      description: "Now in 2022,more than 2.7 billion app users in the world prefer Andriod apps.We follow the google design principles and the design thinking process to create seamless user experiences and aesthetic interfaces for mobile apps for the andriod platform. We make android apps more relevant to users that users love to use and bring your business experience to the next level.",
      imgSrc: "https://fireartstudio.s3-accelerate.amazonaws.com/wp-content/uploads/2020/01/89995925f3fd323ce138bf8024cad9f1.png"
    }
  ];

  return (
    <div className="container mx-auto p-[1rem] max-md:pb-0 max-w-screen-xl">
       <div key={0} className={`flex flex-col md:flex-row items-center sm:max-lg:gap-0 gap-10 my-10 sm:my-20 blog-left`}>
          <div className="md:ml-6 lg:mr-6 mt-4 md:mt-0">
            <h2 className=" text-md text-4xl text-red-700 font-bold">{aboutPost[0].title}</h2>
            <h2 className="leading-[2rem] sm:max-lg:leading-[2.5rem] text-xxl text-2xl font-bold sm:max-lg:my-1 my-3.5">{aboutPost[0].subtitle}</h2>
            <p className="mt-2 text-gray-600 text-1xl leading-relaxed sm:max-lg:leading-relaxed	">{aboutPost[0].description}</p>
          </div>  
          <img src={aboutPost[0].imgSrc} alt="Blog Post" className="w-full md:max-lg:w-1/3 lg:w-1/4 rounded-md" />
        </div>
       <div key={1} className={`flex flex-col md:flex-row items-center sm:max-lg:gap-0 gap-10 my-10 sm:my-20 blog-right`}>
          <div className="md:ml-6 lg:mr-6 mt-4 md:mt-0 md:order-2">
            <h2 className="text-md text-4xl	text-red-700 font-bold">{aboutPost[1].title}</h2>
            <h2 className="leading-[3.5rem] sm:max-lg:leading-[2.5rem] text-xxl text-2xl font-bold sm:max-lg:my-1 my-3.5">{aboutPost[1].subtitle}</h2>
            <p className="mt-2 text-gray-600 text-1xl sm:max-lg:leading-relaxed	">{aboutPost[1].description}</p>
          </div>  
          <img src={aboutPost[1].imgSrc} alt="Blog Post" className="w-full md:max-lg:w-1/3 lg:w-1/4 rounded-md md:order-1" />
        </div>
    </div>
  );
};

export default LatestPage;
const Container = styled.div`
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


`