const DomainCard = ({ title, imgSrc, onClick, isSelected }) => (
	<div
		className={`bg-neutral-800 rounded-3xl text-white m-3 box-border transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 flex flex-col items-center md:w-1/5 lg:w-1/5 xl:w-1/5 2xl:w-1/5 ${
			isSelected ? "border-4 border-neon-green" : ""
		}`}
		onClick={onClick}>
		<div className="mb-4">
			<img src={imgSrc} alt={title} className="h-auto w-auto" />
			{/* <img src="/Domain.png" alt={title} className="h-auto w-auto" /> */}
		</div>
		<div className="role-title text-center text-xl font-bold mb-3 tracking-normal font-worksans">
			{title}
		</div>
	</div>
);

export default DomainCard;
