import { type JSX, children } from "solid-js";
import { Portal } from "solid-js/web";
import styles from "./Popup.module.css";

type Props = {
	children: JSX.Element;
};

export default function Popup(props: Props) {
	const c = children(() => props.children);

	return (
		<Portal mount={document.querySelector("body") ?? undefined}>
			<div class={styles.popup}>{c()}</div>
		</Portal>
	);
}
