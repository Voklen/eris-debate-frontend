import styles from "./Signup.module.css";

export default function Signup() {
	return (
		<main class={styles.main}>
			<form class={`${styles.form} card`}>
				<h1>Signup</h1>
				<label for="email">Email</label>
				<input type="text" placeholder={randomPlaceholder()} id="email" />
				<label for="password">Password</label>
				<input type="text" id="password" />
				<label for="confirm-password">Confirm password</label>
				<input type="text" id="confirm-password" />
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
