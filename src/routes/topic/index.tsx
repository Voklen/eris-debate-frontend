import {
	type NavigateOptions,
	type Navigator,
	type Params,
	type SetParams,
	useNavigate,
	useSearchParams,
} from "@solidjs/router";
import { Match, Switch, createResource } from "solid-js";
import { backendURL } from "~/utils/config";
import type { Topic } from "~/utils/types";
import { Main } from "./_components/Main";

export default function TopicPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const fetchTopicOrRedirect = (e: Partial<Params>) =>
		fetchTopic(e, setSearchParams, useNavigate());
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

type SetSearchParams = (
	params: SetParams,
	options?: Partial<NavigateOptions>,
) => void;

async function fetchTopic(
	searchParams: Partial<Params>,
	setSearchParams: SetSearchParams,
	navigate: Navigator,
) {
	if (!searchParams.for) setSearchParams({ for: 0 }, { replace: true });
	if (!searchParams.against) setSearchParams({ against: 0 }, { replace: true });
	const id = searchParams.id;
	if (!id) {
		navigate("/");
	}
	const res = await fetch(`${backendURL}/topic?id=${id}`);
	return (await res.json()) as Topic;
}
