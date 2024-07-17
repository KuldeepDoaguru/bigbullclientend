import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const EditProfileComponent = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [userData, setUserData] = useState([]);
  const [profilePicture, setProfilePicture] = useState({
    file: null,
    imageUrl: null,
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: userData[0]?.firstname || "",
    lastname: userData[0]?.lastname || "",
    email: userData[0]?.email || "",
    phone: userData[0]?.phone || "",
    gender: userData[0]?.gender || "",
    password: userData[0]?.password || "",
    cpassword: userData[0]?.cpassword || "",
    country: userData[0]?.country || "",
    state: userData[0]?.state || "",
    city: userData[0]?.city || "",
    address: userData[0]?.address || "",
    dob: userData[0]?.dob || "",
  });
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
    if (formData.country === userData.country) {
      return country.name === userData.country;
    } else {
      return country.name === formData.country;
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
    if (formData.state === userData.state) {
      return state.name === userData.state;
    } else {
      return state.name === formData.state;
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
  }, [formData]);

  useEffect(() => {
    getAllCities();
  }, [formData]);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://test.bigbulls.co.in/api/v1/auth/getUserViaId/${user.id}`
      );
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  console.log(userData);

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

        // Show the image preview before validation
        setProfilePicture({
          file: selectedFile,
          imageUrl: reader.result,
        });

        image.onload = () => {
          const isValidSize = allowedSizes.some(
            (size) => size.width === image.width && size.height === image.height
          );

          if (!isValidSize) {
            alert(
              `Invalid image size (${image.width}x${image.height}). Allowed sizes are: 2286×2858, 1920×2400, 1280×1600, 512×640.`
            );
            // Reset the file input
            e.target.value = "";
            // Clear the image preview
            setProfilePicture({
              file: null,
              imageUrl: null,
            });
          }
        };
      };
    }
  };

  useEffect(() => {
    setFormData({
      firstname: userData[0]?.firstname,
      lastname: userData[0]?.lastname,
      email: userData[0]?.email,
      phone: userData[0]?.phone,
      gender: userData[0]?.gender,
      password: userData[0]?.password,
      cpassword: userData[0]?.cpassword,
      country: userData[0]?.country,
      state: userData[0]?.state,
      city: userData[0]?.city,
      address: userData[0]?.address,
      dob: userData[0]?.dob,
    });
  }, [userData]);

  const updateUserDetails = async (e) => {
    e.preventDefault();
    alert("hello yupdate");
    const formDetails = new FormData();

    // Append user.data fields to formData
    for (const key in formData) {
      formDetails.append(key, formData[key]);
    }
    formDetails.append("profilePicture", profilePicture.file);
    console.log(formData, profilePicture.file);

    try {
      const res = await axios.put(
        `https://test.bigbulls.co.in/api/v1/auth/update-users-details/${user.id}`,
        formDetails,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Successfuly Updated");
      getUserDetails();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Edit Profile Content */}
      <div className="container mx-auto py-6 px-4">
        <div className="md:flex md:-mx-2">
          {/* Left Side */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* Profile Card */}
            <div className="bg-white p-3 border-t-4 border-red-900">
              <div className="image overflow-hidden">
                {/* Profile image */}
                <img
                  className="h-auto w-full mx-auto"
                  src={userData[0]?.profile_picture}
                  alt="Profile Image"
                />
              </div>
              {/* Profile details */}
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {userData[0]?.firstname.toUpperCase()}{" "}
                {userData[0]?.lastname.toUpperCase()}
              </h1>

              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {userData[0]?.user_bio}
              </p>
            </div>
            {/* End of profile card */}
          </div>

          {/* Right Side */}
          <div className="w-full md:w-9/12 md:mx-2 md:mt-0">
            {/* Edit Profile Form */}
            <div className="bg-white p-3 shadow-sm rounded-sm mb-4">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-red-900">
                  <FaUserEdit className="text-red-900 text-2xl" />
                </span>
                <span className="tracking-wide">Edit Profile</span>
              </div>
              {/* Edit Profile Form Fields */}
              <form
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6"
                onSubmit={updateUserDetails}
              >
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Select your country</option>
                    {allCountries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Select your state</option>
                    {allStates.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Select your city</option>
                    {allCities.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    className="mt-1 p-2.5 py-5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="profilePicture"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profile Picture
                  </label>
                  <span className="text-red-500 text-sm">
                    Allowed sizes are: 2286×2858, 1920×2400, 1280×1600, 512×640.
                  </span>
                  <div className="flex items-center mt-1">
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <img
                        className="h-full w-full text-gray-300"
                        src={profilePicture?.imageUrl}
                        alt=""
                      />
                    </span>
                    <label
                      htmlFor="profilePicture"
                      className="cursor-pointer ml-5 font-semibold text-red-900 hover:text-red-700"
                    >
                      Upload New
                    </label>
                    <input
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept=".pdf, .jpg, .jpeg, .png"
                      onChange={handleEmpProfilePicture}
                      className="sr-only"
                    />
                  </div>
                </div>
                {/* Save Button */}
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
            {/* End of Edit Profile Form */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileComponent;
