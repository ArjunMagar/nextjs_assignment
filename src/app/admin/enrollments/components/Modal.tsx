
import { Status } from "@/store/category/types"
import { changeEnrollmentStatus, fetchEnrollments, resetStatus } from "@/store/enrollments/enrollmentSlice"
import { EnrollmentStatus } from "@/store/enrollments/types"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { ChangeEvent, useEffect, useState } from "react"



interface IModalProps {
    closeModal: () => void,
    enrollmentId: string,
    enrollmentStatuss:string
}


const Modal: React.FC<IModalProps> = ({ closeModal, enrollmentId,enrollmentStatuss}) => {
    

    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const { status} = useAppSelector((store) => store.enrollments)
    const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus>(EnrollmentStatus.Pending)
    // console.log(status)

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        dispatch(changeEnrollmentStatus(enrollmentStatus,enrollmentId))
    }
    useEffect(() => {
        if (status === Status.Success) {
            setLoading(false)
            closeModal();
            dispatch(resetStatus())
            // window.location.reload(); 
        }
    }, [status])
    

    

    const handlePaymentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setEnrollmentStatus(e.target.value as EnrollmentStatus)
    }


    return (
        <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" />
            <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Enrollment_Status</h3>
                    <button onClick={closeModal} id="closeModalButton" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-4">
                    <form onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Enrollment Status</label>
                            {/* <input onChange={(e) => setEnrollStatus(e.target.value)} type="text" id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Status" required /> */}
                            <select onChange={handlePaymentChange} id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" required >
                                <option hidden value={enrollmentStatuss} >{enrollmentStatuss}</option>
                                <option value={EnrollmentStatus.Pending}>{EnrollmentStatus.Pending}</option>
                                <option value={EnrollmentStatus.Approve}>{EnrollmentStatus.Approve}</option>
                                <option value={EnrollmentStatus.Reject}>{EnrollmentStatus.Reject}</option>


                            </select>
                        </div>

                        <div className="flex justify-end gap-3 mt-3">
                            <button onClick={closeModal} disabled={loading} id="cancelButton" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                                Cancel
                            </button>
                            <button disabled={loading} id="submitUrlButton" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600" >
                                {loading ? "Updating ..." : "Update"}
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