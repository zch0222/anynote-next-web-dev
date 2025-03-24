'use client'
import {Card, Image, CardFooter, Chip} from "@nextui-org/react";

import useDocList from "@/hooks/useDocList";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import Pagination from "@/components/Pagination";
import createPage from "@/components/hoc/createPage/createPage";
import { useRouter } from "next/navigation";
import {MoocInfo} from "@/types/moocTypes";
import useMoocList from "@/hooks/mooc/useMoocList";

function MoocItem({ data }: {
    data: MoocInfo
}) {

    const router = useRouter()

    return (
        <Card>
            1
        </Card>
    )
}

function MoocTab({knowledgeBaseId }: {
    knowledgeBaseId: number
}) {

    return (
        <div className="h-full pt-2 overflow-hidden">
            <Pagination
                Page={createPage(MoocItem)}
                swr={useMoocList}
                params={{
                    knowledgeId: knowledgeBaseId
                }}
                direction={"row"}
            />
        </div>
    )
}

export default withThemeConfigProvider(MoocTab)
