import { GerbongType } from "../../types"
import Addseat from "./addSeat"
import DropGerbong from "./dropGerbong"
import EditGerbong from "./editGerbong"
import EditSeat from "./editSeat"
import Seat from "./Seat"

type props = {
    item: GerbongType
}
const Gerbong = (myProp: props) => {
    return (
        <div className=" w-full my-2 bg-slate-50 border rounded-md shadow-md flex flex-wwrap justify-between ">
            <div className="p-3">
                <small className="text-xs text-sky-600">Nama Gerbong</small>
                <br />
                {myProp.item.name}
                <br />
                Jumlah kursi: {myProp.item.seat_count}

                <div className="w-full my-2 flex flex-wrap items-center gap-3">
                <Addseat wagon_id={myProp.item.id} />
                    {
                        myProp.item.seats.length == 0 ?
                            <div className="bg-sky-200 p-5 rounded-md ">
                                Gerbong ini belum mempunyai kursi
                            </div> :
                            <div className="flex flex-wrap gap-3 ">
                                {/* buat nambah kursi */}
                                
                                {
                                    myProp.item.seats.map((seat, index) => (
                                        <Seat item={seat} key={`seat-${index}`} />
                                    )
                                )
                                    
                                }
                            </div>
                    }
                </div>
            </div>
            <div className="p-3 flex gap-2">
                <EditGerbong wagon={myProp.item} />
                <DropGerbong item={myProp.item} />
            </div>
        </div>
    )
}
export default Gerbong