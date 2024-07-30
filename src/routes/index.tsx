import { For, Match, Switch, createResource } from "solid-js";
import { backendURL } from "~/utils/config";
import styles from "./home.module.css";

export default function Home() {
	const [topics] = createResource(fetchTopics);
	return (
		<main id={styles.mainList}>
			<h1>Select a topic</h1>
			<p>
				Pick any topic and view the arguments for and against it (and even add
				your own)
			</p>
			<Switch>
				<Match when={topics.error}>
					<p class="info"> Error: {topics.error.message}</p>
				</Match>
				<Match when={topics()}>
					<For each={topics()}>
						{(topic) => {
							return (
								<a href={`/topic?id=${topic.id}`}>
									<div class="card">
										<p>{topic.name}</p>
									</div>
								</a>
							);
						}}
					</For>
				</Match>
			</Switch>
		</main>
	);
}

type BasicTopic = {
	name: string;
	id: number;
};

async function fetchTopics() {
	const res = await fetch(`${backendURL}/topics`);
	switch (res.status) {
		case 200:
			break;
		default:
			throw new Error(`Unknown error ${res.status}: ${await res.text()}`);
	}
	const args: { topics: BasicTopic[] } = await res.json();
	return args.topics;
}
