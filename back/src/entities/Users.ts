/* eslint-disable indent */
import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Credential } from './credential';
import { Appointment } from './appointments';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn() id: number;
	@Column({ length: 100 }) name: string;
	@Column({ length: 100, unique: true }) email: string;
	@Column({ nullable: true }) birthdate: string;
	@Column({ nullable: true, type: 'integer' }) nDni: number;
	@Column({ default: 'user' }) role: string;
	@Column({ default: 'https://i.ibb.co/8Ns4z0t/user-center-5-128.png' })
	image: string;
	@Column({ default: false }) socialUser: boolean;
	@Column({ default: false }) serverPrincipal: boolean;
	@OneToOne(() => Credential, { cascade: true })
	@JoinColumn({ name: 'credentialsid' })
	credential: Credential;

	@OneToMany(() => Appointment, (appointment) => appointment.user, {
		cascade: true,
	})
	appointment: Appointment[];
}
