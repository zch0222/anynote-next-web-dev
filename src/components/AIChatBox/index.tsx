'use client'

import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import ChatText from "@/components/AIChatBox/ChatText";
import {Button, Textarea, Chip } from "@nextui-org/react";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {ChatConversationInfoVO, ChatConversationVO, ChatMessage} from "@/types/aiTypes";
import {getChatConversationList, getConversationById, updateChatConversation} from "@/requests/client/ai/chat";
import Chat from "@/components/AIChatBox/Chat";
import useChatConversation from "@/hooks/useChatConversation";
import Loading from "@/components/Loading";
import {scrollToBottoms} from "@/utils/nodeUtil";
import {nanoid} from "nanoid";
import {AxiosProgressEvent, AxiosResponse, GenericAbortSignal} from "axios";
import {MoreOutlined} from "@ant-design/icons";
import {Drawer} from "antd";
import InfiniteScroll from "@/components/InfiniteScroll";
import useChatConversationList from "@/hooks/useChatConversationList";
import {useTheme} from "next-themes";
import {EventSourceMessage} from "@microsoft/fetch-event-source";
import useDoc from "@/hooks/useDoc";
import type { DrawerProps } from 'antd';
import "./index.css"

function ChatConversationListItem({ data, itemProps }: {
    data: ChatConversationInfoVO,
    itemProps?: {
        setConversationId: (value: number) => void,
        selectedId: number | null,
        changeConversationId: (id: number) => void,
    }
}) {

    console.log(itemProps)
    // if (itemProps?.selectedId === data.id ) {
    //     console.log(itemProps)
    // }
    const { theme } = useTheme()

    const hoveredBg = 'light' === theme ? 'bg-[#FAFAFA]' :  'bg-[#262626]'

    const [isHover, setIsHover] = useState(false)

    return (
        <div
            className={`${isHover ? hoveredBg : ""} ${itemProps?.selectedId === data.id ? "border-l-3 border-[#01B96B]" : ''} cursor-pointer p-2`}
            style={{
                height: "50px"
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => {
                updateChatConversation({
                    id: data.id
                }).then(res => {
                    console.log(res)
                }).catch(
                    e => console.log(e)
                )
                if (itemProps) {
                    itemProps.changeConversationId(data.id)
                }
            }}
        >
            <div
                className="text-base font-bold"
            >
                {data.title}
            </div>
        </div>
    )
}


function AIChatBox({generate, docId, isShowHead, onConversationChange, initConversationId}: {
    initConversationId?: number,
    docId?: number
    generate: (params: {
        prompt: string,
        conversationId: number | null,
        onmessage: (event: EventSourceMessage) => void,
        onerror: (event: ErrorEvent) => void,
        signal?: GenericAbortSignal
    }) => Promise<void>,
    isShowHead: boolean | undefined,
    onConversationChange?: (id: number) => void
}) {

    const [isChatting, setIsChatting] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<ChatConversationVO | undefined>()
    const isChatBegin = useRef<boolean>(false)
    const [prompt, setPrompt] = useState("")
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [isOpenHistoryDrawer, setIsOpenHistoryDrawer] = useState<boolean>(false)
    const [conversationId, setConversationId] = useState<number | null>(initConversationId || null)
    const [chatInfo, setChatInfo] = useState<{
        title: string,
        messageCount: number
    }>({
        title: "New Chat",
        messageCount: 0
    })
    const { data: docData } = useDoc(docId)

    const textRef = useRef<HTMLDivElement>(null);
    const resTextLength = useRef(0);

    useEffect(() => {
        if (!initConversationId) {
            return
        }
        updateChatConversation({
            id: initConversationId
        }).then(res => {
            console.log(res)
        }).catch(
            e => console.log(e)
        )
    }, [initConversationId]);

    useEffect(() => {
        if (conversationId) {
            setIsLoading(true)
            getConversationById({
                id: conversationId
            }).then(
                res => setData(res.data.data)
            ).catch(
                e => console.log(e)
            ).finally(
                () => setIsLoading(false)
            )
        }
        else {
            setData(undefined)
        }
    }, [conversationId]);

    useEffect(() => {
        if (data) {
            setMessages(data.messages)
        }
        else {
            setMessages([])
        }
    }, [data]);

    useEffect(() => {
        if (!isChatBegin.current) {
            return
        }
        isChatBegin.current = false

        const question = prompt
        setPrompt("")
        scrollToBottoms(textRef)
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
        generate({
            signal: new AbortController().signal,
            prompt: prompt,
            conversationId: conversationId,
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
                            content: messageData.data.message.replace(/\n/g, "\n\n"),
                            role: 1
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
                scrollToBottoms(textRef)
            }
        )
    }, [messages])

    useEffect(() => {
        onConversationChange && onConversationChange(conversationId)
    }, [conversationId, onConversationChange]);

    const conversationScrollItemProps = useMemo(() => ({
        setConversationId: setConversationId,
        selectedId: conversationId,
        changeConversationId: (id: number) => {
            setConversationId(id)
            setIsOpenHistoryDrawer(false)
        }
    }), [conversationId])

    useEffect(() => {
        console.log(docData?.docName)
    }, [docData]);

    if (isLoading) {
        return <Loading/>
    }

    const send = () => {
        if (!prompt || "" === prompt) {
            return
        }
        setIsChatting(true)
        setMessages([
            ...messages,
            {
                id: nanoid(),
                content: prompt,
                role: 0
            },
            {
                id: nanoid(),
                content: "",
                role: 1
            }
        ])
        isChatBegin.current = true
    }




    return (
        <div
            className="flex flex-col w-full h-full overflow-hidden"
            style={{
                position: "relative"
            }}
        >
            {
                !docId ? <></> :
                    <div className="flex flex-row justify-center items-center w-full">
                        {!docData ? <></> :
                            <div className="p-2">
                                <Chip
                                    className="text-white font-bold"
                                    color="primary"
                                >
                                    {`知识库：${docData.docName}`}
                                </Chip>
                            </div>
                        }
                    </div>
            }
            {
                false === isShowHead ? <></> :
                    <div
                        className="flex flex-row"
                    >
                        <Button
                            className="mr-2"
                            isIconOnly={true}
                            onPress={() => setIsOpenHistoryDrawer(true)}
                            size="lg"
                        >
                            <MoreOutlined
                                style={{
                                    fontSize: 25
                                }}
                            />
                        </Button>
                        <div className="flex flex-col">
                            <div className="text-base font-bold">
                                {chatInfo.title}
                            </div>
                            <div className="text-sm text-gray-500">
                                {`共 ${chatInfo.messageCount} 条对话`}
                            </div>
                        </div>
                    </div>
            }
            <Drawer
                open={isOpenHistoryDrawer}
                placement="left"
                onClose={() => setIsOpenHistoryDrawer(false)}
                getContainer={false}
                destroyOnClose={true}
                mask={false}
            >
                <div className="flex flex-col w-full h-full overflow-hidden">
                    <div className="h-[40px] w-full">
                        <Button
                            className="text-base font-bold text-white w-full"
                            color="primary"
                            onPress={() => {
                                setConversationId(null)
                                setIsOpenHistoryDrawer(false)
                            }}
                        >
                            新建对话
                        </Button>
                    </div>
                    <div className="flex-grow overflow-hidden w-full mt-2">
                        <InfiniteScroll
                            swr={useChatConversationList}
                            params={{
                                docId: docId
                            }}
                            Item={ChatConversationListItem}
                            itemProps={conversationScrollItemProps}
                            rowHeight={50}
                            getPage={getChatConversationList}
                        />
                    </div>
                </div>
            </Drawer>
            <div
                className="flex-grow overflow-hidden"
            >
                <Chat
                    setChatInfo={setChatInfo}
                    generate={generate}
                    conversationId={conversationId}
                    setConversationId={setConversationId}
                />
            </div>


            {/*<div*/}
            {/*    className="flex-grow flex flex-col overflow-y-auto"*/}
            {/*    ref={textRef}*/}
            {/*>*/}
            {/*    {messages.length > 0 ? messages.map(item => (*/}
            {/*        <ChatText*/}
            {/*            key={item.id}*/}
            {/*            text={item.content}*/}
            {/*            role={item.role}*/}
            {/*        />*/}
            {/*    )) : <div>Empty</div>}*/}
            {/*</div>*/}
            {/*<form*/}
            {/*    className="flex flex-row items-center"*/}
            {/*    onSubmit={() => console.log(111)}*/}
            {/*>*/}
            {/*    <Textarea*/}
            {/*        className="mr-2"*/}
            {/*        placeholder={"请输入问题"}*/}
            {/*        onValueChange={setPrompt}*/}
            {/*        value={prompt}*/}
            {/*        onKeyDown={(e) => {*/}
            {/*            console.log(e.keyCode)*/}
            {/*            if (e.keyCode === 13) {*/}
            {/*                e.preventDefault()*/}
            {/*                send()*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <Button*/}
            {/*        className="h-[55px] font-bold"*/}
            {/*        color="primary"*/}
            {/*        onClick={send}*/}
            {/*        isLoading={isChatting}*/}
            {/*        type="submit"*/}
            {/*    >*/}
            {/*        Send*/}
            {/*    </Button>*/}
            {/*</form>*/}
        </div>
    )
}

export default  withThemeConfigProvider(AIChatBox)
