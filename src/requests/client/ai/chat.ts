import request, {Method} from "@/utils/client-request"
import {ChatConversationInfoVO, ChatConversationVO,} from "@/types/aiTypes";
import {PageBean, ResData} from "@/types/requestTypes";

export function getChatConversationList(params: {
    id?: number,
    docId?: number,
    page: number,
    pageSize: number
}) {
    return request<ResData<PageBean<ChatConversationInfoVO>>>({
        url: `/api/ai/chat/conversations`,
        params: params,
        method: Method.GET,
        needToken: true
    })
}


export function updateChatConversation(params: {
    id: number,
    title?: string
}) {
    return request<ResData<string>>({
        url: `/api/ai/chat/conversations/${params.id}`,
        data: {
            title: params.title
        },
        method: Method.PATCH,
        needToken: true
    })
}


export function getConversationById({id}: {
    id: number
}) {
    return request<ResData<ChatConversationVO>>({
        url: `/api/ai/chat/conversations/${id}`,
        method: Method.GET,
        needToken: true
    })
}
