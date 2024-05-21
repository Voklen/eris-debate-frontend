import { type Navigator, useNavigate } from "@solidjs/router";
import { Show, createSignal, onMount } from "solid-js";
import { generateProfilePic } from "~/utils/profilePic";
import styles from "./profile.module.css";

export default function Profile() {
	const [username, setUsername] = createSignal<string | null>("");
	const navigate = useNavigate();
	onMount(() => setUsername(localStorage.getItem("username")));

	return (
		<>
			<Show when={username()}>
				{/* When signed in */}
				<a href="/profile" id={styles.profileUsername}>
					<img
						src={generateProfilePic(username()!)}
						alt="Profile"
						height={50}
					/>
					{username()}
				</a>
			</Show>
			<button type="button" onClick={() => logout(navigate)}>
				Log out
			</button>
		</>
	);
}

async function logout(navigate: Navigator) {
	localStorage.removeItem("username");
	await sendLogoutRequest();
	navigate("/");
}

async function sendLogoutRequest() {
	const res = await fetch("http://127.0.0.1:9000/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	switch (res.status) {
		case 200:
			return;
	}
	throw new Error(`Unknown error ${res.status}: ${await res.text()}`);
}
