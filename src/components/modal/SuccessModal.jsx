import React from "react";
import { BiCheck } from "react-icons/bi";

const SuccessModal = ({ setIsModalOpen }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-10">
        <div className="text-center mb-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <BiCheck />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mt-3">
            Bill Generated Successfully!
          </h3>
          <p className="text-gray-500 mt-1">
            Your bill has been created and saved.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(false)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
