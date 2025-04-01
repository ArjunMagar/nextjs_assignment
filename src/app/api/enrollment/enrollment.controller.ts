import { PaymentMethod } from "@/store/enrollments/enrollmentSlice"
import sequelize from "@/database/connection"
import Course from "@/database/models/Course"
import Enrollment from "@/database/models/Enrollment"
import Lesson from "@/database/models/Lesson"
import Payment from "@/database/models/Payment"
import User from "@/database/models/User"
//@ts-ignore
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import axios from "axios"





class enrollmentController {

    async enrollCourse(req: Request) {
        try {
            const session = await getServerSession(authOptions)
            await sequelize
            const { course, whatsapp, paymentMethod } = await req.json()
            const enrollmentData = await Enrollment.create({
                whatsapp,
                courseId: course,
                userId: session.user.id // session.user.id remaing work...

            })
            const courseData = await Course.findByPk(course)
            let paymentUrl;
            if (courseData) {
                if (paymentMethod === PaymentMethod.Esewa) {
                    //esewa
                } else {
                    //khalti
                    const datas = {
                        return_url: "http://localhost:3000/api/payment/success",
                        website_url: "http://localhost:3000/",
                        amount: courseData.price * 100,
                        purchase_order_id: enrollmentData.id,
                        purchase_order_name: "order_" + enrollmentData.id



                    }
                    const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", datas, {
                        headers: {
                            Authorization: "Key 23969b194dec40ea957208808bb42996"

                        }
                    })
                    paymentUrl = response.data.payment_url
                    // console.log(response, "Test ttttttttttttttttttttt")
                    await Payment.create({
                        enroll_Id: enrollmentData.id,
                        amount: courseData.price,
                        paymentMethod: PaymentMethod.Khalti,
                        pidx: response.data.pidx
                        

                    })
                }
            } else {
                return Response.json({
                    message: "No course fetched"
                }, { status: 400 })
            }

            return Response.json({
                message: "You enrolled the course successfully!!",
                data: {
                    enrollmentData,
                    paymentUrl
                }

            }, { status: 201 })


        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }

    async fetchEnrollments() {
        try {
            await sequelize
            const data = await Enrollment.findAll({
                include: [
                    {
                        model: Course,
                        // attributes: ['name', 'price']
                    },
                    {
                        model: User,
                        // attributes: ['name', 'email']
                    }
                ]
            }) // return array []
            if (data.length === 0) {
                return Response.json({
                    message: "no enrollment found"
                }, { status: 404 })
            }
            return Response.json({
                message: "Enrollments fetched!!",
                data
            }, { status: 200 })

        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }

    async fetchEnrollment(id: string) {
        try {
            await sequelize
            const data = await Enrollment.findByPk(id, {
                include: [
                    {
                        model: Course,
                        // attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        // attributes: ['id', 'name']
                    }
                ]
            }) //return in object
            if (!data) {
                return Response.json({
                    message: "No enrollment with that id found"
                }, { status: 404 })
            }
            return Response.json({
                message: "enrollment fetched successfully !!",
                data
            }, { status: 200 })
        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }

    async changeEnrollmentStatus(req: Request, id: string) {
        try {
            await sequelize
            const { status } = await req.json()
            const data = await Enrollment.findByPk(id)
            if (!data) {
                return Response.json({
                    message: "No Enrollment with that id found"
                }, { status: 401 })
            }
            const updatedData = await Enrollment.update({ enrollmentStatus: status }, {
                where: {
                    id
                }
            })
            return Response.json({
                message: "enrollment status updated !!",
                data: updatedData
            }, { status: 200 })

        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }

    async deleteEnrollment(id: string): Promise<Response> {
        try {
            await sequelize
            const data = await Enrollment.findByPk(id)
            if (!data) {
                return Response.json({
                    message: " No Enrollment with that id "
                }, { status: 400 })
            }
            await data.destroy()
            return Response.json({
                message: "Enrollment deleted successfully"
            }, { status: 200 })
        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })

        }
    }


}




export default new enrollmentController