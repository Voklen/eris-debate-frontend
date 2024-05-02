import styles from "./Signup.module.css";
import { createStore } from "solid-js/store";

const emptyFormData = {
	email: "",
	password: "",
	confirmPassword: "",
};

type SignupFormData = typeof emptyFormData;
type SignupFormKey = keyof SignupFormData;
type InputEvent = Event & {
	currentTarget: HTMLInputElement;
	target: HTMLInputElement;
};

function isKey(s: string, defaultFormData: SignupFormData): s is SignupFormKey {
	return s in defaultFormData;
}

export default function Signup() {
	let formElement!: HTMLFormElement;
	const [formData, setForm] = createStore<SignupFormData>(emptyFormData);
	const handleInput = (event: InputEvent) => {
		const target = event.currentTarget;
		if (!isKey(target.name, emptyFormData)) return;
		setForm(target.name, target.value);
	};
	const handleSubmit = () => submitForm(formData);
	return (
		<main class={styles.main}>
			<form class={`${styles.form} card`} ref={formElement}>
				<h1>Signup</h1>
				<label for="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					onInput={handleInput}
					placeholder={randomPlaceholder()}
				/>
				<label for="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					onInput={handleInput}
				/>
				<label for="confirm-password">Confirm password</label>
				<input
					type="password"
					id="confirm-password"
					name="confirmPassword"
					onInput={handleInput}
				/>
				<button type="button" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</main>
	);
}

function randomPlaceholder() {
	const emails = [
		"socrates@erisdebate.com",
		"plato@erisdebate.com",
		"rené.descartes@erisdebate.com",
		"immanuel.kant@erisdebate.com",
		"confucius@erisdebate.com",
		"laozi@erisdebate.com",
	];
	return emails[Math.floor(Math.random() * emails.length)];
}

async function submitForm(formData: SignupFormData): Promise<number> {
	if (formData.password !== formData.confirmPassword) return 0;

	const { confirmPassword, ...cleanFormData } = formData;
	const res = await fetch("http://127.0.0.1:9000/account/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(cleanFormData),
	});
	const { token }: { token: number } = await res.json();
	return token;
}
