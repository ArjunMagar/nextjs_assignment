'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Ilesson {
    title: string,
    videoUrl: string,
    description: string
}

async function fetchLesson(id: string) {


    try {
        const response = await fetch(`http://localhost:3000/api/lesson/${id}`);

        if (!response.ok)
            throw new Error("Failed to fetch lesson,something went wrong");
        return response.json();

    } catch (error) {
        console.log(error);
    }


}

function lesson() {

    const { lessonId } = useParams<{ lessonId: string }>()
    const [lesson, setLesson] = useState<Ilesson | null>(null)

    console.log(lesson)

    useEffect(() => {
        const getlesson = async () => {
            const { data } = await fetchLesson(lessonId)

            setLesson(data)
        }
        getlesson()
    }, [])



    return (

        <>
            <div>
                <h1 className="text-3xl font-bold text-center text-indigo-700 mt-5 mb-3">
                    {lesson?.title}
                </h1>

            </div>

            <div className="relative w-full h-0 pb-[45%]">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={lesson?.videoUrl}
                    title="YouTube video"
                    allowFullScreen
                ></iframe>
            </div>

            <div>
                <h1 className="text-black p-3 text-center text-2xl">{lesson?.description}</h1>
            </div>
        </>



    );
}

export default lesson;