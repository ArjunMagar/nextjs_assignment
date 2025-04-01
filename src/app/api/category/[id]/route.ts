import categoryController from "../category.controller"

export async function DELETE(request:Request,{params}:{params:{id:string}}) {

   const {id} =  await params

   return categoryController.deleteCategory(request,id)
    
}

export async function PATCH(request:Request,{params}:{params:{id:string}}) {

   const {id} =  await params

   return categoryController.editCategory(request,id)
    
}