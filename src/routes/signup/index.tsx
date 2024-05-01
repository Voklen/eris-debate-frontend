import type { Params } from "@solidjs/router";
import styles from "./Signup.module.css";
import { createStore } from "solid-js/store";

type InputEvent = Event & {
	currentTarget: HTMLInputElement;
	target: HTMLInputElement;
};

type SignupFormData = {
	email: string;
	password: string;
	confirmPassword: string;
};
type SignupFormKey = keyof SignupFormData;

function isKey(s: string, defaultFormData: SignupFormData): s is SignupFormKey {
	return s in defaultFormData;
}

const defaultFormData = {
	email: "",
	password: "",
	confirmPassword: "",
};

export default function Signup() {
	const [form, setForm] = createStore<SignupFormData>(defaultFormData);
	const handleInput = (event: InputEvent) => {
		const target = event.currentTarget;
		const name = target.name;
		if (!isKey(name, defaultFormData)) return;
		setForm(name, target.value);
	};
	return (
		<main class={styles.main}>
			<form class={`${styles.form} card`} method="post">
				<h1>Signup</h1>
				<label for="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					onChange={handleInput}
					placeholder={randomPlaceholder()}
				/>
				<label for="password">Password</label>
				<input type="password" name="password" id="password" />
				<label for="confirm-password">Confirm password</label>
				<input type="password" id="confirm-password" name="confirmPassword" />
				<button type="submit">Submit</button>
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

type SignupParams = {
	email: string;
	password: string;
	confirmPassword: string;
};

async function sendSignupRequest(
	searchParams: Partial<Params>,
): Promise<number> {
	console.log(searchParams);
	const signupParams = searchParams;
	const res = await fetch("http://127.0.0.1:9000/signup", {
		method: "POST",
		body: JSON.stringify(signupParams),
	});
	const { token }: { token: number } = await res.json();
	return token;
}
