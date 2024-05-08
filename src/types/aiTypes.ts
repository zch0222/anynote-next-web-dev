export interface ChatConversationInfoVO {
    id: number;
    title: string;
    type: number;
    docId: number;
    permission: number;
    createBy?: number;
    createTime?: Date;
    updateBy?: number;
    updateTime?: Date;
}
