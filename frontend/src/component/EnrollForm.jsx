import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries',
  ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const MyEnroll = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    profilePicture: null,
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  const togglePasswordVisibility = (pass) => {
    setShowPassword({ ...showPassword, [pass]: !showPassword[pass] });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let mergeName = `${formData.firstName} ${formData.lastName}`;
    let postData = {...formData,name: mergeName} 
    // setFormData({...formData, name: mergeName});
    try {
      const response = await fetch(
        "http://localhost:6060/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
      toast.success('Successfuly Enrolled')
      
      navigate("/login");
    } catch (error) {
      toast.error('Error'); 
      console.error("Error submitting form:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(config.cUrl, {
        headers: { "X-CSCAPI-KEY": config.ckey }
      });
      setCountries(response.data.map(country => ({ code: country.iso2, name: country.name })));
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  };

  const fetchStates = async (countryCode) => {
    try {
      const response = await axios.get(`${config.cUrl}/${countryCode}/states`, {
        headers: { "X-CSCAPI-KEY": config.ckey }
      });
      setStates(response.data.map(state => ({ code: state.iso2, name: state.name })));
    } catch (error) {
      console.error("Error loading states:", error);
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    try {
      const response = await axios.get(`${config.cUrl}/${countryCode}/states/${stateCode}/cities`, {
        headers: { "X-CSCAPI-KEY": config.ckey }
      });
      setCities(response.data.map(city => ({ code: city.iso2, name: city.name })));
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

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
            <label htmlFor="firstName" className="block mb-1 text-lg font-semibold">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1 text-lg font-semibold">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-lg font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 text-lg font-semibold">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block mb-1 text-lg font-semibold">Gender</label>
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
            <label htmlFor="password" className="block mb-1 text-lg font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={() => togglePasswordVisibility('password')}
              >
                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="cpassword" className="block mb-1 text-lg font-semibold">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                id="cpassword"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="country" className="block mb-1 text-lg font-semibold">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={async (e) => {
                handleChange(e);
                await fetchStates(e.target.value);
                setCities([]);
              }}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="state" className="block mb-1 text-lg font-semibold">State</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={async (e) => {
                handleChange(e);
                await fetchCities(formData.country, e.target.value);
              }}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select your state</option>
              {states.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block mb-1 text-lg font-semibold">City</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select your city</option>
              {cities.map((city) => (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="address" className="block mb-1 text-lg font-semibold">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="dob" className="block mb-1 text-lg font-semibold">Date of Birth</label>
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
          <div>
            <label htmlFor="profilePicture" className="block mb-1 text-lg font-semibold">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleChange}
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
