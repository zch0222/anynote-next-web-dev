'use client'
import { Avatar, Card } from "@nextui-org/react";

import MarkDownViewer from "@/components/MarkDownViewer";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import Bot from "@/components/svg/Bot"

function ChatText({ text, role }: {
    text: string,
    role: string
}) {
    if (role === "bot") {
        return (
            <div className="w-full flex flex-row mb-5">
                <div className="mr-2">
                    <Bot width={40} height={40}/>
                </div>
                <div className="flex-grow flex flex-col">
                    <div>Bot</div>
                    <Card
                        className="w-[85%] p-3 mt-1"
                        radius="sm"
                    >
                        {text}
                    </Card>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="w-full flex flex-row justify-end mb-5">

                <div className="flex-grow flex flex-col items-end">
                    <div className="font-blod">User</div>
                    <Card
                        className="w-[85%] p-3 mt-1"
                        radius="sm"
                    >
                        <MarkDownViewer content={text}/>
                    </Card>
                </div>
                <Avatar
                    className="ml-2"
                />
            </div>
        )
    }
}

export default withThemeConfigProvider(ChatText)
