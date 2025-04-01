import sequelize from "@/database/connection"
import Course from "@/database/models/Course"
import Lesson from "@/database/models/Lesson"



class lessonController {

    async createLesson(req: Request) {
        try {
            await sequelize
            const { title, description, videoUrl, courseId } = await req.json()
            const data = await Lesson.create({
                title,
                description,
                videoUrl,
                courseId

            })
            return Response.json({
                message: "Lesson created successfully!!",
                data
            }, { status: 201 })


        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }

    async fetchLessons(req: Request) {
        try {
            await sequelize
            const { searchParams } = new URL(req.url)
            const courseId = searchParams.get("courseId")
            // console.log(courseId, "Url Test")
            const data = await Lesson.findAll({
                where:
                {
                    courseId
                },
                include: [
                    {
                        model: Course,
                        // attributes: ['id', 'name']
                    }
                ]
            }) // return array []
            if (data.length === 0) {
                return Response.json({
                    message: "no lesson found"
                }, { status: 404 })
            }
            return Response.json({
                message: "lessons fetched!!",
                data
            }, { status: 200 })

        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }

    async fetchLesson(id: string) {
        try {
            await sequelize
            const data = await Lesson.findByPk(id) //return in object
            if (!data) {
                return Response.json({
                    message: "No lesson with that id found"
                }, { status: 404 })
            }
            return Response.json({
                message: "lesson fetched successfully !!",
                data
            }, { status: 200 })
        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }

    async deleteLesson(id: string): Promise<Response> {
        try {
            await sequelize
            const data = await Lesson.findByPk(id)
            if (!data) {
                return Response.json({
                    message: " No lesson with that id "
                }, { status: 400 })
            }
            await data.destroy()
            return Response.json({
                message: "lession deleted successfully"
            }, { status: 200 })
        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })

        }
    }


}




export default new lessonController