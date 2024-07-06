import React from 'react';

const EditProfileComponent = () => {
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
                                <img className="h-auto w-full mx-auto"
                                    src='https://i.ytimg.com/vi/W43v7ePnjAA/maxresdefault.jpg'
                                    alt="Profile Image"
                                />
                            </div>
                            {/* Profile details */}
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">Jane Doe</h1>
                            <h3 className="text-gray-600 font-lg font-semibold leading-6">Owner at Her Company Inc.</h3>
                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt
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
                                    {/* SVG for edit profile icon */}
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {/* SVG path for edit profile icon */}
                                    </svg>
                                </span>
                                <span className="tracking-wide">Edit Profile</span>
                            </div>
                            {/* Edit Profile Form Fields */}
                            <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="col-span-1">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" id="lastName" name="lastName" className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" id="lastName" name="lastName" className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" id="email" name="email" className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="text" id="phoneNumber" name="phoneNumber" className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                    <input type="text" id="country" name="country" className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                    <input type="text" id="state" name="state" className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                    <input type="text" id="city" name="city" className="mt-1 p-2.5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                    <input type="text" id="address" name="address" className="mt-1 p-2.5 py-5 focus:ring-red-900 focus:border-red-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                                    <div className="flex items-center mt-1">
                                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M3.04 17.04l7.97-7.97a3.5 3.5 0 0 1 4.95 4.95l-7.97 7.97a8 8 0 1 1-4.95-4.95z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <label htmlFor="profilePicture" className="cursor-pointer ml-5 font-semibold text-red-900 hover:text-red-700">
                                            Upload New
                                        </label>
                                        <input type="file" id="profilePicture" name="profilePicture" className="sr-only" />
                                    </div>
                                </div>
                                {/* Save Button */}
                                <div className="col-span-2">
                                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900">
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
}

export default EditProfileComponent;
