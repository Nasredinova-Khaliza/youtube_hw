import { FC } from "react";
import scss from "./Modal.module.scss";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
	return (
		<>
			{isOpen && (
				<div className={scss.Modal}>
					<div className={scss.modalWrapper}>
						<div className={scss.modalContent}>
							<button className={scss.modalCloseBtn} onClick={() => onClose()}>
								Close X
							</button>
							{children}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
