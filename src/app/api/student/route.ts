import studentController from "./student.controller";

export async function GET() {
    return studentController.fetchStudents()

}