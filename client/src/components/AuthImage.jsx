const AuthImage = ({ src, alt }) => {
	return (
		<div className="mr-12">
			<img
				src={src}
				alt={alt}
				className="ml-48 mb-12 mr-24 max-w-[50%]"
			/>
		</div>
	);
};

export default AuthImage;
