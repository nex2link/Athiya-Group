const ServiceCard = ({ title, description }) => {
    return (
      <div className="flex flex-col items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-[#0A2919]" />
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    );
  };

  export default ServiceCard;