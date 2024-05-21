'use client'

import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import ChatText from "@/components/AIChatBox/ChatText";
import {Button, Textarea} from "@nextui-org/react";
import {useEffect, useRef, useState} from "react";
import {ChatMessage} from "@/types/aiTypes";
import {scrollToBottoms} from "@/utils/nodeUtil";
import {nanoid} from "nanoid";
import {AxiosProgressEvent, AxiosResponse, GenericAbortSignal} from "axios";
import useChatConversation from "@/hooks/useChatConversation";
import EmptyIcon from "@/components/svg/EmptyIcon";
import {EventSourceMessage} from "@microsoft/fetch-event-source";
import { getDateString } from "@/utils/date";
import useNode from "@/hooks/useNode";
import {it} from "node:test";

function Chat({generate, conversationId, setChatInfo, setConversationId}: {
    generate: (params: {
        prompt: string,
        conversationId: number | null,
        onmessage: (event: EventSourceMessage) => void,
        onerror: (event: ErrorEvent) => void,
        signal?: GenericAbortSignal
    }) => Promise<void>,
    conversationId: number | null,
    setChatInfo: (title: {
        title: string,
        messageCount: number
    }) => void,
    setConversationId: (value: number | null) => void
}) {

    const [isChatting, setIsChatting] = useState<boolean>(false)
    // const textRef = useRef<HTMLDivElement>(null);

    const [textBox, textBoxRef] = useNode()

    const [prompt, setPrompt] = useState("")
    const [messages, setMessages] = useState<ChatMessage[]>([])

    const { data } = useChatConversation(conversationId)

    const resTextLength = useRef(0);
    const messagesRef = useRef<ChatMessage[]>([])

    useEffect(() => {
        // scrollToBottoms(textBox)

        if (data) {
            setMessages(data.messages)
            setChatInfo({
                title: data.conversation.title,
                messageCount: data.messages.length,
            })
        }
        else {
            setChatInfo({
                title: "New Chat",
                messageCount: 0
            })
        }
    }, [data, setChatInfo, textBox]);

    useEffect(() => {
        if (!conversationId) {
            setMessages([])
        }
    }, [conversationId]);


    useEffect(() => {

        // if (!isChatBegin.current) {
        //     return
        // }
        // isChatBegin.current = false
        //
        setChatInfo({
            title: data?.conversation.title || "New Chat",
            messageCount: messages.length
        })
        scrollToBottoms(textBox)
        // scrollToBottoms(textRef)
        //
        // const question = prompt
        // setPrompt("")
        // scrollToBottoms(textRef)
        // // const match = pdfUrl.match(/\/([^\/]*\.pdf)/)
        // // if (match) {
        // //     console.log(match[1]);
        // // }
        // // const fileKey = match?.[1].replace(".", "_")
        // // if (!fileKey) {
        // //     return;
        // // }
        // // console.log(fileKey)
        // resTextLength.current = 0
        // // const newMessages = [...messages]
        // messagesRef.current = [...messages]
        // generate({
        //     conversationId: conversationId,
        //     prompt: prompt,
        //     onmessage: (event: EventSourceMessage) => {
        //         console.log(event.data)
        //         const messageData = JSON.parse(event.data);
        //         console.log(messageData.data, messageData.data.conversationId)
        //         messagesRef.current[messagesRef.current.length-1] = {
        //             id: nanoid(),
        //             conversationId: messageData.data.conversationId,
        //             content: messagesRef.current[messagesRef.current.length-1].content + messageData.data.message,
        //             ...messagesRef.current[messagesRef.current.length-1]
        //         }
        //         setMessages([...messagesRef.current])
        //         console.log(messages, messagesRef.current)
        //     },
        //     onerror: (event: ErrorEvent) => {
        //         console.log(event)
        //     },
        // }).finally(
        //     () => {
        //         setIsChatting(false)
        //         scrollToBottoms(textRef)
        //         if (!conversationId) {
        //             console.log(messagesRef.current[messages.length-1])
        //             setConversationId(messagesRef.current[messages.length-1].conversationId)
        //         }
        //     }
        // )
    }, [data, messages, setChatInfo])

    const send = () => {
        if (!prompt || "" === prompt) {
            return
        }
        setIsChatting(true)
        const nowDate = new Date()

        setIsChatting(true)

        messagesRef.current = [
            ...messages,
            {
                id: nanoid(),
                content: prompt,
                role: 0,
                updateTime: getDateString(nowDate)
            },
            {
                id: nanoid(),
                content: "",
                role: 1,
                updateTime: getDateString(nowDate),
                status: "running"
            }
        ]

        setMessages(messagesRef.current)

        setPrompt("")
        // scrollToBottoms(textBox)
        // scrollToBottoms(textRef)
        generate({
            conversationId: conversationId,
            prompt: prompt,
            onmessage: (event: EventSourceMessage) => {
                try {
                    console.log(event.data)
                    const messageData = JSON.parse(event.data);
                    console.log(messageData.data, messageData.data.conversationId)
                    messagesRef.current[messagesRef.current.length-1] = {
                        id: nanoid(),
                        conversationId: messageData.data.conversationId,
                        content: messagesRef.current[messagesRef.current.length-1].content + messageData.data.message,
                        role: 1,
                        updateTime: getDateString(new Date()),
                        status: messageData.data.status
                    }
                    setMessages([...messagesRef.current])
                    console.log(messages, messagesRef.current)
                } catch (e) {
                    console.log(e)
                }
            },
            onerror: (event: ErrorEvent) => {
                console.log(event)
            },
        }).finally(
            () => {
                console.log(messagesRef.current)
                setIsChatting(false)
                // scrollToBottoms(textBox)
                if (!conversationId) {
                    console.log(messagesRef.current[messagesRef.current.length-1])
                    setConversationId(messagesRef.current[messagesRef.current.length-1].conversationId || null)
                }
            }
        )
    }

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <div
                className="flex-grow flex flex-col overflow-y-auto"
                ref={textBoxRef}
            >
                {messages.length > 0 ? messages.map(item => (
                    <ChatText
                        key={item.id}
                        data={{
                            id: item.id,
                            content: item.content,
                            role: item.role,
                            updateTime: getDateString(new Date(item.updateTime))
                        }}
                        status={item.status}
                    />
                )) : <div className="w-full h-full flex items-center justify-center"><EmptyIcon width={65} height={65}/></div>}
            </div>
            <form
                className="flex flex-row items-center"
                onSubmit={(event) => {
                    event.preventDefault()
                }}
            >
                <Textarea
                    className="mr-2"
                    placeholder={"请输入问题"}
                    onValueChange={setPrompt}
                    value={prompt}
                    onKeyDown={(e) => {
                        console.log(e.keyCode)
                        if (e.keyCode === 13) {
                            e.preventDefault()
                            send()
                        }
                    }}
                />
                <Button
                    className="h-[55px] font-bold"
                    color="primary"
                    onClick={send}
                    isLoading={isChatting}
                    type="submit"
                >
                    Send
                </Button>
            </form>

        </div>
    )
}

export default withThemeConfigProvider(Chat)