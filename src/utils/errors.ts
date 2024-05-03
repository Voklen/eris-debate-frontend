export class AccountExistsError extends Error {
	constructor() {
		super("An account with that email already exists");
	}
}
