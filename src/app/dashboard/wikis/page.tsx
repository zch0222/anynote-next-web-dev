'use client'
import { Typography, Card } from "antd";
import { Image } from "@nextui-org/react";
import {useRouter} from "next/navigation";
import { WIKI } from "@/constants/route";

import Pagination from "@/components/Pagination";

import useNoteKnowledgeBaseList from "@/hooks/useNoteKnowledgeBaseList";

import createPage from "@/components/hoc/createPage/createPage";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import { NoteKnowledgeBaseDTO } from "@/types/noteTypes";


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
            cover={<Image className="object-cover w-[200px] h-[250px]" src={data.cover} />}
            // isPressable
            onClick={() => router.push(`${WIKI}/${data.id}`)}
        >
            <Meta title={data.knowledgeBaseName}/>
        </Card>
    )
})

function Wikis() {
    return (
        <div className="flex flex-col w-full h-full flex-col p-8 box-border">
            <Title level={2}>知识库</Title>

            <div className="flex-grow flex overflow-hidden flex-row p-2">
                <Pagination
                    direction="row"
                    Page={createPage(KnowledgeBaseCard)}
                    swr={useNoteKnowledgeBaseList}
                    params={{}}
                />
            </div>

        </div>
    )
}

export default withThemeConfigProvider(Wikis)

