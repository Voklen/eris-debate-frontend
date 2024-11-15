import { Title } from "@solidjs/meta";
import type { JSX } from "solid-js";

type Props = {
	children: JSX.Element;
};

export default function MySiteTitle(props: Props) {
	return <Title>{props.children} - Eris Debate</Title>;
}
