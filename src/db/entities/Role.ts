import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";
import { Permission } from "./Permission.js";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ['user', 'admin', 'editor'],
        default: "user"
    })
    name: 'user' | 'admin' | 'editor';

    @ManyToMany(() => User, user => user.roles)
    users: User[];

    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable()
    permissions: Permission[];
}