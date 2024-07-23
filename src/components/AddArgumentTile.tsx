import { useNavigate } from "@solidjs/router";
import { Show, createSignal } from "solid-js";
import toast from "solid-toast";
import { useAuth } from "~/providers/auth";
import { backendURL } from "~/utils/config";
import type { ArgumentTile, SubmitState } from "~/utils/types";
import styles from "./AddArgumentTile.module.css";

type Props = {
	opposingID: number;
	appendAddedArg: (arg: ArgumentTile) => void;
};

export default function AddArgumentTile(props: Props) {
	const [isCreating, setIsCreating] = createSignal(false);
	const [text, setText] = createSignal("");
	const [user, _] = useAuth();
	const navigate = useNavigate();

	const openInput = () => {
		if (user() == null) {
			navigate("/signup");
			return;
		}
		setIsCreating(true);
	};
	const submit = async () => {
		const res = sendArgumentToServer(props.opposingID, text());
		const [state, setState] = createSignal<SubmitState>("loading");
		const arg = {
			id: 0,
			body: text(),
			username: user()!.username, // Earlier we redirected to `/signup` if `user()` was null. So we know it is not null
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
	const res = await fetch(`${backendURL}/arguments`, {
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
