export function generateProfilePic(text: string) {
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	if (!context) return;

	canvas.width = 200;
	canvas.height = 200;

	const rand = pseudoRandom(text);
	const foregroundColor = "white";

	const backgroundColor = HSLToHex({
		h: rand.next().value! % 256,
		s: 10 + (rand.next().value! % 91),
		l: 50,
	});

	// Draw background
	context.fillStyle = backgroundColor;
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw text
	context.font = "bold 100px Assistant";
	context.fillStyle = foregroundColor;
	context.textAlign = "center";
	context.textBaseline = "middle";
	const letter = text[0].toLocaleUpperCase();
	context.fillText(letter, canvas.width / 2, canvas.height / 2);

	return canvas.toDataURL("image/png");
}

function* pseudoRandom(seed: string) {
	const encoder = new TextEncoder();
	const reverseText = seed.split("").reverse().join("");
	const textBytes = encoder.encode(reverseText);
	let value = bytesToNumber(textBytes);
	while (true) {
		value = (value * 16807) % 2147483647;
		yield value;
	}
}

function bytesToNumber(array: Uint8Array) {
	const buffer = new DataView(array.buffer, 0);
	const result = buffer.getUint32(0, false);

	return result;
}

function HSLToHex(hsl: { h: number; s: number; l: number }): string {
	const { h, s, l } = hsl;

	const hDecimal = l / 100;
	const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

		// Convert to Hex and prefix with "0" if required
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0");
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}
