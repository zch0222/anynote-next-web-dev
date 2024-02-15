import request, {Method} from "@/utils/client-request"
import {CreateDTO, KnowledgeBaseDTO, NoteKnowledgeBaseDTO, KnowledgeBaseMember, KnowledgeBaseImportUserVO} from "@/types/noteTypes";
import {PageBean, ResData} from "@/types/requestTypes";
import {AxiosProgressEvent} from "axios";

export const getKnowledgeBasesUrl = "/api/note/bases"
export function getKnowledgeBases(params: {
    page: number,
    pageSize: number,
    permissions: number
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

export function uploadKnowledgeBaseCover(params: {

}) {

}

export function getKnowledgeBaseMemberList(params: {
    knowledgeBaseId: number,
    pageSize: number,
    page: number
}) {
    return request<ResData<PageBean<KnowledgeBaseMember>>>({
        url: `/api/note/bases/users?knowledgeBaseId=${params.knowledgeBaseId}&pageSize=${params.pageSize}&page=${params.page}`,
        method: Method.GET,
        needToken: true,
    })
}

export function importUsers(params: {
    knowledgeBaseId: number,
    users: File,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}) {
    const formData = new FormData()
    formData.append("knowledgeBaseId", params.knowledgeBaseId.toString())
    formData.append("users", params.users)
    return request<ResData<KnowledgeBaseImportUserVO>>({
        url: "/api/note/manage/bases/import",
        method: Method.POST,
        needToken: true,
        data: formData,
        onUploadProgress: params.onUploadProgress
    })
    
}
