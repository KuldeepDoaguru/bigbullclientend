import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Blogs = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  const initialPosts = [
    {
      id: 1,
      title: "First Post",
      subtitle: "Understanding Stock Markets",
      date: "2024-06-06",
      time: "10:00 AM",
      content:
        "Learn about the intricacies of stock markets, including trading strategies, market trends, and investment opportunities. including trading strategies, market trends, and investment opportunities.  ",
      image:
        "https://media5.newsnationtv.com/images/2023/06/27/untitled90867-954.jpg",
      liked: false,
    },
    {
      id: 2,
      title: "Second Post",
      subtitle: "Stock Market Basics",
      date: "2024-06-07",
      time: "11:00 AM",
      content:
        "Discover the fundamentals of the stock market, such as types of stocks, risk management, and economic indicators. such as types of stocks, risk management, and economic indicators.",
      image:
        "https://www.gettogetherfinance.com/blog/wp-content/uploads/2023/12/Learn-about-the-stock-market-1024x597.jpg",
      liked: false,
    },
    {
      id: 3,
      title: "Third Post",
      subtitle: "Investment Strategies",
      date: "2024-06-08",
      time: "12:00 PM",
      content:
        "Explore effective investment strategies in the stock market, including long-term investing, day trading, and diversification. including long-term investing, day trading, and diversification",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRvyoR2olim09uWzPOnvxtdC-o3jMnZmvBna4AbZ92PZtMYisifA36-y4DCLT0PSWQ9xM&usqp=CAU",
      liked: false,
    },
    {
      id: 4,
      title: "Fourth Post",
      subtitle: "Market Analysis",
      date: "2024-06-09",
      time: "01:00 PM",
      content:
        "Stay informed with in-depth market analysis covering sectors, company performance, and global economic influences. covering sectors, company performance, and global economic influences.",
      image:
        "https://www.acquisition-international.com/wp-content/uploads/2020/12/marketing.jpg",
      liked: false,
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const navigate = useNavigate();

  const handleLikeClick = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const handlePost = (id) => {
    navigate(`/singlepost/${id}`);
  };

  return (
    <BlogsSection>
      <div className="container mx-auto p-4 max-w-screen-xl">
        <h1
          style={{ fontFamily: "Futura-bold" }}
          className="text-black flex items-center justify-center font-semibold text-5xl sm:text-7xl py-4 "
        >
          Blogs
        </h1>
        <div className="posts mt-8 space-y-8">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`flex flex-col md:flex-row grid md:grid-cols-1 lg:grid-cols-3 items-center gap-10 my-20 ${
                index % 2 === 0 ? "blog-left" : "blog-right "
              }`}
              onClick={() => handlePost(post.id)} // Pass post id to handlePost
            >
              {index % 2 === 0 ? (
                <>
                  <div className="max-lg:wrap-reverse max-lg:order-1 lg:ml-6 lg:mr-6 mt-4 lg:mt-0 md:col-span-2 max-w-3xl  sm:m-auto">
                    <h2 className="text-md text-5xl text-red-700 font-bold">
                      {post.title}
                    </h2>
                    <h2 className="text-xxl text-3xl font-bold my-3">
                      {post.subtitle}
                    </h2>
                    <p className="my-3 text-xl tracking-wide text-gray-600 text-1xl leading-relaxed ">
                      {post.content}
                    </p>
                    <p className="text-lg text-gray-600 font-bold">
                      {post.date} at {post.time}
                    </p>
                    <div
                      className="absolute bottom-10 right-10 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from propagating to parent
                        // handleLikeClick(post.id);
                      }}
                    ></div>
                  </div>
                  <div className="rounded-md cursor-pointer lg:justify-center flex items-center h-full">
                    <img
                      src={post.image}
                      alt="Blog Post"
                      className="lg:w-full h-80 lg:h-52"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from propagating to parent
                        // handlePost(post.id);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="h-full rounded-md cursor-pointer flex items-center lg:justify-center">
                    <img
                      src={post.image}
                      alt="Blog Post"
                      className="lg:w-full h-80 lg:h-52"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from propagating to parent
                        handlePost(post.id);
                      }}
                    />
                  </div>
                  <div className="lg:ml-6 lg:mr-6 mt-4 lg:mt-0 md:col-span-2 max-w-3xl  sm:m-auto">
                    <h2 className="text-md text-5xl text-red-700 font-bold">
                      {post.title}
                    </h2>
                    <h2 className="text-xxl text-3xl font-bold my-3">
                      {post.subtitle}
                    </h2>
                    <p className="my-3 text-gray-600 text-1xl leading-relaxed text-xl tracking-wide">
                      {post.content}
                    </p>
                    <p className="text-lg text-gray-600 font-bold">
                      {post.date} at {post.time}
                    </p>
                    <div
                      className="absolute bottom-10 right-10 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from propagating to parent
                        // handleLikeClick(post.id);
                      }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </BlogsSection>
  );
};

export default Blogs;
const BlogsSection = styled.div``;
