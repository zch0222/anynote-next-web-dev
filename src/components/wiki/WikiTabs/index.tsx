'use client'
import { Radio } from "antd";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import { useState } from "react";

import NoteTab from "./NoteTab";
import TaskTab from "./TaskTab";

function WikiTabs({ knowledgeBaseId }: {
    knowledgeBaseId: number
}) {

    const [selectTab, setSelectTab] = useState("note")


    return (
        <div className="flex flex-col">
            <Radio.Group
                value={selectTab}
                onChange={(e) => {
                    setSelectTab(e.target.value)
                }}
            >
                <Radio.Button
                    value="note"
                >
                    笔记
                </Radio.Button>
                <Radio.Button
                    value="task"
                >
                    任务
                </Radio.Button>
            </Radio.Group>
            {selectTab === "note" ? <NoteTab knowledgeBaseId={knowledgeBaseId}/> : <TaskTab knowledgeBaseId={knowledgeBaseId}/>}

        </div>
    )
}

export default withThemeConfigProvider(WikiTabs)
