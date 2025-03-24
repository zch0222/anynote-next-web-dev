'use client'

import Pagination from "@/components/Pagination";
import createPage from "@/components/hoc/createPage/createPage";
import useMoocList from "@/hooks/mooc/useMoocList";
import {Card, Typography} from "antd";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import {NoteKnowledgeBaseDTO} from "@/types/noteTypes";
import {useRouter} from "next/navigation";
import {Image} from "@nextui-org/react";
import {MOOC} from "@/constants/route";

const { Title } = Typography;
const { Meta } = Card;

const KnowledgeBaseCard = withThemeConfigProvider(function ({ data }: {
    data: NoteKnowledgeBaseDTO
}) {

    const router = useRouter();

    return (
        <Card
            bordered={false}
            hoverable
            className="border-none p-0 w-[200px]"
            style={{
                marginRight: 24,
                marginTop: 16,
                height: 315
            }}
            cover={<Image className="object-cover w-[200px] h-[250px]" src={data.cover} alt='cover'/>}
            // isPressable
            onClick={() => router.push(`${MOOC}/${data.id}`)}
        >
            <Meta title={data.knowledgeBaseName}/>
        </Card>
    )
})

export default function Mooc(){
    return (
        <div className="flex flex-col w-full h-full flex-col p-8 box-border">
            <Title level={2}>AI视频慕课</Title>

            <div className="flex-grow flex overflow-hidden flex-row p-2">
                <Pagination
                    direction="row"
                    Page={createPage(KnowledgeBaseCard)}
                    swr={useMoocList}
                    params={{
                        permissions: 5
                    }}
                />
            </div>

        </div>
    )
}
