import { useState } from "react";

import ContactForm from "./ContactForm";
import Modal from "./Modal"


const ContactModal = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#0F1F14] text-yellow-400 px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-[#0F1F14] transition-colors duration-300 shadow-lg"
        >
          Contact Us
        </button>
  
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ContactForm />
        </Modal>
      </>
    );
  };
  
  export default ContactModal;