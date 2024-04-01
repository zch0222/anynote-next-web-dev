import request, { Method, service } from "@/utils/request";
import {GenericAbortSignal} from "axios";


export function chat(params: {
    data: {
        url: string,
        question: string,
        user_id: number,
        file_key: string,
        model: string
    }
    onDownloadProcess: any,
    signal: GenericAbortSignal
}) {
    return service.post('/api/rag/pdf', params.data, {
        onDownloadProgress: params.onDownloadProcess,
        signal: params.signal
    })
}
