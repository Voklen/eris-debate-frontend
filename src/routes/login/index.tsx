import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import { Icons } from "~/components/Icons";
import { useAuth } from "~/providers/auth";
import { backendURL } from "~/utils/config";
import { AccountNotExistsError, IncorrectPasswordError } from "~/utils/errors";
import { getFormData, randomPlaceholder } from "~/utils/funcs";
import type { User } from "~/utils/types";
import styles from "./Login.module.css";
import SuffixTitle from "~/components/SuffixTitle";

const emptyFormData = {
	email: "",
	password: "",
};
const emptyErrorMessages = {
	general: "",
	email: "",
	password: "",
};
type ErrorMessagesStoreSetter = SetStoreFunction<typeof emptyErrorMessages>;

export default function Login() {
	const [_, { login }] = useAuth();
	const navigate = useNavigate();
	const [errorMessages, setErrorMessages] = createStore(emptyErrorMessages);
	const onSubmit = async (e: SubmitEvent) => {
		const user = await submitForm(e, setErrorMessages);
		if (user === undefined) return;
		localStorage.setItem("user", JSON.stringify(user));
		login(user);
		navigate("/");
	};
	return (
		<main>
			<SuffixTitle>Login</SuffixTitle>
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
				<Show when={errorMessages.general}>
					<p class="error">{errorMessages.general}</p>
				</Show>
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
		return await sendLoginRequest(event);
	} catch (e) {
		if (e instanceof AccountNotExistsError) {
			errorMessages("email", e.message);
		} else if (e instanceof IncorrectPasswordError) {
			errorMessages("password", e.message);
		} else if (e instanceof Error) {
			errorMessages("general", e.message);
		} else {
			errorMessages("general", `Caught non-error: ${e}`);
		}
	} finally {
		button.removeAttribute("disabled");
	}
}

async function sendLoginRequest(event: SubmitEvent) {
	const formData = getFormData(event, emptyFormData);
	const res = await fetch(`${backendURL}/login`, {
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
			return json as User;
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
