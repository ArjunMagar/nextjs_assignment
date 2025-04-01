import categoryController from "./category.controller";

export async function POST(req:Request) {
    return categoryController.createCategory(req)
}

export async function GET(req:Request) {
        return categoryController.getCategories()
}