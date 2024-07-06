import React from 'react';
import styled from 'styled-components';
// import img from '../Image/register.png';

const Register = () => {
    return (
        <>
            <StyledContact>
            <div className="container mx-auto py-20">
    <div className="flex flex-col items-center">
        <div className="text-center py-3">
            <h1 className="text-3xl font-bold">Register</h1>
        </div>
        <div className="bg-transparent bg-primary shadow-lg p-4 mb-5 rounded-lg w-full max-w-4xl">
            <form>
                <div className="p-4 space-y-4">
                    <p className="text-lg">Create your account</p>

                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="firstname" className="form-label">First Name *</label>
                            <input type="text" className="form-control input rounded p-2 w-full" placeholder="Enter your First Name" aria-label="First name" />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="lastname" className="form-label">Last Name *</label>
                            <input type="text" className="form-control input p-2 mb-2 rounded w-full" placeholder="Enter your Last Name" />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="Create Password" className="form-label">Create Password *</label>
                            <input type="password" className="form-control input p-2 mb-2 rounded w-full" placeholder="" id="inputPassword4" />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="Confirm Password" className="form-label">Confirm Password *</label>
                            <input type="password" className="form-control input p-2 mb-3 rounded w-full" id="inputPassword4" />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="inputState" className="form-label">Upload your Profile Picture</label>
                            <input type="file" className="form-control file choose p-2 mb-4 rounded w-full" aria-label="file example" required />
                            <div className="invalid-feedback">Example invalid form file feedback</div>
                        </div>
                    </div>

                    <p className="text-lg">Tell us about yourself</p>

                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="inputState" className="form-label">Choose your country from the list *</label>
                            <select id="inputState" className="form-select input p-2 mb-4 rounded w-full">
                                <option selected>Select</option>
                                <option>India</option>
                                <option>China</option>
                                <option>America</option>
                                <option>London</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="inputState" className="form-label">Choose your state from the list *</label>
                            <select id="inputState" className="form-select input p-2 mb-4 rounded w-full">
                                <option selected>Select</option>
                                <option>Madhya Pradesh</option>
                                <option>Uttar Pradesh</option>
                                <option>Andhra Pradesh</option>
                                <option>Gujarat</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="inputCity" className="form-label">Choose your city from the list *</label>
                            <select id="inputCity" className="form-select input p-2 mb-4 rounded w-full">
                                <option selected>Select</option>
                                <option>Nagpur</option>
                                <option>Jabalpur</option>
                                <option>Mumbai</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="inputState" className="form-label">Enter Address</label>
                            <input type="text" className="form-control input p-2 mb-4 rounded w-full" placeholder="Enter your Address" aria-label="Address" />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="inputGender" className="form-label">Gender *</label>
                            <select id="inputGender" className="form-select input p-2 mb-4 rounded w-full">
                                <option selected>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="inputDateOfBirth" className="form-label">Enter Date of Birth *</label>
                            <input type="date" className="form-control input p-2 mb-4 rounded w-full" aria-label="Date of Birth" />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="mobileNumber" className="form-label">Mobile Number *</label>
                            <input type="tel" className="form-control input p-2 mb-4 rounded w-full" />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="emailAddress" className="form-label">Email Address</label>
                            <input type="email" className="form-control input p-2 mb-4 rounded w-full" placeholder="Enter your Email Address" />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button type="button" className="btn bg-red-600 text-white py-2 px-6 rounded-full">Submit</button>
                    </div>
                </div>

                <p className="text-center text-lg px-4">Already Registered? <a href="#" className="text-blue-500">Log in</a></p>
            </form>
        </div>
    </div>
</div>

            </StyledContact >
        </>
    )
}

export default Register;
const StyledContact = styled.div`
body {
    background-color: red;
}
.register-img{
    /* width: 25rem; */
}
.main-container {
    font-size: 18px;
}
.form-select, .date, .choose{
    font-size: 16px;
}
.login:hover {
    text-decoration: underline;
}
.para-1, .para-2, .para-3 {
    font-size: 20px;
}
.padd {
    padding: 8px;
    color: #b8afaf;
}
.input::placeholder {
    color: #b8afaf;
}
.input {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
@media screen and (min-width: 1024px) and (max-width: 1280px) {
    .register-box {
        width: 90%;
    }
    .register-img {
        max-width: 300px;
    }
}
/* if required - then use 820px screen size (width problem) */
/* @media screen and (min-width: 821px) and (max-width: 1024px) {
    .register-img {
        max-width: 200px;
    }
    .box-image {
        display: flex;
        justify-content: center;
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .register-box {
        width: 80%;
    }
} */
@media screen and (min-width: 768px) and (max-width: 1024px) {
    .register-img {
        max-width: 200px;
    }
    .box-image {
        display: flex;
        justify-content: center;
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .register-box {
        width: 100%;
    }
}
@media screen and (min-width: 481px) and (max-width: 545px) {
    .register-img {
        max-width: 200px;
    }
    .box-image {
        display: flex;
        justify-content: center;
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .register-box {
        width: 80%;
    }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .box-image {
        display: flex;
        justify-content: center;
    }
    .register-img {
        max-width: 200px;
    }
    .register-box {
        width: 90%;
    }
} 
`;