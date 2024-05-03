import request, {Method} from "@/utils/client-request"
import { HuaweiOBSTemporarySignature } from "@/types/fileTypes";
import {PageBean, ResData} from "@/types/requestTypes";
import {CreateDTO, DocListVO, DocVO} from "@/types/noteTypes";
import {AxiosProgressEvent, GenericAbortSignal} from "axios";


export function docUploadTempLink(params: {
    fileName: string,
    contentType: string,
    knowledgeBaseId: number
}) {
    return request<ResData<HuaweiOBSTemporarySignature>>({
        url: "/api/note/docs/upload",
        method: Method.POST,
        data: params,
        needToken: true
    })
}

export function completeDocUpload(params: {
    docName: string,
    hash: string,
    knowledgeBaseId: number,
    uploadId: string
}) {
    return request<ResData<CreateDTO>>({
        url: "/api/note/docs/upload",
        method: Method.PUT,
        data: params,
        needToken: true
    })
}

export function getDocList(params: {
    knowledgeBaseId: number,
    page: number,
    pageSize: number
}) {
    return request<ResData<PageBean<DocListVO>>>({
        url: "/api/note/docs",
        method: Method.GET,
        params: params,
        needToken: true
    })
}

export function getDocById(params: {
    docId: number
}) {
    return request<ResData<DocVO>>({
        url: `/api/note/docs/${params.docId}`,
        method: Method.GET,
        needToken: true
    })
}

export function query(params: {
    docId: number,
    prompt: string,
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
    signal?: GenericAbortSignal
}) {

    return  request<void>({
        url: `/api/ai/rag/query/docs`,
        data: {
            prompt: params.prompt,
            docId: params.docId
        },
        method: Method.POST,
        needToken: true,
        onDownloadProgress: params.onDownloadProgress
    })

}

export function indexDoc(id: number) {
    return request<ResData<string>>({
        url: `/api/note/docs/${id}/index`,
        method: Method.POST,
        needToken: true
    })
}

export function deleteDoc(id: number) {
    return request<ResData<string>>({
        url: `/api/note/docs/${id}`,
        method: Method.DELETE,
        needToken: true
    })
}
