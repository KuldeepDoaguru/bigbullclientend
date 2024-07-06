import { useState } from "react";
import { useSelector } from "react-redux";

const Defaulcourses = [
  {
    courseName: "Introduction to JavaScript",
    level: "Beginner",
    duration: "4 weeks",
    lecture: "20 lectures",
    price: "50",
    nameOfInstructor: "John Doe",
    coverImage:
      "https://media.licdn.com/dms/image/D4D22AQFd7AgxnSHIlw/feedshare-shrink_800/0/1684770730807?e=2147483647&v=beta&t=KmeV-afOm69UQLUm0u3UXl-l__2ImWX7Uz-DyuaqvJ8",
  },
  {
    courseName: "Advanced React",
    level: "Advanced",
    duration: "6 weeks",
    lecture: "30 lectures",
    price: "100",
    nameOfInstructor: "Jane Smith",
    coverImage:
      "https://media.licdn.com/dms/image/D4D22AQFd7AgxnSHIlw/feedshare-shrink_800/0/1684770730807?e=2147483647&v=beta&t=KmeV-afOm69UQLUm0u3UXl-l__2ImWX7Uz-DyuaqvJ8",
  },
  {
    courseName: "Data Structures and Algorithms",
    level: "Intermediate",
    duration: "8 weeks",
    lecture: "40 lectures",
    price: "75",
    nameOfInstructor: "Alice Johnson",
    coverImage:
      "https://media.licdn.com/dms/image/D4D22AQFd7AgxnSHIlw/feedshare-shrink_800/0/1684770730807?e=2147483647&v=beta&t=KmeV-afOm69UQLUm0u3UXl-l__2ImWX7Uz-DyuaqvJ8",
  },
  {
    courseName: "Full-Stack Web Development",
    level: "Advanced",
    duration: "12 weeks",
    lecture: "60 lectures",
    price: "200",
    nameOfInstructor: "Michael Brown",
    coverImage:
      "https://media.licdn.com/dms/image/D4D22AQFd7AgxnSHIlw/feedshare-shrink_800/0/1684770730807?e=2147483647&v=beta&t=KmeV-afOm69UQLUm0u3UXl-l__2ImWX7Uz-DyuaqvJ8",
  },
];

const Cart = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [cartCourses, setCartCourses] = useState(Defaulcourses);
  return (
    <>
      <section style={{ minHeight: "70vh" }} className="py-6 pt-0">
        <div className="max-w-screen-xl m-auto sm:px-10">
          <h4
            style={{ fontFamily: "Futura-bold" }}
            className="card-title mb-10 text-5xl max-sm:text-center font-bold"
          >
            Your Course
          </h4>
          <div className="flex flex-wrap">
            <div className="lg:w-3/4 w-full mb-6 lg:mb-0">
              <div className="card border-0">
                <div className="p-4 md:border-1 rounded-lg md:me-10">
                  {cartCourses.map((course) => (
                    <article
                      key={course.id}
                      style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
                      className="flex flex-wrap md:flex-nowrap mb-4 p-4 gap-6 sm:gap-0 justify-between"
                    >
                      <div className="flex sm:max-lg:grow">
                        <figure className="flex lg:me-lg-5 flex-wrap">
                          <div className="flex-shrink-0 w-48 max-sm:w-full">
                            <img
                              src={`${course.coverImage}`}
                              className="object-cover rounded-md w-full h-full"
                              alt="Item"
                            />
                          </div>
                          <figcaption className="ml-4 md:max-w-36">
                            <div className="max-sm:text-[5vw] font-bold sm:max-md:text-base max-sm:mb-5 max-sm:mt-10">
                              {course.courseName}
                            </div>
                            <i className="text-gray-500 text-lg">
                              {course.nameOfInstructor}
                            </i>
                            <ul className="mt-2">
                              <li className="list-disc max-sm:text-[4vw] ms-3">
                                {course.level}
                              </li>
                              <li className="list-disc max-sm:text-[4vw] ms-3">
                                {course.duration}
                              </li>
                              <li className="list-disc max-sm:text-[4vw] ms-3">
                                {course.lecture}
                              </li>
                            </ul>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="flex flex-row sm:flex-col md:flex-row sm:justify-center justify-end text-center gap-y-5 grow sm:grow-0 gap-2 ml-5 sm:ml-0">
                        <div className="self-center min-w-16">
                          <div className="price-wrap lh-sm">
                            <var className="price text-2xl font-semibold">{`₹ ${course.price}`}</var>
                            <br />
                          </div>
                        </div>
                        <div className="flex m self-center justify-self-end sm:ms-0 md:ms-5 lg:ms-16 justify-end">
                          <div className="space-x-2">
                            <p
                              href="#"
                              className="btn btn-light text-2xl text-red-500"
                            >
                              Remove
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <aside className="lg:w-1/4 w-full">
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align flex justify-between align-center">
                    <dt>Total price:</dt>
                    <dd className="text-end">{`₹ ${cartCourses.reduce(
                      (sum, cartCourses) => sum + Number(cartCourses.price),
                      0
                    )}`}</dd>
                  </dl>
                  <dl className="dlist-align flex justify-between align-center mt-2">
                    <dt>Discount:</dt>
                    <dd className="text-end text-green-500">{`₹ ${
                      cartCourses.reduce(
                        (sum, course) => sum + Number(course.price),
                        0
                      ) * 0.82
                    }`}</dd>
                  </dl>
                  <dl className="dlist-align flex justify-between align-center mt-2">
                    <dt>TAX:</dt>
                    <dd className="text-end">₹ 456</dd>
                  </dl>
                  <hr />
                  <dl className="dlist-align flex justify-between align-center">
                    <dt>Total:</dt>
                    <dd className="text-end text-lg font-semibold">₹ 357.90</dd>
                  </dl>
                  <div className="my-3 space-y-2">
                    <button className="bg-red-600 py-2 rounded-lg text-white text-lg w-full">
                      Buy Now
                    </button>
                    <button className="btn btn-light w-full">
                      Back to Courses
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <br />
          <br />
        </div>
      </section>
    </>
  );
};

export default Cart;
