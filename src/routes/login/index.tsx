import { Show } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import { Icons } from "~/components/Icons";
import { AccountNotExistsError, IncorrectPasswordError } from "~/utils/errors";
import { getFormData, randomPlaceholder } from "~/utils/funcs";
import styles from "./Login.module.css";

const emptyFormData = {
	email: "",
	password: "",
};
const emptyErrorMessages = {
	email: "",
	password: "",
};
type ErrorMessagesStoreSetter = SetStoreFunction<typeof emptyErrorMessages>;

export default function Login() {
	const [errorMessages, setErrorMessages] = createStore(emptyErrorMessages);
	const onSubmit = (e: SubmitEvent) => submitForm(e, setErrorMessages);
	return (
		<main class={styles.main}>
			<form class={`${styles.form} card`} onSubmit={onSubmit}>
				<h1>Login</h1>
				<label for="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					onInput={() => setErrorMessages("email", "")}
					classList={{ errorInput: !!errorMessages.email }}
					placeholder={randomPlaceholder()}
					required
				/>
				<Show when={errorMessages.email}>
					<p class="error">{errorMessages.email}</p>
				</Show>
				<label for="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					onInput={() => setErrorMessages("password", "")}
					required
				/>
				<Show when={errorMessages.password}>
					<p class="error">{errorMessages.password}</p>
				</Show>
				<button type="submit">
					<span>Login</span>
					<Icons.spinner />
				</button>
			</form>
		</main>
	);
}

async function submitForm(
	event: SubmitEvent,
	errorMessages: ErrorMessagesStoreSetter,
) {
	event.preventDefault();
	const button = event.submitter;
	if (button == null) return;
	button.setAttribute("disabled", "disabled");
	try {
		await sendLoginRequest(event);
		window.location.href = "/";
	} catch (e) {
		if (e instanceof AccountNotExistsError) {
			errorMessages("email", e.message);
		}
		if (e instanceof IncorrectPasswordError) {
			errorMessages("password", e.message);
		}
	} finally {
		button.removeAttribute("disabled");
	}
}

async function sendLoginRequest(event: SubmitEvent) {
	const formData = getFormData(event, emptyFormData);
	const res = await fetch("http://127.0.0.1:9000/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(formData),
	});
	switch (res.status) {
		case 200: {
			const json = await res.json();
			localStorage.setItem("username", json.username);
			return;
		}
		case 400: {
			const text = await res.text();
			if (text === "An account with this email does not exist")
				throw new AccountNotExistsError();
			if (text === "Incorrect password") throw new IncorrectPasswordError();
			throw new Error(`Unknown error 400: ${text}`);
		}
	}
	throw new Error(`Unknown error ${res.status}: ${await res.text()}`);
}
