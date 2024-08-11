import { createSignal } from "solid-js";
import toast from "solid-toast";
import { backendURL } from "~/utils/config";
import type { Argument } from "~/utils/types";
import styles from "./EditPopup.module.css";
import Popup from "./Popup";

type Props = {
	arg: Argument;
	closePopup: () => void;
};

export default function EditPopup(props: Props) {
	const [text, setText] = createSignal(props.arg.body);
	const submit = async () => {
		try {
			const requestFuture = sendPutToServer(props.arg.id, text());
			props.closePopup();
			// Await request to catch errors
			await requestFuture;
		} catch (e) {
			if (e instanceof Error) {
				toast.error(e.message);
			}
		}
	};

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

async function sendPutToServer(arg_id: number, text: string) {
	const requestBody = { arg_id, body: text };
	const res = await fetch(`${backendURL}/arguments`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(requestBody),
	});
	if (res.status !== 200) {
		throw new Error(`${res.status}: ${await res.text()}`);
	}
}
