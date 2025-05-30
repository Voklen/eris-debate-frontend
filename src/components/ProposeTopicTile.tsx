import { useNavigate } from "@solidjs/router";
import { type Setter, Show, createSignal } from "solid-js";
import toast from "solid-toast";
import { useAuth } from "~/providers/auth";
import { backendURL } from "~/utils/config";
import { getFormData } from "~/utils/funcs";
import styles from "./ProposeTopicTile.module.css";

const emptyFormData = {
	name: "",
	for_argument: "",
	against_argument: "",
	reason: "",
};

export default function ProposeTopicTile() {
	const [isCreating, setIsCreating] = createSignal(false);
	const [user, _] = useAuth();
	const navigate = useNavigate();

	const openInput = () => {
		if (user() == null) {
			navigate("/signup");
			return;
		}
		setIsCreating(true);
	};
	const [errorMessage, setErrorMessage] = createSignal("");
	const onSubmit = async (e: SubmitEvent) => {
		await submitForm(e, setErrorMessage);
	};
	return (
		<div class={styles.add} classList={{ [styles.clicked]: isCreating() }}>
			<Show
				when={isCreating()}
				fallback={
					<div
						onClick={openInput}
						onKeyDown={(e) => {
							if (e.key === "Enter") openInput();
						}}
						tabIndex={0}
						class={styles.addButton}
					>
						+
					</div>
				}
			>
				<form class={styles.addForm} onSubmit={onSubmit}>
					<h2>Propose a topic</h2>

					<label for="name">Topic question</label>
					<input
						id="name"
						name="name"
						placeholder="Should firearms be legal?"
					/>
					<label for="for_argument">For title</label>
					<input
						id="for_argument"
						name="for_argument"
						placeholder="Firearms should be legal to own and operate"
					/>
					<label for="against_argument">Against title</label>
					<input
						id="against_argument"
						name="against_argument"
						placeholder="Firearms should be illegal to own and operate"
					/>
					<label for="reason">Why should this be a topic?</label>
					<textarea id="reason" name="reason" />
					<Show when={errorMessage()}>
						<p class="error">{errorMessage()}</p>
					</Show>
					<button type="submit">Submit</button>
				</form>
			</Show>
		</div>
	);
}

async function submitForm(event: SubmitEvent, errorMessage: Setter<string>) {
	event.preventDefault();
	const button = event.submitter;
	if (button == null) return;
	button.setAttribute("disabled", "disabled");
	try {
		await sendProposalRequest(event);
		toast.success("Submitted!");
	} catch (e) {
		if (e instanceof Error) {
			errorMessage(e.message);
		} else {
			errorMessage(`Unknown error: ${e}`);
		}
	} finally {
		button.removeAttribute("disabled");
	}
}

async function sendProposalRequest(event: SubmitEvent) {
	const formData = getFormData(event, emptyFormData);
	const res = await fetch(`${backendURL}/topic-proposals`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(formData),
	});
	switch (res.status) {
		case 200: {
			return;
		}
		case 400: {
			const text = await res.text();
			throw new Error(`Unknown error 400: ${text}`);
		}
	}
	throw new Error(`Unknown error ${res.status}: ${await res.text()}`);
}
