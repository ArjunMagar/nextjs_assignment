"use client"
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useEffect } from "react";
import MycourseCard from "./components/mycourseCard";
import { fetchMyCourses } from "@/store/student-dash/mycourses/mycourseSlice";


function Courses() {
    const {mycourses} = useAppSelector((store)=>store.mycourses)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(fetchMyCourses())
    },[])

    return (
        <>
            <div className="flex flex-wrap">
                {
                    mycourses.length >0 && mycourses.map((mycourse)=>{
                        return(
                            <MycourseCard key={mycourse.id} mycourse={mycourse}/>
                        )
                    })
                }
           
           
            </div>
        </>


    );
}

export default Courses
