'use client'

import {useCallback, useState} from "react";
import AIChatBox from "@/components/AIChatBox";
import {EventSourceMessage} from "@microsoft/fetch-event-source";
import {GenericAbortSignal} from "axios";
import {query, chatCompletions} from "@/requests/client/note/doc";
import {Input} from "@nextui-org/react";

function ChatPage() {

    const [model, setModel] = useState<string>("gpt-4-turbo-preview")

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
            </div>
            <AIChatBox
                generate={completions}
            />
        </div>
    )
}

export default ChatPage
