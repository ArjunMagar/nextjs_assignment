
import enrollmentController from "../enrollment.controller"



export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params
    return enrollmentController.fetchEnrollment(id)

}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params
    return enrollmentController.deleteEnrollment(id)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params
    return enrollmentController.changeEnrollmentStatus(req,id)
}