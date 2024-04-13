import { For, createSignal, onMount } from "solid-js";
import "./Stack.css";

type Argument = {
	argument: string;
};

export default function Stack() {
	const [args, setArgs] = createSignal<Argument[]>([]);
	onMount(async () => {
		const res = await fetch("http://127.0.0.1:3000/title");
		const argument = (await res.json()) as Argument[];
		setArgs(argument);
	});
	return (
		<div class="stack">
			<For each={args()} fallback={<p>Loading…</p>}>
				{(arg) => <div>{arg.argument}</div>}
			</For>
		</div>
	);
}
