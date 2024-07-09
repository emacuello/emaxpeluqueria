/* eslint-disable indent */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './Users';

@Entity({ name: 'appointments' })
export class Appointment {
	@PrimaryGeneratedColumn() id: number;
	@Column({ length: 40 }) date: string;
	@Column({ length: 50 }) time: string;
	@Column({ length: 50 }) description: string;
	@Column({ default: 'active' }) status: string;

	@ManyToOne(() => User, (user) => user.appointment, { onDelete: 'CASCADE' })
	user: User;
}
