import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import Logo from "../../assets/logo-xl.png";

const Footer = () => {
    return (
        <footer className="bg-[#1e463a] text-white py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

                <div className="mb-7">
                    <Image src={Logo} alt="KeenKeeper Logo" width={270} height={50} priority />
                </div>

                <p className="max-w-2xl px-6 text-gray-200 mb-7 text-sm md:text-base leading-relaxed text-center break-words">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                </p>

                <div className="mb-10">
                    <h3 className="mb-4 font-medium text-lg">Social Links</h3>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="#"
                            className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
                        >
                            <FaInstagram size={16} />
                        </Link>

                        <Link
                            href="#"
                            className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
                        >
                            <FaFacebookF size={16} />
                        </Link>

                        <Link
                            href="#"
                            className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
                        >
                            <FaXTwitter size={16} />
                        </Link>
                    </div>
                </div>

                <div className="w-full border-t border-gray-600 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-300">
                    <p>© 2026 KeenKeeper. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition">Cookies</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;