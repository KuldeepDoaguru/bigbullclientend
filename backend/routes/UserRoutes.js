const express = require("express");
const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");
const { dirname } = require("path");
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
  getAllReview,
  addToCart,
  coursePage,
  getAllCourses,
  videoListViaCourseId,
} = require("../controllers/ItemController.js");
const invoiceController = require("../controllers/ItemController.js"); //import all invoice function through this
const router = express.Router();

router.get("/getCartItems/:userId", getCartItems);
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
router.get("/getAllReview", getAllReview);
router.post("/add-to-cart/:user_id/:item_id", addToCart);
router.get("/getAllCourses", getAllCourses);
router.get("/coursePage/:courseId", coursePage);
router.get(`/videoListViaCourseId/:courseId/:chid`, videoListViaCourseId);

module.exports = router;
