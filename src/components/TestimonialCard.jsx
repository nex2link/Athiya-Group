const TestimonialCard = ({ image, name, testimonial }) => {
    return (
      <div className="bg-white p-6 rounded-3xl flex flex-col items-center text-center shadow-lg">
        <img 
          src={image} 
          alt={name} 
          className="w-24 h-24 rounded-full mb-4"
        />
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-gray-600 text-sm">{testimonial}</p>
      </div>
    );
  };
  
  export default TestimonialCard;