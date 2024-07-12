import React from "react";

const CourseFAQs = ({ courseFaq }) => {
  // console.log(courseFaq);
  return (
    <section className="bg-white shadow-lg p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">FAQs</h2>
      <div className="space-y-4">
        {courseFaq?.map((item) => (
          <>
            <div>
              <h3 className="font-bold text-lg hover:text-red-700 hover:text-xl transform transition-all duration-300 ease-in-out">
                {item.question.toUpperCase()}
              </h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default CourseFAQs;
