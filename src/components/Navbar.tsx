import styles from "./Navbar.module.css";

export default function Navbar() {
	return (
		<header class={styles.header}>
			<nav class={styles.nav}>
				<a href="/">Eris</a>
				<a href="/about">About</a>
			</nav>
			<div class={styles.buttonsContainer}>
				<a href="/login">
					<button type="button" id={styles.login}>
						Login
					</button>
				</a>
				<a href="/signup">
					<button type="button">Sign up</button>
				</a>
			</div>
		</header>
	);
}
