import { fetchCategories } from "@/store/category/categorySlice"
import { Status } from "@/store/category/types"
import { createCourse, resetStatus } from "@/store/courses/courseSlice"
import { ICourse } from "@/store/courses/types"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { ChangeEvent, useEffect, useState } from "react"



const Modal = ({ closeModal }: { closeModal: () => void }) => {

    const [loading, setLoading] = useState(false)
    const { status } = useAppSelector((store) => store.courses)
    const dispatch = useAppDispatch()
    const { categories } = useAppSelector((store) => store.categories)
    // console.log(status)
    const [data, setData] = useState<ICourse>({
        id: "",
        title: "",
        description: "",
        price: 0,
        category: "",
        duration: "",
        Category: {
            id: "",
            name: ""
        },
        createdAt: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })

    }
    const createCourseHandle = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        dispatch(createCourse(data))

    }
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories())
        } else {
            console.log("not fetched again!!")
        }

    }, [])

    useEffect(() => {
        if (status === Status.Success) {
            setLoading(false)
            closeModal();
            dispatch(resetStatus())
        }
    }, [status])


    return (
        <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" />
            <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Course</h3>
                    <button onClick={closeModal} id="closeModalButton" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-4">
                    <form onSubmit={createCourseHandle}>
                        <div>
                            <label htmlFor="c_title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Name</label>
                            <input onChange={handleChange} name="title" type="text" id="c_title" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="HTML,NEXTJS,REACTJS,NODEJS" required />
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="course_price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Price</label>
                                <input onChange={handleChange} name="price" type="number" id="course_price" className="w-full  mt-1 p-2 pr-0 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="1499" required />
                            </div>
                            <div>
                                <label htmlFor="course_duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Duration</label>
                                <input onChange={handleChange} name="duration" type="number" id="course_duration" className="w-full ml-3 mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="60 Days" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                            <select onChange={handleChange} name="category" id="category" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" required >

                                <option hidden value="">Select Category</option>
                                {
                                    categories.length > 0 ? categories.map((category) => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )
                                    }) : (<option value="no"> No categories yet</option>)
                                }

                            </select>
                        </div>
                        <div>
                            <label htmlFor="c_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Description</label>
                            <textarea onChange={handleChange} name="description" id="c_description" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="....." required />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button onClick={closeModal} disabled={loading} id="cancelButton" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                                Cancel
                            </button>
                            <button disabled={loading} id="submitUrlButton" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600" >
                                {loading ? "Adding ..." : "Add Course"}
                                <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Modal