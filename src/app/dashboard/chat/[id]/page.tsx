'use client'

import {useCallback, useState} from "react";
import AIChatBox from "@/components/AIChatBox";
import {EventSourceMessage} from "@microsoft/fetch-event-source";
import {GenericAbortSignal} from "axios";
import {query, chatCompletions} from "@/requests/client/note/doc";
import {Input} from "@nextui-org/react";
import { Select } from 'antd';
import { useRouter } from "next/navigation";
import {CHAT_GPT} from "@/constants/route";

function ChatPage({params}: {
    params: {
        id: string
    }
}) {

    const { id } = params
    const router = useRouter()
    const [model, setModel] = useState<string>("gpt-4-turbo-preview")
    const [modelOptions, setModelOptions] = useState<{
        key: string,
        value: string
    }[]>([
        {
            key: "gpt-4-turbo-preview",
            value: "gpt-4-turbo-preview"
        },
        {
            key: "gpt-3.5-turbo",
            value: "gpt-3.5-turbo"
        },
        {
            key: "gpt-4",
            value: "gpt-4"
        },
        {
            key: "gpt-4-1106-preview",
            value: "gpt-4-1106-preview"
        },
        {
            key: "gpt-4-32k",
            value: "gpt-4-32k"
        },
        {
            key: "gpt-4o",
            value: "gpt-4o"
        },
        {
            key: "gpt-4o-mini",
            value: "gpt-4o-mini"
        },
        {
            key: "gpt-4o-mini-2024-07-18",
            value: "gpt-4o-mini-2024-07-18"
        },
        {
            key: "claude-3-5-sonnet-20240620",
            value: "claude-3-5-sonnet-20240620"
        },
        {
            key: "claude-3-haiku-20240307",
            value: "claude-3-haiku-20240307"
        },
        {
            key: "claude-3-opus-20240229",
            value: "claude-3-opus-20240229"
        },
        {
            key: "claude-3-sonnet-20240229",
            value: "claude-3-sonnet-20240229"
        }
    ]);

    const onConversationChange = useCallback((value: number | null) => {
        console.log(value)
        router.replace(`${CHAT_GPT}/${value ? value : 'new'}`)
    }, [router]);

    const completions = useCallback((params: {
        prompt: string,
        conversationId: number | null,
        onmessage: (event: EventSourceMessage) => void,
        onerror: (event: ErrorEvent) => void,
        signal?: GenericAbortSignal
    }) => {
        return chatCompletions({
            model: model,
            ...params
        })
    }, [model])

    return (
        <div className="flex flex-col w-full h-full p-5">
            <div className="mb-2">
                <Input size="sm" value={model} onChange={e => setModel(e.target.value)}/>
                <Select
                    value={model}
                    onSelect={(value) => setModel(value)}
                    className="w-full mt-2"
                    options={modelOptions}
                />
            </div>
            <AIChatBox
                onConversationChange={onConversationChange}
                initConversationId={'new' === id ? undefined : parseInt(id)}
                generate={completions}
            />
        </div>
    )
}

export default ChatPage
