import { Portal } from "solid-js/web";
import styles from "./EditPopup.module.css";
import { createSignal } from "solid-js";

export default function EditPopup() {
	const [text, setText] = createSignal("");
	const submit = () => {};

	return (
		<Portal mount={document.querySelector("body") ?? undefined}>
			<form classList={{ [styles.popup]: true, card: true }}>
				<h2>Edit argument</h2>
				<textarea
					placeholder="Let’s get some good discussion going…"
					value={text()}
					onChange={(e) => setText(e.currentTarget.value)}
				/>
				<button type="button" onClick={submit}>
					Submit
				</button>
			</form>{" "}
		</Portal>
	);
}
