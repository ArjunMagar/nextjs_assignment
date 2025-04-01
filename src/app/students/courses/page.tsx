"use client"
import { useAppDispatch, useAppSelector } from "@/store/hook";
import CourseCard from "./components/courseCard";
import { useEffect } from "react";
import { fetchCourses } from "@/store/courses/courseSlice";

function Courses() {
    const {courses} = useAppSelector((store)=>store.courses)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(fetchCourses())
    },[])

    return (
        <>
            <div className="flex flex-wrap">
                {
                    courses.length >0 && courses.map((course)=>{
                        return(
                            <CourseCard key={course.id} course={course}/>
                        )
                    })
                }
           
           
            </div>
        </>


    );
}

export default Courses
