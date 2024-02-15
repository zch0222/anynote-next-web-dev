import useSWR from "swr";
import { getKnowledgeBaseMemberList } from "@/requests/client/note/knowledgeBase";
import {SWRParams} from "@/types/paginationTypes";

export default function useKnowledgeBaseMemberList({params, page, pageSize}: SWRParams<{
    knowledgeBaseId: number
}>) {

    return useSWR(`/api/note/bases/users?knowledgeBaseId=${params.knowledgeBaseId}&pageSize=${pageSize}&page=${page}`,
        () => getKnowledgeBaseMemberList({
            page: page,
            pageSize: pageSize,
            ...params
        }).then(res => res.data.data))
}