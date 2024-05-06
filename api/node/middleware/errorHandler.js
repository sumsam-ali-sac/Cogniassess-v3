export function errorHandler(err, req, res, next) {
	const statusCode = err.statusCode || 500;
	console.log(err);
	if (err.name === "ValidationError") {
		const errors = Object.values(err.errors).map((el) => el.message);
		const fields = Object.values(err.errors).map((el) => el.path);
		res.status(400).json({
			success: false,
			message: `${errors.join(
				" and "
			)} Please ensure unique values for: ${fields.join(", ")}.`,
		});
	} else {
		res.status(statusCode).json({
			success: false,
			message: err.message || "An unexpected error occurred.",
		});
	}
}
