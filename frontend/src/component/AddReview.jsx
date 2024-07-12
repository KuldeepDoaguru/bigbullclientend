import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoStarSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";

const AddReview = ({ onClose, courseId, getReviews }) => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [starscount, setStarscount] = useState(0);
  const [reviewData, setReviewData] = useState("");
  console.log(courseId);

  const reviewDetails = {
    name: user.name,
    review_details: reviewData,
    stars: starscount,
  };

  console.log(reviewDetails);
  const submitReview = async () => {
    try {
      const res = await axios.post(
        `http://localhost:6060/api/v1/auth/addCourseReviews/${courseId}/${user.id}`,
        reviewDetails
      );
      alert("Review added successfully! Thanks!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      cogoToast.error(error.response.data.message);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="">
                <div className="flex justify-center">
                  <button className="" onClick={() => setStarscount(1)}>
                    <IoStarSharp
                      className={`${
                        starscount >= 1 ? "text-yellow-400" : "text-gray-500"
                      } text-4xl mx-2 hover:text-yellow-400`}
                    />
                  </button>
                  <button className="" onClick={() => setStarscount(2)}>
                    <IoStarSharp
                      className={`${
                        starscount >= 2 ? "text-yellow-400" : "text-gray-500"
                      } text-4xl mx-2 hover:text-yellow-400`}
                    />
                  </button>
                  <button className="" onClick={() => setStarscount(3)}>
                    <IoStarSharp
                      className={`${
                        starscount >= 3 ? "text-yellow-400" : "text-gray-500"
                      } text-4xl mx-2 hover:text-yellow-400`}
                    />
                  </button>
                  <button className="" onClick={() => setStarscount(4)}>
                    <IoStarSharp
                      className={`${
                        starscount >= 4 ? "text-yellow-400" : "text-gray-500"
                      } text-4xl mx-2 hover:text-yellow-400`}
                    />
                  </button>
                  <button className="" onClick={() => setStarscount(5)}>
                    <IoStarSharp
                      className={`${
                        starscount >= 5 ? "text-yellow-400" : "text-gray-500"
                      } text-4xl mx-2 hover:text-yellow-400`}
                    />
                  </button>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Write a Review
                  </DialogTitle>
                  <div className="mt-2">
                    <textarea
                      name="reviewData"
                      value={reviewData}
                      id=""
                      onChange={(e) => setReviewData(e.target.value)}
                      className="border rounded w-96 p-2"
                      placeholder="write a review here"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={submitReview}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Submit
              </button>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddReview;
