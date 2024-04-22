import { Show, createSignal } from "solid-js";
import styles from "./AddArgumentTile.module.css";

type Props = {
	opposingID: number;
};

export default function AddArgumentTile(props: Props) {
	const [isCreating, setIsCreating] = createSignal(false);
	const [text, setText] = createSignal("");

	const openInput = () => setIsCreating(true);
	const submit = () => sendArgumentToServer(props.opposingID, text());
	return (
		<div class={styles.add} classList={{ [styles.clicked]: isCreating() }}>
			<Show
				when={isCreating()}
				fallback={
					<div onClick={openInput} onKeyPress={openInput}>
						+
					</div>
				}
			>
				<form class={styles.addForm}>
					<h2>Add a point</h2>
					<textarea
						placeholder="Let’s get some good discussion going…"
						value={text()}
						onChange={(e) => setText(e.currentTarget.value)}
					/>
					<button type="button" onClick={submit}>
						Submit
					</button>
				</form>
			</Show>
		</div>
	);
}

async function sendArgumentToServer(parent: number, body: string) {
	const requestBody = { parent, body };
	console.log(`REQUEST: ${parent}`);
	const res = await fetch("http://127.0.0.1:9000/arguments", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestBody),
	});
	if (res.status !== 200) {
		console.log("Non 200 status code");
	}
}
