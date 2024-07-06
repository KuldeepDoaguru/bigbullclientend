import React from "react";

const CourseModules = ({
  course,
  activeModuleIndex,
  setActiveModuleIndex,
  activeVideoUrl,
  setActiveVideoUrl,
}) => {
  return (
    <section className="bg-white shadow-lg p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Course Modules</h2>
      {course.modules.map((module, moduleIndex) => (
        <div key={moduleIndex}>
          <h3
            className="text-xl font-bold cursor-pointer mb-2"
            onClick={() =>
              setActiveModuleIndex(
                activeModuleIndex === moduleIndex ? null : moduleIndex
              )
            }
          >
            {module.title}
          </h3>
          {activeModuleIndex === moduleIndex && (
            <ul className="list-disc list-inside mb-4">
              {module.submodules.map((submodule, submoduleIndex) => (
                <li
                  key={submoduleIndex}
                  className="cursor-pointer text-blue-600"
                  onClick={() => setActiveVideoUrl(submodule.videoUrl)}
                >
                  {submodule.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {activeVideoUrl && (
        <div className="mt-4">
          <h4 className="text-lg font-bold mb-2">Video</h4>
          <iframe
            width="560"
            height="315"
            src={activeVideoUrl}
            title="Course Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </section>
  );
};

export default CourseModules;
