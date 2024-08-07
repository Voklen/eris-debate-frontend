import { createSignal } from "solid-js";
import styles from "./EditPopup.module.css";
import Popup from "./Popup";

export default function EditPopup() {
	const [text, setText] = createSignal("");
	const submit = () => {};

	return (
		<Popup>
			<form classList={{ [styles.form]: true, card: true }}>
				<h2>Edit argument</h2>
				<textarea
					placeholder="Let’s get some good discussion going…"
					value={text()}
					onChange={(e) => setText(e.currentTarget.value)}
				/>
				<button type="button" onClick={submit}>
					Submit
				</button>
			</form>
		</Popup>
	);
}
