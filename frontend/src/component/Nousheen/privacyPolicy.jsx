import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-semibold text-center mb-6 text-red-700">Privacy Policy</h1>

        <div className="border-t-2 border-gray-200 pt-4">
          <p className="text-gray-700 mb-4">
            Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
          </p>
          <p className="text-gray-700 mb-4">
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
          </p>
          <p className="text-gray-700 mb-4">
            We don't share any personally identifying information publicly or with third-parties, except when required to by law.
          </p>
          <p className="text-gray-700 mb-4">
            Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
          </p>
          <p className="text-gray-700 mb-4">
            You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
          </p>
          <p className="text-gray-700 mb-4">
            Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
          </p>
          <p className="text-gray-700">
            This policy is effective as of 1 January 2024.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;