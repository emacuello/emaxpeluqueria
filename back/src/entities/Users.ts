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
	@Column() birthdate: string;
	@Column('integer') nDni: number;

	@OneToOne(() => Credential)
	@JoinColumn({ name: 'credentialsid' })	credential: Credential;

	@OneToMany(() => Appointment, (appointment) => appointment.user) appointment: Appointment[];
}

