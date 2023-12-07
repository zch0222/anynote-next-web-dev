'use client'
import { Card } from "antd";
import { HistoryOutlined, DeleteOutlined } from "@ant-design/icons";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import {Listbox, ListboxItem} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {NOTE} from "@/constants/route";

function DrawerContent({ id }: {
    id: number
}) {

    const router = useRouter()

    return (
        <div className="flex flex-col items-center">
            <Listbox
                className="bg-gray-100 rounded-sm"
                aria-label="Actions"
            >
                <ListboxItem onClick={() => router.push(`${NOTE}/${id}/history`)} className="flex flex-row items-center" key="history">
                    <span className="mr-2"><HistoryOutlined/></span>
                    <span>查看历史记录</span>
                </ListboxItem>
                <ListboxItem key="delete" className="text-danger accent-red-600">
                    <span className="mr-2"><DeleteOutlined/></span>
                    <span>删除笔记</span>
                </ListboxItem>
            </Listbox>
        </div>
    )
}

export default withThemeConfigProvider(DrawerContent)
