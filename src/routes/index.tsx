import { Title } from "@solidjs/meta";
import { type Setter, createSignal, onMount, Accessor } from "solid-js";
import Counter from "~/components/Counter";
import Stack from "~/components/Stack";
import {
	type Argument,
	type TopArgument,
	emptyTopArgument,
} from "~/utils/types";
import "./index.css";

type Topic = {
	for: TopArgument;
	against: TopArgument;
};

export default function Home() {
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
		<main>
			<Stack
				data={forArg()}
				onArgSelected={(id) => argSelected(id, againstArg(), setAgainstArg)}
			/>
			<div>
				<Title>Hello World</Title>
				<h1>Hello world!</h1>
				<Counter />
			</div>
			<Stack
				data={againstArg()}
				onArgSelected={(id) => argSelected(id, forArg(), setForArg)}
			/>
		</main>
	);
}

async function argSelected(
	id: number,
	otherStack: TopArgument,
	otherStackSetter: Setter<TopArgument>,
) {
	const res = await fetch(`http://127.0.0.1:9000/arguments?id=${id}`);
	const topic: { args: Argument[] } = await res.json();
	const arg: TopArgument = {
		title: otherStack.title,
		opposingID: id,
		arguments: topic.args,
	};
	otherStackSetter(arg);
}
