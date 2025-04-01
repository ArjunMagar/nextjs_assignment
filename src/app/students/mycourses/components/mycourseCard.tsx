'use client'

import { useAppDispatch } from "@/store/hook"
import { IMyCourse } from "@/store/student-dash/mycourses/types"
import { redirect } from "next/navigation"
import { useCallback, useState } from "react"


function MycourseCard({ mycourse }: { mycourse: IMyCourse }) {

    return (
        <div className="max-w-lg mt-4 mx-2 bg-green-800 shadow-lg rounded-2xl">

            <div className="px-6 py-5">
                <div className="flex items-start">
                    <div className="flex-grow truncate">
                        <div className="w-full sm:flex justify-between items-center mb-3">
                            <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">{mycourse.Course.title}</h2>
                        </div>
                        {/* <span className="bg-red-800 px-2 py-0.5 font-semibold text-sm rounded-lg text-white">{mycourse.Course.duration} days</span> */}

                        <div className="flex items-end justify-between whitespace-normal">
                            <div className="max-w-md text-indigo-100">
                                <p className="mb-2">{mycourse.Course.description.substring(0, 80)}...</p>
                            </div>
                        </div>
                        <div className="flex items-center  ml-4">
                            <div className="flex gap-4  items-center mr-4">
                                <button onClick={() => redirect(`/students/mycourses/${mycourse.Course?.id}/lessons`)} className="bg-blue-500 p-2 hover:bg-blue-600 border-blue-500 rounded-md">See More</button>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default MycourseCard