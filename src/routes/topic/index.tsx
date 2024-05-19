import { type Params, useSearchParams } from "@solidjs/router";
import { Match, Switch, createResource } from "solid-js";
import type { Topic } from "~/utils/types";
import { Main } from "./_components/Main";

export default function TopicPage() {
	const [searchParams, _setSearchParams] = useSearchParams();
	const [topic] = createResource(searchParams, fetchTopic);

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

async function fetchTopic(searchParams: Partial<Params>) {
	const id = searchParams.id;
	if (!id) {
		window.location.href = "/";
	}
	const res = await fetch(`http://127.0.0.1:9000/topic?id=${id}`);
	return (await res.json()) as Topic;
}
