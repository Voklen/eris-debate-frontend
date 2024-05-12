import { Show, createSignal } from "solid-js";
import type { Argument } from "~/utils/types";
import styles from "./AddArgumentTile.module.css";

type Props = {
	opposingID: number;
	appendAddedArg: (arg: Argument) => void;
};

export default function AddArgumentTile(props: Props) {
	const [isCreating, setIsCreating] = createSignal(false);
	const [text, setText] = createSignal("");

	const openInput = () => setIsCreating(true);
	const submit = () => {
		// const staticText = text();
		props.appendAddedArg({ id: 0, body: text() });
		sendArgumentToServer(props.opposingID, text());
		setText("");
	};
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
	const res = await fetch("http://127.0.0.1:9000/arguments", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(requestBody),
	});
	if (res.status !== 200) {
		console.log("Non 200 status code");
	}
}
