import { type Params, useSearchParams } from "@solidjs/router";
import { Match, Switch, createResource } from "solid-js";
import { backendURL } from "~/utils/config";

export default function VerifyEmailPage() {
	const [searchParams, _setSearchParams] = useSearchParams();
	const [topic] = createResource(searchParams, verifyWithAPI);

	return (
		<Switch>
			<Match when={topic.error}>
				<p class="info"> {topic.error.message}</p>
			</Match>
			<Match when={topic()}>
				<h2>Email verified!</h2>
			</Match>
		</Switch>
	);
}

async function verifyWithAPI(searchParams: Partial<Params>) {
	const token = searchParams.token;
	if (!token) {
		throw new Error("No token given");
	}

	const body = JSON.stringify({ token });
	const res = await fetch(`${backendURL}/verifyemail`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body,
	});
	if (res.status !== 200) {
		throw new Error(`${res.status}: ${await res.text()}`);
	}
	return res;
}
