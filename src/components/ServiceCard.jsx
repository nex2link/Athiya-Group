const ServiceCard = ({ title, description }) => {
  return (
    <div className="flex flex-col items-start gap-3 md:gap-4 text-center w-full">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0A2919]" />
      <div>
        <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{title}</h3>
        <p className="text-gray-600 text-xs md:text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;