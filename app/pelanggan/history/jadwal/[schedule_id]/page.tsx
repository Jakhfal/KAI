import React from 'react'
import { axiosInstance } from '@/helper/api'
import Booking from './booking'
import { getServerCookie } from '@/helper/server-cookie'
import { KeretaType, ScheduleType } from '@/app/karyawan/types'

const getTrainBySchedule = async (schedule_id: number): Promise<KeretaType | null> => {
    try {

        const token = await getServerCookie('token')

        const response: any = await axiosInstance.get(`/schedule/train/${schedule_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.data.success) return null

        return response.data.data
    } catch (error) {
        console.log(error)
        return null
    }
}

const getScheduleDetails = async (schedule_id: number): Promise<ScheduleType | null> => {
    try {

        const token = await getServerCookie('token')

        const response: any = await axiosInstance.get(`/schedule/${schedule_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.data.success) return null

        return response.data.data
    } catch (error) {
        console.log(error)
        return null
    }
}

const showTime = (date: string) => {
    const currentDate = new Date(date)
    return currentDate.toLocaleTimeString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}

interface Props {
    params: Promise<{
        schedule_id: number
    }>
}
const page = async (myprops: Props) => {

    const detailsKereta = await getTrainBySchedule((await myprops.params).schedule_id)
    const detailsSchedule = await getScheduleDetails((await myprops.params).schedule_id)

    return (
        <div className='w-full p-3'>
            <h1 className='text-2xl font-bold'>Keberangkatan kereta</h1>

            <table>
                <tbody>
                    <tr>
                        <td>Stasiun Keberangkatan</td>
                        <td> : {detailsSchedule?.departured_location}</td>
                    </tr>
                    <tr>
                        <td>Waktu Keberangkatan</td>
                        <td>: {showTime(detailsSchedule?.departured_time as string)}</td>
                    </tr>
                    <tr>
                        <td>Stasiun Kedatangan</td>
                        <td>: {detailsSchedule?.arrived_location}</td>
                    </tr>
                    <tr>
                        <td>Waktu Keberangkatan</td>
                        <td>: {showTime(detailsSchedule?.arrived_time as string)}</td>
                    </tr>
                    <tr>
                        <td>Nama Kereta</td>
                        <td>: {detailsKereta?.name}</td>
                    </tr>
                </tbody>
            </table>

            <Booking
                schedule_id={detailsSchedule!.id}
                wagons={detailsKereta!.wagons}
            />
        </div>
    )
}

export default page