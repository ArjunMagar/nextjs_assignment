
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
// import style from ""
export default function Home() {

  // console.log(styles,"STYLE")
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-around h-screen">
        {/* Hero Section */}
        <div className=" flex items-center justify-center ">
          <div className=" h-full bg-transparent bg-gray-100 bg-cover bg-center bg-no-repeat flex items-center text-black pl-[137px]">
            <div className="flex flex-col">
              <div className="text-[15px] leading-7">QUALITY EDUCATION | AFFORDABLE PRICE | JOB READY COURSES</div>
              <div className="text-[46px] font-medium ">Nepals Most Affordable IT ELearning </div>
              <div className="text-[46px] font-medium ">Platform</div>
              <p className="w-[800px] mb-[40px]">
                Live classes on Google Meet, fully practical courses, daily recorded sessions, and lifetime mentorship & support.
              </p>
              <div className="flex gap-[16px]">
                <button className="rounded-[4px] p-[12px] bg-gray-300 font-medium text-black hover:bg-gray-400">
                  Explore Courses
                </button>
                <button className="rounded-[4px] p-[12px] bg-green-600 font-medium text-black hover:bg-green-500">
                  Enroll Now
                </button>

              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <Image
            src="/image/heros.jpeg"  // Path to your image in the public folder
            alt="My Photo"
            width={775}  // Desired width
            height={0} // Desired height
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

    </>

  );
}
