import { NavLink } from "react-router-dom";
import scss from "./Footer.module.scss";

const Footer = () => {
	const links = [
		{
			name: (
				<>
					Главная
					<img
						src="https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/home-512.png"
						alt=""
					/>
				</>
			),
			href: "/",
		},

		{
			name: (
				<>
					Shorts
					<img
						src="https://seeklogo.com/images/Y/youtube-shorts-logo-E2B507EF18-seeklogo.com.png"
						alt=""
					/>
				</>
			),
			href: "/shorts",
		},
		{
			name: (
				<>
					Создать
					<img src="https://cdn-icons-png.flaticon.com/512/10406/10406903.png" />
				</>
			),
			href: "/",
		},
		{
			name: (
				<>
					Подписки
					<img
						src="https://flyclipart.com/thumb2/youtube-bell-icon-png-png-image-394304.png"
						alt=""
					/>
				</>
			),
			href: "/subs",
		},
		{
			name: (
				<>
					Вы
					<img
						src="https://ikonki.svgpng.ru/wp-content/uploads/2021/02/Verifikatsiyasvg.svg"
						alt=""
					/>
				</>
			),
			href: "/user",
		},
	];
	return (
		<footer className={scss.Footer}>
			<div className={scss.content}>
				<nav>
					<ul>
						{links.map((item) => (
							<li key={item.href}>
								<NavLink to={item.href}>{item.name}</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
