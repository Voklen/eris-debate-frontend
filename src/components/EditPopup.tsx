import { createSignal } from "solid-js";
import styles from "./EditPopup.module.css";
import Popup from "./Popup";

type Props = {
	closePopup: () => void;
};

export default function EditPopup(props: Props) {
	const [text, setText] = createSignal("");
	const submit = () => {};

	return (
		<Popup closePopup={props.closePopup}>
			<form class={styles.form}>
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
