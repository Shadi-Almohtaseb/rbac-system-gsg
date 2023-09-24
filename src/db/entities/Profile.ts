// Profile.js
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User.js';

@Entity('profiles')
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ length: 255, nullable: false })
    firstName: string

    @Column({ length: 255, nullable: false })
    lastName: string

    @Column({ type: "date", nullable: false })
    dateOfBirth: Date;

    @Column()
    name: string;

    @OneToOne(() => User, user => user.profile)
    @JoinColumn()
    user: Partial<User>;
}
