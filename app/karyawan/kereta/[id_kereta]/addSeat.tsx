"use client"
import Modal from "@/components/Modal";
import { axiosInstance } from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";


type props = {
    wagon_id: number
}
const Addseat = (myProp: props) => {
    const [seat_number, setSeatNumber] = useState<string>("");
    // untuk menghandle tampil mockup
    const [show, setShow] = useState<boolean>(false);
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setSeatNumber("")

    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon/seat`
            const requestdata = {
                seat_number, wagon_id: myProp.wagon_id
            }

            const response: any = await axiosInstance.post(url, requestdata, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })
            const message = response.data.message
            if (response.data.success === true) {
                setShow(false)
                toast(
                    message,
                    {
                        containerId: `toastAddSeat-${myProp.wagon_id}`,
                        type: `success`
                    }
                )
                // refresh page
                setTimeout(() =>
                    router.refresh(), 1000
                )
            }
            else {
                toast(
                    message, {
                    containerId: `toastAddSeat-${myProp.wagon_id}`,
                    type: `warning`
                }
                )
            }
        } catch (error) {
            console.log(error)
            toast(`Something wrong`, {
                containerId: `toastAddSeat-${myProp.wagon_id}`,
                type: "error",
                autoClose: 1000
            })
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAddSeat-${myProp.wagon_id}`} />
            <button type="button" onClick={() => openModal()} className="size-20 rounded-md bg-green-600 hover:bg-green-400 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>

                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="text-lg font-semibold">
                            Tambah Kursi
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>

                    </div>
                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nomor Kursi
                            </small>
                            <input type="text" id={`seat_number`} value={seat_number} onChange={e => setSeatNumber(e.target.value)} required={true} className=" w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>
                    </div>

                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button" onClick={() => closeModal()} className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">Close</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">Save</button>
                    </div>

                </form>
            </Modal>
        </div>



    )
}
export default Addseat;