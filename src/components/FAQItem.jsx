// FAQItem.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      }
    },
    exit: {
      opacity: 0,
      y: -10,
    }
  };

  const contentVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
    },
    visible: { 
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
        },
        opacity: {
          duration: 0.25,
          delay: 0.15,
        }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.4,
        },
        opacity: {
          duration: 0.25,
        }
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <button
        className="w-full flex justify-between items-center p-4 sm:p-5 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900 text-base sm:text-lg pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5 pt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;