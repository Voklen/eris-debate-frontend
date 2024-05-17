import { Match, Switch, createResource } from "solid-js";
import type { Topic } from "~/utils/types";
import { Main } from "./_components/Main";

export default function Home() {
	const [topic] = createResource(fetchTopic);

	return (
		<Switch>
			<Match when={topic.error}>
				<p class="info"> Error: {topic.error}</p>
			</Match>
			<Match when={topic()}>
				<Main topic={topic()!} />
			</Match>
		</Switch>
	);
}

async function fetchTopic() {
	const res = await fetch("http://127.0.0.1:9000/topic?id=1");
	return (await res.json()) as Topic;
}
