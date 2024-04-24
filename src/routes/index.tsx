import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import Stack from "~/components/Stack";
import { type TopArgument, emptyTopArgument } from "~/utils/types";
import styles from "./index.module.css";

type Topic = {
	for: TopArgument;
	against: TopArgument;
};

export default function Home() {
	const [forArgSelected, setForArgSelected] = createSignal<number>();
	const [againstArgSelected, setAgainstArgSelected] = createSignal<number>();
	const [forArg, setForArg] = createSignal<TopArgument>(emptyTopArgument);
	const [againstArg, setAgainstArg] =
		createSignal<TopArgument>(emptyTopArgument);

	onMount(async () => {
		const res = await fetch("http://127.0.0.1:9000/topic");
		const topic = (await res.json()) as Topic;
		setForArg(topic.for);
		setAgainstArg(topic.against);
	});

	return (
		<main class={styles.stage}>
			<Stack
				data={forArg()}
				responseTo={forArgSelected}
				onArgSelected={setAgainstArgSelected}
			/>
			<div>
				<Title>Eris Debate</Title>
				<h1>Eris Debate</h1>
			</div>
			<Stack
				data={againstArg()}
				responseTo={againstArgSelected}
				onArgSelected={setForArgSelected}
			/>
		</main>
	);
}
