import {
	type Navigator,
	type Params,
	useNavigate,
	useSearchParams,
} from "@solidjs/router";
import { Match, Switch, createResource } from "solid-js";
import { backendURL } from "~/utils/config";
import type { Topic } from "~/utils/types";
import { Main } from "./_components/Main";

export default function TopicPage() {
	const fetchTopicOrRedirect = (e: Partial<Params>) =>
		fetchTopic(e, useNavigate());
	const [searchParams, _setSearchParams] = useSearchParams();
	const [topic] = createResource(searchParams, fetchTopicOrRedirect);

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

async function fetchTopic(searchParams: Partial<Params>, navigate: Navigator) {
	const id = searchParams.id;
	if (!id) {
		navigate("/");
	}
	const res = await fetch(`${backendURL}/topic?id=${id}`);
	return (await res.json()) as Topic;
}
