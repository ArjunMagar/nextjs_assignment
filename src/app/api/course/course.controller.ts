import sequelize from "@/database/connection"
import Category from "@/database/models/Category"
import Course from "@/database/models/Course"




class courseController {

    async createCourse(req: Request) {
        try {
            await sequelize
            const { title, description, price, duration, category } = await req.json()
            const createdData = await Course.create({
                title,
                description,
                price,
                duration,
                category

            })
            const data = await Course.findByPk(createdData.id, {
                
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'name']
                    }
                ]
            })

            return Response.json({
                message: "Course created successfully!!",
                data
            }, { status: 201 })


        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }

    async fetchCourses() {
        try {
            await sequelize
            const data = await Course.findAll({
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'name']
                    }
                ]
            }) // return array []
            if (data.length === 0) {
                return Response.json({
                    message: "no course found"
                }, { status: 404 })
            }
            return Response.json({
                message: "courses fetched!!",
                data
            }, { status: 200 })

        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }

    async fetchCourse(id: string) {
        try {
            await sequelize
            const data = await Course.findByPk(id) //return in object
            if (!data) {
                return Response.json({
                    message: "No course with that id found"
                }, { status: 404 })
            }
            return Response.json({
                message: "course fetched successfully !!",
                data
            }, { status: 200 })
        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }

    async deleteCourse(id: string): Promise<Response> {
        try {
            await sequelize
            const data = await Course.findByPk(id)
            if (!data) {
                return Response.json({
                    message: " No course with that id "
                }, { status: 400 })
            }
            await Course.destroy({
                where: {
                    id
                }
            })
            // delete lessons too
            // const lessons = await Lesson.findAll({
            //     where: {
            //         courseId: id
            //     }
            // })
            // if (lessons.length === 0) {
            //     return Response.json({
            //         message: "Lessons not found"
            //     }, { status: 400 })
            // }
            // for (const lesson of lessons) {
            //     await lesson.destroy();
            // }

            return Response.json({
                message: "course deleted successfully"
            }, { status: 200 })
        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })

        }
    }


}




export default new courseController