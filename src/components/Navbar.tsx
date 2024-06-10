import { Match, Switch } from "solid-js";
import { useAuth } from "~/providers/auth";
import { generateProfilePic } from "~/utils/profilePic";
import styles from "./Navbar.module.css";

export default function Navbar() {
	const [user, _] = useAuth();

	return (
		<header class={styles.header}>
			<nav class={styles.nav}>
				<a href="/">Eris</a>
				<a href="/about">About</a>
			</nav>
			<div class={styles.headerEnd}>
				<Switch>
					<Match when={user() === null}>
						{/* When not signed in */}
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
					</Match>
					<Match when={user()}>
						{/* When signed in */}
						<a href="/profile" id={styles.profileUsername}>
							{user()?.username}
							<img
								src={generateProfilePic(user()!.username)}
								alt="Profile"
								height={50}
							/>
						</a>
					</Match>
				</Switch>
			</div>
		</header>
	);
}
