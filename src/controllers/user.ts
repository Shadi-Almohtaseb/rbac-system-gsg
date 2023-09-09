import { UserNS } from "../../@types/user.js"
import dataSource from "../db/dataSource.js"
import { User } from "../db/entities/User.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';


const createUser = (payload: User) => {

    return dataSource.manager.transaction(async transaction => {
        const newUser = User.create(payload);
        await transaction.save(newUser);
        // if (payload.type === 'employee') {
        //   const employee = EmployeeProfile.create({
        //     applications: [],
        //     cvUrl: payload.cvUrl || ''
        //   });
        //   employee.user = newUser;
        //   await transaction.save(employee);
        // } else if (payload.type === 'employer') {
        //   const company = new CompanyProfile();
        //   company.user = newUser;
        //   company.description = payload.description || '';
        //   company.name = payload.fullName || '';
        //   await transaction.save(company);
        // }
    });
}


const login = async (email: string, password: string) => {
    try {
        const user = await User.findOneBy({
            email
        });

        const passwordMatching = await bcrypt.compare(password, user?.password || '')

        if (user && passwordMatching) {
            const token = jwt.sign({
                email: user.email,
                userName: user.userName
            }, process.env.SECRET_KEY || "", {
                expiresIn: "30m"
            })

            return {
                user,
                token
            }
        } else {
            throw ("invalid email or password")
        }
    } catch (error) {
        throw ("invalid email or password")
    }
}

const getAllUsers = () => {
    const users = User.find()
    return users
}

export { createUser, login, getAllUsers }