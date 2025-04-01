import enrollmentController from "./enrollment.controller"




export async function POST(req: Request) {
    return enrollmentController.enrollCourse(req)
}

export async function GET(req: Request) {
    return enrollmentController.fetchEnrollments()

}

