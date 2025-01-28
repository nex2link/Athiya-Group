import React from 'react';

const InvestmentOpportunities = () => {
  const cards = [
    {
      id: 1,
      text: "High ROI potential due to increasing demand for residential and commercial spaces.",
      style: "md:col-start-3 md:col-span-2 md:row-start-1"
    },
    {
      id: 2,
      text: "Proximity to key business districts and industrial zones makes Maha Mumbai a magnet for investors.",
      style: "md:col-start-4 md:col-span-2 md:row-start-2"
    },
    {
      id: 3,
      text: "Ongoing developments in healthcare, education, and leisure increase the quality of life.",
      style: "md:col-start-3 md:col-span-2 md:row-start-3"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-5 gap-8 relative">
        {/* Title Section */}
        <div className="md:col-span-2 md:sticky top-16 h-fit">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Unmatched Investment
            <br />
            Opportunities
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="md:col-span-3 grid gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`bg-gray-50 rounded-3xl max-w-64 p-6 pt-28 shadow-md transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${card.style}`}
            >
              <p className="text-gray-800 text-lg">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentOpportunities;