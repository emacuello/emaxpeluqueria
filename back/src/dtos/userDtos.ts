export interface IUserDtos {
	name: string;
	email: string;
	birthdate: string;
	nDni: number;
	username: string;
	password: string;
	image?: string;
}

export interface IUserCreate {
	name: string;
	email: string;
	birthdate: string;
	nDni: number;
}
