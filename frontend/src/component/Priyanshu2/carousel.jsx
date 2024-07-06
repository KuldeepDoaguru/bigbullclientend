import React, { useState, useEffect } from 'react';
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

const testimonials = [
    {
        text: "Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application.",
        author: "Micheal Gough",
        position: "CEO at Google",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoq0f1tSU2b8opZaApGh5tl2FreFb52dyo6Q&s"
    },
    {
        text: "The design system provided by Flowbite is incredibly intuitive and user-friendly. It's streamlined our development process significantly.",
        author: "Sarah Connor",
        position: "CTO at Tech Solutions",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXHNYPDIj2y3liIr6SD2iqUMsCOXJwWVuqrz3ymt-vZwclsrOifw5MvRBy6nvT9L_fBrQ&usqp=CAU"
    },
    {
        text: "Using Flowbite has enhanced our UI/UX design standards. The component library is well-organized and highly customizable.",
        author: "John Doe",
        position: "Product Manager at Creative Designs",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXHNYPDIj2y3liIr6SD2iqUMsCOXJwWVuqrz3ymt-vZwclsrOifw5MvRBy6nvT9L_fBrQ&usqp=CAU"
    }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <>
        <section className="bg-white dark:bg-gray-900 py-8 relative flex items-center justify-center ">
            <div className="max-w-screen-xl px-4 mx-auto text-center lg:py-16 lg:px-6 ">
                <div className="max-w-screen-md mx-auto">
                    <div className="">
                        <button onClick={prevSlide} className="hidden lg:flex absolute left-24 top-full sm:top-1/2 transform -translate-y-1/2 bg-white text-gray-800 w-12 h-12 rounded-full focus:outline-none border-gray-200 border-2 flex justify-center items-center">
                            <LuMoveLeft />
                        </button>
                        <div className="py-8 px-4 bg-white dark:bg-gray-800 rounded-lg ">
                            <div className="flex flex-col items-center gap-4">
                                <svg className="h-12 mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
                                </svg>
                                <blockquote>
                                    <p className="h-60 overflow-hidden sm:h-auto text-xl sm:text-2xl font-medium text-gray-900 dark:text-black leading-relaxed ">{testimonials[currentIndex].text}</p>
                                </blockquote>
                                <div className="flex items-center justify-center sm:mt-6 space-x-3">
                                    <img className="w-16 h-16 rounded-full" src={testimonials[currentIndex].image} alt="profile" />
                                    <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700 ml-3">
                                        <div className="pr-3 font-medium text-gray-900 dark:text-white">{testimonials[currentIndex].author}</div>
                                        <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{testimonials[currentIndex].position}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={nextSlide} className=" hidden lg:flex bg-white text-gray-800 w-12 h-12 absolute right-24 bottom-0 sm:top-1/2 bottom-0 transform -translate-y-1/2 bg-gray-300 text-gray-800 p-2 rounded-full focus:outline-none flex justify-center items-center border-2">
                            <LuMoveRight/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default Carousel;
