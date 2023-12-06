import request, {Method} from "@/utils/client-request"
import {CreateDTO, KnowledgeBaseDTO, NoteKnowledgeBaseDTO} from "@/types/noteTypes";
import {PageBean, ResData} from "@/types/requestTypes";

export const getKnowledgeBasesUrl = "/api/note/bases"
export function getKnowledgeBases(params: {
    page: number,
    pageSize: number
}) {
    return request<ResData<PageBean<NoteKnowledgeBaseDTO>>>({
        url: getKnowledgeBasesUrl,
        method: Method.GET,
        params: params,
        needToken: true
    })
}

export function getKnowledgeBaseId(params: {
    id: number
}) {
    return request<ResData<KnowledgeBaseDTO>>({
        url: `/api/note/bases/${params.id}`,
        method: Method.GET,
        needToken: true
    })
}

export function createKnowledgeBase(params: {
    name: string,
    cover: string,
    detail: string,
    type: number
}) {
    return request<ResData<CreateDTO>>({
        url: "/api/note/bases",
        data: params,
        method: Method.POST,
        needToken: true
    })
}
