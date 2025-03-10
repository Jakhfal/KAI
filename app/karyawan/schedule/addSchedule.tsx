"use client"

import Modal from "@/components/Modal";
import { axiosInstance } from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import { KeretaType } from "../types";

type Props = {
    trains : KeretaType[]
}

const AddSchedule = (myprop : Props) => {
    const router = useRouter()

    const [show, setShow] = useState<boolean>(false)
    const [departured_location, setDepartured_location] = useState<string>("")
    const [arrived_location, setArrived_location] = useState<string>("")
    const [departured_time, setDepartured_time] = useState<Date>(new Date())
    const [arrived_time, setArrived_time] = useState<Date>(new Date())
    const [train_id, setTrain_id] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setShow(true)
        setDepartured_location("")
        setArrived_location("")
        setDepartured_time(new Date())
        setArrived_time(new Date())
        setTrain_id(0)
        setPrice(0)
    }

    const closeModal = () => {
        setShow(false)
    }

    const TOKEN = getCookie(`token`)

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `/schedule`
            const requestData = {
                departured_location, departured_time, arrived_location, arrived_time, price, train_id
            }
            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            const message = response.data.message
            if (response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId: "toastAddJadwal",
                    type: "success"
                })

                setTimeout(() => router.refresh(), 1000)

            } else {
                toast(message, {
                    containerId: "toastAddJadwal",
                    type: "warning"
                })
            }

        } catch (error) {
            console.log(error)
            toast(`something wrong`, {
                containerId: `toastAddJadwal`,
                type: "error"
            })
        }
    }

    return (
        <div>
            <ToastContainer containerId={"toastAddJadwal"} />
            <button className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-500" type="button" onClick={() => openModal()}>
                Tambah Jadwal kereta
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="text-lg font-semibold">
                            Tambah Jadwal Kereta
                        </h1>
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
                            Jenis kereta
                        </small>
                        <select id={`train_id`} value={train_id.toString()} onChange={e => setTrain_id(Number(e.target.value))} className="p-1 outline-none border w-full hover:border-sky-500" required={true}>
                            <option value="">Pilih jenis kereta</option>
                            {
                                myprop.trains.map((train, index) => (
                                    <option value={train.id} key={`optionKereta-${index}`}>
                                        {train.name}
                                    </option>
                                ))
                            }
                        </select>
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
                        <button type="button" onClick={() => closeModal()} className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">Close</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">Save</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
 
}
export default AddSchedule;