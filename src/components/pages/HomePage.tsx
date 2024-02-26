import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/store/store";
import {
	deleteRequest,
	editRequest,
	getRequest,
	postRequest,
} from "../../redux/tools/HomeSlise.tsx";
import scss from "./HomePage.module.scss";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const videoYouTude = useAppSelector((state) => state.videos.data);
	const [videoName, setVideoName] = useState<string>("");
	const [videoUrl, setVideoUrl] = useState<string>("");
	const [videoGenre, setVideoGenre] = useState<string>("");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [editeId, setEditeId] = useState<number | null>(null);
	const [editeVideoName, setEditeVideoName] = useState<string>("");
	const [editeVideoUrl, setEditeVideoUrl] = useState<string>("");
	const [editeVideoGenre, setEditeVideoGenre] = useState<string>("");
	const [filteredGenres, setFilteredGenres] = useState<string>("Все");

	useEffect(() => {
		dispatch(getRequest());
	}, [dispatch]);

	const addVideo = () => {
		const newVideo = { title: videoName, video: videoUrl, genre: videoGenre };
		dispatch(postRequest(newVideo));
		setVideoName("");
		setVideoUrl("");
		setVideoGenre("");
		setModalIsOpen(false);
	};

	const deleteVideo = (id: number) => {
		dispatch(deleteRequest(id));
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const editVideo = (item: any) => {
		setEditeId(item._id);
		setEditeVideoName(item.title);
		setEditeVideoUrl(item.video);
		setEditeVideoGenre(item.genre);
	};

	const saveEdit = (_id: number) => {
		dispatch(
			editRequest({
				_id,
				title: editeVideoName,
				video: editeVideoUrl,
				genre: editeVideoGenre,
			})
		);
		setEditeId(null);
	};

	const filterGenre = (selectGenre: string) => {
		setFilteredGenres(selectGenre);
	};

	return (
		<div className={scss.Home}>
			<div className="container">
				<div className={scss.Modalka}>
					<button
						onClick={() => setModalIsOpen(true)}
						className={scss.openButton}>
						Добавить Видео
					</button>

					<Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
						<h2>Добавить видео</h2>
						<div className={scss.modalInputs}>
							<input
								type="text"
								placeholder="name"
								value={videoName}
								onChange={(e) => setVideoName(e.target.value)}
							/>
							<input
								type="url"
								placeholder="url video"
								value={videoUrl}
								onChange={(e) => setVideoUrl(e.target.value)}
							/>
							<input
								type="text"
								placeholder="genre"
								value={videoGenre}
								onChange={(e) => setVideoGenre(e.target.value)}
							/>
							<button onClick={addVideo}>Добавить</button>
						</div>
					</Modal>
				</div>
				<div className="container">
					<div className={scss.genreButtons}>
						<button onClick={() => filterGenre("Все")}>Все</button>
						<button onClick={() => filterGenre("Подкасты")}>Подкасты</button>
						<button onClick={() => filterGenre("K-pop")}>K-pop</button>
						<button onClick={() => filterGenre("Реп")}>Реп</button>
						<button onClick={() => filterGenre("Мультфильм")}>
							Мультфильм
						</button>
					</div>
					<div className={scss.cards}>
						{videoYouTude
							.filter(
								(video) =>
									filteredGenres === "Все" || video.genre === filteredGenres
							)
							.map((item) => (
								<div className={scss.card}>
									{editeId === item._id ? (
										<div>
											<input
												type="text"
												placeholder="name"
												value={editeVideoName}
												onChange={(e) => setEditeVideoName(e.target.value)}
											/>
											<input
												type="text"
												placeholder="url"
												value={editeVideoUrl}
												onChange={(e) => setEditeVideoUrl(e.target.value)}
											/>
											<input
												type="text"
												placeholder="genre"
												value={editeVideoGenre}
												onChange={(e) => setEditeVideoGenre(e.target.value)}
											/>
											<button onClick={() => saveEdit(item._id!)}>save</button>
											<button onClick={() => setEditeId(null)}>cancel</button>
										</div>
									) : (
										<>
											<Link key={item._id} to={`/${item._id}`}>
												<iframe src={item.video}></iframe>
												<h3>{item.title}</h3>
												<h4>{item.genre}</h4>
											</Link>
											<button onClick={() => deleteVideo(item._id!)}>
												Delete
											</button>
											<button onClick={() => editVideo(item)}>Edit</button>
										</>
									)}
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
