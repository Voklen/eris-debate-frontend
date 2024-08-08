import { useSearchParams } from "@solidjs/router";
import { PencilLine } from "lucide-solid";
import { createSignal, onMount } from "solid-js";
import toast from "solid-toast";
import { backendURL } from "~/utils/config";
import type { ArgumentTile, Side } from "~/utils/types";
import { isAdmin } from "~/utils/user";
import styles from "./ArgumentTile.module.css";

type Props = {
	arg: ArgumentTile;
	side: Side;
	showPopup: (msg: string) => void;
};

export default function ArgumentTileElement(props: Props) {
	const [userIsAdmin, setUserIsAdmin] = createSignal(false);

	onMount(() => {
		setUserIsAdmin(isAdmin());
	});

	const [searchParams, setSearchParams] = useSearchParams();
	const argSelected = () => setSearchParams({ [props.side]: props.arg.id });
	const removeClicked = (e: MouseEvent) => removeArg(e, props.arg.id);
	const editClicked = (e: MouseEvent) =>
		editPopup(e, props.arg.id, props.showPopup);
	const id = props.arg.id.toString();

	return (
		<div
			onClick={argSelected}
			onKeyDown={(e) => {
				if (e.key === "Enter") argSelected();
			}}
			tabIndex={0}
			classList={{
				card: true,
				[styles.forSelected]: searchParams.for === id,
				[styles.againstSelected]: searchParams.against === id,
				[props.arg.state()]: true,
				[styles.showRemoveButton]: userIsAdmin(),
			}}
		>
			<p>{props.arg.body}</p>
			<div class={styles.controlButtons}>
				<button type="button" class={styles.editButton} onClick={editClicked}>
					<PencilLine />
				</button>
				<button
					type="button"
					class={styles.removeButton}
					onClick={removeClicked}
				>
					Remove
				</button>
			</div>
		</div>
	);
}

async function removeArg(e: MouseEvent, id: number) {
	try {
		await sendDeleteArgRequest(e, id);
	} catch (e) {
		if (e instanceof Error) {
			toast.error(e.message);
		}
	}
}

async function editPopup(
	e: MouseEvent,
	id: number,
	showPopup: (msg: string) => void,
) {
	e.stopPropagation();
	showPopup(`Editing ${id}`);
}

async function sendDeleteArgRequest(event: MouseEvent, id: number) {
	event.stopPropagation();
	const requestBody = { argument_id: id };
	const res = await fetch(`${backendURL}/arguments`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(requestBody),
	});
	if (res.status !== 200) {
		throw new Error(`${res.status}: ${await res.text()}`);
	}
}
