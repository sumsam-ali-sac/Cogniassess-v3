import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Oauth({ mode }) {
	const { isLoading, error } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleGoogleClick = async () => {
		const user = await dispatch(signInWithGoogle()).unwrap();
		console.log("Login successful:", user);
		navigate("/");
	};

	const buttonSigninText = "Log in with Google";
	const buttonSignupText = "Sign up with Google";

	return (
		<div>
			<button
				type="button"
				onClick={handleGoogleClick}
				disabled={isLoading}
				className="w-1/2 p-3 rounded flex items-center justify-center bg-white text-black font-bold hover:bg-gray-200 transition-colors duration-300 mt-4">
				<FcGoogle className="mr-2" size={24} />
				{mode === "signup" ? buttonSignupText : buttonSigninText}
			</button>
		</div>
	);
}

export default Oauth;
