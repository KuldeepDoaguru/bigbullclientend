import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import cogoToast from "cogo-toast";
import { IoEye, IoEyeOffOutline } from "react-icons/io5";
const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  console.log(email);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://test.bigbulls.co.in/api/v1/auth/sendOtp",
        { email }
      );
      toast.success("Otp send to your email");
      setShowOtp(false);
      setShowVerify(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const verifyOtpAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://test.bigbulls.co.in/api/v1/auth/verifyOtp",
        {
          email,
          otp,
        }
      );
      setLoading(false);
      console.log(response);
      setShowOtp(false);
      setShowVerify(false);
      setShowReset(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
      cogoToast.error("Wrong OTP!");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        "https://test.bigbulls.co.in/api/v1/auth/updatePassword",
        {
          email,
          password: newPassword,
        }
      );

      setLoading(false);
      console.log(response);
      cogoToast.success("password update successfully");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="container py-5 mx-auto">
      <div className="flex flex-col items-center">
        <div className="py-3 text-center">
          <h1 className="text-3xl font-bold">Forget Password</h1>
        </div>

        <div className="w-full p-2 rounded-lg shadow-lg md:w-10/12 bg-gradient-to-r from-slate-400 via-gray-200 to-slate-400">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-center">
              <img
                className="object-cover w-10/12 md:w-full shadow rounded"
                src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1721224921/bigbull/bull_vyy72g.png"
                alt="Privacy Policy Illustration"
              />
            </div>
            {/* add responsiveness from medium devices */}
            <div className="w-full mt-5">
              {showOtp && (
                <>
                  <div className="flex items-center justify-center">
                    <form
                      className="w-10/12 md:w-11/12"
                      onSubmit={handleFormSubmit}
                    >
                      <div className="p-4">
                        <div className="w-full mx-auto text-lg">
                          <label
                            className="text-gray-700"
                            htmlFor="form4Example2"
                          >
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
                </>
              )}

              {/* ************************************************ */}
              {showVerify && (
                <>
                  <form className="mx-1 verify-otp" onSubmit={verifyOtpAdmin}>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-2 mt-4 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="email"
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      {" "}
                      <i className="fas fa-envelope fa-lg me-2 mt-4 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label">OTP</label>
                        <input
                          type="text"
                          name="otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="form-control"
                          placeholder="otp"
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                      >
                        {loading ? "Verify OTP...." : "Verify OTP"}
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* ********************************************************************** */}
              {showReset && (
                <>
                  <form className="mx-1 reset" onSubmit={changePassword}>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-2 mt-4 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label">New Password</label>
                        <div className="input-container relative">
                          <input
                            type={`${showPass ? "text" : "password"}`}
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            placeholder="password"
                          />
                          <div className="eye-icon absolute right-5 top-3">
                            {showPass ? (
                              <IoEye onClick={() => setShowPass(false)} />
                            ) : (
                              <IoEyeOffOutline
                                onClick={() => setShowPass(true)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-2 mt-4 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Confirm Password</label>
                        <div className="input-container relative">
                          <input
                            type={`${showPassConfirm ? "text" : "password"}`}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                            placeholder="confirm password"
                          />
                          <div className="eye-icon absolute right-5 top-3">
                            {showPassConfirm ? (
                              <IoEye
                                onClick={() => setShowPassConfirm(false)}
                              />
                            ) : (
                              <IoEyeOffOutline
                                onClick={() => setShowPassConfirm(true)}
                              />
                            )}
                          </div>
                        </div>
                        {newPassword !== confirmPassword ? (
                          <span className="text-danger">
                            Password and confirm password does not match
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      {newPassword === confirmPassword ? (
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled={loading}
                        >
                          {loading ? "Reset Password..." : "Reset Password"}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled
                        >
                          Reset Password
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
