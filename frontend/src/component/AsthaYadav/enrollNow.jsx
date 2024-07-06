import React, { useEffect, useState } from "react";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const  EnrollNow = () => {
  const [selectedTab, setSelectedTab] = useState("tab2");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    address: "",
    dob: "",
    referralCode: "",
  });

  const handleBirthCertificateChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProfilePicture(selectedFile);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUpdateData({
      ...updateData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date) => {
    setUpdateData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };

  const getUserProfile = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getUserViaId/${user.id}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const countryToStatesMap = {
    India: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
    Australia: ["New South Wales", "Queensland", "Victoria", "Western Australia"],
    UAE: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman"],
    USA: ["California", "New York", "Texas", "Florida"],
    Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
    UK: ["England", "Scotland", "Wales", "Northern Ireland"],
    Germany: ["Berlin", "Bavaria", "Hamburg", "North Rhine-Westphalia"],
    Japan: ["Tokyo", "Osaka", "Hokkaido", "Kyoto"],
    Brazil: ["Sao Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia"],
    China: ["Beijing", "Shanghai", "Guangdong", "Zhejiang"],
    SouthAfrica: ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape"],
  };

  const allCountries = Object.keys(countryToStatesMap);

  const validateForm = () => {
    const newErrors = {};
    Object.keys(updateData).forEach((key) => {
      if (!updateData[key] && key !== "referralCode") {
        newErrors[key] = "This field is required";
      }
    });
    // if (!profilePicture) {
    //   newErrors.profilePicture = "Profile picture is required";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateUsersDetails = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append("profilePicture", profilePicture);

    try {
      await axios.put(`${baseUrl}/update-users/${user.id}`, formData, {
        headers: {
          "Content-Type": "multi`pa`rt/form-data",
        },
      });

      navigate("/public-view-profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
}, []);

return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-[80%] max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Enroll Now</h2>
      <form className="space-y-4" onSubmit={updateUsersDetails}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-black">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={updateData.name}
              onChange={handleInputChange}
              placeholder={data.name}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block mb-1 text-black">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={updateData.email}
              onChange={handleInputChange}
              placeholder={data.email}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block mb-1 text-black">
              Enter Mobile number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={updateData.phone}
              maxLength={10}
              onChange={handleInputChange}
              placeholder={data.phone}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div>
            <label className="block mb-1 text-black">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={updateData.gender}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option>Select an Option</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>
          <div>
            <label className="block mb-1 text-black">
              Choose your country from the list <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={updateData.country}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">{data.country}</option>
              {allCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>
          <div>
            <label className="block mb-1 text-black">
              Choose your state from the list <span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              name="state"
              value={updateData.state}
              onChange={handleInputChange}
              disabled={!updateData.country}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">{data.state}</option>
              {updateData.country &&
                countryToStatesMap[updateData.country].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
          <div>
            <label className="block mb-1 text-black">
              Enter City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={updateData.city}
              onChange={handleInputChange}
              placeholder={data.city}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div>
            <label className="block mb-1 text-black">
              Enter Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={updateData.address}
              onChange={handleInputChange}
              placeholder={data.address}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div>
            <label className="block mb-1 text-black">
              Enter Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={updateData.dob}
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>
          {/* <div>
            <label className="block mb-1 text-black">
              Upload Profile Picture <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="profilePicture"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={handleBirthCertificateChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture}</p>}
          </div> */}
          <div>
            <label className="block mb-1 text-black">Referral Code</label>
            <input
              type="text"
              name="referralCode"
              value={updateData.referralCode}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-1/4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default  EnrollNow;