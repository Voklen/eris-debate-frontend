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
	for: { title: string; arguments: Argument[] };
	against: { title: string; arguments: Argument[] };
};

export default function Home() {
	const [forArgs, setForArgs] = createSignal<Argument[]>([]);
	const [againstArgs, setAgainstArgs] = createSignal<Argument[]>([]);
	const [forTitle, setForTitle] = createSignal<string>("");
	const [againstTitle, setAgainstTitle] = createSignal<string>("");

	onMount(async () => {
		const res = await fetch("http://127.0.0.1:9000/topic");
		const topic = (await res.json()) as Topic;
		setForTitle(topic.for.title);
		setAgainstTitle(topic.against.title);
		setForArgs(topic.for.arguments);
		setAgainstArgs(topic.against.arguments);
	});
	return (
		<main>
			<Stack title={forTitle()} args={forArgs()} />
			<div>
				<Title>Hello World</Title>
				<h1>Hello world!</h1>
				<Counter />
			</div>
			<Stack title={againstTitle()} args={againstArgs()} />
		</main>
	);
}
