// FAQ.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FAQItem from './FAQItem';
import { useInView } from 'react-intersection-observer';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const faqs = [
    {
      question: "What is a 7/12 extract, and why is it important?",
      answer: "It's a land document detailing ownership, land use, and cultivable area, essential for verifying authenticity and avoiding disputes."
    },
    {
      question: "How do I ensure the accuracy of a Comprehensive Search",
      answer: "A comprehensive search involves thorough verification of property documents, historical records, and current legal status. Always engage qualified professionals and cross-reference multiple sources."
    },
    {
      question: "Why is publishing jahiranama in a local newspaper necessary?",
      answer: "Publishing jahiranama helps notify the public about property transactions, ensuring transparency and allowing potential claimants to raise objections within a specified timeframe."
    },
    {
      question: "What are real estate land zones, and why are they important?",
      answer: "Land zones are designated areas with specific development regulations. They determine permitted land use, construction limits, and future development potential, directly impacting property value and usage rights."
    },
    {
      question: "How does a land survey help in purchases?",
      answer: "Land surveys provide accurate measurements, boundaries, and topographical details. They help identify encroachments, verify plot size, and ensure compliance with local regulations."
    },
    {
      question: "What are the key steps before buying land?",
      answer: "Key steps include title verification, document authenticity check, land survey, zoning confirmation, encumbrance check, and obtaining necessary clearances from local authorities."
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gray-50">
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about real estate processes
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            className="space-y-3 sm:space-y-4"
            variants={containerVariants}
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={index === openIndex}
                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default FAQ;