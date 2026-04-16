"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaHome, FaClock, FaChartLine, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/logo.png";

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/", icon: <FaHome /> },
        { name: "Timeline", path: "/timeline", icon: <FaClock /> },
        { name: "Stats", path: "/stats", icon: <FaChartLine /> },
    ];

    return (
        <nav className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-7 py-6 flex justify-between items-center">

                <Link href="/" className="flex-shrink-0">
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={150}
                        height={40}
                        className="cursor-pointer"
                    />
                </Link>

                <div className="hidden md:flex gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${pathname === link.path
                                    ? "bg-green-500 text-white shadow-md"
                                    : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                                }`}
                        >
                            {link.icon} {link.name}
                        </Link>
                    ))}
                </div>

                <button
                    className="md:hidden text-2xl text-gray-700 p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-6 pb-4 flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-lg ${pathname === link.path
                                    ? "bg-green-500 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {link.icon} {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;