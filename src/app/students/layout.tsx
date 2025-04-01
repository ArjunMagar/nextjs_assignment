"use client"

import Dashboard from "@/components/dashboard/Dashboard"
import StudentDashboard from "@/components/dashboard/StudentDashboard"
import Navbar from "@/components/navbar/Navbar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"


function StudentsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession()
  useEffect(() => {
    console.log(status, "STATUS")
    if (status === "loading") return;
    //@ts-ignore
    if (!session || session.user.role !== "student") {
      redirect("/")
    }

  }, [session, status])

  if (status === "loading" || status === "unauthenticated") return <p>Loading...</p>
  return (
  <>
    
    <StudentDashboard>
      {children}
    </StudentDashboard>
  </>

  )
}

export default StudentsLayout