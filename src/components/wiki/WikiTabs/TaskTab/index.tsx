'use client'

import TaskCard from "@/components/wiki/TaskCard";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";

import useNoteTaskList from "@/hooks/useNoteTaskList";
import createPage from "@/components/hoc/createPage/createPage";
import Pagination from "@/components/Pagination";

function TaskTab({ knowledgeBaseId }: {
    knowledgeBaseId: number
}) {

    return (
        <div>
            <Pagination
                Page={createPage(TaskCard)}
                swr={useNoteTaskList}
                params={{
                    knowledgeBaseId: knowledgeBaseId
                }}
                direction="row"
            />
        </div>
    )
}

export default withThemeConfigProvider(TaskTab)
