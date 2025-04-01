import { Status } from "../category/types"

export enum EnrollmentStatus {
    Approve = 'Approve',
    Reject = 'Reject',
    Pending = 'Pending'
}
export interface ICourse {
    title: string
}
export interface IUser {
    id: string,
    username: string
}

export interface IEnrollment {
    id: string,
    student: string,
    course: string,
    enrolledAt: string,
    enrollmentStatus: EnrollmentStatus,
    whatsapp: string,
    Course: ICourse,
    User: IUser

}

export interface IInitialData {
    status: Status,
    enrollments: IEnrollment[],
    paymentUrl: null | string

}