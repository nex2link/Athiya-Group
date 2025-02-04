import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: false });

  // Your Google Form URL - replace with your actual URL
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdIEBG9jMSXKfqccEqOwRwFnyxQ8RjRSjREKMTEFGsTmal5jQ/formResponse';
  
  // Entry IDs from your Google Form - replace with your actual entry IDs
  const GOOGLE_FORM_FIELDS = {
    name: 'entry.1183939645',
    email: 'entry.1182948250',
    phone: 'entry.2105092524',
    message: 'entry.1868596371'
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setSubmitStatus({ success: false, error: false });

    if (!validateForm()) {
      return;
    }

    try {
      const formDataObj = new FormData();
      Object.keys(GOOGLE_FORM_FIELDS).forEach(key => {
        formDataObj.append(GOOGLE_FORM_FIELDS[key], formData[key]);
      });

      // Submit to Google Form
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataObj
      });

      // Reset form and show success message
      setSubmitStatus({ success: true, error: false });
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Optional: Close modal after successful submission
      // if (onClose) onClose();
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ success: false, error: true });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
      
      {submitStatus.success && (
        <div className="mb-4 p-4 rounded-md bg-green-50 text-green-800 border border-green-200">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}

      {submitStatus.error && (
        <div className="mb-4 p-4 rounded-md bg-red-50 text-red-800 border border-red-200">
          Sorry, there was an error submitting your message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;