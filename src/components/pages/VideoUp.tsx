import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import scss from "./VideoUp.module.scss";

interface videoDataType {
	_id: number;
	title: string;
	video: string;
	genre: string;
}

const VideoUp = () => {
	const { id } = useParams();
	const [video, setVideo] = useState<videoDataType[]>([]);
	const link = `https://api.elchocrud.pro/api/v1/062f63764f79ba0dbc86033e9c912aad/practice/${id}`;

	const getVideo = async () => {
		try {
			const response = (await axios.get(link)).data;
			setVideo([response]);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	useEffect(() => {
		getVideo();
	}, []);

	return (
		<div>
			{video.map((item) => (
				<div className={scss.videoCard} key={item._id}>
					<iframe src={item.video} title={item.title}></iframe>
					<h3>{item.title}</h3>
					<h4>{item.genre}</h4>
				</div>
			))}
		</div>
	);
};

export default VideoUp;
