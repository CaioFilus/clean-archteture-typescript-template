
export enum UserType {
    Admin = 'admin',
    Cooperative = 'cooperative',
    Accounting = 'accounting',
}

export default interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    type: UserType,
}
