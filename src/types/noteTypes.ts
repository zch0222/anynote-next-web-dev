
export interface NoteKnowledgeBaseDTO {
    id: number;
    knowledgeBaseName: string;
    cover: string;
    type: number;
    status: number;
    organizationId?: number;
    organizationName?: string;
    permissions: number;
    detail: string;
}


export interface AdminNoteTask {
    createBy: number;
    createTime: string;
    updateBy: number;
    updateTime: string;
    id: number;
    taskName: string;
    startTime: string;
    endTime: string;
    knowledgeBaseId: number;
    status: number;
    submittedCount: number;
    needSubmitCount: number;
    submissionProgress: number;
}

export interface NoteTaskSubmissionInfo {
    createBy: number;
    createTime: string;
    updateBy: number;
    updateTime: string;
    noteTaskId: number;
    userId: number;
    noteId: number;
    submitTime: string;
    deleted: number;
    submissionUsername: string;
    submissionNickname: string;
    noteTitle: string;
}

export interface NoteTask {
    updateTime: string;
    id: number;
    taskName: string;
    startTime: string;
    endTime: string;
    knowledgeBaseId: number;
    status: number;
    submissionStatus: number;
    submissionNoteId: number | null;
    submitTime: string | null;
    taskCreatorUsername: string;
    taskCreatorNickname: string;
}


export interface NoteInfo {
    createBy: number;
    createTime: string;
    updateBy: number;
    updateTime: string;
    id: number;
    title: string;
    noteTextId: number;
    knowledgeBaseId: number;
    status: number;
    dataScope: number;
    deleted: number;
    notePermissions: number;
    submitTaskName: string | null;
}

export interface Note {
    createBy: number;
    createTime: string;
    updateBy: number;
    updateTime: string;
    id: number;
    title: string;
    noteTextId: number;
    knowledgeBaseId: number;
    status: number;
    dataScope: number;
    deleted: number;
    content: string;
    notePermissions: number;
    knowledgeBaseName: string;
    submitTaskName: string;
}

export interface KnowledgeBaseDTO {
    createBy: number;
    createTime: string;
    updateBy: number;
    updateTime: string;
    remark: string;
    id: number;
    knowledgeBaseName: string;
    cover: string;
    type: number;
    status: number;
    permissions: any;
    detail: any;
}

export interface MarkdownImage {
    image: string
}

export interface CreateDTO {
    id: number
}

export interface NoteHistoryListItemVO {
    operationLogId: number;
    operationTime: string;
    updaterId: number;
    updaterNickname: string;
    updaterUsername: string;
}

export interface NoteEdit {
    editLogId: number;
    originalText: string;
    revisedText: string;
    changeType: number;
    originalPosition: number;
    revisedPosition: number;
    editTime: string;
    editorId: number;
    editorUsername: string;
    editorNickname: string;
}

export interface NoteHistory {
    noteHistoryId: number;
    noteId: number;
    title: string;
    content: string;
    historyTime: string;
    createBy: number;
    noteEditList: NoteEdit[]
}







