import lessonController from "./lesson.controller"




export async function POST(req: Request) {
    return lessonController.createLesson(req)
}

export async function GET(req: Request) {
    return lessonController.fetchLessons(req)

}

