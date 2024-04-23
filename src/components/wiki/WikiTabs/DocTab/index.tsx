'use client'
import { Card, Image, CardFooter } from "@nextui-org/react";

import useDocList from "@/hooks/useDocList";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import Pagination from "@/components/Pagination";
import createPage from "@/components/hoc/createPage/createPage";
import { DocListVO } from "@/types/noteTypes";
import { useRouter } from "next/navigation";

function DocItem({ data }: {
    data: DocListVO
}) {

    const router = useRouter()

    return (
        <Card
            className="w-[180px] h-[280px] flex flex-col items-center mr-5 mb-5"
            radius="sm"
            isPressable
            onPress={() => router.push(`/doc/${data.id}`)}
        >
            <Image
                className="object-cover h-[200px]"
                width={180}
                alt="doc cover"
                src="https://anynote.obs.cn-east-3.myhuaweicloud.com/images/knowledge_base_cover.png"
            />
            <CardFooter
            >
                <p className="text-base">
                    {data.docName}
                </p>

            </CardFooter>

        </Card>

    )
}

function DocTab({ knowledgeBaseId }: {
    knowledgeBaseId: number
}) {

    return (
        <div className="h-full pt-2 overflow-hidden">
            <Pagination
                Page={createPage(DocItem)}
                swr={useDocList}
                params={{
                    knowledgeBaseId: knowledgeBaseId
                }}
                direction={"row"}
            />
        </div>
    )
}

export default withThemeConfigProvider(DocTab)