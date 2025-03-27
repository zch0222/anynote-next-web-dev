"use client"

import {sendChatMessage} from "@/components/ChatCompletions";
import {useState} from "react";
import {Editor} from '@milkdown/core';
import MilkdownEditorWrapperNew from "@/components/MilkdownEditorNew";

export default function Test() {
    const [data, setData] = useState({
        content: "测试补全",
    })

    const onInput = (value: string) => {
        console.log(value)
        setData(prev => ({...prev, content: value}));
    }

    return (
        <div>
            <MilkdownEditorWrapperNew
                onInput={onInput}
                onBlur={() => {
                }}
                content={data.content}
            />
        </div>
    );
}
