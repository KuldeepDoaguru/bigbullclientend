import { useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import AddReview from "../AddReview";

const CourseReviews = ({ review, courseId }) => {
  // console.log(review);
  const [addReviewPop, setAddReviewPop] = useState(false);

  return (
    <>
      <section className="bg-white shadow-lg p-6 rounded-lg mb-6">
        <div className="flex mb-4">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <button
            className="btn btn-success mx-2"
            onClick={() => setAddReviewPop(true)}
          >
            {review.length === 0
              ? "Be the first to submit review"
              : "Write a review"}
          </button>
        </div>

        <div className="space-y-4">
          {review?.map((item) => (
            <>
              <div>
                <h2 className="flex">
                  {/* {item.stars} */}
                  <IoStarSharp className={`text-yellow-400 text-2xl mx-1`} />
                  <IoStarSharp
                    className={`${
                      item.stars >= 2 ? "text-yellow-400" : "text-gray-300"
                    } text-2xl mx-1`}
                  />
                  <IoStarSharp
                    className={`${
                      item.stars >= 3 ? "text-yellow-400" : "text-gray-300"
                    } text-2xl mx-1`}
                  />
                  <IoStarSharp
                    className={`${
                      item.stars >= 4 ? "text-yellow-400" : "text-gray-300"
                    } text-2xl mx-1`}
                  />
                  <IoStarSharp
                    className={`${
                      item.stars === 5 ? "text-yellow-400" : "text-gray-300"
                    } text-2xl mx-1`}
                  />
                </h2>
                <h3 className="font-bold text-lg mt-2">
                  {item?.name.toUpperCase()}
                </h3>
                <p className="text-gray-600">{item?.review_details}</p>
              </div>
            </>
          ))}
        </div>
        {addReviewPop && (
          <AddReview
            onClose={() => setAddReviewPop(false)}
            courseId={courseId}
          />
        )}
      </section>
    </>
  );
};

export default CourseReviews;
