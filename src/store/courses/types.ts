import { Status } from "../category/types";


export interface ICategory{
    id : string,
    name: string
}
export interface ICourse{
    id: string,
    title: string,
    description: string,
    price: number,
    category: string,
    duration: string,
    Category:ICategory,
    createdAt: string
    

}


export interface IInitialData{
    courses: ICourse[],
    status: Status
}
