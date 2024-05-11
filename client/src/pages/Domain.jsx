import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaRocket } from "react-icons/fa";
import DomainCard from "../components/DomainCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDomains } from "../redux/domains/domainsSlice";
import { setSelectedRole } from "../redux/roles/rolesSlice";

function Domain() {
	const [domains, setDomains] = useState([]);
	const [selectedDomains, setSelectedDomainsState] = useState({});
	const [searchTerm, setSearchTerm] = useState("");

	const { roleName } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.user);
	useEffect(() => {
		if (!user) {
			navigate("/sign-in");
		}
	}, [user, navigate]);

	const searchDomains = (event) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		const fetchDomains = async () => {
			try {
				const encodedRole = encodeURIComponent(roleName);
				const response = await axios.get(
					`/api/node/domains/search?role=${encodedRole}`
				);
				setDomains(response.data.domains);
				dispatch(setSelectedRole(roleName));
			} catch (error) {
				console.error(
					"Failed to fetch domains for role:",
					roleName,
					error
				);
			}
		};

		if (roleName) {
			fetchDomains();
		}
	}, [roleName]);

	const toggleDomainSelection = (domain) => {
		setSelectedDomainsState((prev) => {
			const newSelectedDomains = { ...prev };
			if (newSelectedDomains[domain.DomainId]) {
				delete newSelectedDomains[domain.DomainId];
			} else {
				newSelectedDomains[domain.DomainId] = {
					id: domain.DomainId,
					name: domain.DomainName,
					status: "Not started yet",
					iconPath: domain.IconPath,
					progress: 0,
				};
			}
			console.log(newSelectedDomains);
			return newSelectedDomains;
		});
	};

	const filteredDomains = domains.filter((domain) =>
		domain.DomainName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleStartClick = () => {
		dispatch(setSelectedDomains(selectedDomains));
		navigate("/upload-cv");
	};
	return (
		<div>
			<Navbar />
			<main className="bg-dark-gray text-white min-h-screen">
				<section className="bg-dark-gray p-5">
					<div className="text-left mx-auto w-5/6 mt-20">
						<h1 className="text-3xl md:text-4xl font-rubic font-black text-neon-green mb-5 leading-snug">
							Browse <span className="text-white"> Domains</span>
						</h1>
						<p className="font-worksans md:tracking-wide text-xl md:text-xl text-white mt-2">
							Choose up to 10 domains that align with your
							requirement to generate personalized assessments
							based on your CV and selected role.
						</p>
					</div>
					<div className="flex justify-center items-center my-4">
						<input
							type="text"
							id="domainSearch"
							onChange={searchDomains}
							placeholder="Search domain"
							className="h-12 px-4 font-worksans md:tracking-wider text-l md:text-l text-white bg-dark-gray border border-neutral-700 rounded-full w-5/6"
						/>
					</div>
				</section>

				<section className="bg-dark-gray text-center">
					<div className="bg-neutral-800 w-full p-5">
						<h3 className="font-worksans text-white text-xl md:tracking-wider font-bold">
							Domains
						</h3>
					</div>
					<div className="border-b border-2 border-neutral-600 ml-40 mr-40"></div>

					<div className="flex flex-wrap justify-center p-5">
						{filteredDomains.map((domain, index) => (
							<DomainCard
								key={index}
								title={domain.DomainName}
								imgSrc={domain.iconPath}
								onClick={() => toggleDomainSelection(domain)}
								isSelected={!!selectedDomains[domain.DomainId]}
							/>
						))}
					</div>

					<div className="flex justify-center lg:my-0">
						<button
							onClick={handleStartClick}
							className="flex items-center justify-center text-center bg-neon-green text-black font-worksans text-xl md:tracking-wider py-3 px-4 mb-10 rounded-lg transition-colors border-2 border-neon-green hover:bg-dark-gray hover:text-neon-green w-1/4 lg:w-1/6 md:w-1/2 sm:w-1/2">
							<FaRocket className="mr-3" />
							<span>Start</span>
						</button>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default Domain;
