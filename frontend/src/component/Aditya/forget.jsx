import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
function ForgetPass() {
  const [email, setEmail] = useState("");
const navigate=useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6060/api/v1/auth/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log(data);
     if(response.ok){
      toast.success("Otp send to your email");
      navigate('/ResetPassword');
     }
    } catch (error) {
      console.error("Error:", error);
      
    }
  };

  return (
    <div className="container py-5 mx-auto">
      <div className="flex flex-col items-center">
        <div className="py-3 text-center">
          <h1 className="text-3xl font-bold">Forget Password</h1>
        </div>

        <div className="w-full p-2 rounded-lg shadow-lg md:w-10/12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-center">
              <img
                className="object-cover w-10/12 md:w-full"
                src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=826&t=st=1718289653~exp=1718290253~hmac=86619a5c4fcd8a147c7f7ce924db20b3d07a62fbb69c85ac4c5c42ec51bd4fdc"
                alt="Privacy Policy Illustration"
              />
            </div>
              {/* add responsiveness from medium devices */}
              <div className="w-full ">
              <div className="flex items-center justify-center">
                <form className="w-10/12 md:w-11/12" onSubmit={handleFormSubmit}>
                  <div className="p-4">
                    <div className="w-full mx-auto text-lg">
                      <label className="text-gray-700" htmlFor="form4Example2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="form4Example2"
                        className="w-full p-2 mb-2 border border-gray-400 rounded"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="flex justify-center pt-4">
                      <button
                        type="submit"
                        className="w-8/12 py-2 text-white bg-red-600 rounded-full hover:bg-red-500"
                      >
                        Generate OTP
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPass;