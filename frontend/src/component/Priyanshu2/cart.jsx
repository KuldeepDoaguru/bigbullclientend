import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [cartCourses, setCartCourses] = useState([]);
  const navigate = useNavigate();

  const getCarts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:6060/api/v1/auth/getCartItems/${user.id}`
      );
      setCartCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  console.log(cartCourses);

  const totalAmount = cartCourses.reduce(
    (sum, cartCourses) => sum + Number(cartCourses.price),
    0
  );

  console.log(totalAmount);

  const totalDiscount =
    cartCourses.reduce((sum, course) => sum + Number(course.price), 0) * 0.1;

  console.log(totalDiscount);

  const totalTax =
    cartCourses.reduce((sum, course) => sum + Number(course.price), 0) * 0.18;

  console.log(totalTax);

  const NetCartAmount = totalAmount - (totalTax + totalDiscount);
  console.log(NetCartAmount);
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
                      key={course.course_id}
                      style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
                      className="flex flex-wrap md:flex-nowrap mb-4 p-4 gap-6 sm:gap-0 justify-between"
                    >
                      <div className="flex sm:max-lg:grow">
                        <figure className="flex lg:me-lg-5 flex-wrap">
                          <div className="flex-shrink-0 w-48 max-sm:w-full">
                            <img
                              src={`https://th.bing.com/th/id/OIP.M1U-BOiIzjE8ERoPA2GqpQHaE8?w=265&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7`}
                              className="object-cover rounded-md w-full h-full"
                              alt="Item"
                            />
                          </div>
                          <figcaption className="ml-4 md:max-w-screen">
                            <div className="max-sm:text-[5vw] font-bold sm:max-md:text-base max-sm:mb-5 max-sm:mt-10">
                              {course.course_name}
                            </div>
                            <i className="text-gray-500 text-lg">
                              {course.category}
                            </i>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="flex flex-row sm:flex-col md:flex-row sm:justify-center justify-end text-center gap-y-5 grow sm:grow-0 gap-2 ml-5 sm:ml-0">
                        <div className="self-end min-w-16">
                          <div className="price-wrap lh-sm">
                            <var className="price text-2xl font-semibold">{`₹ ${course.price}`}</var>
                            <br />
                          </div>
                        </div>
                        <div className="flex m self-end justify-self-end sm:ms-0 md:ms-5 lg:ms-16 justify-end">
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
              <div className="card mt-4">
                <div className="card-body">
                  <dl className="dlist-align flex justify-between align-center">
                    <dt>Total price:</dt>
                    <dd className="text-end">{`₹ ${totalAmount}`}</dd>
                  </dl>
                  <dl className="dlist-align flex justify-between align-center mt-2">
                    <dt>Discount:</dt>
                    <dd className="text-end text-green-500">{`₹ ${totalDiscount}`}</dd>
                  </dl>
                  <dl className="dlist-align flex justify-between align-center mt-2">
                    <dt>TAX:</dt>
                    <dd className="text-end">{`₹ ${totalTax}`}</dd>
                  </dl>
                  <hr />
                  <dl className="dlist-align flex justify-between align-center">
                    <dt>Total:</dt>
                    <dd className="text-end text-lg font-semibold">
                      ₹ {NetCartAmount}
                    </dd>
                  </dl>
                  <div className="my-3 space-y-2">
                    <button className="bg-red-600 py-2 rounded-lg text-white text-lg w-full">
                      Buy Now
                    </button>
                    <button
                      className="btn btn-light w-full"
                      onClick={() => navigate("/courses")}
                    >
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
