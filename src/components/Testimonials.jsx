// Testimonials.jsx
import TestimonialCard from "./TestimonialCard";
import testimg1 from "../assets/test-1.jpg";
import testimg2 from "../assets/test-2.jpg";
import testimg3 from "../assets/test-3.jpg";

  const Testimonials = () => {
    const testimonials = [
      {
        image: testimg1,
        name: "Mr. Arvind Bhupi",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut labore et dolore magna aliqua ut labore et dolore magna"
      },
      {
        image: testimg2,
        name: "Mr. Arvind Bhupi",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut labore et dolore magna aliqua ut labore et dolore magna"
      },
      {
        image: testimg3,
        name: "Mr. Arvind Bhupi",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut labore et dolore magna aliqua ut labore et dolore magna"
      }
    ];
  
    return (
      <section className=" mx-auto px-4 py-16 bg-[#B7BEBA]">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say About Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>
    );
  };

  export default Testimonials;