import API from "@/http"
import { Status } from "@/store/category/types"
import { AppDispatch } from "@/store/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IInitialData, IMyCourse } from "./types"

const data: IInitialData = {
    mycourses: [],
    status: Status.Loading
}


const mycourseSlice = createSlice({
    name: "mycourses",
    initialState: data,
    reducers: {
        setStatus(state: IInitialData, action: PayloadAction<Status>) {
            state.status = action.payload
        },
        setMyCourses(state: IInitialData, action: PayloadAction<IMyCourse[]>) {
            state.mycourses = action.payload
        },
        // resetStatus(state) {
        //     state.status = Status.Loading
        // },
        // pushToMyCourses(state: IInitialData, action: PayloadAction<IMyCourse>) {
        //     state.mycourses.push(action.payload)
        // },
        // deleteMyCourses(state: IInitialData, action: PayloadAction<string>) {
        //     const index = state.mycourses.findIndex((course) => course.id == action.payload)
        //     if (index !== -1) {
        //         state.mycourses.splice(index, 1)
        //     }
        // }

    }
})

export const { setStatus, setMyCourses } = mycourseSlice.actions
export default mycourseSlice.reducer


export function fetchMyCourses() {
    return async function fetchMyCoursesThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get("/mycourse")
            if (response.status == 200) {
                // dispatch(setStatus(Status.Success))
                dispatch(setMyCourses(response.data.data))
            } else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}