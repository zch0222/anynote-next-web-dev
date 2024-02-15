import useSWR from 'swr';
import { getTaskSubmissionsInfoList } from "@/requests/client/note/noteTask";
import {SWRParams} from "@/types/paginationTypes";

export default function useNoteTaskSubmissionsInfoList({ params, page, pageSize }: SWRParams<{
    noteTaskId: number
}>) {
    return useSWR(`/api/note/admin/noteTasks/submissions?pageSize=${pageSize}&page=${page}&noteTaskId=${params.noteTaskId}`,
        () => getTaskSubmissionsInfoList({
            page: page,
            pageSize: pageSize,
            noteTaskId: params.noteTaskId
        }).then(res => res.data.data))
}
