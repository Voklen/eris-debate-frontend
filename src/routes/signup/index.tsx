import styles from "./Signup.module.css";

const emptyFormData = {
	email: "",
	password: "",
	confirmPassword: "",
};
type SignupFormData = typeof emptyFormData;
type SignupFormKey = keyof SignupFormData;

export default function Signup() {
	return (
		<main class={styles.main}>
			<form class={`${styles.form} card`} onSubmit={submitForm}>
				<h1>Signup</h1>
				<label for="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
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

async function submitForm(event: Event): Promise<number> {
	event.preventDefault();
	const form = event.target as HTMLFormElement;
	if (form === null) throw new Error("No form element found");
	// Fill formData by extracting the value from every child element with a name matching a property in the object
	const formData = emptyFormData;
	for (const key in formData) {
		const inputElement = form.querySelector(
			`input[name="${key}"]`,
		) as HTMLInputElement;
		if (inputElement === null) continue;
		formData[key as SignupFormKey] = inputElement.value;
	}
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
	const { token }: { token: number } = await res.json();
	return token;
}
