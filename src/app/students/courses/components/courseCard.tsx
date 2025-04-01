'use client'
import { ICourse } from "@/store/courses/types"
import { useAppDispatch } from "@/store/hook"
import { useCallback, useState } from "react"
import Modal from "./modal"

function CourseCard({ course }: { course: ICourse }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = useCallback((id:string) => {
        setIsModalOpen(true)
        setCourseId(id)
    }, [])
    const closeModal = useCallback(() => setIsModalOpen(false), [])
    const [courseId,setCourseId] = useState<string>("")
    return (
        <div className="max-w-lg mt-4 mx-2 bg-green-800 shadow-lg rounded-2xl">
            {isModalOpen && <Modal closeModal={closeModal} courseId={courseId} />}
            <div className="px-6 py-5">
                <div className="flex items-start">
                    <div className="flex-grow truncate">
                        <div className="w-full sm:flex justify-between items-center mb-3">
                            <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">{course.title}</h2>
                        </div><span className="bg-red-800 px-2 py-0.5 font-semibold text-sm rounded-lg text-white">{course.Category.name}</span>

                        <div className="flex items-end justify-between whitespace-normal">
                            <div className="max-w-md text-indigo-100">
                                <p className="mb-2">{course.description.substring(0, 80)}...</p>
                            </div>
                        </div>
                        <div className="flex items-center  ml-4">
                            <div className="flex gap-4  items-center mr-4">
                                <button onClick={()=>openModal(course.id)} className="bg-blue-500 p-2 hover:bg-blue-600 border-blue-500 rounded-md">Enroll</button>
                            </div>
                            <div className="font-bold" >
                                <p className="text-sm text-gray-400">Duration : {course.duration}</p>
                                <p className="text-sm text-gray-400">Price : {course.price}</p>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


export default CourseCard