import User from "../models/user.model.js";
import argon2 from "argon2";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
	console.log(req.body);
	console.log("hello");
	const { username, email, password, registeredStatus, userRole } = req.body;

	try {
		const hashedPassword = await argon2.hash(password);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			registeredStatus,
			userRole,
		});

		console.log(newUser);
		try {
			await newUser.save();
			res.status(201).json("User created successfully!");
		} catch (error) {
			next(error);
		}
	} catch (err) {
		next(err);
	}
};

export const signin = async (req, res, next) => {
	console.log(req.body);
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next(errorHandler(404, "User not found"));
		}

		const validPassword = await argon2.verify(user.password, password);
		if (!validPassword) {
			return next(errorHandler(401, "Invalid credentials"));
		}

		const token = jwt.sign(
			{ userId: user._id, userRole: user.userRole },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_ACCESS_EXPIRATION }
		);

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Ensure cookies are secure in production
			maxAge: 3600000,
			sameSite: "strict",
		});

		res.status(200).json({
			message: "Authentication successful",
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				userRole: user.userRole,
				avatar: user.avatar,
			},
		});
	} catch (err) {
		next(err);
	}
};

export const google = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			const { password: pass, ...rest } = user._doc;

			const token = jwt.sign(
				{ userId: user._id, userRole: user.userRole },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_ACCESS_EXPIRATION }
			);

			res.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 3600000,
				sameSite: "strict",
			});

			res.status(200).json({
				message: "Authentication successful",
				user: {
					id: user._id,
					username: user.username,
					email: user.email,
					userRole: user.userRole,
					avatar: user.avatar,
				},
			});
		} else {
			const generatedPassword = "google Auth";
			const hashedPassword = await argon2.hash(generatedPassword);
			const newUser = new User({
				username:
					req.body.name.split(" ").join("").toLowerCase() +
					Math.random().toString(36).slice(-4),
				email: req.body.email,
				password: hashedPassword,
				avatar: req.body.photo,
			});

			await newUser.save();

			const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
			const { password: pass, ...rest } = newUser._doc;

			res.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 3600000,
				sameSite: "strict",
			});

			console.log(newUser._id);
			res.status(200).json({
				message: "Authentication successful",
				user: {
					id: newUser._id,
					username: newUser.username,
					email: newUser.email,
					userRole: newUser.userRole,
					avatar: newUser.avatar,
				},
			});
		}
	} catch (error) {
		next(error);
	}
};
