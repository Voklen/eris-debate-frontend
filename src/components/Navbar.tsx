import { Show, onMount } from "solid-js";
import { useAuth } from "~/providers/auth";
import { generateProfilePic } from "~/utils/profilePic";
import type { User } from "~/utils/types";
import styles from "./Navbar.module.css";

export default function Navbar() {
	const [user, { login }] = useAuth();

	onMount(() => {
		const user = getUser();
		if (user === null) return;
		return login(user);
	});

	return (
		<header class={styles.header}>
			<nav class={styles.nav}>
				<a href="/">Eris</a>
				<a href="/about">About</a>
			</nav>
			<div class={styles.headerEnd}>
				<Show when={user()} fallback={<LoginButtons />}>
					{/* When signed in */}
					<a href="/profile" id={styles.profileUsername}>
						{user()?.username}
						<img
							src={generateProfilePic(user()!.username)}
							alt="Profile"
							height={50}
						/>
					</a>
				</Show>
			</div>
		</header>
	);
}

function LoginButtons() {
	return (
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
	);
}

function getUser(): User | null {
	const user = localStorage.getItem("user");
	return user ? JSON.parse(user) : null;
}
