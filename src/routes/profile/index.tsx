import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { useAuth } from "~/providers/auth";
import { generateProfilePic } from "~/utils/profilePic";
import styles from "./profile.module.css";

export default function Profile() {
	const [user, { logout }] = useAuth();
	const navigate = useNavigate();

	async function submitLogout() {
		localStorage.removeItem("username");
		await sendLogoutRequest();
		logout();
		navigate("/");
	}
	return (
		<>
			<Show when={user()}>
				{/* When signed in */}
				<a href="/profile" id={styles.profileUsername}>
					<img
						src={generateProfilePic(user()!.username)}
						alt="Profile"
						height={50}
					/>
					{user()?.username}
				</a>
			</Show>
			<button type="button" onClick={() => submitLogout()}>
				Log out
			</button>
		</>
	);
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
