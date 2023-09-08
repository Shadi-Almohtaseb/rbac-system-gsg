import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role.js";

@Entity('permissions')
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ['create_post', 'edit_user', 'delete_comment'],
    })
    name: 'create_post' | 'edit_user' | 'delete_comment';

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];
}