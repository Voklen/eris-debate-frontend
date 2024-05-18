import { Show, createSignal, onMount } from "solid-js";
import { generateProfilePic } from "~/utils/profilePic";
import styles from "./Navbar.module.css";

export default function Navbar() {
	const [username, setUsername] = createSignal<string | null>(null);
	onMount(() => setUsername(localStorage.getItem("username")));

	return (
		<header class={styles.header}>
			<nav class={styles.nav}>
				<a href="/">Eris</a>
				<a href="/about">About</a>
			</nav>
			<div class={styles.headerEnd}>
				<Show
					when={username()}
					fallback={
						<>
							<a href="/login">
								<button type="button" id={styles.login}>
									Login
								</button>
							</a>
							<a href="/signup">
								<button type="button">Sign up</button>
							</a>
						</>
					}
				>
					<a href="/profile" id={styles.profileUsername}>
						{username()}
						<img
							src={generateProfilePic(username()!)}
							alt="Profile"
							height={50}
						/>
					</a>
				</Show>
			</div>
		</header>
	);
}
