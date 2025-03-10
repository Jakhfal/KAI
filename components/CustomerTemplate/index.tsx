"use client"
import { removeCookie } from "@/helper/client-cookie"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"

type props = {
    children: ReactNode
}

const CustomerTemplate = (myprops: props) => {
    const [show, setShow] = useState<boolean>(false)

    const router = useRouter()

    const handleLogout = () => {
        removeCookie(`token`)
        router.replace(`/`)
    }

    return (
        <div className="w-dvw">
            {/* header section */}
            <header className="w-full p-3 bg-sky-800 flex items-center gap-3">
                <button type="button" className="size-8 rounded-full flex justify-center items-center bg-yellow-600 hover:bg-yellow-400" onClick={() => setShow(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-white">
                    Bismillah Tuban
                </h1>
            </header>
            {/* sidebar section */}
            <div className={`w-1/2 md:w-1/3 lg:w-1/4 bg-blue-600 h-dvh fixed top-0 transform transition-transform ${show ? "left-0" : "right-full"}`}>

                <div className="w-full relative">
                    {/* brand section */}
                    <div className="w-full my-5 flex justify-center text-white font-bold text-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                        </svg>
                    </div>
                    <div className="absolute right-3 -top-5 cursor-pointer text-3xl font-bold text-white " onClick={() => setShow(false)}>
                        &times;
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <Link href={`/pelanggan/history`} className="w-full rounded-md text-white p-3 font-semibold hover:bg-sky-700">
                        History
                    </Link>
                    <Link href={`/pelanggan/Schedule`} className="w-full rounded-md text-white p-3 font-semibold hover:bg-sky-700">
                        Pemesanan
                    </Link>
                    <div className="w-full rounded-md text-white font-semibold p-3 bg-rose-700 hover:bg-rose-500 cursor-pointer " onClick={handleLogout}>
                        Metuo cak
                    </div>
                </div>
            </div>

            {myprops.children}

        </div>
    )
}

export default CustomerTemplate