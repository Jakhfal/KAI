"use client";

import Link from "next/link";
import { KeretaType } from "../types";
import DropKereta from "./dropKereta";
import EditKereta from "./editKereta";

type Props = {
    item: KeretaType;
};

const Train = ({ item }: Props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-sm font-medium text-blue-400">
                    Nama Kereta
                </small>
                <span>
                    <Link href={`/karyawan/kereta/${item.id}`}>
                        {item.name}
                    </Link>
                </span>
            </div>
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-sm font-medium text-blue-400">
                    Description
                </small>
                <span>
                    {item.descriptions}
                </span>
            </div>
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium text-blue-400">
                    Tipe Kereta
                </small>
                <span>
                    {item.type}
                </span>
            </div>

            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium text-blue-400">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <EditKereta kereta={item} />
                    <DropKereta kereta={item} />
                </div>
            </div>
        </div>
    );
};

export default Train;
