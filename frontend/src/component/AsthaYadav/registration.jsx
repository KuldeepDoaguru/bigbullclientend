import React, { useState } from 'react';
// import img from '../Assets/register.png';

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        email: '',
        dob: '',
        gender: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
        const emailRegex = /\S+@\S+\.\S+/;

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match! Please try again.');
        } else if (!passwordRegex.test(formData.password)) {
            setError('Password should be at least 8 characters long and contain at least one number, one alphabet, and one special character.');
        } else if (!emailRegex.test(formData.email)) {
            setError('Email is not valid.');
        } else {
            setError('');
            console.log("Form submitted:", formData);
            // Logic to handle form submission
        }
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="container mx-auto">
                    <div className="main-container pt-5 pb-5 flex justify-center">
                        <div className="text-center py-3">
                            <h1 className="text-3xl font-bold">Register</h1>
                        </div>
                        <div className="flex justify-center mt-4">
                            <div className="hidden md:block">
                                {/* <img className='register_img' src={img} alt="Register" width="80%" /> */}
                            </div>
                            <div className="bg-white shadow-lg p-6 mb-5 rounded w-full md:w-3/4 xl:w-2/5">
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <p className="font-semibold">Create your account*</p>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="flex-1">
                                                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    id="firstname"
                                                    name="firstname"
                                                    value={formData.firstname}
                                                    onChange={handleChange}
                                                    required
                                                    className="form-input mt-1 block w-full shadow-sm p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    id="lastname"
                                                    name="lastname"
                                                    value={formData.lastname}
                                                    onChange={handleChange}
                                                    required
                                                    className="form-input mt-1 block w-full shadow-sm p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="flex-1">
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Create Password <span className="text-red-500">*</span></label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                    className="form-input mt-1 block w-full shadow-sm p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                                                <input
                                                    type="password"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                    className="form-input mt-1 block w-full shadow-sm p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="flex-1">
                                                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Upload your Profile Picture</label>
                                                <input
                                                    type="file"
                                                    id="profilePicture"
                                                    className="form-input mt-1 block w-full shadow-sm p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    aria-label="file example"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {/* Rest of the form */}


                                        <p>Tell us about yourself*</p>
                                        <div className="flex flex-wrap">
    <div className="w-full md:w-1/2">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Choose your country from the list</label>
        <select
            id="country"
            name="country"
            className="form-select mt-1 block w-full shadow-sm p-2 mb-4 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="" selected>Select</option>
            <option>India</option>
            <option>China</option>
            <option>America</option>
            <option>London</option>
        </select>
    </div>
    <div className="w-full md:w-1/2">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">Choose your state from the list</label>
        <select
            id="state"
            name="state"
            className="form-select mt-1 block w-full shadow-sm p-2 mb-4 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="" selected>Select</option>
            <option>Madhya Pradesh</option>
            <option>Uttar Pradesh</option>
            <option>Andhra Pradesh</option>
            <option>Gujarat</option>
        </select>
    </div>
</div>

<div className="flex flex-wrap">
    <div className="w-full md:w-1/2">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Choose your city from the list</label>
        <select
            id="city"
            name="city"
            className="form-select mt-1 block w-full shadow-sm p-2 mb-4 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="" selected>Select</option>
            <option>Nagpur</option>
            <option>Jabalpur</option>
            <option>Mumbai</option>
        </select>
    </div>
    <div className="w-full md:w-1/2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Enter Address</label>
        <input
            type="text"
            id="address"
            name="address"
            className="form-input mt-1 block w-full shadow-sm p-2 mb-4 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            aria-label="address"
        />
    </div>
</div>

<div className="flex flex-wrap">
    <div className="w-full md:w-1/2">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
        <select
            id="gender"
            name="gender"
            className="form-select mt-1 block w-full shadow-sm p-2 mb-4 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="" selected>Select</option>
            <option>Male</option>
            <option>Female</option>
        </select>
    </div>
    <div className="w-full md:w-1/2">
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Enter Date of Birth</label>
        <input
            type="date"
            id="dob"
            name="dob"
            className="form-input mt-1 block w-full shadow-sm p-2 mb-4 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            aria-label="dob"
        />
    </div>
</div>

<div className="flex flex-wrap">
    <div className="w-full md:w-1/2">
        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
        <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            className="form-input mt-1 block w-full shadow-sm p-2 mb-4 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            aria-label="mobileNumber"
        />
    </div>
    <div className="w-full md:w-1/2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
            type="email"
            id="email"
            name="email"
            className="form-input mt-1 block w-full shadow-sm p-2 mb-4 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            aria-label="email"
        />
    </div>
</div>

                                        <div className="flex justify-center pt-4 mb-3">
                                            <button type="submit" className="btn bg-red-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600">Submit</button>
                                        </div>
                                    </div>
                                </form>
                                <p className="text-center text-sm mt-4">Already Registered?<a href="#" className="text-blue-500 px-1">Log in</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;