export class EmailInUseError extends Error {
	constructor() {
		super("An account with that email already exists");
	}
}

export class UsernameInUseError extends Error {
	constructor() {
		super("An account with that username already exists");
	}
}

export class AccountNotExistsError extends Error {
	constructor() {
		super("An account with this email does not exist");
	}
}

export class IncorrectPasswordError extends Error {
	constructor() {
		super("Incorrect password");
	}
}
