import useSWR from 'swr';
import { getTaskSubmissionsInfoList } from "@/requests/client/note/noteTask";

export default function useNoteTaskSubmissionsInfoList(params: {
    noteTaskId: number,
    page: number,
    pageSize: number
}) {
    return useSWR(`/api/note/admin/noteTasks/submissions?pageSize=${params.pageSize}&page=${params.page}&noteTaskId=${params.noteTaskId}`,
        () => getTaskSubmissionsInfoList(params).then(res => res.data.data))
}
