import StudentSidebar from "../sidebar/Student-Sidebar"
import { signIn, signOut, useSession } from "next-auth/react"

function StudentDashboard({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* sidebar */}
            <div className="hidden md:flex flex-col w-64 bg-green-800">
                <div className="flex items-center justify-center h-16 bg-green-900">
                    <span className="text-white font-bold text-[24px]">DigitalPathsala</span>
                </div>
            
                <StudentSidebar />

            </div>
            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center justify-between h-16 bg-green-900 border-b border-green-900">
                    <div className="flex items-center px-4">
                        {/* <button className="text-gray-500 focus:outline-none focus:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button> */}
                        {/* <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" /> */}
                    </div>
                    <div onClick={() => signOut()} className="flex items-center  mx-10 p-1 px-[6px] border border-red-800 rounded-sm bg-red-800 " >
                        <button className="flex items-center text-white font-bold hover:text-gray-200 focus:outline-none focus:text-gray-400">
                            Sign Out
                        </button>
                    </div>
                </div>
                {children}
            </div>
        </div>

    )
}

export default StudentDashboard