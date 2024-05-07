import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Domain from "./pages/Domain";
import Assessment from "./pages/Assessment";
import Points from "./pages/Points";
import Recruiters from "./pages/Recruiters";
import Leaderboard from "./pages/Leaderboard";
import ContactUs from "./pages/ContactUs";
import UploadCV from "./pages/UploadCV";
import FeedbackBot from "./pages/FeedbackBot";
import AssessmentQuestion from "./pages/AssessmentQuestion";
import PersonalityQuestions from "./pages/PersonalityQuestions";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/about" element={<About />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/assessment" element={<Assessment />} />
				<Route path="/points" element={<Points />} />
				<Route path="/recruiters" element={<Recruiters />} />
				<Route path="/leaderboard" element={<Leaderboard />} />
				<Route path="/contact-us" element={<ContactUs />} />
				<Route path="/upload-cv" element={<UploadCV />} />
				<Route
					path="/domain-selection/:roleName"
					element={<Domain />}
				/>
				<Route
					path="/technical-questions/:domainName"
					element={<AssessmentQuestion />}
				/>
				<Route
					path="/personality-questions"
					element={<PersonalityQuestions />}
				/>
				<Route path="/feedback-bot" element={<FeedbackBot />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
