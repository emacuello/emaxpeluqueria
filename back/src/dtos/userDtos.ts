export interface IUserDtos {
	name: string;
	email: string;
	birthdate: string;
	nDni: number;
	username: string;
	password: string;
	image?: string;
	serverPrincipal?: boolean;
}

export interface IUserCreate {
	name: string;
	email: string;
	birthdate: string;
	nDni: number;
}

export interface IChangePassword {
	oldPassword: string;
	newPassword: string;
}
