
export enum UserType {
    Admin = 'Admin',
    Employee = 'Employee',
    Customer = 'Customer',
}

export default interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    type: UserType,
}
