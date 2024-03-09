import React, { useState } from "react";
import Portal from "./../Portal";
import Search from "../components/page/Search";
const PortalModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    console.log("I am clicked");
  };
  return (
    <div
      className="relative border border-black mb-5 p-2 w-64 h-20 overflow-hidden"
      onClick={handleClick}
    >
      <button
        className="bg-black text-white p-1 border rounded-md"
        onClick={() => setShowModal(true)}
      >
        Modal using React Portal
      </button>
      <Portal>
        {showModal && <Search onClose={() => setShowModal(false)} />}
      </Portal>
    </div>
  );
};

export default PortalModal;
