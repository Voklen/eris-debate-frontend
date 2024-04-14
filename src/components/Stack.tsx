import { For } from "solid-js";
import "./Stack.css";
import type { Argument } from "~/routes";

type Props = {
	args: Argument[];
};

export default function Stack(props: Props) {
	return (
		<div class="stack">
			<For each={props.args} fallback={<p>Loading…</p>}>
				{(arg) => <div>{arg.body}</div>}
			</For>
		</div>
	);
}
