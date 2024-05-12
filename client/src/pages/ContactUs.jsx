import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

function ContactUS() {
	return (
		<div className="bg-dark-gray">
			<Navbar />
			<ContactForm />
			<Footer />
		</div>
	);
}

export default ContactUS;
