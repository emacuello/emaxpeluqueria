/* eslint-disable indent */
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './Users';

@Entity({ name: 'credentials' })
export class Credential {
	@PrimaryGeneratedColumn() id: number;
	@Column({ length: 50, unique: true }) username: string;
	@Column({ length: 250 }) password: string;
	@OneToOne(() => User, (user) => user.credential, { onDelete: 'CASCADE' })
	user: User;
}
