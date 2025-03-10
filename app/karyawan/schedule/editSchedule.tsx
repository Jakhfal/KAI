"use client"

import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"

import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import {ScheduleType } from "../types"
import { useRouter } from "next/navigation"
import DatePicker from "react-datepicker"


type props = {
    schedule : ScheduleType
}


const EditJadwal = (myProp: props) => {
    const [show, setShow] = useState<boolean>(false)
    const [departured_location, setDepartured_location] = useState<string>("")
    const [arrived_location, setArrived_location] = useState<string>("")
    const [departured_time, setDepartured_time] = useState<Date>(new Date())
    const [arrived_time, setArrived_time] = useState<Date>(new Date())
    const [price, setPrice] = useState<number>(0)

    const router = useRouter()


    const openModal = () => {
        setShow(true)
        setDepartured_location(myProp.schedule.departured_location)
        setArrived_location(myProp.schedule.arrived_location)
        setDepartured_time(new Date())
        setArrived_time(new Date())
        setPrice(0)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/schedule/${myProp.schedule.id}`
            const requestData = {
                departured_location, departured_time, arrived_location, arrived_time, price
            }
            // hit endpoint to add kereta
            const response: any = await axiosInstance
                .put(url, requestData, {
                    headers: {
                        authorization: `Bearer ${TOKEN}`
                    }
                })

            const message = response.data.message
            if (response.data.success == true) {
                toast(message,
                    {
                        containerId: `toastEdit-${myProp.schedule.id}`,
                        type: "success"
                    }
                )
                setShow(false)
                // reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message,
                    {
                        containerId: `toastEdit-${myProp.schedule.id}`,
                        type: "warning"
                    }
                )
            }
        } catch (error) {
            console.log(error);
            toast(
                `Something wrong`,
                {
                    containerId: `toastEdit-${myProp.schedule.id}`,
                    type: "error"
                }
            )
        }
    }
    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myProp.schedule.id}`} />
            <button type="button"
                onClick={() => openModal()}
                className="px-2 py-1 rounded-md bg-sky-500 hover:bg-sky-400 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">Edit Data Kereta</h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>
                    {/* modal body */}
                    <div className="w-full p-3">
                                            <div className="my-2 border rounded-md">
                                                <small className="text-xs text-sky-500 font-semibold">
                                                    Berangkat dari
                                                </small>
                                                <input type="text" id="departured_location" value={departured_location} onChange={(e) => setDepartured_location(e.target.value)} className="p-1 outline-none border-b w-full hover:border-b hover:border-b-sky-500" required={true} />
                                            </div>
                                            <div className="my-2 border rounded-md">
                                                <small className="text-xs text-sky-500 font-semibold">
                                                    Waktu keberangkatan
                                                </small> <br />
                                                <DatePicker
                                                    id="departured_time" selected={new Date(departured_time)} className="p-1 outline-none border-b w-full hover:border-b hover:border-b-sky-500"
                                                    dateFormat={`dd MMMM yyyy HH:mm`} onChange={date => setDepartured_time(date || new Date())}
                                                    showTimeInput ={true}
                                                />
                                            </div>
                                            <div className="my-2 border rounded-md">
                                                <small className="text-xs text-sky-500 font-semibold">
                                                    Tiba di
                                                </small>
                                                <input type="text" id="arrived_location" value={arrived_location} onChange={(e) => setArrived_location(e.target.value)} className="p-1 outline-none border-b w-full hover:border-b hover:border-b-sky-500" required={true} />
                                            </div>
                                            <div className="my-2 border rounded-md">
                                                <small className="text-xs text-sky-500 font-semibold">
                                                    Waktu kedatangan
                                                </small> <br />
                                                <DatePicker
                                                    id="arrived_time" selected={new Date(arrived_time)} className="p-1 outline-none border-b w-full hover:border-b hover:border-b-sky-500"
                                                    dateFormat={`dd MMMM yyyy HH:mm`} onChange={date => setArrived_time(date|| new Date())}
                                                    showTimeInput ={true}
                                                />
                                            </div>
                                        <div className="my-2 border rounded-md">
                                            <small className="text-xs text-sky-500 font-semibold">
                                                Harga
                                            </small>
                                            <input type="text" id="price" value={price.toString()} onChange={e => setPrice(Number(e.target.value))} className="p-1 outline-none border-b w-full hover:border-b hover:border-b-sky-500" required={true} />
                                        </div>
                                        </div>

                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button" onClick={() => closeModal()}
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                            Close
                        </button>
                        <button type="submit"
                            className="px-4 py-2 rounded-md bg-sky-600 hover:bg-slate-500 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default EditJadwal
