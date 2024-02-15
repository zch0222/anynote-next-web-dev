'use client'

import { Popover } from "antd";
import Pagination from "@/components/Pagination";
import createPage from "@/components/hoc/createPage/createPage";
import useNoteTaskSubmissionsInfoList from "@/hooks/useNoteTaskSubmissionsInfoList";
import useAdminNoteTask from "@/hooks/useAdminNoteTask";
import Title from "@/components/Title";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import Loading from "@/components/Loading";
import TaskManageNoteEditChart from "@/components/task";
import {NoteTaskSubmissionInfo} from "@/types/noteTypes";
import NoteIcon from "@/components/svg/NoteIcon";
import { getDateString } from "@/utils/date";
import {useTheme} from "next-themes";
import {useState} from "react";
import {NOTE} from "@/constants/route";
import {MoreOutlined} from "@ant-design/icons";
import {RED} from "@/constants/color";


function SubmissionItem({ data }: {
    data: NoteTaskSubmissionInfo
}) {
    const {theme} = useTheme()
    const [isHovered, setIsHovered] = useState(false);


    if (!data) {
        return <Loading/>
    }

    const hoveredBg = 'light' === theme ? 'bg-[#FAFAFA]' :  'bg-[#262626]'

    const moreContent = (
        <div className="flex flex-col w-[120px] select-none">
            <div
                className={`p-1 ${isHovered ? hoveredBg : ''} cursor-pointer`}
                style={{
                    color: RED
                }}
            >
                退回
            </div>
        </div>
    )



    return (
        <div
            className={`flex flex-row justify-between items-center w-full p-2 cursor-pointer ${isHovered ? hoveredBg : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => window.open(`${NOTE}/${data.noteId}`)}
        >
            <div className="flex flex-row items-center">
                <NoteIcon width={40} height={40}/>
                <div className="flex flex-col ml-1">
                    <div>{data.noteTitle}</div>
                    <div className="text-sm text-gray-500">
                        <span className="font-bold mr-1">{data.submissionNickname}</span>
                        <span>{`提交时间: ${getDateString(new Date(data.submitTime))}`}</span>
                    </div>

                </div>
            </div>
            <div
                className="p-2"
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <Popover
                    content={moreContent}
                    trigger="click"
                    overlayStyle={{
                        padding: 0
                    }}
                >
                    <MoreOutlined
                        style={{
                            fontSize: 18
                        }}
                    />
                </Popover>
            </div>
        </div>
    )
}

function Task({params}: {
    params: {
        id: number
    }
}) {
    const {id} = params
    const { data } = useAdminNoteTask(id)

    return (
        <div className="w-full h-full flex flex-col p-5">
            <Title text={data === undefined ? "加载中..." : data.taskName}/>
            <TaskManageNoteEditChart noteTaskId={id}/>
            <div className="flex-grow overflow-hidden">
                <Pagination
                    Page={createPage(SubmissionItem)}
                    swr={useNoteTaskSubmissionsInfoList}
                    params={{
                        noteTaskId: id
                    }}
                    direction="col"
                />
            </div>
        </div>
    )
}

export default withThemeConfigProvider(Task)