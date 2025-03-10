import { SeatType } from "../../types"


type props = {
    item: SeatType
}

const Seat = (myProp: props) => {
    return (
        <div>
            <div className="size-20 rounded-md flex items-center justify-center bg-sky-700 ">
            <span className="text-white font-semibold">
                {myProp.item.seat_number}
            </span>
        </div>
                
        </div>

    )
}

export default Seat