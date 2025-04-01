import { Status } from "../category/types"

export interface ILessonForData {
    title: string,
    description: string,
    videoUrl: string,
    courseId: string

}


export interface ILesson extends ILessonForData {
    id: string,
    createdAt: string
}
export interface IInitialData {
    lessons: ILesson[],
    status: Status
}