import { Status } from "../category/types"

export enum Role {
    Student = "student",
    Admin = "admin",

}
export interface IStudent {
    id:string,
    username: string,
    profileImage: string,
    email: string,
    role: Role


}

export interface IInitialData {
    students: IStudent[],
    status: Status

}