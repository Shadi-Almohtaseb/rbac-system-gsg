import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Profile } from "./entities/Profile.js";
import { Role } from "./entities/Role.js";
import { Permission } from "./entities/Permission.js";

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        User,
        Profile,
        Role,
        Permission
    ],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
});

export default dataSource;