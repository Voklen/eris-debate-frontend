import { Show, createSignal } from "solid-js";
import toast from "solid-toast";
import type { ArgumentTile, SubmitState } from "~/utils/types";
import styles from "./AddArgumentTile.module.css";

type Props = {
	opposingID: number;
	appendAddedArg: (arg: ArgumentTile) => void;
};

export default function AddArgumentTile(props: Props) {
	const [isCreating, setIsCreating] = createSignal(false);
	const [text, setText] = createSignal("");

	const openInput = () => setIsCreating(true);
	const submit = async () => {
		const res = sendArgumentToServer(props.opposingID, text());
		const [state, setState] = createSignal<SubmitState>("loading");
		const arg = {
			id: 0,
			body: text(),
			state: state,
		};
		props.appendAddedArg(arg);
		setText("");
		try {
			await res;
			setState("success");
		} catch (e) {
			if (e instanceof Error) {
				setState("error");
				toast.error(e.message);
			}
		}
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
		throw new Error(`${res.status}: ${await res.text()}`);
	}
}
