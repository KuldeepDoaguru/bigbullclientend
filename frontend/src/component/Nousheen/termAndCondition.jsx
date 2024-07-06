import React from 'react';

const Section = ({ number, title, titleColor, children }) => (
  <div className="my-8 p-6 bg-gray-100 rounded-lg shadow-lg">
    <h2 className={`text-2xl font-bold mb-4 ${titleColor}`}>
      {number}. {title}
    </h2>
    <p className="mb-4 text-gray-700">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo expedita minima architecto adipisci atque neque libero facilis officia blanditiis provident repudiandae numquam earum dolor.
      <br /><br />
      {children}
    </p>
  </div>
);

const InfoBlock = () => (
  <div className="ml-4 mb-4 p-4 bg-white rounded-lg shadow">
    <p className="font-bold text-indigo-600">Some service info</p>
    <p className="text-gray-600">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ducimus praesentium deserunt vitae molestias, id illum! Atque nostrum omnis.
    </p>
  </div>
);

const TermCondition = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 style={{fontFamily: "Futura-bold"}} className="text-3xl font-bold text-center mb-8 text-red-600">Terms And Conditions</h1>
    <div className="mb-4 text-center">
      <p className="mb-2 font-bold text-lg text-gray-500">Welcome to Spangle</p>
      <p className="text-left text-gray-600">
        Add some terms here, for example: "These terms govern your use of Spangle and the Spangle applications, products and services that we offer (the Spangle Product or Products), except where we
        expressly state that separate Terms (and not these) apply."
      </p>
      <br />
      <p className="text-left text-gray-600">
        Would appreciate you visiting spangle.com.au to click around and help my SEO:)
      </p>
    </div>

    <Section number="1" title="Our services" titleColor="text-red-500">
      <InfoBlock />
      <InfoBlock />
      <InfoBlock />
      <InfoBlock />
      <InfoBlock />
      <InfoBlock />
    </Section>

    <Section number="2" title="Lorem ipsum" titleColor="text-blue-500">
      <InfoBlock />
      <InfoBlock />
      <InfoBlock />
    </Section>

    <Section number="3" title="Lorem ipsum" titleColor="text-green-500">
      <InfoBlock />
      <InfoBlock />
      <InfoBlock />
    </Section>

    <Section number="4" title="Lorem ipsum" titleColor="text-purple-500">
      <InfoBlock />
      <InfoBlock />
      <InfoBlock />
    </Section>
  </div>
);

export default TermCondition;