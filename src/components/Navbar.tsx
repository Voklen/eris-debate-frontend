import { Show, onMount } from "solid-js";
import { useAuth } from "~/providers/auth";
import { generateProfilePic } from "~/utils/profilePic";
import { getUser } from "~/utils/user";
import styles from "./Navbar.module.css";
import { useNavigate } from "@solidjs/router";

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
	const navigate = useNavigate();
	return (
		<>
			<button
				type="button"
				role="link"
				id={styles.login}
				onClick={() => navigate("/login")}
			>
				Login
			</button>
			<button type="button" role="link" onClick={() => navigate("/signup")}>
				Sign up
			</button>
		</>
	);
}
