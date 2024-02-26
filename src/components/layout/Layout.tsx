import Footer from "./footer/Footer";
import { Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import scss from "./Layout.module.scss";
import HomePage from "../pages/HomePage";
import ShortsPage from "../pages/ShortsPage";
import Subscription from "../pages/Subscription";
import UserPage from "../pages/UserPage";
import VideoUp from "../pages/VideoUp";

const Layout = () => {
	return (
		<div className={scss.Layout}>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/:id" element={<VideoUp />} />
					<Route path="/shorts" element={<ShortsPage />} />
					<Route path="/subs" element={<Subscription />} />
					<Route path="/user" element={<UserPage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
