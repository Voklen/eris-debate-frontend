import { Show } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import { Icons } from "~/components/Icons";
import { AccountExistsError } from "~/utils/errors";
import { getFormData, randomPlaceholder } from "~/utils/funcs";
import styles from "./Signup.module.css";

const emptyFormData = {
	email: "",
	password: "",
	confirmPassword: "",
};
type SignupFormData = typeof emptyFormData;
type SignupFormKey = keyof SignupFormData;
const emptyErrorMessages = {
	email: "",
	password: "",
};
type ErrorMessagesStoreSetter = SetStoreFunction<typeof emptyErrorMessages>;

export default function Signup() {
	const [errorMessages, setErrorMessages] = createStore(emptyErrorMessages);
	const onSubmit = (e: SubmitEvent) => submitForm(e, setErrorMessages);
	return (
		<main class={styles.main}>
			<form class={`${styles.form} card`} onSubmit={onSubmit}>
				<h1>Signup</h1>
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
					minLength={8}
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*"
					required
				/>
				<label for="confirm-password">Confirm password</label>
				<input
					type="password"
					id="confirm-password"
					name="confirmPassword"
					minLength={8}
					required
				/>
				<br />
				<p>Password must contain at least:</p>
				<ul>
					<li>8 characters</li>
					<li>1 lower case letter</li>
					<li>1 upper case letter</li>
					<li>1 number</li>
				</ul>
				<button type="submit">
					<span>Submit</span>
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
		const token = await sendSignupRequest(event);
	} catch (e) {
		if (e instanceof AccountExistsError) {
			errorMessages("email", e.message);
		}
	} finally {
		button.removeAttribute("disabled");
	}
}

async function sendSignupRequest(event: SubmitEvent): Promise<number> {
	const formData = getFormData(event, emptyFormData);
	//TODO Improve error handling
	if (formData.password !== formData.confirmPassword) return 0;

	const { confirmPassword, ...cleanFormData } = formData;
	const res = await fetch("http://127.0.0.1:9000/account/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(cleanFormData),
	});
	switch (res.status) {
		case 200:
			break;
		// biome-ignore lint/suspicious/noFallthroughSwitchClause: We want any unknown cases to activate the default case instead of silently breaking
		case 400:
			if ((await res.text()) === "An account with that email already exists")
				throw new AccountExistsError();
		default:
			throw new Error(`Unknown error ${res.status}: ${res.text()}`);
	}
	const { token }: { token: number } = await res.json();
	return token;
}
