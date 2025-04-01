import MycourseController from "./mycourse.controller";

export async function GET(req: Request) {
    return MycourseController.fetchMyCourses()

}

