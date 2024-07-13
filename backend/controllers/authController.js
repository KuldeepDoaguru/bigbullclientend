const bemailcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const JWT = require("jsonwebtoken");
const { db } = require("../config/db");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
const sql = require("mysql");
dotenv.config();
const { sendMail } = require("../middleware/mailer");
const PORT = process.env.PORT;

const registerController = async (req, res) => {
  try {
    const {
      email,
      password,
      firstname,
      lastname,
      phone,
      gender,
      cpassword,
      country,
      state,
      city,
      address,
      dob,
    } = req.body;

    const profilePicture = req.file;
    console.log("31", profilePicture);

    const imageUrl = `http://localhost:6060/profilePicture/${profilePicture?.filename}`;
    console.log("34", imageUrl);

    const requiredFields = [
      email,
      firstname,
      lastname,
      phone,
      gender,
      password,
      cpassword,
      country,
      state,
      address,
      dob,
    ];

    console.log("50", requiredFields);
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Check if the user already exists
    const checkUserQuery = "SELECT * FROM register WHERE email = ?";
    db.query(checkUserQuery, [email], (err, result) => {
      if (err) {
        console.error("Error checking if user exists in MySQL:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      // User does not exist, proceed with registration
      const insertUserQuery =
        "INSERT INTO register (firstname, lastname, email, phone, gender, password, cpassword, country, state, city, address, dob, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const insertUserParams = [
        firstname,
        lastname,
        email,
        phone,
        gender,
        hashedPassword,
        hashedPassword,
        country,
        state,
        city,
        address,
        dob,
        imageUrl,
      ];

      db.query(insertUserQuery, insertUserParams, (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error inserting user:", insertErr);
          return res.status(500).json({ error: "Internal server error" });
        }

        console.log("User registered successfully");
        return res
          .status(200)
          .json({ success: true, message: "User registered successfully" });
      });
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const qry = `SELECT * FROM register WHERE email = ?`;
    db.query(qry, [email], async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
      if (result.length === 0) {
        return res.status(500).json({
          success: false,
          message: "email is not registered",
        });
      }
      const user = result[0];

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(500).send({
          success: false,
          message: "Invalid Password",
        });
      }

      //token
      const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      console.log(user);
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.firstname + " " + user.lastname,
          token: token,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in login", error });
  }
};

const sendOtp = (req, res) => {
  const { email } = req.body;

  // random otp
  function generateOTP(length) {
    const chars = "0123456789";
    let otp = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      otp += chars[randomIndex];
    }

    return otp;
  }

  const OTP = generateOTP(6);
  console.log("sender otp -", process.env.EMAILSENDER);
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILSENDER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${OTP}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json("An error occurred while sending the email.");
      } else {
        console.log("OTP sent:", info.response);

        // Assuming you have a 'db' object for database operations
        db.query(
          "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)",
          [email, OTP],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).send({ message: "Failed to store OTP" });
            }

            res.status(200).json({ message: "OTP sent successfully" });
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred.");
  }
};

// api works correctly bug resolve..
const updatePassword = async (req, res) => {
  try {
    const { email, password, cpassword, otp } = req.body;
    console.log("Request body:", req.body);

    if (!email || !password || !cpassword || !otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid email, password, or OTP",
      });
    }

    if (password !== cpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Fetch the user based on the provided email
    const userQuery = "SELECT * FROM register WHERE email = ?";
    db.query(userQuery, [email], async (err, userResults) => {
      if (err) {
        console.error("User query error:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (userResults.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Fetch the OTP document
      const otpQuery =
        "SELECT * FROM otpcollections WHERE email = ? AND code = ?";
      db.query(otpQuery, [email, otp], async (otpErr, otpResults) => {
        if (otpErr) {
          console.error("OTP query error:", otpErr);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        }

        console.log("OTP query results:", otpResults);
        if (
          otpResults.length == 0 ||
          otpResults[0].code.toString() != otp.toString()
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid OTP",
          });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update the password
        const updateQuery = "UPDATE register SET password = ? WHERE email = ?";
        db.query(
          updateQuery,
          [hashedPassword, email],
          (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Update query error:", updateErr);
              return res.status(500).json({
                success: false,
                message: "Internal server error",
              });
            }

            // Optionally delete the OTP after successful password update
            const deleteOtpQuery =
              "DELETE FROM otpcollections WHERE email = ? AND code = ?";
            db.query(
              deleteOtpQuery,
              [email, otp],
              (deleteErr, deleteResult) => {
                if (deleteErr) {
                  console.error("Delete OTP query error:", deleteErr);
                  return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                  });
                }

                res.status(200).json({
                  success: true,
                  message: "Password reset successfully",
                });
              }
            );
          }
        );
      });
    });
  } catch (error) {
    console.error("Catch error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const updateUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      email,
      password,
      firstname,
      lastname,
      phone,
      gender,
      cpassword,
      country,
      state,
      city,
      address,
      dob,
    } = req.body;

    const profilePicture = req.file;
    console.log("31", profilePicture);

    const imageUrl = `http://localhost:6060/profilePicture/${profilePicture?.filename}`;
    console.log("34", imageUrl);

    const getQuery = `SELECT * FROM register WHERE id = ?`;
    db.query(getQuery, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (firstname) {
          updateFields.push("firstname = ?");
          updateValues.push(firstname);
        }

        if (lastname) {
          updateFields.push("lastname = ?");
          updateValues.push(lastname);
        }

        if (email) {
          updateFields.push("email = ?");
          updateValues.push(email);
        }

        if (phone) {
          updateFields.push("phone = ?");
          updateValues.push(phone);
        }

        if (gender) {
          updateFields.push("gender = ?");
          updateValues.push(gender);
        }

        if (country) {
          updateFields.push("country = ?");
          updateValues.push(country);
        }

        if (state) {
          updateFields.push("state = ?");
          updateValues.push(state);
        }

        if (city) {
          updateFields.push("city = ?");
          updateValues.push(city);
        }

        if (address) {
          updateFields.push("address = ?");
          updateValues.push(address);
        }

        if (dob) {
          updateFields.push("dob = ?");
          updateValues.push(dob);
        }

        if (password) {
          updateFields.push("password = ?");
          updateValues.push(password);
        }

        if (cpassword) {
          updateFields.push("cpassword = ?");
          updateValues.push(cpassword);
        }

        if (profilePicture) {
          updateFields.push("profile_picture = ?");
          updateValues.push(imageUrl);
        }

        const updateQuery = `UPDATE register SET ${updateFields.join(
          ", "
        )} WHERE id = ?`;

        db.query(updateQuery, [...updateValues, userId], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Details updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUserViaId = async (req, res) => {
  console.log("why 404");
  try {
    const userId = req.params.id;
    const getQuery = `SELECT * FROM register WHERE id = ?`;
    db.query(getQuery, [userId], (err, result) => {
      if (err) {
        res.status(500).json({ error: "Invalid user id" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUserViaEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const getQuery = `SELECT * FROM register WHERE email = ?`;
    db.query(getQuery, [email], (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error executing query" });
      } else if (result.length == 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    db.query(
      "SELECT * FROM otpcollections WHERE email = ? AND code = ?",
      [email, otp],
      async (err, result) => {
        console.log("result: ", result);
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        }
        if (result.length > 0) {
          return res.status(200).json({
            success: true,
            message: "OTP verification success",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Invalid email or OTP",
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    db.query(
      "SELECT * FROM register WHERE id = ?",
      [userId],
      async (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }
        console.log(result.length, "664");
        if (result.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "user not found" });
        }

        db.query(
          "DELETE FROM register WHERE id = ?",
          [userId],
          async (err, result) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Error while deleting course",
              });
            }

            res.status(200).json({
              success: true,
              message: "user deleted successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const contactInquiry = (req, res) => {
  try {
    db.query(`SELECT * FROM inquiry_mail`, (err, result) => {
      if (err) {
        res.status(401).json({ error: "Failed to fetch data" });
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBoughtCourseDetails = (req, res) => {
  try {
    db.query("SELECT * FROM bought_courses", (err, result) => {
      if (err) {
        res.status(404).json({ error: "failed to fetch data" });
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const contactRequest = async (req, res) => {
  const time = moment.tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");
  try {
    const { email, name, message, number } = req.body;

    if (!email || !name || !message || !number) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request." });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    console.log("email", email);
    const mailOptions = {
      from: process.env.EMAILSENDER,
      to: email,
      subject: "Enquiry from website",
      text: `Hello ${name},\n\nYou wrote: "${message}"\n\nYour contact number is: ${number}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

    // Save data to the database
    const insertQuery = `INSERT INTO inquiry_mail (name, email, mobile, message, time) VALUES (?, ?, ?, ?, ?)`;
    const values = [name, email, number, message, time];

    const result = db.query(insertQuery, values);

    console.log("Data saved to the database:", result);

    res.status(200).send("Email sent and data saved successfully!");
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred while processing the request.");
  }
};

const getBoughtCourseViaId = (req, res) => {
  try {
    const uid = req.params.uid;
    const selectQuery = "SELECT * FROM bought_courses WHERE student_id = ?";
    db.query(selectQuery, uid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

module.exports = {
  registerController,
  loginController,
  sendOtp,
  updatePassword,
  updateUsers,
  getUserViaId,
  getUserViaEmail,
  verifyOtp,
  deleteUser,
  contactInquiry,
  getBoughtCourseDetails,
  contactRequest,
  getBoughtCourseViaId,
};
