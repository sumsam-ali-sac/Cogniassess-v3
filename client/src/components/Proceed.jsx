// import React from "react";

// import React from "react";
// import { Link } from "react-router-dom";
// import { useDomains } from '../contexts/DomainContext';  // Make sure to import the context if not already imported

// const Proceed = ({ domainName , questions }) => {

//   return (
//     <div>
//         <Link
//           key={domainName}
//           to={`/assessment/${domainName}`}
//           className="block mb-2 text-neon-green hover:text-blue-600"
//         >
//           Go to {domain.name}
//         </Link>

//     </div>
//   );
// };

// export default Proceed;

// const Proceed = ({ domainName , questions }) => {
// 	return (
import React from "react";
import { Link } from "react-router-dom";

const Proceed = ({ domainName }) => {
	return (
		<Link
			to={`/technical-questions/${domainName}`}
			className="text-neon-green hover:text-white transition duration-300 ease-in-out transform hover:scale-120">
			<button>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-6 h-6">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M8.25 4.5l7.5 7.5-7.5 7.5"
					/>
				</svg>
			</button>
		</Link>
	);
};

export default Proceed;
