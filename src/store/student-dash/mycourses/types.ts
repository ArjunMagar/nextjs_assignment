import { Status } from "@/store/category/types"


export interface ICourse{
    id: string,
    title: string,
    description: string,
    price: number,
    category: string,
    duration: string,
    createdAt: string
    

}



export interface IMyCourse{
    id: string,
    Course:ICourse
    

}


export interface IInitialData{
    mycourses: IMyCourse[],
    status: Status
}
