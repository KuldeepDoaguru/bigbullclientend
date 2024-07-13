const fs = require("fs");
const { db } = require("../config/db");
const dotenv = require("dotenv");
const { log, error } = require("console");
const { loginController } = require("./authController");
const moment = require("moment-timezone");
dotenv.config();

const PORT = process.env.PORT;

// Make Controller for Sql -Adi
const addToCart = (req, res) => {
  const { user_id, item_id } = req.params;
  console.log("14", user_id, item_id);
  const time = moment.tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");

  // Check if the user's cart exists
  db.query(
    "SELECT * FROM carts WHERE user_id = ? AND item_id = ?",
    [user_id, item_id],
    (err, result) => {
      if (err) {
        console.error("Error checking cart:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }

      if (result.length === 0) {
        // Create a new cart if none exists
        db.query(
          "INSERT INTO carts (user_id, item_id, created_at) VALUES (?, ?, ?)",
          [user_id, item_id, time],
          (err) => {
            if (err) {
              console.error("Error adding item to cart:", err);
              return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
            }

            return res.status(200).json({
              success: true,
              message: "Item added to the cart successfully",
            });
          }
        );
      } else {
        return res.status(400).json({
          success: false,
          message: "Item already exists in the cart",
        });
      }
    }
  );
};

const getAllCourses = async (req, res) => {
  try {
    db.query("SELECT * FROM courses", (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch data" });
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// we are navigate through front end becuse data is not save in backend currently
const coursePage = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const getQuery = `SELECT * FROM courses WHERE course_id = ?`;
    db.query(getQuery, courseId, (err, result) => {
      if (err) {
        res.status(400).json({ error: "Invalid course ID" });
      }
      if (result.length === 0) {
        res.status(404).json({ error: "Failed to fetch Data" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const videoListViaCourseId = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const chid = req.params.chid;
    const getQuery = `SELECT * FROM course_videos WHERE course_id = ? AND chapter_id = ?`;
    db.query(getQuery, [courseId, chid], (err, result) => {
      if (err) {
        res.status(500).json({ error: "Invalid course ID" });
      } else {
        res.status(200).send(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCartItems = (req, res) => {
  try {
    const { userId } = req.params;
    const qry =
      "SELECT * FROM carts LEFT JOIN courses ON courses.course_id = carts.item_id WHERE user_id = ?";

    db.query(qry, userId, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      res.send(result);
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getChapterViaId = (req, res) => {
  try {
    const cid = req.params.cid;
    const getQuery = `SELECT * From chapters WHERE course_id = ?`;
    db.query(getQuery, cid, (err, result) => {
      if (err) {
        res.status(400).json({ error: "Invalid ID" });
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getVideoViaVideoID = (req, res) => {
  try {
    const vid = req.params.vid;
    const getQuery = `SELECT * FROM course_videos WHERE coursevideo_id = ?`;
    db.query(getQuery, vid, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Invalid course video id" });
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCourseVideoDetails = (req, res) => {
  try {
    const vid = req.params.vid;
    const { title, chapterID, duration, description } = req.body;
    const videoFile = req.file;

    // if (!videoFile) {
    //   return res.status(400).json({ error: "Video file is required" });
    // }

    const videoUrl = `${PORT}/videoCourse/${videoFile?.filename}`;
    console.log(videoUrl);

    const getQuery = `SELECT * FROM course_videos WHERE coursevideo_id = ?`;
    db.query(getQuery, vid, (err, result) => {
      if (err) {
        res.status(400).json({ error: "Invalid course ID" });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (title) {
          updateFields.push("title = ?");
          updateValues.push(title);
        }

        if (description) {
          updateFields.push("description = ?");
          updateValues.push(description);
        }

        if (chapterID) {
          updateFields.push("chapter_id = ?");
          updateValues.push(chapterID);
        }

        if (duration) {
          updateFields.push("duration = ?");
          updateValues.push(duration);
        }
        if (videoFile) {
          updateFields.push("video_url = ?");
          updateValues.push(videoUrl);
        }
        console.log(updateFields, "532");
        if (updateFields.length === 0) {
          return res.status(400).json({
            success: false,
            message: "No fields to update",
          });
        }

        const updateQuery = `UPDATE course_videos SET ${updateFields.join(
          ", "
        )} WHERE coursevideo_id = ?`;

        db.query(updateQuery, [...updateValues, vid], (err, result) => {
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
          message: "Course video not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getChapterDataViaChid = (req, res) => {
  try {
    const chid = req.params.chid;
    const getQuery = `SELECT * FROM chapters WHERE ch_id = ?`;
    db.query(getQuery, chid, (err, result) => {
      if (err) {
        res.status(400).json({ error: "Invalid chapter ID" });
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const subscriptionPlan = (req, res) => {
  try {
    // Fetching the data from frontend to save in database
    const { userID, price, plane_id, user_name } = req.body;

    if (!userID || !price || !plane_id || !user_name) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    // Insert into userSubscription
    db.query(
      "INSERT INTO userSubscription (plane_id, user_id, user_name, price) VALUES (?, ?, ?, ?)",
      [plane_id, userID, user_name, price],
      (err, userResult) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error inserting into userSubscription",
            error: err,
          });
        }

        res.status(201).json({
          success: true,
          message: "Subscription added successfully",
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const subscriptionController = (req, res) => {
  try {
    const { currDate, expiryDate, plane_id, plan_name, price } = req.body;

    // Insert into subscriptionPlane
    db.query(
      "INSERT INTO subscriptionPlane (plane_id, plan_name, created_at, expiryDate, price) VALUES (?, ?, ?, ?, ?)",
      [plane_id, plan_name, currDate, expiryDate, price],
      (err, planeResult) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error inserting into subscriptionPlane",
            error: err,
          });
        }

        // If insertion successful
        return res.status(200).json({
          success: true,
          message: "Subscription plan inserted successfully",
          data: planeResult, // Optionally, send inserted data back if needed
        });
      }
    );
  } catch (err) {
    console.error("Error in subscriptionController:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const getSubscriptionPlans = (req, res) => {
  db.query("SELECT * FROM subscriptionPlane", (err, results) => {
    if (err) {
      console.error("Error fetching subscription plans:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch subscription plans",
        error: err,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription plans fetched successfully",
      data: results, // Assuming `results` is an array of subscription plans from the database
    });
  });
};
// invoice
const invoiceController = (req, res) => {
  try {
    const { action } = req.params;

    switch (action) {
      case "create":
        createInvoice(req, res);
        break;
      case "getAll":
        getAllInvoices(req, res);
        break;
      case "getById":
        getInvoiceById(req, res);
        break;
      case "update":
        updateInvoice(req, res);
        break;
      case "delete":
        deleteInvoice(req, res);
        break;
      default:
        res.status(404).json({ error: "Invalid action" });
    }
  } catch (err) {
    console.error("Error in invoiceController:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Function to create a new invoice
const createInvoice = (req, res) => {
  const { user_id, description, price, offer, gst_detail } = req.body;
  const insertQuery = `INSERT INTO invoices (user_id, description, price, offer, gst_detail) VALUES (?, ?, ?, ?, ?)`;
  const values = [user_id, description, price, offer, gst_detail];

  db.query(insertQuery, values, (error, results, fields) => {
    if (error) {
      console.error("Error creating invoice:", error);
      res.status(500).json({ error: "Failed to create invoice" });
      return;
    }

    // Fetch the inserted invoice to return as response
    const fetchQuery = `SELECT * FROM invoices WHERE invoice_no = ?`;
    db.query(
      fetchQuery,
      results.insertId,
      (fetchError, fetchResults, fetchFields) => {
        if (fetchError) {
          console.error("Error fetching created invoice:", fetchError);
          res.status(500).json({ error: "Failed to fetch created invoice" });
          return;
        }
        res.status(201).json(fetchResults[0]);
      }
    );
  });
};

// Function to get all invoices
const getAllInvoices = (req, res) => {
  const query = `SELECT * FROM invoices`;

  db.query(query, (error, results, fields) => {
    if (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ error: "Failed to fetch invoices" });
      return;
    }
    res.status(200).json(results);
  });
};

// Function to get invoice by ID
const getInvoiceById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM invoices WHERE invoice_no = ?`;
  db.query(query, id, (error, results, fields) => {
    if (error) {
      console.error("Error fetching invoice:", error);
      res.status(500).json({ error: "Failed to fetch invoice" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Invoice not found" });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Function to update invoice by ID
const updateInvoice = (req, res) => {
  const { id } = req.params;
  const { user_id, description, price, offer, gst_detail } = req.body;
  const updateQuery = `UPDATE invoices SET user_id = ?, description = ?, price = ?, offer = ?, gst_detail = ? WHERE invoice_no = ?`;
  const values = [user_id, description, price, offer, gst_detail, id];

  db.query(updateQuery, values, (error, results, fields) => {
    if (error) {
      console.error("Error updating invoice:", error);
      res.status(500).json({ error: "Failed to update invoice" });
      return;
    }

    // Fetch the updated invoice to return as response
    const fetchQuery = `SELECT * FROM invoices WHERE invoice_no = ?`;
    db.query(fetchQuery, id, (fetchError, fetchResults, fetchFields) => {
      if (fetchError) {
        console.error("Error fetching updated invoice:", fetchError);
        res.status(500).json({ error: "Failed to fetch updated invoice" });
        return;
      }
      if (fetchResults.length === 0) {
        res.status(404).json({ error: "Invoice not found" });
      } else {
        res.status(200).json(fetchResults[0]);
      }
    });
  });
};

// Function to delete invoice by ID
const deleteInvoice = (req, res) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM invoices WHERE invoice_no = ?`;

  db.query(deleteQuery, id, (error, results, fields) => {
    if (error) {
      console.error("Error deleting invoice:", error);
      res.status(500).json({ error: "Failed to delete invoice" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Invoice not found" });
    } else {
      res.status(204).end(); // Respond with 204 No Content on successful deletion
    }
  });
};

const removeCartItem = (req, res) => {
  try {
    const cit = req.params.cit;
    const selectQuery = "SELECT * FROM carts WHERE cart_id = ?";
    db.query(selectQuery, cit, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result.length > 0) {
        const removeQuery = "DELETE FROM carts WHERE cart_id = ?";
        db.query(removeQuery, cit, (err, result) => {
          if (err) {
            res.status(400).json({ success: false, message: err.message });
          }
          res
            .status(200)
            .json({ success: true, message: "Successfully removed" });
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "invalid cart item id" });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const boughtCourse = async (req, res) => {
  try {
    const {
      student_id,
      student_name,
      course_id,
      course_name,
      student_email,
      amount,
      status,
    } = req.body;
    console.log(status, "status 1118");
    // Retrieve the highest receipt number from the database
    const receiptQuery =
      "SELECT MAX(CAST(SUBSTRING_INDEX(receipt, '/', -1) AS SIGNED)) AS maxReceiptNum FROM bought_courses";

    // console.log("Receipt Query:", receiptQuery);
    db.query(receiptQuery, (receiptErr, receiptResult) => {
      if (receiptErr) {
        console.error("Error retrieving receipt:", receiptErr);
        res.status(500).json({ error: "Failed to create order" });
        return;
      }

      const maxReceiptNum = receiptResult[0].maxReceiptNum || 0;
      const newReceiptNum = maxReceiptNum + 1;
      console.log(newReceiptNum, "849");
      const newReceipt = `FRCP/2024-25/${newReceiptNum}`;

      // Retrieve the highest pay_id from the database with the '23_24' prefix
      const newPayIdQuery =
        "SELECT MAX(CAST(SUBSTRING_INDEX(buy_id, '/', -1) AS SIGNED)) AS maxPayIdNum FROM bought_courses";
      db.query(newPayIdQuery, (newPayIdErr, newPayIdResult) => {
        if (newPayIdErr) {
          console.error("Error retrieving maxPayIdNum:", newPayIdErr);
          res.status(500).json({ error: "Failed to create order" });
          return;
        }

        const maxPayIdNum = newPayIdResult[0].maxPayIdNum;
        console.log(maxPayIdNum, "626");
        const newPayIdNum = maxPayIdNum + 1;
        console.log(newPayIdNum, "628");
        const newPayId = `FRM/2024-25/${newPayIdNum}`;

        // Insert the new order with the generated receipt and updated pay_id
        const insertQuery =
          "INSERT INTO bought_courses (buy_id, student_id, student_name, course_id, course_name,	student_email, receipt, amount,	status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(
          insertQuery,
          [
            newPayId,
            student_id,
            student_name,
            course_id,
            course_name,
            student_email,
            newReceipt,
            amount,
            status,
          ],
          (insertErr, insertResult) => {
            if (insertErr) {
              console.error("Error creating order:", insertErr);
              res.status(500).json({ error: "Failed to create order" });
              // logger.registrationLogger.log(
              //   "error",
              //   "Failed to create order",
              //   error
              // );
            } else {
              const orderId = insertResult.insertId;
              const order = {
                id: orderId,
                name: student_name,
                receipt: newReceipt,
                amount: amount,
                currency: "INR",
                status: status,
              };
              res.status(201).send(order);
              // logger.registrationLogger.log(
              //   "info",
              //   "Payment order created",
              //   order
              // );
            }
          }
        );
      });
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
    // logger.registrationLogger.log("error", "Failed to create order", error);
  }
};

const clearCart = (req, res) => {
  try {
    const uid = req.params.uid;
    const deleteQuery = "DELETE FROM carts WHERE user_id = ?";
    db.query(deleteQuery, uid, (err, results) => {
      if (err) {
        console.error("Error executing DELETE query:", err);
        return res.status(500).json({ error: "Database query error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "user not found" });
      }

      return res.status(200).json({ message: "cart deleted successfully" });
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to delete cart" });
  }
};

const getCourseAboutData = (req, res) => {
  try {
    const cid = req.params.cid;
    const selectQuery = "SELECT * FROM course_about WHERE course_id = ?";
    db.query(selectQuery, cid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "internal server error" });
  }
};

const addCourseReviews = (req, res) => {
  try {
    const cid = req.params.cid;
    const uid = req.params.uid;
    const { name, review_details, stars } = req.body;
    const time = moment.tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");

    const selectQuery =
      "SELECT * FROM course_review WHERE course_id = ? AND user_id = ?";
    db.query(selectQuery, [cid, uid], (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      if (result.length > 0) {
        res.status(400).json({
          success: false,
          message: "your have already reviewed this course.",
        });
      } else {
        const insertQuery =
          "INSERT INTO course_review (course_id, user_id,	name,	review_details,	stars, datetime) VALUES (?, ?, ?, ?, ?, ?)";
        const insertParams = [cid, uid, name, review_details, stars, time];
        db.query(insertQuery, insertParams, (err, result) => {
          if (err) {
            res.status(400).json({ success: false, message: err.message });
          } else {
            res.status(200).json({
              success: true,
              message: "Review Submitted Successfully",
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "internal server error" });
  }
};

const getCourseReviews = (req, res) => {
  try {
    const cid = req.params.cid;
    const selectQuery = "SELECT * FROM course_review WHERE course_id = ?";
    db.query(selectQuery, cid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getCourseFaq = (req, res) => {
  try {
    const cid = req.params.cid;
    const selectQuery = "SELECT * FROM course_faq WHERE course_id = ?";
    db.query(selectQuery, cid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(200).json({ success: false, message: "internal server error" });
  }
};

const getAllReview = (req, res) => {
  try {
    const selectQuery = "SELECT * FROM course_review";
    db.query(selectQuery, (err, result) => {
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
  invoiceController,
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  subscriptionPlan,
  subscriptionController,
  getSubscriptionPlans,
  addToCart,
  getAllCourses,
  coursePage,
  videoListViaCourseId,
  getCartItems,
  getChapterViaId,
  getVideoViaVideoID,
  updateCourseVideoDetails,
  getChapterDataViaChid,
  removeCartItem,
  boughtCourse,
  clearCart,
  getCourseAboutData,
  addCourseReviews,
  getCourseReviews,
  getCourseFaq,
  getAllReview,
};
