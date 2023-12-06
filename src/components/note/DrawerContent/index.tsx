'use client'
import { Card } from "antd";
import { HistoryOutlined, DeleteOutlined } from "@ant-design/icons";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import {Listbox, ListboxItem} from "@nextui-org/react";


function DrawerContent({ id }: {
    id: number
}) {

    return (
        <div className="flex flex-col items-center">
            <Listbox
                className="bg-gray-100 rounded-sm"
                aria-label="Actions"
                onAction={(key) => alert(key)}
            >
                <ListboxItem className="flex flex-row items-center" key="history">
                    <span className="mr-2"><HistoryOutlined/></span>
                    <span>查看历史记录</span>
                </ListboxItem>
                <ListboxItem key="delete" className="text-danger" color="danger">
                    <span className="mr-2"><DeleteOutlined/></span>
                    <span>删除笔记</span>
                </ListboxItem>
            </Listbox>
        </div>
    )
}

export default withThemeConfigProvider(DrawerContent)
