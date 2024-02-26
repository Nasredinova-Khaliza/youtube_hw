import scss from "./Header.module.scss";
import logo from "../../../assets/Logo/Black.svg";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className={scss.Header}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.headerContents}>
						<nav className={scss.navlinks}>
							<Link to="" className="navbar-brand">
								<img src={logo} alt="Logo" />
							</Link>
						</nav>
						<div className={scss.searches}>
							<input
								className={scss.search}
								type="text"
								placeholder="Введите запрос"
							/>
							<img
								className={scss.vois}
								src="https://static.thenounproject.com/png/860372-200.png"
								alt="vois"
							/>
						</div>
						<div className={scss.right}>
							<img
								src="https://cdn-icons-png.flaticon.com/512/1436/1436388.png"
								alt=""
							/>
							<img
								src="https://cdn.icon-icons.com/icons2/3409/PNG/512/add_video_icon_217156.png"
								alt=""
							/>
							<img
								src="https://cdn-icons-png.flaticon.com/512/3033/3033143.png"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
