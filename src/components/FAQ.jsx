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
      question: "Is agricultural land a good investment ?",
      answer: "Agricultural land is considered a good investment. It is considered that you invest in land and wait for better returns."
    },
    {
      question: "Can nonfarmers buy agricultural land ?",
      answer: "Anyone can buy agricultural land but we need to have a farmer's certificate for buying. If a person has his agricultural land in the village then he should have a farmer's certificate."
    },
    {
      question: "What is the legal requirement for using fertile agriculture land for purpose other than agricultural in India ?",
      answer: "Under the provisions of the law in India, fertile agricultural land could only be used for agricultural purposes and nothing else. To use it for a purpose other than that i.e. residential, commercial, or industrial use, the owner has to seek approval from the authorities concerned and change the land use"
    },
    {
      question: "What is an agreement for sale ?",
      answer: "After the verification of all the documents, a written agreement on the cost, advance payment, and the time within which the actual sale will take place is made. The agreement must be drawn by a lawyer and should be signed by both the parties and two witnesses. It begs mention here that the agreement to sale document is the precursor to the sale deed. Based on the terms and conditions established in this document, the future deal is likely to proceed consequently, it becomes extremely crucial to set the terms carefully and go through each clause diligently to fully understand its implications before the signing of the agreement to sell"
    },
    {
      question: "What is the procedure for the N.A. plot ?",
      answer: "The procedure for obtaining a Non-Agricultural (N.A.) plot in India typically involves the following step Land Conversion: If the land is originally classified as agricultural land, the owner needs to apply for land conversion to change its classification to non-agricultural. This step involves seeking approval from the concerned authorities, such as the Revenue or Land Development Department of the state government. Application Submission: The owner must submit an application for land conversion, providing all necessary documents and information as required by the respective state's laws and regulations. These documents may include proof of ownership, a survey map of the land, and details of the proposed non-agricultural use. Verification and Inspection: The authorities will conduct a verification and inspection of the land to ensure that it meets the criteria for conversion to non-agricultural use. They may also assess the impact of the proposed use on the surrounding environment and infrastructure. Public Notice and Objections: In some cases, a public notice may be issued to inform the local community about the proposed land conversion. This allows the public to raise objections or concerns regarding the change of land use within a specific period. Clearance and NOC: Once the verification process is complete, and any objections are addressed, the authorities may issue a clearance or a No Objection Certificate (NOC) for the land to be used for non-agricultural purposes. Payment of Conversion Fees: There might be conversion fees or charges that the landowner needs to pay to the government as per the prevailing rules. Record Update: After obtaining the necessary clearance and paying the required fees, the land records are updated to reflect the new non-agricultural status of the plot. It is important to note that the specific procedures and regulations may vary from state to state in India, as land-related matters are typically governed by state laws. Therefore, it is advisable for landowners to consult with local authorities or legal experts to ensure compliance with the particular procedures applicable in their region"
    },
    {
      question: "What is the difference between R-zone & NA plot ?",
      answer: "If govt decides to convert the plots to R-zoe then you don't have to pay any fees for conversion to NA plot. Conversion charges vary from state to state you have to confirm the charges from the district collector office."
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