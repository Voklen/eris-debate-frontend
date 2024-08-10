import { X } from "lucide-solid";
import { type JSX, children } from "solid-js";
import { Portal } from "solid-js/web";
import styles from "./Popup.module.css";

type Props = {
	children: JSX.Element;
	closePopup: () => void;
};

export default function Popup(props: Props) {
	const c = children(() => props.children);

	return (
		<Portal mount={document.querySelector("body") ?? undefined}>
			<div classList={{ [styles.popup]: true, card: true }}>
				<button
					type="button"
					class={styles.backButton}
					onClick={props.closePopup}
					aria-label="Close"
				>
					<X />
				</button>
				{c()}
			</div>
		</Portal>
	);
}
