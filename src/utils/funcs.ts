export function randomPlaceholder() {
	const emails = [
		"socrates@erisdebate.com",
		"plato@erisdebate.com",
		"rené.descartes@erisdebate.com",
		"immanuel.kant@erisdebate.com",
		"confucius@erisdebate.com",
		"laozi@erisdebate.com",
	];
	return emails[Math.floor(Math.random() * emails.length)];
}

export function getFormData(
	event: SubmitEvent,
	emptyFormData: Record<string, string>,
) {
	const form = event.target as HTMLFormElement;
	if (form === null) throw new Error("No form element found");
	// Fill formData by extracting the value from every child element with a name matching a property in the object
	const formData = emptyFormData;
	for (const key in formData) {
		const inputElement = form.querySelector(
			`input[name="${key}"],textarea[name="${key}"]`,
		) as HTMLInputElement;
		if (inputElement === null) continue;
		formData[key as keyof typeof emptyFormData] = inputElement.value;
	}
	return formData;
}
