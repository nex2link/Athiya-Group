  import React, { useState } from "react";
  import buildingimg from "../assets/building.webp";

  const ContactUs = () => {
    const [formData, setFormData] = useState({
      fullName: "",
      number: "",
      email: "",
      enquiry: "",
      message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("");

    const FORM_ID = "1FAIpQLSdIEBG9jMSXKfqccEqOwRwFnyxQ8RjRSjREKMTEFGsTmal5jQ";
    const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus("");

      try {
        const iframe = document.createElement("iframe");
        iframe.name = "hidden_iframe";
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        //create the form

        const form = document.createElement("form");
        form.method = "POST";
        form.action = GOOGLE_FORM_ACTION;
        form.target = "hidden_iframe";

        //add form fields
        const formFields = {
          "entry.1183939645": formData.fullName,
          "entry.2105092524": formData.number,
          "entry.1182948250": formData.email,
          "entry.1048466784": formData.enquiry,
          "entry.1868596371": formData.message,
        };
        Object.entries(formFields).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();

        //cleanup
        setTimeout(() => {
          document.body.removeChild(form);
          document.body.removeChild(iframe);
        }, 500);

        // Reset form and show success message
        setFormData({
          fullName: "",
          number: "",
          email: "",
          enquiry: "",
          message: "",
        });
        setSubmitStatus("success");

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("");
        }, 5000);
      } catch (error) {
        console, error("Submission error:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="container mx-auto px-4 py-8 mt-14">
        <div className="flex flex-col lg:flex-row min-h-[600px] rounded-3xl overflow-hidden shadow-xl">
          {/* Left side with background image */}
          <div className="relative w-full lg:w-1/2 h-48 lg:h-auto">
            <img
              src={buildingimg}
              alt="City buildings"
              className="w-full h-full object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-12">
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-gray-200 max-w-md">
                Get in touch with us for any questions about our projects
              </p>
            </div>
          </div>

          {/* Right side with form */}
          <div className="w-full lg:w-1/2 bg-[#1a2e1a] p-6 lg:p-8 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
            <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-6 lg:mb-8">
              Still haven't found what you are looking for?
            </h2>

            {submitStatus === "success" && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Thank you! Your message has been successfully submitted. We'll
                    contact you soon.
                  </span>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Something went wrong. Please try again later.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500 transition-shadow"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="number"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Number
                  </label>
                  <input
                    type="tel"
                    name="number"
                    id="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500 transition-shadow"
                    placeholder="Enter your contact number"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500 transition-shadow"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="enquiry"
                  className="block text-white text-sm font-medium mb-2"
                >
                  I want to Enquire for
                </label>
                <select
                  name="enquiry"
                  id="enquiry"
                  value={formData.enquiry}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500 transition-shadow"
                  required
                >
                  <option value="">Select a project</option>
                  <option value="Maha Mumbai">Third New Town</option>
                  <option value="AGRow eco">AGRow eco</option>
                  <option value="Samarth Hill">Samarth Hill</option>
                  <option value="Shivsparash">Shivsparash</option>
                  <option value="Shivsparash">The Farm Dale</option>
                  <option value="dapoli 712">Dapoli 712</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500 transition-shadow min-h-[80px] resize-y"
                  placeholder="Add your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-white text-[#1a2e1a] px-8 lg:px-14 py-3 rounded-xl font-medium 
                        hover:bg-gray-100 transition-all duration-200 shadow-lg 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default ContactUs;
