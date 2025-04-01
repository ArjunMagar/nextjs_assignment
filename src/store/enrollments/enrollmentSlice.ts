import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { EnrollmentStatus, IEnrollment, IInitialData } from "./types";
import { AppDispatch } from "../store";
import API from "@/http";


export enum PaymentMethod {
    Esewa = "esewa",
    Khalti = "khalti",
}

export interface IEnrollmentData {
    whatsapp: string,
    course: string,
    paymentMethod: PaymentMethod
}


const data: IInitialData = {
    status: Status.Loading,
    enrollments: [],
    paymentUrl: null
}

const enrollmentSlice = createSlice({
    name: "enrollments",
    initialState: data,
    reducers: {
        setStatus(state: IInitialData, action: PayloadAction<Status>) {
            state.status = action.payload
        },
        setEnrollment(state: IInitialData, action: PayloadAction<IEnrollment[]>) {
            state.enrollments = action.payload
        },
        setPaymentUrl(state, action) {
            state.paymentUrl = action.payload
        },
        resetStatus(state: IInitialData) {
            state.status = Status.Loading
        },

    }
})

export const { setStatus, setEnrollment, setPaymentUrl,resetStatus } = enrollmentSlice.actions
export default enrollmentSlice.reducer


export function fetchEnrollments() {
    return async function fetchEnrollmentsThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get("/enrollment")
            if (response.status === 200) {
                dispatch(setStatus(Status.Success))
                dispatch(setEnrollment(response.data.data))
            } else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}



export function enrollCourse(data: IEnrollmentData) {
    return async function enrollCourseThunk(dispatch: AppDispatch) {
        try {
            const response = await API.post("/enrollment", data)
            if (response.status == 201) {
                dispatch(setStatus(Status.Success))
                dispatch(setPaymentUrl(response.data.data.paymentUrl))
                window.location.href = response.data.data.paymentUrl
            } else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}


export function changeEnrollmentStatus(status: EnrollmentStatus, id: string) {
    return async function changeEnrollmentStatusThunk(dispatch: AppDispatch) {
        try {
            const response = await API.patch(`/enrollment/${id}`, { status: status })
            if (response.status === 200) {
                dispatch(setStatus(Status.Success))
                window.location.reload(); 
            } else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}
