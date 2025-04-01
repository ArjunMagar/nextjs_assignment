import sequelize from "@/database/connection"
import Course from "@/database/models/Course"
import Enrollment from "@/database/models/Enrollment"
//@ts-ignore
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { EnrollmentStatus } from "@/store/enrollments/types"



class MycourseController {

    async fetchMyCourses() {
        try {
            const session = await getServerSession(authOptions)
            await sequelize
            const data = await Enrollment.findAll({
                where:{
                    enrollmentStatus:EnrollmentStatus.Approve,
                    userId:session.user.id
                },
                include: [
                    {
                        model: Course,
                        attributes: ['id', 'title','description',"duration"]
                    }
                ]
                ,attributes:['id']
            }) // return array []
            if (data.length === 0) {
                return Response.json({
                    message: "no course found"
                }, { status: 404 })
            }
            return Response.json({
                message: "mycourses fetched!!",
                data
            }, { status: 200 })

        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }
}

export default new MycourseController