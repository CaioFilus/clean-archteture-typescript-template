import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum UserModelRole {
    Admin = 'ADMIN',
    Employee = 'EMPOYEE',
    Customer = 'CUSTOMER',
}

@Entity({name: "M_MYPAGE_USER" })
export default class UserModel {

    @PrimaryGeneratedColumn({name: "MYPAGE_USER_ID"})
    id!: number;

    @Column({name: "MYPAGE_USER_ADDRESS"})
    name!: string;

    @Column({})
    email!: string;

    @Column({})
    password!: string;

    @Column("text")
    type!: UserModelRole;
}
