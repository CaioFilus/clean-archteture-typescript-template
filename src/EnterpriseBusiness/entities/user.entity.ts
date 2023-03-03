
export enum UserType {
    Admin = 'admin',
    Employee = 'employee',
    Customer = 'customer',
}

export default interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    type: UserType,
}
