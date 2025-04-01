
import sequelize from "@/database/connection"
import Category from "@/database/models/Category"
import authMiddleware from "../../../../middleware.ts/auth.middleware"
import { NextRequest } from "next/server"



class CategoryController {
    async createCategory(req: Request): Promise<Response> {

        try {

            sequelize
            const response = await authMiddleware(req as NextRequest)
            if (response.status === 401) {
                return response;
            }
            const { name, description } = await req.json() as { name: string; description?: string }
            //already exist or not 
            const existingCategory = await Category.findOne({
                where: {
                    name
                }
            })
            if (existingCategory) {
                return Response.json({
                    message: "Category already existed with that name!!"
                }, { status: 400 })
            }

            const category = await Category.create({
                name,
                description
            })

            return Response.json({
                message: "Category created successfully",
                data: category
            }, { status: 201 })

        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })

        }
    }
    async getCategories(): Promise<Response> {
        try {
            sequelize
            const categories = await Category.findAll()
            if (categories.length == 0) {
                return Response.json({
                    message: " No categories found"
                }, { status: 404 })
            }
            return Response.json({
                message: "Category fetched successfully",
                data: categories
            })
        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong!!"
            }, { status: 500 })
        }
    }


    async deleteCategory(req: Request, id: string): Promise<Response> {
        try {
            await sequelize
            const response = await authMiddleware(req as NextRequest)
            if (response.status === 401) {
                return response;
            }
            const data = await Category.findAll({
                where: {
                    id
                }
            })
            if (data.length === 0) {
                return Response.json({
                    message: " No category with that id "
                }, { status: 400 })
            }
            await Category.destroy({
                where: {
                    id
                }
            })

            return Response.json({
                message: "category deleted successfully"
            }, { status: 200 })
        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })

        }
    }
    async editCategory(req: Request, id: string): Promise<Response> {

        try {

            sequelize
            const response = await authMiddleware(req as NextRequest)
            if (response.status === 401) {
                return response;
            }
            const { name, description } = await req.json() as { name: string; description?: string }
            //already exist or not 
            const existingCategory = await Category.findOne({
                where: {
                    id
                }
            })
            if (!existingCategory) {
                return Response.json({
                    message: " No Category with that id !!"
                }, { status: 400 })
            }

            const newEditCategory = await Category.update(
                {
                    name,
                    description
                }, {
                where: {
                    id
                },
            })

            return Response.json({
                message: "Category updated successfully",
                data: newEditCategory
            }, { status: 201 })

        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })

        }
    }
}





export default new CategoryController

// 22 no. video is important for code optimization 