import sequelize from "@/database/connection"
import User from "@/database/models/User"
import { Role } from "@/store/students/types"


class studentController {
    async fetchStudents() {
        try {
            await sequelize
            const data = await User.findAll({
                where: {
                    role: Role.Student
                }
            }) // return array []
            if (data.length === 0) {
                return Response.json({
                    message: "no student found"
                }, { status: 404 })
            }
            return Response.json({
                message: "Student fetched!!",
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

export default new studentController