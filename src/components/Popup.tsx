import { Portal } from "solid-js/web";
import styles from "./Popup.module.css";
import type { JSX } from "solid-js";

type Props = {
	children: JSX.Element;
};

export default function Popup(props: Props) {
	return (
		<Portal>
			<div class={styles.popupContainer}>
				<div class={styles.popup}>{props.children}</div>
			</div>
		</Portal>
	);
}
