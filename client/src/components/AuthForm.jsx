const AuthForm = ({ title, children, onGoogleAuthClick }) => {
	return (
		<div className="w-full max-w-xs bg-[#2b2b2b] rounded-lg text-white text-left p-4">
			<h2 className="text-2xl font-medium mb-2">{title}</h2>
			<form>
				{children}
				<div className="mb-4">
					<button
						type="button"
						onClick={onGoogleAuthClick}
						className="w-3/5 p-2 bg-yellow-300 text-black border-none rounded-md cursor-pointer hover:bg-[#2b2b2b] hover:text-yellow-300">
						{title} with Google
					</button>
				</div>
			</form>
		</div>
	);
};

export default AuthForm;
