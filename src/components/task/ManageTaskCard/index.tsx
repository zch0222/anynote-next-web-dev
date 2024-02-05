'use client'

import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import {AdminNoteTask} from "@/types/noteTypes";
import Loading from "@/components/Loading";
import {Card, Progress, Chip} from "@nextui-org/react";
import { getDateString } from "@/utils/date";
import {useMemo} from "react";
import { RED } from "@/constants/color"

function ManageTaskCard({ data }: {
    data: AdminNoteTask
}) {

    const statusChip = useMemo(() => {
        const now = new Date().getTime()
        const startTime = new Date(data.startTime).getTime()
        const endTime = new Date(data.endTime).getTime()

        console.log(now, startTime, endTime)
        if (startTime > now) {
            return <Chip className="text-white" color="warning">未开始</Chip>
        }
        else if (endTime > now) {
            return <Chip className="text-white" color="primary">进行中</Chip>
        }
        else {
            return <Chip className="text-white" color="danger">已结束</Chip>
        }
    }, [data])


    if (!data) {
        return <Loading/>
    }



    return (
        <Card
            className="flex flex-col m-2 p-3 w-full max-w-[400px] cursor-pointer"
            radius="sm"
            isHoverable={true}
        >
            <div className="flex flex-row justify-between w-full">
                <div className="text-xl font-bold mb-1">{data.taskName}</div>
                <div>{statusChip}</div>
            </div>
            <div className="text-base mt-1">
                {`开始时间: ${getDateString(new Date(data.startTime))}`}
            </div>
            <div className="text-base mt-1">
                {`结束时间: ${getDateString(new Date(data.endTime))}`}
            </div>
            <div className="flex flex-row mt-2 items-center">
                <Progress size="lg" value={data.submissionProgress}/>
                <div className="ml-2">{`${data.submittedCount}/${data.needSubmitCount}`}</div>
            </div>
        </Card>
    )
}

export default withThemeConfigProvider(ManageTaskCard)
