'use client'
import { useCallback } from "react";

import useKnowledgeBase from "@/hooks/useKnowledgeBase";
import WikiInfoForm from "@/components/wiki/WikiInfoForm";
import Loading from "@/components/Loading";

function WikiManageInfoTab({ id }: {
    id: number
}) {

    const changeWikiInfo = useCallback((value: {
        name: string,
        detail: string
    }) => {
        console.log(value)
    }, [])

    const {data} = useKnowledgeBase(id);

    if (!data) {
        return <Loading/>
    }


    return (
        <div
            className="w-[500px] pl-2"
        >
            <WikiInfoForm
                onFinish={changeWikiInfo}
                buttonText={"保存"}
                initialValues={{
                    name: data.knowledgeBaseName,
                    detail: data.detail,
                    cover: data.cover
                }}
            />
        </div>
    )
}

export default WikiManageInfoTab