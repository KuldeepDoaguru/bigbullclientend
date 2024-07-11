import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MyEnroll = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    cpassword: "",
    country: "",
    state: "",
    city: "",
    address: "",
    dob: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);

  const getAllCountries = async () => {
    try {
      const res = await axios.get(
        `https://api.countrystatecity.in/v1/countries`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
          },
        }
      );

      setAllCountries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const countryFilter = allCountries?.filter((country) => {
    if (formData.country) {
      return country.name === formData.country;
    } else {
      return true;
    }
  });

  console.log(countryFilter[0]?.iso2);

  const getAllStates = async () => {
    try {
      const res = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryFilter[0]?.iso2}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
          },
        }
      );

      setAllStates(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterCities = allStates?.filter((state) => {
    if (formData.state) {
      return state.name === formData.state;
    } else {
      return true;
    }
  });

  console.log(filterCities);

  const getAllCities = async () => {
    try {
      const res = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryFilter[0]?.iso2}/states/${filterCities[0]?.iso2}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
          },
        }
      );

      setAllCities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(allCountries);
  // console.log(allStates);
  // console.log(allCities);

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    getAllStates();
  }, [countryFilter]);

  useEffect(() => {
    getAllCities();
  }, [filterCities]);

  const togglePasswordVisibility = (pass) => {
    setShowPassword({ ...showPassword, [pass]: !showPassword[pass] });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "phone") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prevEmpData) => ({
          ...prevEmpData,
          [name]: value,
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "file" ? files[0] : value,
      });
    }
  };

  const handleEmpProfilePicture = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);

    if (selectedFile) {
      const allowedSizes = [
        { width: 2286, height: 2858 },
        { width: 1920, height: 2400 },
        { width: 1280, height: 1600 },
        { width: 512, height: 640 },
      ];

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result;

        image.onload = () => {
          const isValidSize = allowedSizes.some(
            (size) => size.width === image.width && size.height === image.height
          );

          if (isValidSize) {
            setProfilePicture({
              file: selectedFile,
              imageUrl: reader.result,
            });
          } else {
            alert(
              `Invalid image size (${image.width}x${image.height}). Allowed sizes are: 2286×2858, 1920×2400, 1280×1600, 512×640.`
            );
            // Reset the file input
            e.target.value = "";
          }
        };
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDetails = new FormData();

    // Append user.data fields to formData
    for (const key in formData) {
      formDetails.append(key, formData[key]);
    }
    formDetails.append("profilePicture", profilePicture.file);
    console.log(formData, profilePicture.file);
    try {
      const response = await axios.post(
        "http://localhost:6060/api/v1/auth/register",
        formDetails,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Successfuly Enrolled");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
        cpassword: "",
        country: "",
        state: "",
        city: "",
        address: "",
        dob: "",
      });
      setProfilePicture({
        file: null,
      });
      navigate("/login");
    } catch (error) {
      toast.error("Error");
      console.error("Error submitting form:", error);
    }
  };

  console.log(formData);
  return (
    <div className="max-w-screen-xl pt-10 mx-auto my-16">
      <div className="mb-5">
        <h1 className="text-5xl font-bold text-center">Enrollment Form</h1>
      </div>
      <form
        className="px-6 pb-5 border-2 rounded-2xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div>
            <label
              htmlFor="firstname"
              className="block mb-1 text-lg font-semibold"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block mb-1 text-lg font-semibold"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 text-lg font-semibold">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block mb-1 text-lg font-semibold"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-lg font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={() => togglePasswordVisibility("password")}
              >
                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="cpassword"
              className="block mb-1 text-lg font-semibold"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                id="cpassword"
                name="cpassword"
                placeholder="Confirm Password"
                value={formData.cpassword}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="country"
              className="block mb-1 text-lg font-semibold"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select your country</option>
              {allCountries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="state" className="block mb-1 text-lg font-semibold">
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select your state</option>
              {allStates.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block mb-1 text-lg font-semibold">
              City
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select your city</option>
              {allCities.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block mb-1 text-lg font-semibold"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Your address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="dob" className="block mb-1 text-lg font-semibold">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="profilePicture"
              className="block mb-1 text-lg font-semibold"
            >
              Profile Picture
            </label>
            <span className="text-red-400 text-sm">
              Allowed sizes are: 2286×2858, 1920×2400, 1280×1600, 512×640.
            </span>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={handleEmpProfilePicture}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
        </div>
        <div className="mt-5 text-center">
          <button
            type="submit"
            className="px-6 py-3 text-lg font-semibold text-white bg-red-700 hover:bg-red-800   rounded  focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <Toaster />
            Enroll Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyEnroll;
