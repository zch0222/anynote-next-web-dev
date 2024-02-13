'use client'

import {useRouter} from "next/navigation";
import TaskForm from "@/components/task/TaskForm";
import BackButton from "@/components/BackButton";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";

function CreateTask() {

    const router = useRouter()

    return (
        <div className="flex flex-col w-full h-full p-5">
            <div>

            </div>
            <div className="flex items-center flex-row text-2xl mb-5">
                <BackButton size={30} onClick={() => router.back()}/>
                <div className="ml-1 font-bold">创建任务</div>
            </div>
            <TaskForm
                onFinish={(value: any) => console.log(value)}
            />
        </div>
    )
}

export default withThemeConfigProvider(CreateTask)
