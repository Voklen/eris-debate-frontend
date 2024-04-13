import { For, createSignal, onMount } from "solid-js";
import "./Stack.css";

type Argument = {
	argument: string;
};

export default function Stack() {
	const [arg3, setArg3] = createSignal("");
	const args = () => ["Argument 1", "Argument 2", arg3()];
	onMount(async () => {
		const res = await fetch("http://127.0.0.1:3000/title");
		const argument = (await res.json()) as Argument;
		setArg3(argument.argument);
	});
	return (
		<div class="stack">
			<For each={args()} fallback={<p>Loading…</p>}>
				{(arg) => <div>{arg}</div>}
			</For>
		</div>
	);
}
