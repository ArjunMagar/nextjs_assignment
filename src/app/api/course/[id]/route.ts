import courseController from "../course.controller"


export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params
    return courseController.fetchCourse(id)

}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params
    return courseController.deleteCourse(id)
}