const express = require("express");
const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");
const { dirname } = require("path");
const {
  getUserViaId,
  updateUsers,
  verifyOtp,
  deleteUser,
  getUserViaEmail,
} = require("../controllers/authController.js");
const {
  getCartItems,
  getChapterViaId,
  getVideoViaVideoID,
  updateCourseVideoDetails,
  getChapterDataViaChid,
  subscriptionPlan,
  subscriptionController,
  getSubscriptionPlans,
  removeCartItem,
  deleteInvoice,
  updateInvoice,
  getInvoiceById,
  getAllInvoices,
  createInvoice,
  boughtCourse,
  clearCart,
  getCourseAboutData,
  addCourseReviews,
  getCourseReviews,
  getCourseFaq,
} = require("../controllers/ItemController.js");
const invoiceController = require("../controllers/ItemController.js"); //import all invoice function through this
const router = express.Router();

router.get("/getUserViaEmail", getUserViaEmail);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profilePicture/");
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
router.put(
  "/update-users-details/:id",
  upload.single("profilePicture"),
  updateUsers
);
router.get("/getUserViaId/:id", getUserViaId);
router.get("/getCartItems/:userId", getCartItems);
router.post("/verifyOtp", verifyOtp);
router.delete("/deleteUser/:userId", deleteUser);
router.post("/subscriptionPlan", subscriptionPlan);
router.post("/subscriptionController", subscriptionController);
router.get("/getSubscriptionPlans", getSubscriptionPlans);

// Routes for invoices
router.post("/createInvoice", createInvoice);
router.get("/getAllInvoice", getAllInvoices);
router.get("/getByIdInvoice/:id", getInvoiceById);
router.put("/updateInvoice/:id", updateInvoice);
router.delete("/deleteInvoice/:id", deleteInvoice);
router.get("/getChapterViaId/:cid", getChapterViaId);
router.get("/getVideoViaVideoID/:vid", getVideoViaVideoID);
router.get("/getChapterDataViaChid/:chid", getChapterDataViaChid);
router.delete("/removeCartItem/:cit", removeCartItem);
router.post("/boughtCourse", boughtCourse);
router.delete("/clearCart/:uid", clearCart);
router.get("/getCourseAboutData/:cid", getCourseAboutData);
router.post("/addCourseReviews/:cid/:uid", addCourseReviews);
router.get("/getCourseReviews/:cid", getCourseReviews);
router.get("/getCourseFaq/:cid", getCourseFaq);

module.exports = router;
