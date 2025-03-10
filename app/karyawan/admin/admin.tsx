"use client"

import { UserType } from "../types"
import Link from "next/link"
import DeleteAdmin from "./dropAdmin"
import EditAdmin from "./editAdmin"
import ResetPassword from "./resetPassword"

type props = {
    item: UserType
}

const Admin = (myprops: props) => {
    return (
        <div className=" w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Nama Admin
                </small>
                <span>
                    <Link href={`/employee/${myprops.item.id}`}>{myprops.item.name}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Username
                </small>
                <span>
                    <Link href={`/employee/${myprops.item.id}`}>{myprops.item.user_details.username}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Option
                </small>

                <div className=" flex gap-2 items-center">

                    <DeleteAdmin admin={myprops.item} />
                    <EditAdmin admin={myprops.item} />
                    <ResetPassword admin={myprops.item} />

                </div>
            </div>
        </div>
    )
}

export default Admin