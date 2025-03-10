import { ScheduleType } from "../types";
import DropJadwal from "./dropSchedule";
import EditJadwal from "./editSchedule";


type Props = {
    item: ScheduleType
}

const showTime = (date:string) => {
    const currentDate = new Date(date);
    return currentDate
    .toLocaleTimeString(
        `id-ID`,
        {
            year: `numeric`,
            month: `long`,
            day: `2-digit`,
        }
    )
}

const Schedule = (myprop: Props) => {
    return (
        <div className="flex flex-wrap w-full border rounded-md shadow-md my-2">
            <div className="w-full md:w-3/12 p-3 flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Berangkat dari
                </small>
                <strong>
                    {myprop.item.departured_location}
                </strong>
                <small className="text-xs font-semibold text-sky-700">
                    Waktu keberangkatan
                </small>
                <strong>
                    {showTime(myprop.item.departured_time)}
                </strong>
            </div>

            <div className="w-full md:w-3/12 p-3 flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Tiba di
                </small>
                <strong>
                    {myprop.item.arrived_location}
                </strong>
                <small className="text-xs font-semibold text-sky-700">
                    Waktu kedatangan
                </small>
                <strong>
                    {showTime(myprop.item.arrived_time)}
                </strong>
            </div>

            <div className="w-full md:w-4/12 p-3 flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Unit kereta
                </small>
                <strong>
                    {myprop.item.train_details.name}
                </strong>
                <small className="text-xs font-semibold text-sky-700">
                    Harga
                </small>
                <strong>
                    {myprop.item.price
                        .toLocaleString(`en-US`, {
                            style: `currency`, currency: `IDR`
                        })
                    }
                </strong>
            </div>

            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium text-blue-40 pb-4">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <EditJadwal schedule={ myprop.item } />
                    <DropJadwal schedule={ myprop.item } />

                </div>
            </div>

        </div>
    )
}
export default Schedule;