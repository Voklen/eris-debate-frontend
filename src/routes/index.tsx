import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Stack from "~/components/Stack";
import "./index.css";
import { type Setter, createSignal, onMount } from "solid-js";

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
	const [forTitle, setForTitle] = createSignal("");
	const [againstTitle, setAgainstTitle] = createSignal("");
	const [selectedForID, setSelectedForID] = createSignal(0);
	const [selectedAgainstID, setSelectedAgainstID] = createSignal(0);

	onMount(async () => {
		const res = await fetch("http://127.0.0.1:9000/topic");
		const topic = (await res.json()) as Topic;
		setForTitle(topic.for.title);
		setAgainstTitle(topic.against.title);
		setForArgs(topic.for.arguments);
		setAgainstArgs(topic.against.arguments);
		setSelectedForID(1);
		setSelectedAgainstID(2);
	});

	return (
		<main>
			<Stack
				title={forTitle()}
				args={forArgs()}
				opposingID={selectedAgainstID()}
				onArgSelected={(id) =>
					argSelected(id, setAgainstArgs, setSelectedForID)
				}
			/>
			<div>
				<Title>Hello World</Title>
				<h1>Hello world!</h1>
				<Counter />
			</div>
			<Stack
				title={againstTitle()}
				args={againstArgs()}
				opposingID={selectedForID()}
				onArgSelected={(id) =>
					argSelected(id, setForArgs, setSelectedAgainstID)
				}
			/>
		</main>
	);
}

async function argSelected(
	id: number,
	otherStackSetter: Setter<Argument[]>,
	selectedSetter: Setter<number>,
) {
	selectedSetter(id);
	const res = await fetch(`http://127.0.0.1:9000/arguments?id=${id}`);
	const topic = (await res.json()) as { args: Argument[] };
	otherStackSetter(topic.args);
}
