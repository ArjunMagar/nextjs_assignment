import courseController from "./course.controller";



export async function POST(req: Request) {
    return courseController.createCourse(req)
}

export async function GET(req: Request) {
    return courseController.fetchCourses()

}

