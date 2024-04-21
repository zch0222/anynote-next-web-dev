'use client'
import { Input, Button, Textarea } from "@nextui-org/react";
import {useEffect, useState, useRef} from "react";
import {nanoid} from "nanoid";
import { query } from "@/requests/client/note/doc";

import ChatText from "@/components/chat-pdf/Chat/ChatText";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";

import { chat } from "@/requests/chatPDF";

function Chat({ docId }: {
    docId: number
}) {

    let controller = new AbortController()

    const [isChatting, setIsChatting] = useState<boolean>(false)
    const [prompt, setPrompt] = useState("")
    const [messages, setMessages] = useState<{
        id: string,
        message: string,
        role: string
    }[]>([])

    const isChatBegin = useRef<boolean>(false)
    const resTextLength = useRef(0);



    useEffect(() => {
        if (!isChatBegin.current) {
            return
        }
        isChatBegin.current = false

        const question = prompt
        setPrompt("")
        // const match = pdfUrl.match(/\/([^\/]*\.pdf)/)
        // if (match) {
        //     console.log(match[1]);
        // }
        // const fileKey = match?.[1].replace(".", "_")
        // if (!fileKey) {
        //     return;
        // }
        // console.log(fileKey)
        resTextLength.current = 0
        query({
            signal: new AbortController().signal,
            docId: docId,
            prompt: prompt,
            onDownloadProgress: (event) => {
                console.log(event.event.target.responseText)
                const responseText = event.event.target.responseText
                const regex = /data:\s*([^]+?)(?=\n\nid:|\n$|$)/g;
                let matches = [...responseText.matchAll(regex)];
                console.log("LastPart", matches[matches.length-1][1])
                const lastJsonString = matches[matches.length-1][1]; // 确保找到以"data: "开头的部分
                if (lastJsonString) {
                    try {
                        console.log(JSON.parse(lastJsonString))
                        const messageData = JSON.parse(lastJsonString); // 正确地解析JSON字符串
                        console.log(messageData.data.message.replace(/\n/g, "\n\n"))
                        const newMessage = {
                            id: nanoid(), // 确保nanoid()函数已被正确引入
                            message: messageData.data.message.replace(/\n/g, "\n\n"),
                            role: "bot"
                        };
                        const newMessages = [...messages]
                        newMessages[newMessages.length-1] = newMessage
                        setMessages(newMessages); // 使用函数式更新以防止依赖旧的state
                        resTextLength.current = responseText.length
                    } catch (e) {
                        console.log(e)
                    }
                }
            }

        }).then(
            res => console.log(res)
        ).catch(
            e => console.log(e)
        ).finally(
            () => {
                setIsChatting(false)
            }
        )
    }, [messages])


    const send = () => {
        if (!prompt || "" === prompt) {
            return
        }
        setIsChatting(true)
        setMessages([
            ...messages,
            {
                id: nanoid(),
                message: prompt,
                role: "user"
            },
            {
                id: nanoid(),
                message: "",
                role: "bot"
            }
        ])
        isChatBegin.current = true
    }




    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex-grow flex flex-col overflow-y-auto">
                {messages.map(item => (
                    <ChatText
                        key={item.id}
                        text={item.message}
                        role={item.role}
                    />
                ))}
            </div>
            <form
                className="flex flex-row items-center"
                onSubmit={() => console.log(111)}
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
