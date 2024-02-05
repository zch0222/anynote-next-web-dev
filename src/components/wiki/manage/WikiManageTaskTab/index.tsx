'use client'

import ManageTaskCard from "@/components/task/ManageTaskCard";
import CardButton from "@/components/CardButton";
import createPage from "@/components/hoc/createPage/createPage";
import Pagination from "@/components/Pagination";
import useAdminNoteTaskList from "@/hooks/useAdminNoteTaskList";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import TaskIcon from "@/components/svg/TaskIcon";
import { CARD_BUTTON_ICON_SIZE } from "@/constants/size";

function WikiManageTaskTab({ id }: {
    id: number
}) {

    return (
        <div
            className="w-full h-full flex flex-col"
        >
            <div className="h-[60px]">
                <CardButton
                    icon={<TaskIcon width={CARD_BUTTON_ICON_SIZE} height={CARD_BUTTON_ICON_SIZE}/>}
                    title="创建任务"
                    content="创建知识库任务"
                    clickEvent={() => console.log("create")}
                />
            </div>
            <div className="flex-grow overflow-y-auto mt-2 pb-10">
                <Pagination
                    Page={createPage(ManageTaskCard)}
                    swr={useAdminNoteTaskList}
                    params={{
                        knowledgeBaseId: id
                    }}
                    direction={'row'}
                />
            </div>
        </div>
    )
}

export default withThemeConfigProvider(WikiManageTaskTab)

