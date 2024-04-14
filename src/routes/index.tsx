import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Stack from "~/components/Stack";
import "./index.css";
import { createSignal, onMount } from "solid-js";

export type Argument = {
	id: number;
	body: string;
};

type Topic = {
	for: Argument[];
	against: Argument[];
};

export default function Home() {
	const [forArgs, setForArgs] = createSignal<Argument[]>([]);
	const [againstArgs, setAgainstArgs] = createSignal<Argument[]>([]);

	onMount(async () => {
		const res = await fetch("http://127.0.0.1:9000/topic");
		const topic = (await res.json()) as Topic;
		setForArgs(topic.for);
		setAgainstArgs(topic.against);
	});
	return (
		<main>
			<Stack args={forArgs()} />
			<div>
				<Title>Hello World</Title>
				<h1>Hello world!</h1>
				<Counter />
			</div>
			<Stack args={againstArgs()} />
		</main>
	);
}
