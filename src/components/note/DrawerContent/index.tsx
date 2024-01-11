'use client'
import { Card } from "antd";
import { HistoryOutlined, DeleteOutlined } from "@ant-design/icons";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import {Listbox, ListboxItem} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {NOTE} from "@/constants/route";
import { deleteNote } from "@/requests/client/note/note";
import { useDispatch } from "react-redux";
import { showMessage } from "@/store/message/messageSlice";

function DrawerContent({ id }: {
    id: number
}) {

    const router = useRouter()
    const dispatch = useDispatch()

    const fetchDeleteNote = (id: number) => {
        deleteNote({id: id}).then(
            res => {
                dispatch(showMessage({
                    type: "success",
                    content: "删除成功"
                }))
                router.back()
            }
        ).catch(
            e => console.log(e)
        )
    }

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
                <ListboxItem onClick={() => fetchDeleteNote(id)} key="delete" className="text-danger accent-red-600">
                    <span className="mr-2"><DeleteOutlined/></span>
                    <span>删除笔记</span>
                </ListboxItem>
            </Listbox>
        </div>
    )
}

export default withThemeConfigProvider(DrawerContent)
