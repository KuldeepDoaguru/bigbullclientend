import axios from "axios";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaPenFancy, FaUserPlus } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { IoCall, IoCallOutline, IoMail } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent phone input from exceeding 10 digits
    if (name === "number") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prevEmpData) => ({
          ...prevEmpData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://test.bigbulls.co.in/api/v1/auth/contactRequest",
        formData
      );
      cogoToast.success("successfully submitted contact request");
      setFormData({
        name: "",
        email: "",
        number: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-screen-xl	my-20 max-lg:max-w-3xl mx-auto bg-white my-6 font-[sans-serif] ">
        <div className="px-6 text-start">
          <h2
            style={{ fontFamily: "Futura-bold" }}
            className="text-5xl font-semibold text-gray-800"
          >
            Contact Us
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 items-start gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-12">
          <div className="bg-[#011c2b] rounded-lg p-6 h-full max-lg:order-1">
            <h2 className="text-2xl text-white">Contact Information</h2>
            <p className="text-xl leading-relaxed text-gray-300 ">
              Have some big idea or brand to develop and need help?
            </p>
            <ul className="mt-16 space-y-8">
              <li className="flex items-center">
                <CiMail className="text-white text-2xl" />
                <a
                  href="mailto:bigbulleducation0@gmail.com"
                  className="ml-4 text-xl text-white text-gray-500"
                >
                  bigbulleducation0@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <IoCallOutline className="text-white text-2xl" />
                <a
                  href="tel:+918602480679"
                  className="ml-4 text-xl text-white text-gray-500"
                >
                  +918602480679
                </a>
              </li>
              <li className="flex items-center">
                <FiMapPin className="text-white text-2xl" />
                <a
                  href="javascript:void(0)"
                  className="ml-4 text-xl text-white text-gray-500"
                >
                  Vijay Nagar, Jabalpur - 482002 (M.P.)
                </a>
              </li>
            </ul>
          </div>
          <div className="p-4 lg:col-span-2 md:max-lg:mx-0 sm:ms-10">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="relative flex items-center sm:col-span-2 ">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-2 py-3 text-sm text-gray-800 bg-white border-b border-gray-300 outline-none focus:border-blue-500"
                  />
                  <FaUserPlus className="text-gray-300 w-[18px] h-[18px] absolute right-2" />
                </div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="number"
                    required
                    value={formData.number}
                    onChange={handleChange}
                    className="w-full px-2 py-3 text-sm text-black bg-white border-b border-gray-300 outline-none focus:border-blue-500"
                  />
                  <IoCall className="text-gray-300 w-[18px] h-[18px] absolute right-2" />
                </div>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 py-3 text-sm text-black bg-white border-b border-gray-300 outline-none focus:border-blue-500"
                  />
                  <IoMail className="text-gray-300 w-[18px] h-[18px] absolute right-2" />
                </div>
                <div className="relative flex items-center sm:col-span-2">
                  <textarea
                    placeholder="Write Message"
                    name="message"
                    value={formData.message}
                    required
                    onChange={handleChange}
                    className="w-full px-2 pt-3 text-sm text-black text-gray-800 bg-white border-b border-gray-300 outline-none focus:border-blue-500"
                    defaultValue={""}
                  />
                  <FaPenFancy className="text-gray-300 w-[18px] h-[18px] absolute right-2" />
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center px-4 py-3 mt-12 text-sm tracking-wide text-white rounded-lg lg:ml-auto max-lg:w-full bg-red-700 hover:bg-red-600"
              >
                <BsFillSendFill className="mx-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
