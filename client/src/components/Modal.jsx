// src/components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
				{children}
				<button
					onClick={onClose}
					className="mt-4 bg-neon-green font-worksans font-bold text-neutral-800 px-4 py-2 rounded">
					Close
				</button>
			</div>
		</div>
	);
};

export default Modal;
