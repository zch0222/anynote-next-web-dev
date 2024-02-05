import request, {Method} from "@/utils/client-request"
import {PageBean, ResData} from "@/types/requestTypes";
import {AdminNoteTask, NoteTaskSubmissionInfo, NoteTask} from "@/types/noteTypes";

export const getAdminNoteTaskListUrl = "/api/note/admin/noteTasks"

export function getAdminNoteTaskList(params: {
    knowledgeBaseId: number,
    page: number,
    pageSize: number
}) {
    return request<ResData<PageBean<AdminNoteTask>>>({
        url: getAdminNoteTaskListUrl,
        method: Method.GET,
        params: params,
        needToken: true
    })
}
export function getNoteTaskList(params: {
    knowledgeBaseId: number,
    page: number,
    pageSize: number
}) {
    return request<ResData<PageBean<NoteTask>>>({
        url: `/api/note/noteTasks`,
        method: Method.GET,
        params: params,
        needToken: true
    })
}


export function getAdminNoteById(params: {
    id: number
}) {
    return request<ResData<AdminNoteTask>>({
        url: `/api/note/admin/noteTasks/${params.id}`,
        method: Method.GET,
        needToken: true
    })
}


export function getTaskSubmissionsInfoList(params: {
    noteTaskId: number,
    page: number,
    pageSize: number
}) {
    return request<ResData<PageBean<NoteTaskSubmissionInfo>>>({
        url: '/api/note/admin/noteTasks/submissions',
        method: Method.GET,
        needToken: true,
        params: params
    })
}


export function updateNoteTask(params: {
    id: number,
    taskName: string,
    startTime: Date,
    endTime: Date
}) {
    return request<String>({
        url: `/api/note/admin/noteTasks/${params.id}`,
        method: Method.PATCH,
        needToken: true,
        data: params
    })
}



