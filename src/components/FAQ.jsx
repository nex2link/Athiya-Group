import { useState } from 'react';
import FAQitem from './FAQitem';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is a 7/12 extract, and why is it important?",
      answer: "It's a land document detailing ownership, land use, and cultivable area, essential for verifying authenticity and avoiding disputes."
    },
    {
      question: "How do I ensure the accuracy of a Comprehensive Search",
      answer: "..."
    },
    {
      question: "Why is publishing jahiranama in a local newspaper necessary?",
      answer: "..."
    },
    {
      question: "What are real estate land zones, and why are they important?",
      answer: "..."
    },
    {
      question: "How does a land survey help in purchases?",
      answer: "..."
    },
    {
      question: "What are the key steps before buying land?",
      answer: "..."
    },

  ];

  return (
    <div className="max-w-2xl mx-auto  py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <FAQitem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={index === openIndex}
            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
