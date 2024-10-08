import { useNavigate, useParams } from "@solidjs/router";
import { Match, Switch, createResource } from "solid-js";
import { backendURL } from "~/utils/config";
import type { Topic } from "~/utils/types";
import { Main } from "./_components/Main";

export default function TopicPage() {
	const [topic] = createResource(fetchTopic);

	return (
		<Switch>
			<Match when={topic.error}>
				<p class="info"> Error: {topic.error.message}</p>
			</Match>
			<Match when={topic()}>
				<Main topic={topic()!} />
			</Match>
		</Switch>
	);
}

async function fetchTopic() {
	const params = useParams();
	const id = params.id;
	if (!id) {
		const navigate = useNavigate();
		navigate("/");
	}
	const res = await fetch(`${backendURL}/topic/${id}`);
	return (await res.json()) as Topic;
}
