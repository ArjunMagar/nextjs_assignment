'use client'
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { SidebarData } from "./Nav-SidebarData";
import { FaGraduationCap } from "react-icons/fa6";
import * as IoIcons from 'react-icons/io';
import { GiBookmarklet } from "react-icons/gi";
import style from "./Navbar.module.css";
import { useSession } from "next-auth/react";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const { data: session, status } = useSession();

    const showSidebar = () => setSidebar(!sidebar);
    const closeSidebar = () => setSidebar(false); // Closes sidebar when clicking outside

    return (
        <>
            {/* Navbar Top */}
            <div className={style.navbar}>
                <Link href='/'>
                    <div className={style.menuBars}>
                        <GiBookmarklet />
                        <h1 style={{ paddingLeft: "10px" }}>DigitalPathsala</h1>
                    </div>
                </Link>
                <div>
                    {sidebar ? (
                        <IoCloseSharp className={style.menuBars} onClick={showSidebar} />
                    ) : (
                        <FaBars className={style.menuBars} onClick={showSidebar} />
                    )}
                </div>

                {/* Search Bar */}
                <form className="relative px-20 text-white focus-within:text-white">
                    <div className="flex justify-between">
                        <input
                            type="text"
                            id="default-search"
                            className="block w-[650px] h-11 pr-5 bg-white pl-5 py-2.5 text-base font-normal shadow-xs text-black border border-white rounded-full placeholder-gray-400 focus:outline-none"
                            placeholder="Search for course by name"
                            required
                        />
                    </div>
                    <div className="absolute inset-y-0 right-24 flex items-center pl-3 cursor-pointer">
                        <button type="submit">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </form>

                {/* User Session */}
               
                
                    <Link href='/login'>
                        <div className={style.menuBarss}>
                            <button style={{ paddingRight: "5px" }}>Student Login</button>
                            <FaGraduationCap />
                        </div>
                    </Link>
            
            </div>

            {/* Blur Overlay when Sidebar is Active */}
            {sidebar && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-none transition-all duration-300"
                    onClick={closeSidebar} // Close sidebar when clicking outside
                ></div>
            )}

            {/* Sidebar Menu */}
            <nav className={`fixed top-0 left-0 w-64 h-full bg-lime-600 p-4 transition-transform duration-300 ${sidebar ? "translate-x-0" : "-translate-x-full"}`}>
              <div className={style.sideLogo}>
              <IoIcons.IoIosPaper />
              <h1>DigitalPathsala</h1>
              </div>
                <ul className={style.navMenuItems}>
                    {SidebarData.map((item, index) => (
                        <li key={index} className={style.navText}>
                            <Link href={item.path} className={style.navLink}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
