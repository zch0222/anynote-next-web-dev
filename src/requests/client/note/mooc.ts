import {OssSliceUploadTaskCreateDTO, OssSliceUploadTaskVO} from "@/types/fileTypes";
import request, {Method} from "@/utils/client-request"
import { ResData } from "@/types/requestTypes";


export function createMoocCoverUploadTask(createDTO: OssSliceUploadTaskCreateDTO) {
    return request<ResData<OssSliceUploadTaskVO>>({
        url: "/api/note/moocs/cover/create",
        method: Method.POST,
        data: createDTO,
        needToken: true
    })
}